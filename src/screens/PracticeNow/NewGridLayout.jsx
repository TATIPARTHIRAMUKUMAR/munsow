import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useNavigate } from "react-router-dom";
import { submit_interview } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import image from "../../assets/h.jpeg"
import InterviewOver from "./InterviewOver";

let mediaRecorder;
// let recordedChunks = [];

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = seconds - hrs * 3600 - mins * 60;
  return <div className="flex items-center gap-1" >
    <TimerOutlinedIcon />
    {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`}
  </div>
}

export default function NewGridLayout({ questions }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [voices, setVoices] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);


  useEffect(() => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoices(window.speechSynthesis.getVoices());
        };
      }
    }
  }, []);

  const { questionsList } = useSelector(state => state?.data)
  const TOTAL_TIME = questions?.reduce((acc, q) => acc + q.duration, 0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(questions?.[0]?.duration);
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [spokenQuestions, setSpokenQuestions] = useState([]);

  const handleFinishInterview = () => {
    setShowConfirmationPopup(true);
  }

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      stopRecording();
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      startStreamAndRecording();
    }
  };

  const confirmEndInterview = () => {
    setTotalTimeLeft(0);
    setShowConfirmationPopup(false);
  }

  const goToDashboard = () => {
    navigate("/studentDashboard");
  }

  function startStreamAndRecording() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        let videoElement = document.getElementById("vid")
        videoElement.srcObject = stream
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            setRecordedChunks(prevChunks => [...prevChunks, event.data]);
          }
        };
        mediaRecorder.onstop = function () {
          const blob = new Blob(recordedChunks, { type: "video/mp4" });
          // const url = URL.createObjectURL(blob);
          // Create a download link for the recorded video
          // const a = document.createElement("a");
          // a.href = url;
          // a.download = "recorded-video.mp4";
          // a.style.display = "none";
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);

          // Clear the recordedChunks array
          setRecordedChunks([]);
        };
        mediaRecorder.start();
      })
      .catch(function (error) {
        console.log(JSON.stringify(error), "Video permission denied.");
      });
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaRecorder.onstop = function () {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const reader = new FileReader();
        reader.onloadend = function () {
          let base64data = reader.result;
          const status = (questionIndex === questions.length - 1) ? "Completed" : "Inprogress";
          const mimeRegex = /^data:.+;base64,/;
          if (mimeRegex.test(base64data)) {
            base64data = base64data.replace(mimeRegex, '');
          }
          // Ensure the base64 data length is a multiple of 4
          while (base64data.length % 4 !== 0) {
            base64data += '=';
          }
          const payload = {
            question: questions[questionIndex]?.question,
            interview_id: questionsList?.interview_id,
            status: status,
            video: base64data,
            question_id: questions[questionIndex]?.id,
            tag: questions[questionIndex]?.tag?questions[questionIndex]?.tag:""
          }
          dispatch(submit_interview(payload));
          // If it's the last question, turn off the camera
          if (status === "completed") {
            const videoElement = document.getElementById("vid");
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => {
              track.stop();
            });
            videoElement.srcObject = null;
          }
        }
        reader.readAsDataURL(blob);
      };
    } else {
      console.error("No active recording.");
    }
  }

  const speakOut = (text) => {
    if ('speechSynthesis' in window && isSpeakerOn && !spokenQuestions.includes(text)) {
      // Fetch voices
      let allVoices = window.speechSynthesis.getVoices();
      if (!allVoices.length) {
        window.speechSynthesis.onvoiceschanged = function () {
          allVoices = window.speechSynthesis.getVoices();
          const femaleVoice = allVoices.find(voice => /female/i.test(voice.name));
          speak(text, femaleVoice);
        };
        window.speechSynthesis.getVoices();
      } else {
        const femaleVoice = allVoices.find(voice => /female/i.test(voice.name));
        speak(text, femaleVoice);
      }
    }
  }

  // Helper function to actually perform the speaking
  const speak = (text, voice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
    // Update the spokenQuestions array
    setSpokenQuestions(prev => [...prev, text]);
  }

  // useEffect(() => {
  //   const speakInitialQuestion = () => {
  //     speakOut(questions[0]?.question);
  //   }
  //   const timer = setTimeout(speakInitialQuestion, 500);  // Delay of 500ms for 1st quetion speak out
  //   return () => clearTimeout(timer);
  // }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      if (questionTimeLeft > 0) {
        setQuestionTimeLeft((prevTime) => prevTime - 1);
      } else {
        nextQuestion();
      }
      if (totalTimeLeft > 0) {
        setTotalTimeLeft((prevTime) => prevTime - 1);
      } else {
        stopRecording();
        setInterviewCompleted(true);
        // Turn off the camera
        const videoElement = document.getElementById("vid");
        const stream = videoElement.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => {
            track.stop();
          });
          videoElement.srcObject = null;
        }
      }
    }, 1000);
    speakOut(questions[questionIndex]?.question);
    return () => clearInterval(interval);
  }, [questionTimeLeft, questionIndex, totalTimeLeft]);

  useEffect(() => {
    setIsLoading(true);
  }, []);


  useEffect(() => {
    if (isLoading) {
      // camOn();
      startStreamAndRecording()
    }
  }, [isLoading]);

  return (

    <>
      {questions?.length > 0 && (
        <>
          {interviewCompleted ? <>

            <InterviewOver />


          </> : <>

            <div className="p-5">
              <div className="flex justify-end">
                <button
                  className="bg-red-500  text-white font-bold py-2 px-4 rounded m-2"
                  onClick={handleFinishInterview}
                >
                  Finish Interview
                </button>
              </div>

              <div>


                <div className="grid grid-cols-3  gap-4 ">

                  {/* Left Top Cell */}
                  <div className="col-span-2 flex flex-col">
                    <div className="flex-grow">
                      <img src={image} className="w-full h-full" />
                    </div>

                    <div className="col-span-2 bg-white p-3 ">
                      <div className="flex justify-between leading-6 text-sm py-2">
                        <div className="text-xl font-bold">Question Duration</div>
                        <div className="text-xl font-bold">{formatTime(questionTimeLeft)}</div>
                        <div className="cursor-pointer" onClick={() => setIsSpeakerOn(!isSpeakerOn)}>
                          {isSpeakerOn ?
                            <VolumeUpIcon /> :
                            <VolumeOffIcon />
                          }
                        </div>
                      </div>
                      <div className="text-2xl py-5">
                        {questionIndex + 1}
                        {". "}
                        {questions[questionIndex]?.question}
                      </div>
                      <div className="flex w-full justify-between items-center">
                        {/* <Button variant="contained" size="large" color="secondary">
                      Answer
                    </Button> */}
                        <div></div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={nextQuestion}
                            style={{
                              cursor: "pointer",
                              fontSize: "18px",  // Adjusted the font size suitable for text
                              // border: "1px solid lightblue",
                              borderRadius: "8px",
                              padding: "10px",
                              background: "#886cc0",
                              color: "white",
                              visibility:
                                questionIndex < questions?.length - 1 ? "" : "hidden",
                            }}
                            className="text-secondary"  // Assuming you have a utility class for secondary text color
                          >
                            Next Question
                          </button>

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Vertical Cell */}
                  <div className="col-span-1 bg-white p-4 rounded-xl">
                    <div>
                      <div className="text-xl font-bold">Total Interview Duration</div>
                      <div className="py-5 text-xl">{formatTime(totalTimeLeft)}</div>
                    </div>
                    <div className="relative">
                      {/* REC Indicator */}
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">REC</div>

                      <video
                        id="vid"
                        className="rounded-md"
                        muted
                        autoPlay
                      ></video>
                    </div>
                  </div>


                  {/* Left Bottom Cell */}


                </div>









                {showConfirmationPopup && (
                  <div className="fixed z-99999999999999999 inset-0 overflow-y-auto">
                    {/* Rest of the modal code */}
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>

                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                              <h3 className="text-2xl leading-6 font-medium text-gray-900">
                                Finish Interview
                              </h3>
                              <div className="mt-6">
                                <p className="text-xl text-gray-500">
                                  Are you sure you want to end the interview?
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={confirmEndInterview}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setShowConfirmationPopup(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </>
          }
        </>
      )}
    </>
  );
}
