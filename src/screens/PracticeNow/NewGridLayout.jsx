import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useNavigate, useLocation } from "react-router-dom";
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
import { toast } from "react-toastify";

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

export default function NewGridLayout({ questions, isLoading = true }) {
  // Added 'isLoading' prop with default value true
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Add useLocation to get the route state
  const dispatch = useDispatch();
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [transcriptionActive, setTranscriptionActive] = useState(false);
  const [transcriptResetTrigger, setTranscriptResetTrigger] = useState(0);
  const [micPermissionGranted, setMicPermissionGranted] = useState(null);
  const [permissionError, setPermissionError] = useState('');
  const [componentInitialized, setComponentInitialized] = useState(false);
  const [videoRecordingActive, setVideoRecordingActive] = useState(false);
  
  // Check if interview should start (from navigation state)
  const shouldStartInterview = location.state?.startInterview || false;
  const initialShowLoader = location.state?.showLoader || false;
  
  // State to control the environment setup loader
  const [showEnvironmentLoader, setShowEnvironmentLoader] = useState(initialShowLoader);
  
  // Store all transcripts throughout the interview
  const [allTranscripts, setAllTranscripts] = useState({});

  const { questionsList } = useSelector((state) => state?.data);
  
  // Enhanced loading state handling
  useEffect(() => {
    // Check if questions have been passed as props or are in redux
    if ((questions && questions.length > 0) || (questionsList?.questions?.length > 0)) {
      setIsQuestionsLoading(false);
    } else {
      setIsQuestionsLoading(true);
    }
  }, [questions, questionsList]);
  
  // Calculate total time only after questions are loaded
  const TOTAL_TIME = !isQuestionsLoading ? questions?.reduce((acc, q) => acc + q.duration, 0) : 0;
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(
    !isQuestionsLoading ? questions?.[0]?.duration : 0
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
  const [interviewStarted, setInterviewStarted] = useState(false);

  const maxWarnings = 3;

  // Added: Track when questions are loaded - responding to both questions array and parent isLoading prop
  useEffect(() => {
    if (questions && questions.length > 0) {
      setIsQuestionsLoading(false);
    } else {
      setIsQuestionsLoading(isLoading); // Use the parent loading state
    }
  }, [questions, isLoading]);

  // Only initialize when questions are loaded AND the user has clicked Submit
  useEffect(() => {
    if (!isQuestionsLoading && questions?.length > 0 && shouldStartInterview && !componentInitialized) {
      
      // Show the environment setup loader for 7 seconds before starting the interview
      if (showEnvironmentLoader) {
        // Add toast notification for "Preparing your interview..."
        toast.info("Preparing your interview...", {
          position: "top-center",
          autoClose: 7000, // Match the 7-second duration
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        
        const setupTimer = setTimeout(() => {
          console.log('Environment setup complete, starting interview...');
          
          // Initialize timer values 
          setQuestionTimeLeft(questions[0]?.duration || 0);
          setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);
          
          // Start recording
          startStreamAndRecording();
          setComponentInitialized(true);
          setInterviewStarted(true);
          
          // Hide the environment loader
          setShowEnvironmentLoader(false);
          
          // Add another toast for "Wait ... redirecting to Interview Section"
          toast.success("Wait ... redirecting to Interview Section", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          
        }, 7000); // 7 seconds delay to show the environment setup message
        
        return () => clearTimeout(setupTimer);
      } else {
        // If no loader needed, start immediately
        // Initialize timer values 
        setQuestionTimeLeft(questions[0]?.duration || 0);
        setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);
        
        // Start recording
        startStreamAndRecording();
        setComponentInitialized(true);
        setInterviewStarted(true);
      }
    }
  }, [isQuestionsLoading, questions, componentInitialized, shouldStartInterview, showEnvironmentLoader]);

  // Save current transcript to allTranscripts when it changes
  useEffect(() => {
    if (currentTranscript && questionIndex !== undefined) {
      // console.log(`Saving transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
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
    // console.log('Transcript updated from child component:', transcript.substring(0, 50) + '...');
    setCurrentTranscript(transcript);
  };

  // Modified function to submit all data in one payload
  const submitInterviewData = (videoBlob = null, status, skipped = false) => {
    console.log('Preparing unified submission payload');
    
    // Include the current transcript for the active question
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
    
    // Base payload that will be used for all submissions
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
    
    // If we have a video blob, add it to the payload
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
        
        // Complete payload with video
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
        
        // Dispatch the action with the complete payload
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
      // Send payload without video
      // console.log('Sending unified submission without video');
      // console.log('Payload details (partial):', 
      //   JSON.stringify({
      //     ...basePayload,
      //     transcript_count: formattedTranscripts.length
      //   })
      // );
      
      // Dispatch the action with just the base payload
      dispatch(submit_interview(basePayload, (resp) => {
        // console.log("Submission response:", resp);
        
        if (status === "Completed") {
          if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
            window.location.href = "./studentDashboardScreening";
          } else {
            window.location.href = "./interview-results";
          }
        }
      }));
    }
  };

  // OPTIMIZED: nextQuestion function to prevent buffering between questions
  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      
      // Save current transcript for this question before moving on
      if (currentTranscript) {
        // console.log(`Saving transcript for question ${questionIndex} before moving to next:`, currentTranscript.substring(0, 50) + '...');
        setAllTranscripts(prev => ({
          ...prev,
          [questionIndex]: currentTranscript
        }));
      }
      
      // IMPORTANT CHANGE: Instead of stopping and restarting recording,
      // we continue recording while changing questions to avoid buffering
      
      // Update question index and timer
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
      // Reset current transcript for the next question
      setCurrentTranscript('');
      
      // THIS IS THE KEY FIX: We don't change transcriptionActive, 
      // we just trigger a reset while keeping transcription active
      setTranscriptResetTrigger(prev => prev + 1);
      
      // No need to call stopRecording and startStreamAndRecording - those cause buffering
      // Just let the transcription continue with the new question
    }
  };

  // OPTIMIZED: skipQuestion function to prevent buffering between questions
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
      
      // FIXED: Don't create or submit video blob when skipping - this causes buffering
      // Just mark the question as skipped in the database
      submitInterviewData(null, "Inprogress", true);
      
      // Update question index and timer
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
      // Reset current transcript for the next question
      setCurrentTranscript('');
      
      // KEY FIX: Same as in nextQuestion - just toggle the reset trigger
      // without changing transcriptionActive state
      setTranscriptResetTrigger(prev => prev + 1);
      
      // Log that we're maintaining transcription
      console.log('Maintaining active transcription while skipping question');
      
      // No need to restart recording - just continue with current stream
    }
  };

  // Helper function to create a video blob from current chunks without stopping recorder
  const createCurrentVideoBlob = () => {
    if (recordedChunks.length > 0) {
      return new Blob(recordedChunks, { type: "video/mp4" });
    }
    return null;
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
    setRecordedChunks([]); // Reset the recordedChunks array here
    
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        setMicPermissionGranted(true);
        setPermissionError('');
        
        let videoElement = document.getElementById("vid");
        if (videoElement) {
          videoElement.srcObject = stream;
          
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
              // console.log(`Received data chunk of size ${event.data.size} bytes`);
              setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
            }
          };
          
          mediaRecorder.onstop = function () {
            // console.log('Media recorder stopped');
            // console.log(`Total recorded chunks: ${recordedChunks.length}`);
            
            if (recordedChunks.length > 0) {
              const blob = new Blob(recordedChunks, { type: "video/mp4" });
              // console.log(`Created video blob of size ${blob.size} bytes`);
              
              // Send the combined data (transcript + video)
              const status = interviewCompleted ? "Completed" : "Inprogress";
              submitInterviewData(blob, status, false);
            } else {
              console.warn('No recorded chunks available to process');
              
              // If it's the end of the interview, ensure we still submit all data
              if (interviewCompleted) {
                console.log('Interview completed but no video chunks - still submitting data');
                submitInterviewData(null, "Completed", false);
              }
            }
          };
          
          // Set a timeslice to capture data more frequently (every 1 second)
          mediaRecorder.start(1000);
          setVideoRecordingActive(true);
          
          // Start transcription after media recorder is started
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
    setTranscriptionActive(false);
    setVideoRecordingActive(false);
    
    console.log(`Current recorded chunks: ${recordedChunks.length}`);
    
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    } else {
      console.warn("No active recording to stop.");
      
      // If it's the end of the interview, ensure we still submit all data
      if (interviewCompleted) {
        console.log('Interview completed but no active recording - still submitting data');
        submitInterviewData(null, "Completed", skipped);
      }
    }
  }
  
  // Simplified speech function that works across browsers
  const speakOut = (text) => {
    if ("speechSynthesis" in window && isSpeakerOn && !spokenQuestions.includes(text)) {
      // console.log(`Speaking question: ${text.substring(0, 30)}...`);
      
      // Cancel any ongoing speech first (good practice)
      window.speechSynthesis.cancel();
      
      // Create and configure the utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
      
      // Track that we've spoken this question
      setSpokenQuestions(prev => [...prev, text]);
      
    } else {
      // console.log('Speech not attempted:', {
      //   synthAvailable: "speechSynthesis" in window,
      //   speakerOn: isSpeakerOn,
      //   alreadySpoken: spokenQuestions.includes(text)
      // });
      console.log();
    }
  };
  
  useEffect(() => {
    // Only start timer and speak question if questions are loaded AND interview has started
    if (!isQuestionsLoading && questions?.length > 0 && interviewStarted) {
      const interval = setInterval(() => {
        if (questionTimeLeft > 0) {
          setQuestionTimeLeft((prevTime) => prevTime - 1);
        } else {
          nextQuestion();
        }
        if (totalTimeLeft > 0) {
          setTotalTimeLeft((prevTime) => prevTime - 1);
        } else {
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
      
      // Speak the current question
      if (questions[questionIndex]?.question) {
        speakOut(questions[questionIndex].question);
      }
      
      return () => clearInterval(interval);
    }
  }, [questionTimeLeft, questionIndex, totalTimeLeft, isQuestionsLoading, questions, interviewStarted]);

  // Shared loading animation component with customizable message
  const LoadingAnimation = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6" 
      style={{
        backgroundImage: 'linear-gradient(rgba(27, 32, 43, 0.95), rgba(27, 32, 43, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px)',
        backgroundColor: '#1b202b',
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <h2 
        style={{ 
          color: '#4ecca3', 
          fontSize: '28px',
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        {message}
      </h2>
      
      {/* Loading animation dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: '#4ecca3',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0s'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: '#4ecca3',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0.2s'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          margin: '0 5px',
          borderRadius: '50%',
          backgroundColor: '#4ecca3',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: '0.4s'
        }}></div>
      </div>
      
      {/* Add keyframes for the bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
            } 
            40% { 
              transform: scale(1.0);
            }
          }
        `}
      </style>
    </div>
  );

  // Enhanced loading view
  const renderLoading = () => {
    // Show environment setup loader if needed - with the specific grid design
    if (showEnvironmentLoader && shouldStartInterview) {
      return <LoadingAnimation message="Setting up your interview environment... ✨↗️" />;
    }
    
    // If questions are loaded but interview hasn't started yet (no shouldStartInterview flag)
    if (!isQuestionsLoading && questions?.length > 0 && !shouldStartInterview) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
          <div className="mb-6">
            <img 
              src={image} 
              alt="Interview Ready" 
              className="w-32 h-32 object-contain mx-auto"
            />
          </div>
          <p className="text-xl font-medium text-center">Your interview is ready to begin</p>
          <p className="text-sm text-gray-500 mt-2 text-center mb-6">
            Please go back and click the Submit button on the system check page to start your interview.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: linearGradientBackground,
              color: textColor,
              padding: '10px 20px',
              borderRadius: '8px',
            }}
            className="font-medium"
          >
            Go Back
          </button>
        </div>
      );
    }
    
    // Regular loading state for questions loading
    return <LoadingAnimation message="Loading interview questions..." />;
  };

  // Render three different states with a single parent element
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
              animation: `progress-bar-animation ${questions?.[questionIndex]?.duration}s linear`,
              width: `${(questionTimeLeft / questions?.[questionIndex]?.duration) * 100}%`,
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
                {questions?.[questionIndex]?.question}
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
                Question {questionIndex + 1} of {questions?.length}
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

  // Modified return statement to show loader, waiting screen, or active interview
  return (
    <div className="interview-container">
      {isQuestionsLoading || !interviewStarted || showEnvironmentLoader ? (
        renderLoading()
      ) : (
        <div className="interview-content">
          {content}
        </div>
      )}
    </div>
  );
}
