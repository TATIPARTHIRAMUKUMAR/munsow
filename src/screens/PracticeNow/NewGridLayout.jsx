import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useNavigate } from "react-router-dom";
import { submit_interview } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import image from "../../assets/Interviewer.png";
import InterviewOver from "./InterviewOver";
import { Step, StepLabel, Stepper } from '@mui/material';
import { useDarkMode } from "./../../Dark";
import './Practice.css';
import { Height } from "@mui/icons-material";

let mediaRecorder;

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = seconds - hrs * 3600 - mins * 60;
  return (
    <div className="flex items-center gap-1">
      {/* <TimerOutlinedIcon /> */}
      {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs
        }`}
    </div>
  );
}

export default function NewGridLayout({ questions }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [voices, setVoices] = useState([]);
  const [recordedChunks, setRecordedChunks] = useState([]);


  // useEffect(() => {
  //   if ('speechSynthesis' in window) {
  //     if (window.speechSynthesis.onvoiceschanged !== undefined) {
  //       window.speechSynthesis.onvoiceschanged = () => {
  //         setVoices(window.speechSynthesis.getVoices());
  //       };
  //     }
  //   }
  // }, []);

  const { questionsList } = useSelector((state) => state?.data);
  const TOTAL_TIME = questions?.reduce((acc, q) => acc + q.duration, 0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(
    questions?.[0]?.duration
  );
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [spokenQuestions, setSpokenQuestions] = useState([]);
  const [skipped, setSkipped] = useState(false);

  const { isDarkMode, colorTheme } = useDarkMode();

  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
  const linearGradientBackground = isDarkMode
    ? reduxColorTheme.dark.selectBackground
    : reduxColorTheme.light.selectBackground;
  const buttonTextColor = isDarkMode
    ? reduxColorTheme.dark.textColor2
    : reduxColorTheme.light.textColor2;

  const backgroundColor = isDarkMode
    ? reduxColorTheme.dark.foreground
    : reduxColorTheme.light.foreground;

  const textColor = isDarkMode
    ? reduxColorTheme.dark.textColor3
    : reduxColorTheme.light.textColor3;


  const handleFinishInterview = () => {
    setShowConfirmationPopup(true);
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setSkipped(false);
      stopRecording();
      setRecordedChunks([]); // Reset the recordedChunks array here
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      startStreamAndRecording();
    }
  };

  useEffect(() => {
    if (interviewCompleted) {
      stopRecording();
    }
  }, [interviewCompleted]);

  // useEffect(() => {
  //   if (skipped) {
  //     stopRecording();
  //   }
  // }, [skipped]);

  const confirmEndInterview = () => {
    setInterviewCompleted(true);
    // stopRecording();
    const videoElement = document.getElementById("vid");
    const stream = videoElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
    }
    // setTotalTimeLeft(0);
    setShowConfirmationPopup(false);
  };

  function startStreamAndRecording() {
    setRecordedChunks([]); // Reset the recordedChunks array here
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        let videoElement = document.getElementById("vid");
        videoElement.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
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
          const status =
            interviewCompleted ? "Completed" : "Inprogress";
          // questionIndex === questions.length - 1 ? "Completed" : "Inprogress";
          const mimeRegex = /^data:.+;base64,/;
          if (mimeRegex.test(base64data)) {
            base64data = base64data.replace(mimeRegex, "");
          }
          while (base64data.length % 4 !== 0) {
            base64data += "=";
          }
          const skip = skipped ? 1 : 0;
          const payload = {
            question: questions[questionIndex]?.question,
            interview_id: questionsList?.interview_id,
            status: status,
            video: base64data,
            question_id: questions[questionIndex]?.id,
            category: questions[questionIndex]?.category,
            sub_category: questions[questionIndex]?.sub_category,
            tag: questions[questionIndex]?.tag ? questions[questionIndex]?.tag : "",
            // skipped: skip
          };
          console.log("payload", payload);
          // dispatch(submit_interview(payload));

          dispatch(submit_interview(payload, (resp) => {
            console.log("result-resp", resp)
            if (interviewCompleted) {
              window.location.href = "./report";
            }
          }));

          if (status === "completed") {
            const videoElement = document.getElementById("vid");
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
              track.stop();
            });
            videoElement.srcObject = null;
          }
        };
        reader.readAsDataURL(blob);
      };
    } else {
      console.error("No active recording.");
    }
  }

  const speakOut = (text) => {
    if (
      "speechSynthesis" in window &&
      isSpeakerOn &&
      !spokenQuestions.includes(text)
    ) {
      let allVoices = window.speechSynthesis.getVoices();
      if (!allVoices.length) {
        window.speechSynthesis.onvoiceschanged = function () {
          allVoices = window.speechSynthesis.getVoices();
          const femaleVoice = allVoices.find((voice) => /female/i.test(voice.name));
          speak(text, femaleVoice);
        };
        window.speechSynthesis.getVoices();
      } else {
        const femaleVoice = allVoices.find((voice) => /female/i.test(voice.name));
        speak(text, femaleVoice);
      }
    }
  };

  const speak = (text, voice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
    setSpokenQuestions((prev) => [...prev, text]);
  };

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
        const videoElement = document.getElementById("vid");
        const stream = videoElement.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
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
      startStreamAndRecording();
    }
  }, [isLoading]);

  useEffect(() => {
    if (interviewCompleted) {
      const timer = setTimeout(() => {
        // window.location.href = "./report";
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [interviewCompleted]);

  const skipQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setSkipped(true);
      // stopRecording();
      setRecordedChunks([]);
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      startStreamAndRecording();
    }
  };

  return (
    <>
      {questions?.length > 0 && (
        <>
          {interviewCompleted ? (
            <>
              <InterviewOver />
            </>
          ) : (
            <>
              <div className="bg-teal-100 h-[25px] progressBar relative">
                <div
                  key={questionIndex}
                  className="bg-teal-500 h-[25px] progressFill"
                  style={{
                    animation: `progress-bar-animation ${questions[questionIndex]?.duration}s linear`,
                    width: `${(questionTimeLeft / questions[questionIndex]?.duration) * 100}%`,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-black py-3 font-bold">
                  Time Left: {formatTime(questionTimeLeft)}
                </span>
              </div>
              <div className="p-[40px]">
                <div className="flex justify-end">


                </div>
                <div>
                  {/* <LinearProgress
                  className="my-2"
                    variant="determinate"
                    style={{ backgroundColor: 'orange' }} 
                    value={
                      ((questionIndex + 1) / questions.length) * 100
                    } 
                  /> */}
                  {/* <Stepper activeStep={questionIndex} alternativeLabel>
                    {questions.map((question, index) => (
                      <Step key={index} completed={index < questionIndex}>
                        <StepLabel>{index + 1}</StepLabel>
                      </Step>
                    ))}
                  </Stepper> */}

                  <div className="grid grid-cols-4  gap-4 ">
                    {/* Left Top Cell */}
                    <div className="col-span-2 flex flex-col">
                      <div className="text-lg font-bold py-9">
                        {questionIndex + 1}
                        {". "}
                        {questions[questionIndex]?.question}
                      </div>
                      <div className="relative w-[600px] h-full rounded-lg overflow-hidden">
                        <img
                          src={image}
                          className="w-full h-full object-cover"
                          alt="User"
                        />
                        <div
                          className="absolute top-2 right-2 cursor-pointer p-2 bg-white bg-opacity-0 rounded-full"
                          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                        >
                          {isSpeakerOn ? (
                            <VolumeUpIcon className="text-white text-2xl" />
                          ) : (
                            <VolumeOffIcon className="text-white text-2xl" />
                          )}
                        </div>
                      </div>

                      {/* <div className="col-span-2 bg-white p-3 ">
                        <div className="flex w-full justify-between items-center">
                          <div className="font-bold text-lg">Question {questionIndex + 1} of {questions.length}</div>
                        </div>
                      </div> */}
                    </div>

                    {/* Right Vertical Cell */}
                    <div className="col-span-2 bg-white p-4 rounded-xl mt-3">
                      <div className="flex gap-4 mb-[5%] justify-end">
                        <button
                          onClick={skipQuestion}
                          className="border w-[130px] h-[45px] bg-gray-300 border-gray-300 rounded-lg flex justify-center items-center"
                        >
                          Skip
                        </button>
                        <button
                          onClick={nextQuestion}
                          style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            borderRadius: "8px",
                            width: '200px',
                            height: '45px',
                            marginBottom: '33px',
                            background: linearGradientBackground,
                            color: textColor,
                            visibility:
                              questionIndex < questions?.length - 1
                                ? ""
                                : "hidden",
                          }}
                          className="text-secondary"
                        >
                          Next Question
                        </button>
                      </div>
                      <div className="relative ml-[45px]">
                        <div className="relative w-[520px]  flex justify-center items-center">
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                            REC
                          </div>
                          <video
                            id="vid"
                            className="rounded-md bg-black"
                            muted
                            autoPlay
                          ></video>
                        </div>
                      </div>
                    </div>
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
              <div className="flex justify-between items-center">
                <button
                  onClick={handleFinishInterview}
                  className="fixed bottom-[115px] bg-red-500 text-white right-11 px-6 py-3 rounded-lg flex justify-center gap-2 items-center"
                >
                  Finish Interview
                </button>
                <div className="relative bottom-[-70px] ml-9 text-xl font-bold">
                  Question {questionIndex + 1} of {questions.length}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

