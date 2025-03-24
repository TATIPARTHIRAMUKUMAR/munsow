import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useNavigate } from "react-router-dom";
import { submit_interview } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MicIcon from "@mui/icons-material/Mic";
import image from "../../assets/Interviewer.png";
import InterviewOver from "./InterviewOver";
import InterviewCancle from "./InterviewCancel";
import { Step, StepLabel, Stepper } from '@mui/material';
import { useDarkMode } from "./../../Dark";
import './Practice.css';
import { Height } from "@mui/icons-material";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import WarningModel from "./WarningModel";
import PremiumSpeechTranscription from './PremiumSpeechTranscription';

let mediaRecorder; 

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = seconds - hrs * 3600 - mins * 60;
  return (
    <div className="flex items-center gap-1">
      {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`}
    </div>
  );
}

export default function NewGridLayout({ questions }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [transcriptionActive, setTranscriptionActive] = useState(false);
  const [transcriptResetTrigger, setTranscriptResetTrigger] = useState(0);
  const [micPermissionGranted, setMicPermissionGranted] = useState(null);
  const [permissionError, setPermissionError] = useState('');
  
  // Store all transcripts throughout the interview
  const [allTranscripts, setAllTranscripts] = useState({});

  const { questionsList } = useSelector((state) => state?.data);
  const TOTAL_TIME = questions?.reduce((acc, q) => acc + q.duration, 0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(
    questions?.[0]?.duration
  );
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [interviewCancelled, setInterviewCancelled] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [spokenQuestions, setSpokenQuestions] = useState([]);

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

  const [warningCount, setWarningCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const maxWarnings = 3;

  // Save current transcript to allTranscripts when it changes
  useEffect(() => {
    if (currentTranscript && questionIndex !== undefined) {
      console.log(`Saving transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
      setAllTranscripts(prev => ({
        ...prev,
        [questionIndex]: currentTranscript
      }));
    }
  }, [currentTranscript, questionIndex]);

  // Check for microphone permissions early
  useEffect(() => {
    // Try to get microphone permission
    const checkMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop the tracks immediately after checking
        stream.getTracks().forEach(track => track.stop());
        setMicPermissionGranted(true);
        setPermissionError('');
        console.log('Microphone permission granted!');
      } catch (error) {
        console.error('Microphone permission error:', error);
        setMicPermissionGranted(false);
        setPermissionError(`Error accessing microphone: ${error.message}`);
      }
    };
    
    checkMicPermission();
  }, []);

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      const newWarningCount = warningCount + 1;
      setWarningCount(newWarningCount);

      if (newWarningCount < maxWarnings) {
        setModalMessage(
          `Warning ${newWarningCount}/${maxWarnings}: Please do not switch tabs or leave this window. Your interview will be terminated after ${
          maxWarnings - newWarningCount
          } more ${maxWarnings - newWarningCount <= 1 ? "warning" : "warnings"}.`
        );
        setModalVisible(true);
      }

      if (newWarningCount >= maxWarnings) {
        setModalMessage(
          "You have exceeded the maximum number of warnings. The interview is now terminated."
        );
        setModalVisible(true);
        confirmCancelInterview();
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [warningCount]);

  const handleFinishInterview = () => {
    setShowConfirmationPopup(true);
  };

  const handleTranscriptUpdate = (transcript) => {
    console.log('Transcript updated from child component:', transcript.substring(0, 50) + '...');
    setCurrentTranscript(transcript);
  };

  
  const submitInterviewData = (videoBlob = null, status, skipped = false) => {
    console.log('Preparing unified submission payload');
    
   
    const finalTranscripts = {
      ...allTranscripts,
      [questionIndex]: currentTranscript
    };
    
    console.log('All collected transcripts:', finalTranscripts);
    
    const formattedTranscripts = Object.entries(finalTranscripts).map(([qIndex, transcript]) => ({
      question_id: questions[parseInt(qIndex)]?.id,
      question: questions[parseInt(qIndex)]?.question,
      transcript: transcript || ''
    }));
    
    console.log('Formatted transcripts for payload:', formattedTranscripts);
    
    
    const basePayload = {
      interview_id: questionsList?.interview_id,
      status: status,
      transcripts: formattedTranscripts,
      question: questions[questionIndex]?.question,
      question_id: questions[questionIndex]?.id,
      category: questions[questionIndex]?.category,
      sub_category: questions[questionIndex]?.sub_category,
      tag: questions[questionIndex]?.tag ? questions[questionIndex]?.tag : "",
      skipped: skipped ? 1 : 0
    };
    
    
    if (videoBlob) {
      const reader = new FileReader();
      reader.onloadend = function() {
        let base64data = reader.result;
        console.log(`Video converted to base64, length: ${base64data.length}`);
        
        const mimeRegex = /^data:.+;base64,/;
        if (mimeRegex.test(base64data)) {
          base64data = base64data.replace(mimeRegex, "");
        }
        while (base64data.length % 4 !== 0) {
          base64data += "=";
        }
        
       
        const completePayload = {
          ...basePayload,
          video: base64data
        };
        
        console.log('Sending unified submission to backend');
        console.log('Payload details (partial):', 
          JSON.stringify({
            ...basePayload,
            video_size: base64data.length,
            transcript_count: formattedTranscripts.length
          })
        );
        
        
        dispatch(submit_interview(completePayload, (resp) => {
          console.log("Submission response:", resp);
          
          if (status === "Completed") {
            console.log("Interview completed, redirecting...");
            if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
              window.location.href = "./studentDashboardScreening";
            } else {
              window.location.href = "./interview-results";
            }
          }
        }));
      };
      reader.readAsDataURL(videoBlob);
    } else {
     
      console.log('Sending unified submission without video');
      console.log('Payload details (partial):', 
        JSON.stringify({
          ...basePayload,
          transcript_count: formattedTranscripts.length
        })
      );
      
      
      dispatch(submit_interview(basePayload, (resp) => {
        console.log("Submission response:", resp);
        
        if (status === "Completed") {
          console.log("Interview completed, redirecting...");
          if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
            window.location.href = "./studentDashboardScreening";
          } else {
            window.location.href = "./interview-results";
          }
        }
      }));
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      console.log(`Moving from question ${questionIndex} to question ${questionIndex + 1}`);
      
      // Save current transcript for this question before moving on
      if (currentTranscript) {
        console.log(`Saving transcript for question ${questionIndex} before moving to next:`, currentTranscript.substring(0, 50) + '...');
        setAllTranscripts(prev => ({
          ...prev,
          [questionIndex]: currentTranscript
        }));
      }
      
      stopRecording(false);
      setRecordedChunks([]);
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
      // Reset current transcript for the next question
      setCurrentTranscript('');
      setTranscriptResetTrigger(prev => prev + 1);
      startStreamAndRecording();
    }
  };

  const skipQuestion = () => {
    if (questionIndex < questions.length - 1) {
      console.log(`Skipping question ${questionIndex}`);
      
      // Save current transcript for this question before moving on
      if (currentTranscript) {
        console.log(`Saving transcript for skipped question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
        setAllTranscripts(prev => ({
          ...prev,
          [questionIndex]: currentTranscript
        }));
      }
      
      stopRecording(true);
      setRecordedChunks([]);
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
      // Reset current transcript for the next question
      setCurrentTranscript('');
      setTranscriptResetTrigger(prev => prev + 1);
      startStreamAndRecording();
    }
  };

  const confirmCancelInterview = () => {
    console.log('Cancelling interview');
    setInterviewCancelled(true);
    stopRecording();
    setTranscriptionActive(false);
    const videoElement = document.getElementById("vid");
    const stream = videoElement?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
    }
    setShowConfirmationPopup(false);
  };

  const confirmEndInterview = () => {
    console.log('Ending interview, preparing final submission');
    
    // Save the current transcript for the last question
    if (currentTranscript) {
      console.log(`Saving final transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
      setAllTranscripts(prev => ({
        ...prev,
        [questionIndex]: currentTranscript
      }));
    }
    
    setInterviewCompleted(true);
    stopRecording();
    setTranscriptionActive(false);
    
    const videoElement = document.getElementById("vid");
    const stream = videoElement?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
    }
    setShowConfirmationPopup(false);
  };

  function startStreamAndRecording() {
    setRecordedChunks([]); 
    
    console.log('Starting stream and recording...');
    
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        console.log('Media access granted!');
        setMicPermissionGranted(true);
        setPermissionError('');
        
        let videoElement = document.getElementById("vid");
        if (videoElement) {
          videoElement.srcObject = stream;
          
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
              console.log(`Received data chunk of size ${event.data.size} bytes`);
              setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
            }
          };
          
          mediaRecorder.onstop = function () {
            console.log('Media recorder stopped');
            console.log(`Total recorded chunks: ${recordedChunks.length}`);
            
            if (recordedChunks.length > 0) {
              const blob = new Blob(recordedChunks, { type: "video/mp4" });
              console.log(`Created video blob of size ${blob.size} bytes`);
              
              const url = URL.createObjectURL(blob);
              
              const a = document.createElement("a");
              a.href = url;
              a.download = "recorded-video.mp4";
              a.style.display = "none";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);

             
              setRecordedChunks([]);
            } else {
              console.warn('No recorded chunks available to process');
            }
          };
          
          mediaRecorder.start();
          console.log('Media recorder started');
          
          
          console.log('Activating transcription');
          setTranscriptionActive(true);
        } else {
          console.error('Video element not found');
        }
      })
      .catch(function (error) {
        console.error('Media permission error:', error);
        setMicPermissionGranted(false);
        setPermissionError(`Error: ${error.message}. Please grant microphone permissions.`);
      }); 
  }

  function stopRecording(skipped = false) {
    // Stop transcription first
    console.log('Stopping transcription');
    setTranscriptionActive(false);
    
    console.log(`Current recorded chunks: ${recordedChunks.length}`);
    
    if (mediaRecorder && mediaRecorder.state === "recording") {
      console.log('Stopping media recorder');
      mediaRecorder.stop();
      
      mediaRecorder.onstop = function () {
        console.log('Processing recording after stop');
        console.log(`Recorded chunks size: ${recordedChunks.length}`);
        
        if (recordedChunks.length === 0) {
          console.warn('No recorded chunks to process');
          
          // If it's the end of the interview, ensure we still submit all data
          if (interviewCompleted) {
            console.log('Interview completed but no video chunks - still submitting data');
            submitInterviewData(null, "Completed", skipped);
          }
          return;
        }
        
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        console.log(`Video blob created: ${blob.size} bytes`);
        
        // Send the combined data (transcript + video)
        const status = interviewCompleted ? "Completed" : "Inprogress";
        submitInterviewData(blob, status, skipped);
      };
    } else {
      console.warn("No active recording to stop.");
      
      // If it's the end of the interview, ensure we still submit all data
      if (interviewCompleted) {
        console.log('Interview completed but no active recording - still submitting data');
        submitInterviewData(null, "Completed", skipped);
      }
    }
  }
  
  
  const speakOut = (text) => {
    if (
      "speechSynthesis" in window &&
      isSpeakerOn &&
      !spokenQuestions.includes(text)
    ) {
      console.log(`Attempting to speak question: ${text.substring(0, 30)}...`);
      let allVoices = window.speechSynthesis.getVoices();
      
      if (!allVoices.length) {
       
        window.speechSynthesis.onvoiceschanged = function () {
          allVoices = window.speechSynthesis.getVoices();
          handleSpeak(text, allVoices);
        };
        window.speechSynthesis.getVoices(); 
      } else {
        handleSpeak(text, allVoices); 
      }
    }
  };
  
  const handleSpeak = (text, allVoices) => {
    console.log(`Available voices: ${allVoices.length}`);
    let femaleVoice = allVoices.find((voice) => voice.name === "Google हिन्दी" && voice.lang === "hi-IN");
  
   
    if (!femaleVoice) {
      femaleVoice = allVoices.find((voice) => voice.lang === "en-GB" && /female/i.test(voice.name));
    }
  
   
    if (!femaleVoice) {
      femaleVoice = allVoices.find((voice) => voice.name === "Tessa" && voice.lang === "en-US");
    }

    
    console.log('Selected voice:', femaleVoice ? femaleVoice.name : 'None');
  
    
    speak(text, femaleVoice || allVoices[0]);
  };
  
  const speak = (text, voice) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      utterance.voiceURI = voice.voiceURI;
    }
    window.speechSynthesis.speak(utterance);
    setSpokenQuestions((prev) => [...prev, text]);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (questionTimeLeft > 0) {
        setQuestionTimeLeft((prevTime) => prevTime - 1);
      } else {
        console.log('Question time expired, moving to next question');
        nextQuestion();
      }
      if (totalTimeLeft > 0) {
        setTotalTimeLeft((prevTime) => prevTime - 1);
      } else {
        console.log('Total interview time expired');
        stopRecording(false);
        setInterviewCompleted(true);
        
        const videoElement = document.getElementById("vid");
        const stream = videoElement?.srcObject;
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
      console.log('Component loaded, starting stream and recording');
      startStreamAndRecording();
    }
  }, [isLoading]);

  useEffect(() => {
    if (interviewCompleted) {
      console.log('Interview completed, setting redirect timer');
      const timer = setTimeout(() => {
        // Redirect handled by submit_interview
        console.log('Redirect timer expired');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [interviewCompleted]);

  
  let content;
  if (interviewCompleted) {
    content = <InterviewOver />;
  } else if (interviewCancelled) {
    content = <InterviewCancle />;
  } else {
    content = (
      <div className="active-interview">
        <WarningModel
          message={modalMessage}
          isVisible={isModalVisible}
          onClose={closeModal}
        />

        {/* timer progress bar */}
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

        <div className="p-[32px]">
          <div>
            {/* question */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center">
              <div className="text-lg font-bold">
                {questionIndex + 1}
                {". "}
                {questions[questionIndex]?.question}
              </div>
            </div>

            {/* Permission error message if any */}
            {permissionError && (
              <div style={{ 
                margin: '10px 0', 
                padding: '10px', 
                backgroundColor: '#fff3f3', 
                border: '1px solid #ffcaca',
                borderRadius: '4px',
                color: 'red' 
              }}>
                <p><strong>Permission Error:</strong> {permissionError}</p>
                <p>Please ensure you have granted camera and microphone permissions to use this application.</p>
              </div>
            )}

            {/* screens */}
            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="relative rounded-lg w-full md:w-2/3">
                  <img
                    src={image}
                    className="rounded-lg"
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
              <div className="w-full md:w-1/2">
                  <div className="relative flex justify-center items-center h-full">
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                      REC
                    </div>
                    <video
                      id="vid"
                      className="rounded-lg"
                      muted
                      autoPlay
                    ></video>
                  </div>
              </div>
            </div>

            {/* Live Transcription Component */}
            <PremiumSpeechTranscription
              isActive={transcriptionActive}
              onTranscriptUpdate={handleTranscriptUpdate}
              questionIndex={questionIndex}
              resetTranscription={transcriptResetTrigger}
            />
            
            {/* last row of question number and buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                onClick={handleFinishInterview}
                className="bg-red-500 text-white h-[45px] px-8 rounded-lg"
                >
                Finish Interview
                </button>
                <button
                    onClick={skipQuestion}
                    className="px-8 h-[45px] bg-gray-300 rounded-lg"
                  >
                    Skip
                </button>
                <button
                    onClick={nextQuestion}
                    style={{
                      cursor: "pointer",                           
                      borderRadius: "8px",
                      height: '45px',
                      background: linearGradientBackground,
                      color: textColor,
                      visibility:
                        questionIndex < questions?.length - 1
                          ? ""
                          : "hidden",
                    }}
                    className="text-secondary px-8"
                  >
                    Next Question
                </button>
              </div>
              <div className="text-xl font-bold">
                Question {questionIndex + 1} of {questions.length}
              </div>
            </div>
            
            {/* finish interview confirmation modal code */}
            {showConfirmationPopup && (
              <div className="fixed z-99999999999999999 inset-0 overflow-y-auto">
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
                        className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
      </div>
    );
  }

  return (
    <div className="interview-container">
      {questions?.length > 0 ? (
        <div className="interview-content">
          {content}
        </div>
      ) : (
        <div className="no-questions">No questions available</div>
      )}
    </div>
  );
}