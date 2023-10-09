import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { useNavigate } from "react-router-dom";
import { submit_interview } from "../../redux/action";
import { useDispatch } from "react-redux";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import image from "../../assets/AI_Interview_img1.avif"

let mediaRecorder;
let recordedChunks = [];


function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = seconds - hrs * 3600 - mins * 60;
  return <div className="flex items-center gap-1" >
    <TimerOutlinedIcon />
    {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`}
  </div>
}

export default function NewGridLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = [
    {
      id: 1,
      question: "Can you tell me about your strengths ?",
      duration: 60,
    },
    {
      id: 2,
      question: "Please tell me why you would be a good fit for this role ?",
      duration: 60,
    },
    {
      id: 3,
      question: "What are your career goals for the next five years ?",
      duration: 60,
    },
    {
      id: 4,
      question: "Please tell me why you would be a good fit for this role ?",
      duration: 60,
    },
    {
      id: 5,
      question: "What are your career goals for the next five years ?",
      duration: 60,
    },
    {
      id: 6,
      question: "What are your career goals for the next five years ?",
      duration: 60,
    },
  ];
  const TOTAL_TIME = questions.reduce((acc, q) => acc + q.duration, 0);
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
      // stopRecording();
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
    // Navigate to the dashboard or perform any other action.
    // For example:
    navigate("/studentDashboard"); // Replace with your dashboard URL
  }

  // function camOn() {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then(function (stream) {
  //       localstream = stream;
  //       document.querySelector("video").srcObject = stream;
  //       startRecording()
  //     })
  //     .catch(function (error) {
  //       console.log(JSON.stringify(error), "Video permission denied.");
  //     });

  // }  


  // __________________________ 


  function startStreamAndRecording() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        let videoElement = document.getElementById("vid")
        videoElement.srcObject = stream
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = function () {
          const blob = new Blob(recordedChunks, { type: "video/mp4" });
          const url = URL.createObjectURL(blob);

          // Create a download link for the recorded video
          const a = document.createElement("a");
          a.href = url;
          a.download = "recorded-video.mp4";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Clear the recordedChunks array
          recordedChunks = [];
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
            interview_id: 1,
            status: "Inprogress",
            video: base64data
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
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      // Update the spokenQuestions array
      setSpokenQuestions(prev => [...prev, text]);
    }
  }

  useEffect(() => {
    const speakInitialQuestion = () => {
      speakOut(questions[0]?.question);
    }
    const timer = setTimeout(speakInitialQuestion, 500);  // Delay of 500ms for 1st quetion speak out
    return () => clearTimeout(timer);
  }, []);



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


  }, [questionTimeLeft, questionIndex, totalTimeLeft, isSpeakerOn]);

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
      {interviewCompleted ? <>

        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-500">

          {/* Main Card */}
          <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-md transform transition-transform duration-300 hover:scale-105">

            {/* Completion Icon or Illustration */}
            <svg className="w-16 h-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>

            <h2 className="text-4xl font-semibold mb-4">Interview Over</h2>

            {/* Thank you message */}
            <p className="text-xl mb-6 font-light">Thank you for completing the interview! We truly value your time and effort.</p>

            {/* Guidance or description */}
            <p className="mb-6 font-light">Your responses are now under review. We'll reach out soon. Until then, explore your dashboard for more insights.</p>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full flex items-center justify-center transform transition-transform duration-150 hover:scale-105"
              onClick={goToDashboard}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Go to Dashboard
            </button>
          </div>
        </div>


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
                      <ArrowForwardIcon
                        onClick={nextQuestion}
                        color="secondary"
                        style={{
                          cursor: "pointer",
                          fontSize: "50px",
                          border: "1px solid lightblue",
                          borderRadius: "5px",
                          padding: "10px",
                          visibility:
                            questionIndex < questions?.length - 1 ? "" : "hidden",
                        }}
                      />
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
                            Confirm Action
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
  );
}
