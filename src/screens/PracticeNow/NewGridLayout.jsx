// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { submit_interview } from "../../redux/action";
// import { useDispatch, useSelector } from "react-redux";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import image from "../../assets/Interviewer.png";
// import InterviewOver from "./InterviewOver";
// import InterviewCancle from "./InterviewCancel";
// import { useDarkMode } from "./../../Dark";
// import './Practice.css';
// import GLOBAL_CONSTANTS from "../../../GlobalConstants";
// import WarningModel from "./WarningModel";
// import PremiumSpeechTranscription from './PremiumSpeechTranscription';
// import { toast } from "react-toastify";
// import axios from "axios";

// let mediaRecorder;

// // Enhanced axios interceptors for debugging
// axios.interceptors.request.use(request => {
//   if (request.url.includes('submit_answer')) {
//     // Request logging removed for clean code
//   }
//   return request;
// });

// axios.interceptors.response.use(
//   response => {
//     if (response.config.url.includes('submit_answer')) {
//       // Response logging removed for clean code
//     }
//     return response;
//   },
//   error => {
//     if (error.config?.url.includes('submit_answer')) {
//       // Error logging removed for clean code
//     }
//     return Promise.reject(error);
//   }
// );

// function formatTime(seconds) {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds - hrs * 3600) / 60);
//   const secs = seconds - hrs * 3600 - mins * 60;
//   return (
//     <div className="flex items-center gap-1">
//       {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`}
//     </div>
//   );
// }

// export default function NewGridLayout({ questions, isLoading = true }) {
//   // State management
//   const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [currentTranscript, setCurrentTranscript] = useState('');
//   const [transcriptionActive, setTranscriptionActive] = useState(false);
//   const [transcriptResetTrigger, setTranscriptResetTrigger] = useState(0);
//   const [micPermissionGranted, setMicPermissionGranted] = useState(null);
//   const [permissionError, setPermissionError] = useState('');
//   const [componentInitialized, setComponentInitialized] = useState(false);
//   const [videoRecordingActive, setVideoRecordingActive] = useState(false);

//   // Female voice state
//   const [femaleVoice, setFemaleVoice] = useState(null);
//   const [voicesLoaded, setVoicesLoaded] = useState(false);

//   // Check if interview should start (from navigation state)
//   const shouldStartInterview = location.state?.startInterview || false;
//   const initialShowLoader = location.state?.showLoader || false;

//   // State to control the environment setup loader
//   const [showEnvironmentLoader, setShowEnvironmentLoader] = useState(initialShowLoader);

//   // Store all transcripts throughout the interview
//   const [allTranscripts, setAllTranscripts] = useState({});

//   // Store all video chunks and skipped questions locally
//   const [localInterviewData, setLocalInterviewData] = useState({
//     transcripts: {},
//     videoChunks: [],
//     skippedQuestions: [],
//     completedQuestions: [],
//     interviewStartTime: null,
//     interviewEndTime: null
//   });

//   const { questionsList } = useSelector((state) => state?.data);

//   // Enhanced loading state handling
//   useEffect(() => {
//     if ((questions && questions.length > 0) || (questionsList?.questions?.length > 0)) {
//       setIsQuestionsLoading(false);
//     } else {
//       setIsQuestionsLoading(true);
//     }
//   }, [questions, questionsList]);

//   // Calculate total time only after questions are loaded
//   const TOTAL_TIME = !isQuestionsLoading ? questions?.reduce((acc, q) => acc + q.duration, 0) : 0;

//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questionTimeLeft, setQuestionTimeLeft] = useState(
//     !isQuestionsLoading ? questions?.[0]?.duration : 0
//   );
//   const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
//   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [interviewCancelled, setInterviewCancelled] = useState(false);
//   const [isSpeakerOn, setIsSpeakerOn] = useState(true);
//   const [spokenQuestions, setSpokenQuestions] = useState([]);

//   const { isDarkMode, colorTheme } = useDarkMode();

//   const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
//   const linearGradientBackground = isDarkMode
//     ? reduxColorTheme.dark.selectBackground
//     : reduxColorTheme.light.selectBackground;
//   const buttonTextColor = isDarkMode
//     ? reduxColorTheme.dark.textColor2
//     : reduxColorTheme.light.textColor2;

//   const backgroundColor = isDarkMode
//     ? reduxColorTheme.dark.foreground
//     : reduxColorTheme.light.foreground;

//   const textColor = isDarkMode
//     ? reduxColorTheme.dark.textColor3
//     : reduxColorTheme.light.textColor3;

//   const [warningCount, setWarningCount] = useState(0);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [interviewStarted, setInterviewStarted] = useState(false);

//   const maxWarnings = 3;

//   // Track when questions are loaded
//   useEffect(() => {
//     if (questions && questions.length > 0) {
//       setIsQuestionsLoading(false);
//     } else {
//       setIsQuestionsLoading(isLoading);
//     }
//   }, [questions, isLoading]);

//   // Enhanced Female Voice Selection Logic
//   useEffect(() => {
//     const selectConsistentFemaleVoice = () => {
//       const voices = window.speechSynthesis.getVoices();

//       if (voices.length === 0) {
//         return false; // Voices not loaded yet
//       }

//       // Enhanced female voice detection with more comprehensive names
//       const femaleVoices = voices.filter(voice => {
//         const name = voice.name.toLowerCase();
//         const lang = voice.lang.toLowerCase();

//         return (
//           lang.includes('en') && (
//             // Common female voice names
//             name.includes('female') ||
//             name.includes('woman') ||
//             // Specific female voice names by platform
//             name.includes('samantha') ||
//             name.includes('susan') ||
//             name.includes('karen') ||
//             name.includes('zira') ||
//             name.includes('hazel') ||
//             name.includes('aria') ||
//             name.includes('fiona') ||
//             name.includes('moira') ||
//             name.includes('tessa') ||
//             name.includes('serena') ||
//             name.includes('allison') ||
//             name.includes('ava') ||
//             name.includes('emma') ||
//             name.includes('olivia') ||
//             name.includes('sophia') ||
//             name.includes('sarah') ||
//             name.includes('nicole') ||
//             name.includes('victoria') ||
//             name.includes('melissa') ||
//             name.includes('linda') ||
//             name.includes('alice') ||
//             name.includes('anna') ||
//             name.includes('claire') ||
//             name.includes('diane') ||
//             name.includes('emily') ||
//             name.includes('grace') ||
//             name.includes('helen') ||
//             name.includes('jenny') ||
//             name.includes('kate') ||
//             name.includes('laura') ||
//             name.includes('maria') ||
//             name.includes('nancy') ||
//             name.includes('rachel') ||
//             // Platform-specific patterns
//             (name.includes('microsoft') && (name.includes('eva') || name.includes('helen'))) ||
//             (name.includes('google') && name.includes('female')) ||
//             (name.includes('apple') && name.includes('female'))
//           )
//         );
//       });

//       // Prioritize voices by quality and platform
//       let selectedVoice;
//       if (femaleVoices.length > 0) {
//         // Prefer premium/neural voices if available
//         const premiumFemaleVoices = femaleVoices.filter(v =>
//           v.name.toLowerCase().includes('premium') ||
//           v.name.toLowerCase().includes('neural') ||
//           v.name.toLowerCase().includes('enhanced')
//         );

//         selectedVoice = premiumFemaleVoices.length > 0 ? premiumFemaleVoices[0] : femaleVoices[0];
//       } else {
//         // Fallback: try to find any voice that might be female based on patterns
//         const possibleFemaleVoices = voices.filter(voice => {
//           const name = voice.name.toLowerCase();
//           const lang = voice.lang.toLowerCase();
//           return lang.includes('en') && !name.includes('male') && !name.includes('man');
//         });

//         selectedVoice = possibleFemaleVoices.length > 0 ? possibleFemaleVoices[0] :
//                       (voices.find(v => v.lang.includes('en')) || voices[0]);
//       }

//       if (selectedVoice) {
//         setFemaleVoice(selectedVoice);
//         setVoicesLoaded(true);
//         return true;
//       }

//       return false;
//     };

//     // Try to select voice immediately
//     const voiceReady = selectConsistentFemaleVoice();

//     if (!voiceReady) {
//       // Set up multiple attempts to load voices
//       const maxAttempts = 15;
//       let attempts = 0;

//       const tryLoadVoices = () => {
//         attempts++;

//         const success = selectConsistentFemaleVoice();
//         if (success) {
//           return;
//         }

//         if (attempts < maxAttempts) {
//           setTimeout(tryLoadVoices, 300);
//         } else {
//           // Force set voices loaded even if no female voice found
//           setVoicesLoaded(true);
//         }
//       };

//       // Listen for voices changed event
//       const handleVoicesChanged = () => {
//         selectConsistentFemaleVoice();
//       };

//       if (window.speechSynthesis.onvoiceschanged !== undefined) {
//         window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
//       }

//       setTimeout(tryLoadVoices, 100);

//       return () => {
//         if (window.speechSynthesis.onvoiceschanged !== undefined) {
//           window.speechSynthesis.onvoiceschanged = null;
//         }
//       };
//     }
//   }, []);

//   // Initialize local storage on interview start
//   useEffect(() => {
//     if (!isQuestionsLoading && questions?.length > 0 && shouldStartInterview && !componentInitialized) {

//       // Initialize local interview data
//       const initialData = {
//         transcripts: {},
//         videoChunks: [],
//         skippedQuestions: [],
//         completedQuestions: [],
//         interviewStartTime: new Date().toISOString(),
//         interviewEndTime: null,
//         interviewId: questionsList?.interview_id,
//         questions: questions.map(q => ({
//           id: q.id,
//           question: q.question,
//           category: q.category,
//           sub_category: q.sub_category,
//           tag: q.tag,
//           duration: q.duration
//         }))
//       };

//       setLocalInterviewData(initialData);

//       // Store in localStorage as backup
//       try {
//         localStorage.setItem('interviewData', JSON.stringify(initialData));
//       } catch (error) {

//       }

//       if (showEnvironmentLoader) {
//         toast.info("Preparing your interview...", {
//           position: "top-center",
//           autoClose: 7000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: false,
//           draggable: false,
//           progress: undefined,
//         });

//         const setupTimer = setTimeout(() => {
//           setQuestionTimeLeft(questions[0]?.duration || 0);
//           setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);

//           startStreamAndRecording();
//           setComponentInitialized(true);
//           setInterviewStarted(true);
//           setShowEnvironmentLoader(false);

//           toast.success("Wait ... redirecting to Interview Section", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//           });
//         }, 7000);

//         return () => clearTimeout(setupTimer);
//       } else {
//         setQuestionTimeLeft(questions[0]?.duration || 0);
//         setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);

//         startStreamAndRecording();
//         setComponentInitialized(true);
//         setInterviewStarted(true);
//       }
//     }
//   }, [isQuestionsLoading, questions, componentInitialized, shouldStartInterview, showEnvironmentLoader]);

//   // Function to store data locally instead of sending to backend
//   const storeDataLocally = (questionId, transcript, isSkipped = false) => {
//     const updatedData = {
//       ...localInterviewData,
//       transcripts: {
//         ...localInterviewData.transcripts,
//         [questionId]: {
//           question_id: questions[questionIndex]?.id,
//           question: questions[questionIndex]?.question,
//           transcript: transcript || '',
//           category: questions[questionIndex]?.category,
//           sub_category: questions[questionIndex]?.sub_category,
//           tag: questions[questionIndex]?.tag || "",
//           timestamp: new Date().toISOString(),
//           duration_spent: questions[questionIndex]?.duration - questionTimeLeft
//         }
//       }
//     };

//     if (isSkipped) {
//       updatedData.skippedQuestions.push({
//         question_id: questions[questionIndex]?.id,
//         question_index: questionIndex,
//         timestamp: new Date().toISOString()
//       });
//     } else {
//       updatedData.completedQuestions.push({
//         question_id: questions[questionIndex]?.id,
//         question_index: questionIndex,
//         timestamp: new Date().toISOString()
//       });
//     }

//     setLocalInterviewData(updatedData);

//     try {
//       localStorage.setItem('interviewData', JSON.stringify(updatedData));
//     } catch (error) {

//     }
//   };

//   // Function to store video chunks locally
//   const storeVideoChunksLocally = () => {
//     if (recordedChunks.length > 0) {
//       const updatedData = {
//         ...localInterviewData,
//         videoChunks: [...localInterviewData.videoChunks, ...recordedChunks]
//       };

//       setLocalInterviewData(updatedData);
//     }
//   };

//   // Save current transcript when it changes
//   useEffect(() => {
//     if (currentTranscript && questionIndex !== undefined) {
//       setAllTranscripts(prev => ({
//         ...prev,
//         [questionIndex]: currentTranscript
//       }));
//     }
//   }, [currentTranscript, questionIndex]);

//   // Check for microphone permissions early
//   useEffect(() => {
//     const checkMicPermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         stream.getTracks().forEach(track => track.stop());
//         setMicPermissionGranted(true);
//         setPermissionError('');
//       } catch (error) {
//         setMicPermissionGranted(false);
//         setPermissionError(`Error accessing microphone: ${error.message}`);
//       }
//     };

//     checkMicPermission();
//   }, []);

//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "hidden") {
//       const newWarningCount = warningCount + 1;
//       setWarningCount(newWarningCount);

//       if (newWarningCount < maxWarnings) {
//         setModalMessage(
//           `Warning ${newWarningCount}/${maxWarnings}: Please do not switch tabs or leave this window. Your interview will be terminated after ${
//           maxWarnings - newWarningCount
//           } more ${maxWarnings - newWarningCount <= 1 ? "warning" : "warnings"}.`
//         );
//         setModalVisible(true);
//       }

//       if (newWarningCount >= maxWarnings) {
//         setModalMessage(
//           "You have exceeded the maximum number of warnings. The interview is now terminated."
//         );
//         setModalVisible(true);
//         confirmCancelInterview();
//       }
//     }
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [warningCount]);

//   const handleFinishInterview = () => {
//     setShowConfirmationPopup(true);
//   };

//   const handleTranscriptUpdate = (transcript) => {
//     setCurrentTranscript(transcript);
//   };

//   // Final submission function - ONLY called when interview is completed
//   const submitFinalInterviewData = () => {
//     // Get final data from localStorage as backup
//     let finalData = localInterviewData;
//     try {
//       const storedData = localStorage.getItem('interviewData');
//       if (storedData) {
//         const parsedData = JSON.parse(storedData);
//         finalData = { ...finalData, ...parsedData };
//       }
//     } catch (error) {

//     }

//     // Include current transcript for the last question
//     if (currentTranscript) {
//       finalData.transcripts[questionIndex] = {
//         question_id: questions[questionIndex]?.id,
//         question: questions[questionIndex]?.question,
//         transcript: currentTranscript,
//         category: questions[questionIndex]?.category,
//         sub_category: questions[questionIndex]?.sub_category,
//         tag: questions[questionIndex]?.tag || "",
//         timestamp: new Date().toISOString(),
//         duration_spent: questions[questionIndex]?.duration - questionTimeLeft
//       };
//     }

//     // Set interview end time
//     finalData.interviewEndTime = new Date().toISOString();

//     // Format transcripts for backend
//     const formattedTranscripts = Object.values(finalData.transcripts);

//     // Create final video blob
//     let finalVideoBlob = null;
//     if (recordedChunks.length > 0) {
//       finalVideoBlob = new Blob(recordedChunks, { type: "video/mp4" });
//     }

//     // Prepare final payload
//     const finalPayload = {
//       interview_id: finalData.interviewId || questionsList?.interview_id,
//       status: "Completed",
//       transcripts: formattedTranscripts,
//       skipped_questions: finalData.skippedQuestions,
//       completed_questions: finalData.completedQuestions,
//       interview_start_time: finalData.interviewStartTime,
//       interview_end_time: finalData.interviewEndTime,
//       total_questions: questions.length,
//       total_duration: TOTAL_TIME,
//       actual_duration: TOTAL_TIME - totalTimeLeft
//     };

//     // Submit with or without video
//     if (finalVideoBlob) {
//       const reader = new FileReader();
//       reader.onloadend = function() {
//         let base64data = reader.result;

//         // Clean base64 data
//         const mimeRegex = /^data:.+;base64,/;
//         if (mimeRegex.test(base64data)) {
//           base64data = base64data.replace(mimeRegex, "");
//         }
//         while (base64data.length % 4 !== 0) {
//           base64data += "=";
//         }

//         const completePayload = {
//           ...finalPayload,
//           video: base64data
//         };

//         dispatch(submit_interview(completePayload, handleFinalSubmissionResponse));
//       };
//       reader.readAsDataURL(finalVideoBlob);
//     } else {
//       dispatch(submit_interview(finalPayload, handleFinalSubmissionResponse));
//     }

//     // Clear localStorage after submission
//     try {
//       localStorage.removeItem('interviewData');
//     } catch (error) {

//     }
//   };

//   // Handle final submission response
//   const handleFinalSubmissionResponse = (resp) => {
//     if (resp?.status) {
//       toast.success("Interview submitted successfully!", {
//         position: "top-center",
//         autoClose: 3000,
//       });

//       setTimeout(() => {
//         if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//           window.location.href = "./studentDashboardScreening";
//         } else {
//           window.location.href = "./interview-results";
//         }
//       }, 2000);
//     } else {
//       toast.error("Failed to submit interview. Please try again.", {
//         position: "top-center",
//         autoClose: 5000,
//       });
//     }
//   };

//   // nextQuestion - only stores data locally
//   const nextQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       // Store current question data locally
//       storeDataLocally(questionIndex, currentTranscript, false);
//       storeVideoChunksLocally();

//       // Update question index and timer
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);

//       // Reset current transcript for the next question
//       setCurrentTranscript('');
//       setTranscriptResetTrigger(prev => prev + 1);
//     } else {
//       // Last question completed
//       storeDataLocally(questionIndex, currentTranscript, false);
//       storeVideoChunksLocally();

//       // Auto-submit when all questions are done
//       submitFinalInterviewData();
//       setInterviewCompleted(true);
//       stopRecording();
//     }
//   };

//   // skipQuestion - only stores data locally
//   const skipQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       // Store skipped question data locally
//       storeDataLocally(questionIndex, currentTranscript, true);
//       storeVideoChunksLocally();

//       // Update question index and timer
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);

//       // Reset current transcript for the next question
//       setCurrentTranscript('');
//       setTranscriptResetTrigger(prev => prev + 1);
//     } else {
//       // Last question skipped
//       storeDataLocally(questionIndex, currentTranscript, true);
//       storeVideoChunksLocally();

//       // Auto-submit when all questions are done
//       submitFinalInterviewData();
//       setInterviewCompleted(true);
//       stopRecording();
//     }
//   };

//   const confirmCancelInterview = () => {
//     setInterviewCancelled(true);
//     stopRecording();
//     setTranscriptionActive(false);

//     // Clear localStorage on cancellation
//     try {
//       localStorage.removeItem('interviewData');
//     } catch (error) {
//     }

//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//     setShowConfirmationPopup(false);
//   };

//   const confirmEndInterview = () => {
//     // Store final question data locally
//     storeDataLocally(questionIndex, currentTranscript, false);
//     storeVideoChunksLocally();

//     // Submit all collected data
//     submitFinalInterviewData();

//     setInterviewCompleted(true);
//     stopRecording();
//     setTranscriptionActive(false);

//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//     setShowConfirmationPopup(false);
//   };

//   function startStreamAndRecording() {
//     setRecordedChunks([]);

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(function (stream) {
//         setMicPermissionGranted(true);
//         setPermissionError('');

//         let videoElement = document.getElementById("vid");
//         if (videoElement) {
//           videoElement.srcObject = stream;

//           mediaRecorder = new MediaRecorder(stream);
//           mediaRecorder.ondataavailable = function (event) {
//             if (event.data.size > 0) {
//               setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
//             }
//           };

//           mediaRecorder.onstop = function () {
//             // Recording stopped
//           };

//           // Continuous recording throughout the interview
//           mediaRecorder.start(1000); // 1 second timeslice
//           setVideoRecordingActive(true);

//           // Start transcription
//           setTranscriptionActive(true);
//         }
//       })
//       .catch(function (error) {
//         setMicPermissionGranted(false);
//         setPermissionError(`Error: ${error.message}. Please grant microphone permissions.`);
//       });
//   }

//   function stopRecording() {
//     setTranscriptionActive(false);
//     setVideoRecordingActive(false);

//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//     }
//   }

//   // Enhanced female voice speech function
//   const speakOut = (text) => {
//     if ("speechSynthesis" in window && isSpeakerOn && !spokenQuestions.includes(text)) {

//       // Cancel any ongoing speech first
//       window.speechSynthesis.cancel();

//       // Small delay to ensure cancellation is processed
//       setTimeout(() => {
//         // Create and configure the utterance
//         const utterance = new SpeechSynthesisUtterance(text);

//         // Apply the selected female voice for consistency
//         if (femaleVoice && voicesLoaded) {
//           utterance.voice = femaleVoice;
//         } else {
//           // Fallback: try to find a female voice on the fly
//           const voices = window.speechSynthesis.getVoices();
//           const femaleVoiceBackup = voices.find(voice => {
//             const name = voice.name.toLowerCase();
//             const lang = voice.lang.toLowerCase();
//             return lang.includes('en') && (
//               name.includes('female') ||
//               name.includes('woman') ||
//               name.includes('samantha') ||
//               name.includes('susan') ||
//               name.includes('zira') ||
//               name.includes('hazel')
//             );
//           });

//           if (femaleVoiceBackup) {
//             utterance.voice = femaleVoiceBackup;
//           }
//         }

//         // Enhanced feminine voice characteristics
//         utterance.pitch = 1.2;    // Higher pitch for more feminine sound
//         utterance.rate = 0.85;    // Slightly slower for clarity and elegance
//         utterance.volume = 0.8;   // Good volume level

//         // Error handling
//         utterance.onerror = (event) => {
//           // Error handled silently
//         };

//         utterance.onend = () => {
//           // Speech completed
//         };

//         utterance.onstart = () => {
//           // Speech started
//         };

//         // Speak the text with enhanced female voice
//         window.speechSynthesis.speak(utterance);

//         // Track that we've spoken this question
//         setSpokenQuestions(prev => [...prev, text]);

//       }, 150); // Small delay to ensure proper cancellation

//     }
//   };

//   // Timer logic - no backend calls, only local storage
//   useEffect(() => {
//     if (!isQuestionsLoading && questions?.length > 0 && interviewStarted && voicesLoaded) {

//       const interval = setInterval(() => {
//         if (questionTimeLeft > 0) {
//           setQuestionTimeLeft((prevTime) => prevTime - 1);
//         } else {
//           nextQuestion();
//         }

//         if (totalTimeLeft > 0) {
//           setTotalTimeLeft((prevTime) => prevTime - 1);
//         } else {
//           // Store final data locally
//           storeDataLocally(questionIndex, currentTranscript, false);
//           storeVideoChunksLocally();

//           // Submit all data
//           submitFinalInterviewData();

//           stopRecording();
//           setInterviewCompleted(true);

//           const videoElement = document.getElementById("vid");
//           const stream = videoElement?.srcObject;
//           if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach((track) => {
//               track.stop();
//             });
//             videoElement.srcObject = null;
//           }
//         }
//       }, 1000);

//       // Speak the current question with female voice
//       if (questions[questionIndex]?.question) {
//         speakOut(questions[questionIndex].question);
//       }

//       return () => clearInterval(interval);
//     }
//   }, [questionTimeLeft, questionIndex, totalTimeLeft, isQuestionsLoading, questions, interviewStarted, voicesLoaded]);

//   // Shared loading animation component
//   const LoadingAnimation = ({ message }) => (
//     <div className="flex flex-col items-center justify-center min-h-[400px] p-6"
//       style={{
//         backgroundImage: 'linear-gradient(rgba(27, 32, 43, 0.95), rgba(27, 32, 43, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px)',
//         backgroundColor: '#1b202b',
//         width: '100%',
//         height: '100%',
//         minHeight: '500px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column'
//       }}
//     >
//       <h2
//         style={{
//           color: '#4ecca3',
//           fontSize: '28px',
//           fontWeight: '500',
//           textAlign: 'center',
//           marginBottom: '20px'
//         }}
//       >
//         {message}
//       </h2>

//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '15px'
//       }}>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0s'
//         }}></div>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0.2s'
//         }}></div>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0.4s'
//         }}></div>
//       </div>

//       <style>
//         {`
//           @keyframes bounce {
//             0%, 80%, 100% {
//               transform: scale(0);
//             }
//             40% {
//               transform: scale(1.0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );

//   // Enhanced loading view
//   const renderLoading = () => {
//     if (showEnvironmentLoader && shouldStartInterview) {
//       return <LoadingAnimation message="Setting up your interview environment... ✨↗️" />;
//     }

//     if (!isQuestionsLoading && questions?.length > 0 && !shouldStartInterview) {
//       return (
//         <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
//           <div className="mb-6">
//             <img
//               src={image}
//               alt="Interview Ready"
//               className="w-32 h-32 object-contain mx-auto"
//             />
//           </div>
//           <p className="text-xl font-medium text-center">Your interview is ready to begin</p>
//           <p className="text-sm text-gray-500 mt-2 text-center mb-6">
//             Please go back and click the Submit button on the system check page to start your interview.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               backgroundColor: linearGradientBackground,
//               color: textColor,
//               padding: '10px 20px',
//               borderRadius: '8px',
//             }}
//             className="font-medium"
//           >
//             Go Back
//           </button>
//         </div>
//       );
//     }

//     return <LoadingAnimation message="Loading interview questions..." />;
//   };

//   // Debug component to show local storage status (for development)
//   // const DebugLocalStorage = () => {
//   //   if (process.env.NODE_ENV !== 'development') return null;

//   //   return (
//   //     <div style={{
//   //       position: 'fixed',
//   //       top: '10px',
//   //       right: '10px',
//   //       background: 'rgba(0,0,0,0.8)',
//   //       color: 'white',
//   //       padding: '10px',
//   //       borderRadius: '5px',
//   //       fontSize: '12px',
//   //       zIndex: 9999,
//   //       maxWidth: '300px'
//   //     }}>
//   //       <div>📊 Debug Info:</div>
//   //       <div>Transcripts: {Object.keys(localInterviewData.transcripts).length}</div>
//   //       <div>Video Chunks: {recordedChunks.length}</div>
//   //       <div>Completed: {localInterviewData.completedQuestions.length}</div>
//   //       <div>Skipped: {localInterviewData.skippedQuestions.length}</div>
//   //       <div>Current Q: {questionIndex + 1}/{questions?.length || 0}</div>
//   //       <div>Voice: {femaleVoice?.name || 'Loading...'}</div>
//   //     </div>
//   //   );
//   // };

//   // Main content render logic
//   let content;
//   if (interviewCompleted) {
//     content = <InterviewOver />;
//   } else if (interviewCancelled) {
//     content = <InterviewCancle />;
//   } else {
//     content = (
//       <div className="active-interview">
//         {/* <DebugLocalStorage /> */}

//         <WarningModel
//           message={modalMessage}
//           isVisible={isModalVisible}
//           onClose={closeModal}
//         />

//         {/* timer progress bar */}
//         <div className="bg-teal-100 h-[25px] progressBar relative">
//           <div
//             key={questionIndex}
//             className="bg-teal-500 h-[25px] progressFill"
//             style={{
//               animation: `progress-bar-animation ${questions?.[questionIndex]?.duration}s linear`,
//               width: `${(questionTimeLeft / questions?.[questionIndex]?.duration) * 100}%`,
//             }}
//           />
//           <span className="absolute inset-0 flex items-center justify-center text-black py-3 font-bold">
//             Time Left: {formatTime(questionTimeLeft)}
//           </span>
//         </div>
//         <div className="p-[32px]">
//           <div>
//             {/* question */}
//             <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center">
//               <div className="text-lg font-bold">
//                 {questionIndex + 1}
//                 {". "}
//                 {questions?.[questionIndex]?.question}
//               </div>
//             </div>

//             {/* Permission error message if any */}
//             {permissionError && (
//               <div style={{
//                 margin: '10px 0',
//                 padding: '10px',
//                 backgroundColor: '#fff3f3',
//                 border: '1px solid #ffcaca',
//                 borderRadius: '4px',
//                 color: 'red'
//               }}>
//                 <p><strong>Permission Error:</strong> {permissionError}</p>
//                 <p>Please ensure you have granted camera and microphone permissions to use this application.</p>
//               </div>
//             )}

//             {/* screens */}
//             <div className="flex flex-col md:flex-row gap-6 mt-8">
//               <div className="relative rounded-lg w-full md:w-2/3">
//                   <img
//                     src={image}
//                     className="rounded-lg"
//                     alt="User"
//                   />
//                   <div
//                     className="absolute top-2 right-2 cursor-pointer p-2 bg-white bg-opacity-0 rounded-full"
//                     onClick={() => setIsSpeakerOn(!isSpeakerOn)}
//                   >
//                     {isSpeakerOn ? (
//                       <VolumeUpIcon className="text-white text-2xl" />
//                     ) : (
//                       <VolumeOffIcon className="text-white text-2xl" />
//                     )}
//                   </div>
//               </div>
//               <div className="w-full md:w-1/2">
//                   <div className="relative flex justify-center items-center h-full">
//                     <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
//                       REC
//                     </div>
//                     <video
//                       id="vid"
//                       className="rounded-lg"
//                       muted
//                       autoPlay
//                     ></video>
//                   </div>
//               </div>
//             </div>

//             {/* Live Transcription Component */}
//             <PremiumSpeechTranscription
//               isActive={transcriptionActive}
//               onTranscriptUpdate={handleTranscriptUpdate}
//               questionIndex={questionIndex}
//               resetTranscription={transcriptResetTrigger}
//             />

//             {/* last row of question number and buttons */}
//             <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mt-8">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <button
//                 onClick={handleFinishInterview}
//                 className="bg-red-500 text-white h-[45px] px-8 rounded-lg"
//                 >
//                 Finish Interview
//                 </button>
//                 <button
//                     onClick={skipQuestion}
//                     className="px-8 h-[45px] bg-gray-300 rounded-lg"
//                   >
//                     Skip
//                 </button>
//                 <button
//                     onClick={nextQuestion}
//                     style={{
//                       cursor: "pointer",
//                       borderRadius: "8px",
//                       height: '45px',
//                       background: linearGradientBackground,
//                       color: textColor,
//                       visibility:
//                         questionIndex < questions?.length - 1
//                           ? ""
//                           : "hidden",
//                     }}
//                     className="text-secondary px-8"
//                   >
//                     Next Question
//                 </button>
//               </div>
//               <div className="text-xl font-bold">
//                 Question {questionIndex + 1} of {questions?.length}
//               </div>
//             </div>

//             {/* finish interview confirmation modal code */}
//             {showConfirmationPopup && (
//               <div className="fixed z-99999999999999999 inset-0 overflow-y-auto">
//                 <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                   <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                   </div>

//                   <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//                   <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="sm:flex sm:items-start">
//                         <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                           <h3 className="text-2xl leading-6 font-medium text-gray-900">
//                             Finish Interview
//                           </h3>
//                           <div className="mt-6">
//                             <p className="text-xl text-gray-500">
//                               Are you sure you want to end the interview? All your data will be submitted to the backend.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={confirmEndInterview}
//                       >
//                         Submit & Finish
//                       </button>
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                         onClick={() => setShowConfirmationPopup(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Modified return statement
//   return (
//     <div className="interview-container">
//       {isQuestionsLoading || !interviewStarted || showEnvironmentLoader ? (
//         renderLoading()
//       ) : (
//         <div className="interview-content">
//           {content}
//         </div>
//       )}
//     </div>
//   );
// }

//19 june
// import { useEffect, useState } from "react";
// import LinearProgress from "@mui/material/LinearProgress";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
// import { useNavigate, useLocation } from "react-router-dom";
// import { submit_interview } from "../../redux/action";
// import { useDispatch, useSelector } from "react-redux";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import MicIcon from "@mui/icons-material/Mic";
// import image from "../../assets/Interviewer.png";
// import InterviewOver from "./InterviewOver";
// import InterviewCancle from "./InterviewCancel";
// import { Step, StepLabel, Stepper } from "@mui/material";
// import { useDarkMode } from "./../../Dark";
// import "./Practice.css";
// import { Height } from "@mui/icons-material";
// import GLOBAL_CONSTANTS from "../../../GlobalConstants";
// import WarningModel from "./WarningModel";
// import PremiumSpeechTranscription from "./PremiumSpeechTranscription";
// import { toast } from "react-toastify";

// let mediaRecorder;

// function formatTime(seconds) {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds - hrs * 3600) / 60);
//   const secs = seconds - hrs * 3600 - mins * 60;
//   return (
//     <div className="flex items-center gap-1">
//       {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${
//         secs < 10 ? "0" + secs : secs
//       }`}
//     </div>
//   );
// }

// export default function NewGridLayout({ questions, isLoading = true }) {
//   // Added 'isLoading' prop with default value true
//   const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation(); // Add useLocation to get the route state
//   const dispatch = useDispatch();
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [currentTranscript, setCurrentTranscript] = useState("");
//   const [transcriptionActive, setTranscriptionActive] = useState(false);
//   const [transcriptResetTrigger, setTranscriptResetTrigger] = useState(0);
//   const [micPermissionGranted, setMicPermissionGranted] = useState(null);
//   const [permissionError, setPermissionError] = useState("");
//   const [componentInitialized, setComponentInitialized] = useState(false);

//   // Check if interview should start (from navigation state)
//   const shouldStartInterview = location.state?.startInterview || false;
//   const initialShowLoader = location.state?.showLoader || false;

//   // State to control the environment setup loader
//   const [showEnvironmentLoader, setShowEnvironmentLoader] =
//     useState(initialShowLoader);

//   // Store all transcripts throughout the interview
//   const [allTranscripts, setAllTranscripts] = useState({});

//   const { questionsList } = useSelector((state) => state?.data);

//   // Enhanced loading state handling
//   useEffect(() => {
//     // Check if questions have been passed as props or are in redux
//     if (
//       (questions && questions.length > 0) ||
//       questionsList?.questions?.length > 0
//     ) {
//       console.log("Questions available, ready for interview...");
//       setIsQuestionsLoading(false);
//     } else {
//       console.log("Waiting for questions to load...");
//       setIsQuestionsLoading(true);
//     }
//   }, [questions, questionsList]);

//   // Calculate total time only after questions are loaded
//   const TOTAL_TIME = !isQuestionsLoading
//     ? questions?.reduce((acc, q) => acc + q.duration, 0)
//     : 0;

//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questionTimeLeft, setQuestionTimeLeft] = useState(
//     !isQuestionsLoading ? questions?.[0]?.duration : 0
//   );
//   const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
//   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [interviewCancelled, setInterviewCancelled] = useState(false);
//   const [isSpeakerOn, setIsSpeakerOn] = useState(true);
//   const [spokenQuestions, setSpokenQuestions] = useState([]);

//   const { isDarkMode, colorTheme } = useDarkMode();

//   const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
//   const linearGradientBackground = isDarkMode
//     ? reduxColorTheme.dark.selectBackground
//     : reduxColorTheme.light.selectBackground;
//   const buttonTextColor = isDarkMode
//     ? reduxColorTheme.dark.textColor2
//     : reduxColorTheme.light.textColor2;

//   const backgroundColor = isDarkMode
//     ? reduxColorTheme.dark.foreground
//     : reduxColorTheme.light.foreground;

//   const textColor = isDarkMode
//     ? reduxColorTheme.dark.textColor3
//     : reduxColorTheme.light.textColor3;

//   const [warningCount, setWarningCount] = useState(0);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [interviewStarted, setInterviewStarted] = useState(false);

//   const maxWarnings = 3;

//   // Added: Track when questions are loaded - responding to both questions array and parent isLoading prop
//   useEffect(() => {
//     if (questions && questions.length > 0) {
//       console.log("Questions loaded successfully:", questions.length);
//       setIsQuestionsLoading(false);
//     } else {
//       console.log("Questions are still loading or empty");
//       setIsQuestionsLoading(isLoading); // Use the parent loading state
//     }
//   }, [questions, isLoading]);

//   // Only initialize when questions are loaded AND the user has clicked Submit
//   useEffect(() => {
//     if (
//       !isQuestionsLoading &&
//       questions?.length > 0 &&
//       shouldStartInterview &&
//       !componentInitialized
//     ) {
//       console.log("Starting interview based on user submit action");

//       // Show the environment setup loader for 7 seconds before starting the interview
//       if (showEnvironmentLoader) {
//         // Add toast notification for "Preparing your interview..."
//         toast.info("Preparing your interview...", {
//           position: "top-center",
//           autoClose: 7000, // Match the 7-second duration
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: false,
//           draggable: false,
//           progress: undefined,
//         });

//         const setupTimer = setTimeout(() => {
//           console.log("Environment setup complete, starting interview...");

//           // Initialize timer values
//           setQuestionTimeLeft(questions[0]?.duration || 0);
//           setTotalTimeLeft(
//             questions?.reduce((acc, q) => acc + q.duration, 0) || 0
//           );

//           // Start recording
//           startStreamAndRecording();
//           setComponentInitialized(true);
//           setInterviewStarted(true);

//           // Hide the environment loader
//           setShowEnvironmentLoader(false);

//           // Add another toast for "Wait ... redirecting to Interview Section"
//           toast.success("Wait ... redirecting to Interview Section", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//           });
//         }, 7000); // 7 seconds delay to show the environment setup message

//         return () => clearTimeout(setupTimer);
//       } else {
//         // If no loader needed, start immediately
//         // Initialize timer values
//         setQuestionTimeLeft(questions[0]?.duration || 0);
//         setTotalTimeLeft(
//           questions?.reduce((acc, q) => acc + q.duration, 0) || 0
//         );

//         // Start recording
//         startStreamAndRecording();
//         setComponentInitialized(true);
//         setInterviewStarted(true);
//       }
//     }
//   }, [
//     isQuestionsLoading,
//     questions,
//     componentInitialized,
//     shouldStartInterview,
//     showEnvironmentLoader,
//   ]);

//   // Save current transcript to allTranscripts when it changes
//   useEffect(() => {
//     if (currentTranscript && questionIndex !== undefined) {
//       console.log(
//         `Saving transcript for question ${questionIndex}:`,
//         currentTranscript.substring(0, 50) + "..."
//       );
//       setAllTranscripts((prev) => ({
//         ...prev,
//         [questionIndex]: currentTranscript,
//       }));
//     }
//   }, [currentTranscript, questionIndex]);

//   // Check for microphone permissions early
//   useEffect(() => {
//     // Try to get microphone permission
//     const checkMicPermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         // Stop the tracks immediately after checking
//         stream.getTracks().forEach((track) => track.stop());
//         setMicPermissionGranted(true);
//         setPermissionError("");
//         console.log("Microphone permission granted!");
//       } catch (error) {
//         console.error("Microphone permission error:", error);
//         setMicPermissionGranted(false);
//         setPermissionError(`Error accessing microphone: ${error.message}`);
//       }
//     };

//     checkMicPermission();
//   }, []);

//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "hidden") {
//       const newWarningCount = warningCount + 1;
//       setWarningCount(newWarningCount);

//       if (newWarningCount < maxWarnings) {
//         setModalMessage(
//           `Warning ${newWarningCount}/${maxWarnings}: Please do not switch tabs or leave this window. Your interview will be terminated after ${
//             maxWarnings - newWarningCount
//           } more ${
//             maxWarnings - newWarningCount <= 1 ? "warning" : "warnings"
//           }.`
//         );
//         setModalVisible(true);
//       }

//       if (newWarningCount >= maxWarnings) {
//         setModalMessage(
//           "You have exceeded the maximum number of warnings. The interview is now terminated."
//         );
//         setModalVisible(true);
//         confirmCancelInterview();
//       }
//     }
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [warningCount]);

//   const handleFinishInterview = () => {
//     setShowConfirmationPopup(true);
//   };

//   const handleTranscriptUpdate = (transcript) => {
//     console.log(
//       "Transcript updated from child component:",
//       transcript.substring(0, 50) + "..."
//     );
//     setCurrentTranscript(transcript);
//   };

//   // Modified function to submit all data in one payload
//   const submitInterviewData = (videoBlob = null, status, skipped = false) => {
//     console.log("Preparing unified submission payload");

//     // Include the current transcript for the active question
//     const finalTranscripts = {
//       ...allTranscripts,
//       [questionIndex]: currentTranscript,
//     };

//     console.log("All collected transcripts:", finalTranscripts);

//     const formattedTranscripts = Object.entries(finalTranscripts).map(
//       ([qIndex, transcript]) => ({
//         question_id: questions[parseInt(qIndex)]?.id,
//         question: questions[parseInt(qIndex)]?.question,
//         transcript: transcript || "",
//       })
//     );

//     console.log("Formatted transcripts for payload:", formattedTranscripts);

//     // Base payload that will be used for all submissions
//     const basePayload = {
//       interview_id: questionsList?.interview_id,
//       status: status,
//       transcripts: formattedTranscripts,
//       question: questions[questionIndex]?.question,
//       question_id: questions[questionIndex]?.id,
//       category: questions[questionIndex]?.category,
//       sub_category: questions[questionIndex]?.sub_category,
//       tag: questions[questionIndex]?.tag ? questions[questionIndex]?.tag : "",
//       skipped: skipped ? 1 : 0,
//     };

//     // If we have a video blob, add it to the payload
//     if (videoBlob) {
//       const reader = new FileReader();
//       reader.onloadend = function () {
//         let base64data = reader.result;
//         console.log(`Video converted to base64, length: ${base64data.length}`);

//         const mimeRegex = /^data:.+;base64,/;
//         if (mimeRegex.test(base64data)) {
//           base64data = base64data.replace(mimeRegex, "");
//         }
//         while (base64data.length % 4 !== 0) {
//           base64data += "=";
//         }

//         // Complete payload with video
//         const completePayload = {
//           ...basePayload,
//           video: base64data,
//         };

//         console.log("Sending unified submission to backend");
//         console.log(
//           "Payload details (partial):",
//           JSON.stringify({
//             ...basePayload,
//             video_size: base64data.length,
//             transcript_count: formattedTranscripts.length,
//           })
//         );

//         // Dispatch the action with the complete payload
//         dispatch(
//           submit_interview(completePayload, (resp) => {
//             console.log("Submission response:", resp);

//             if (status === "Completed") {
//               console.log("Interview completed, redirecting...");
//               if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//                 window.location.href = "./studentDashboardScreening";
//               } else {
//                 window.location.href = "./interview-results";
//               }
//             }
//           })
//         );
//       };
//       reader.readAsDataURL(videoBlob);
//     } else {
//       // Send payload without video
//       console.log("Sending unified submission without video");
//       console.log(
//         "Payload details (partial):",
//         JSON.stringify({
//           ...basePayload,
//           transcript_count: formattedTranscripts.length,
//         })
//       );

//       // Dispatch the action with just the base payload
//       dispatch(
//         submit_interview(basePayload, (resp) => {
//           console.log("Submission response:", resp);

//           if (status === "Completed") {
//             console.log("Interview completed, redirecting...");
//             if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//               window.location.href = "./studentDashboardScreening";
//             } else {
//               window.location.href = "./interview-results";
//             }
//           }
//         })
//       );
//     }
//   };

//   // const nextQuestion = () => {
//   //   if (questionIndex < questions.length - 1) {
//   //     console.log(`Moving from question ${questionIndex} to question ${questionIndex + 1}`);

//   //     // Save current transcript for this question before moving on
//   //     if (currentTranscript) {
//   //       console.log(`Saving transcript for question ${questionIndex} before moving to next:`, currentTranscript.substring(0, 50) + '...');
//   //       setAllTranscripts(prev => ({
//   //         ...prev,
//   //         [questionIndex]: currentTranscript
//   //       }));
//   //     }

//   //     stopRecording(false);
//   //     setRecordedChunks([]);
//   //     setQuestionIndex((prevIndex) => prevIndex + 1);
//   //     setQuestionTimeLeft(questions[questionIndex + 1].duration);

//   //     // Reset current transcript for the next question
//   //     setCurrentTranscript('');
//   //     setTranscriptResetTrigger(prev => prev + 1);
//   //     startStreamAndRecording();
//   //   }
//   // };

//   const nextQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       console.log(
//         `Moving from question ${questionIndex} to question ${questionIndex + 1}`
//       );

//       // Save current transcript for this question before moving on
//       if (currentTranscript) {
//         console.log(
//           `Saving transcript for question ${questionIndex} before moving to next:`,
//           currentTranscript.substring(0, 50) + "..."
//         );
//         setAllTranscripts((prev) => ({
//           ...prev,
//           [questionIndex]: currentTranscript,
//         }));
//       }

//       stopRecordingLocal(); // ✅ NO BACKEND CALL
//       setRecordedChunks([]);
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);

//       // Reset current transcript for the next question
//       setCurrentTranscript("");
//       setTranscriptResetTrigger((prev) => prev + 1);
//       startStreamAndRecording();
//     }
//   };
//   // const skipQuestion = () => {
//   //   if (questionIndex < questions.length - 1) {
//   //     console.log(`Skipping question ${questionIndex}`);

//   //     // Save current transcript for this question before moving on
//   //     if (currentTranscript) {
//   //       console.log(`Saving transcript for skipped question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
//   //       setAllTranscripts(prev => ({
//   //         ...prev,
//   //         [questionIndex]: currentTranscript
//   //       }));
//   //     }

//   //     stopRecording(true);
//   //     setRecordedChunks([]);
//   //     setQuestionIndex((prevIndex) => prevIndex + 1);
//   //     setQuestionTimeLeft(questions[questionIndex + 1].duration);

//   //     // Reset current transcript for the next question
//   //     setCurrentTranscript('');
//   //     setTranscriptResetTrigger(prev => prev + 1);
//   //     startStreamAndRecording();
//   //   }
//   // };

//   const skipQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       console.log(`Skipping question ${questionIndex}`);

//       // Save current transcript for this question before moving on
//       if (currentTranscript) {
//         console.log(
//           `Saving transcript for skipped question ${questionIndex}:`,
//           currentTranscript.substring(0, 50) + "..."
//         );
//         setAllTranscripts((prev) => ({
//           ...prev,
//           [questionIndex]: currentTranscript,
//         }));
//       }

//       stopRecordingLocal(); // ✅ NO BACKEND CALL
//       setRecordedChunks([]);
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);

//       // Reset current transcript for the next question
//       setCurrentTranscript("");
//       setTranscriptResetTrigger((prev) => prev + 1);
//       startStreamAndRecording();
//     }
//   };
//   const confirmCancelInterview = () => {
//     console.log("Cancelling interview");
//     setInterviewCancelled(true);
//     stopRecording();
//     setTranscriptionActive(false);
//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//     setShowConfirmationPopup(false);
//   };

//   // const confirmEndInterview = () => {
//   //   console.log('Ending interview, preparing final submission');

//   //   // Save the current transcript for the last question
//   //   if (currentTranscript) {
//   //     console.log(`Saving final transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
//   //     setAllTranscripts(prev => ({
//   //       ...prev,
//   //       [questionIndex]: currentTranscript
//   //     }));
//   //   }

//   //   setInterviewCompleted(true);
//   //   stopRecording();
//   //   setTranscriptionActive(false);

//   //   const videoElement = document.getElementById("vid");
//   //   const stream = videoElement?.srcObject;
//   //   if (stream) {
//   //     const tracks = stream.getTracks();
//   //     tracks.forEach((track) => {
//   //       track.stop();
//   //     });
//   //     videoElement.srcObject = null;
//   //   }
//   //   setShowConfirmationPopup(false);
//   // };

//   const confirmEndInterview = () => {
//     console.log("User manually ending interview");
//     handleFinalSubmission(); // ✅ SINGLE SUBMISSION
//     setShowConfirmationPopup(false);
//   };
//   function startStreamAndRecording() {
//     setRecordedChunks([]); // Reset the recordedChunks array here

//     console.log("Starting stream and recording...");

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(function (stream) {
//         console.log("Media access granted!");
//         setMicPermissionGranted(true);
//         setPermissionError("");

//         let videoElement = document.getElementById("vid");
//         if (videoElement) {
//           videoElement.srcObject = stream;

//           mediaRecorder = new MediaRecorder(stream);
//           mediaRecorder.ondataavailable = function (event) {
//             if (event.data.size > 0) {
//               console.log(
//                 `Received data chunk of size ${event.data.size} bytes`
//               );
//               setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
//             }
//           };

//           mediaRecorder.onstop = function () {
//             console.log("Media recorder stopped");
//             console.log(`Total recorded chunks: ${recordedChunks.length}`);

//             if (recordedChunks.length > 0) {
//               const blob = new Blob(recordedChunks, { type: "video/mp4" });
//               console.log(`Created video blob of size ${blob.size} bytes`);

//               const url = URL.createObjectURL(blob);
//               // Create a download link for the recorded video
//               const a = document.createElement("a");
//               a.href = url;
//               a.download = "recorded-video.mp4";
//               a.style.display = "none";
//               document.body.appendChild(a);
//               a.click();
//               document.body.removeChild(a);

//               // Clear the recordedChunks array
//               setRecordedChunks([]);
//             } else {
//               console.warn("No recorded chunks available to process");
//             }
//           };

//           mediaRecorder.start();
//           console.log("Media recorder started");

//           // Start transcription after media recorder is started
//           console.log("Activating transcription");
//           setTranscriptionActive(true);
//         } else {
//           console.error("Video element not found");
//         }
//       })
//       .catch(function (error) {
//         console.error("Media permission error:", error);
//         setMicPermissionGranted(false);
//         setPermissionError(
//           `Error: ${error.message}. Please grant microphone permissions.`
//         );
//       });
//   }

//   function stopRecording(skipped = false) {
//     // Stop transcription first
//     console.log("Stopping transcription");
//     setTranscriptionActive(false);

//     console.log(`Current recorded chunks: ${recordedChunks.length}`);

//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       console.log("Stopping media recorder");
//       mediaRecorder.stop();

//       mediaRecorder.onstop = function () {
//         console.log("Processing recording after stop");
//         console.log(`Recorded chunks size: ${recordedChunks.length}`);

//         if (recordedChunks.length === 0) {
//           console.warn("No recorded chunks to process");

//           // If it's the end of the interview, ensure we still submit all data
//           if (interviewCompleted) {
//             console.log(
//               "Interview completed but no video chunks - still submitting data"
//             );
//             submitInterviewData(null, "Completed", skipped);
//           }
//           return;
//         }

//         const blob = new Blob(recordedChunks, { type: "video/mp4" });
//         console.log(`Video blob created: ${blob.size} bytes`);

//         // Send the combined data (transcript + video)
//         const status = interviewCompleted ? "Completed" : "Inprogress";
//         submitInterviewData(blob, status, skipped);
//       };
//     } else {
//       console.warn("No active recording to stop.");

//       // If it's the end of the interview, ensure we still submit all data
//       if (interviewCompleted) {
//         console.log(
//           "Interview completed but no active recording - still submitting data"
//         );
//         submitInterviewData(null, "Completed", skipped);
//       }
//     }
//   }

//   // Simplified speech function that works across browsers
//   const speakOut = (text) => {
//     if (
//       "speechSynthesis" in window &&
//       isSpeakerOn &&
//       !spokenQuestions.includes(text)
//     ) {
//       console.log(`Speaking question: ${text.substring(0, 30)}...`);

//       // Cancel any ongoing speech first (good practice)
//       window.speechSynthesis.cancel();

//       // Create and configure the utterance
//       const utterance = new SpeechSynthesisUtterance(text);

//       // Speak the text
//       window.speechSynthesis.speak(utterance);

//       // Track that we've spoken this question
//       setSpokenQuestions((prev) => [...prev, text]);

//       console.log("Speech request sent");
//     } else {
//       console.log("Speech not attempted:", {
//         synthAvailable: "speechSynthesis" in window,
//         speakerOn: isSpeakerOn,
//         alreadySpoken: spokenQuestions.includes(text),
//       });
//     }
//   };

//   useEffect(() => {
//     // Only start timer and speak question if questions are loaded AND interview has started
//     if (!isQuestionsLoading && questions?.length > 0 && interviewStarted) {
//       const interval = setInterval(() => {
//         if (questionTimeLeft > 0) {
//           setQuestionTimeLeft((prevTime) => prevTime - 1);
//           // } else {
//           //   console.log('Question time expired, moving to next question');
//           //   nextQuestion();
//           // }
//         } else {
//           if (questionIndex < questions.length - 1) {
//             // Not the last question - just move to next
//             console.log("Question time expired, moving to next question");
//             nextQuestion();
//           } else {
//             // Last question - end interview and submit all data
//             console.log("Last question time expired - ending interview");
//             handleFinalSubmission();
//           }
//         }
//         if (totalTimeLeft > 0) {
//           setTotalTimeLeft((prevTime) => prevTime - 1);
//           // } else {
//           //   console.log("Total interview time expired");
//           //   stopRecording(false);
//           //   setInterviewCompleted(true);

//           //   const videoElement = document.getElementById("vid");
//           //   const stream = videoElement?.srcObject;
//           //   if (stream) {
//           //     const tracks = stream.getTracks();
//           //     tracks.forEach((track) => {
//           //       track.stop();
//           //     });
//           //     videoElement.srcObject = null;
//           //   }
//           // }
//         } else {
//           console.log("Total interview time expired");
//           handleFinalSubmission(); // ✅ SINGLE SUBMISSION
//         }
//       }, 1000);

//       // Speak the current question
//       if (questions[questionIndex]?.question) {
//         speakOut(questions[questionIndex].question);
//       }

//       return () => clearInterval(interval);
//     }
//   }, [
//     questionTimeLeft,
//     questionIndex,
//     totalTimeLeft,
//     isQuestionsLoading,
//     questions,
//     interviewStarted,
//   ]);

//   // Shared loading animation component with customizable message
//   const LoadingAnimation = ({ message }) => (
//     <div
//       className="flex flex-col items-center justify-center min-h-[400px] p-6"
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(27, 32, 43, 0.95), rgba(27, 32, 43, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px)",
//         backgroundColor: "#1b202b",
//         width: "100%",
//         height: "100%",
//         minHeight: "500px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <h2
//         style={{
//           color: "#4ecca3",
//           fontSize: "28px",
//           fontWeight: "500",
//           textAlign: "center",
//           marginBottom: "20px",
//         }}
//       >
//         {message}
//       </h2>

//       {/* Loading animation dots */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "15px",
//         }}
//       >
//         <div
//           style={{
//             width: "12px",
//             height: "12px",
//             margin: "0 5px",
//             borderRadius: "50%",
//             backgroundColor: "#4ecca3",
//             animation: "bounce 1.4s infinite ease-in-out both",
//             animationDelay: "0s",
//           }}
//         ></div>
//         <div
//           style={{
//             width: "12px",
//             height: "12px",
//             margin: "0 5px",
//             borderRadius: "50%",
//             backgroundColor: "#4ecca3",
//             animation: "bounce 1.4s infinite ease-in-out both",
//             animationDelay: "0.2s",
//           }}
//         ></div>
//         <div
//           style={{
//             width: "12px",
//             height: "12px",
//             margin: "0 5px",
//             borderRadius: "50%",
//             backgroundColor: "#4ecca3",
//             animation: "bounce 1.4s infinite ease-in-out both",
//             animationDelay: "0.4s",
//           }}
//         ></div>
//       </div>

//       {/* Add keyframes for the bounce animation */}
//       <style>
//         {`
//           @keyframes bounce {
//             0%, 80%, 100% { 
//               transform: scale(0);
//             } 
//             40% { 
//               transform: scale(1.0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );

//   // Enhanced loading view
//   const renderLoading = () => {
//     // Show environment setup loader if needed - with the specific grid design
//     if (showEnvironmentLoader && shouldStartInterview) {
//       return (
//         <LoadingAnimation message="Setting up your interview environment... ✨↗️" />
//       );
//     }

//     // If questions are loaded but interview hasn't started yet (no shouldStartInterview flag)
//     if (!isQuestionsLoading && questions?.length > 0 && !shouldStartInterview) {
//       return (
//         <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
//           <div className="mb-6">
//             <img
//               src={image}
//               alt="Interview Ready"
//               className="w-32 h-32 object-contain mx-auto"
//             />
//           </div>
//           <p className="text-xl font-medium text-center">
//             Your interview is ready to begin
//           </p>
//           <p className="text-sm text-gray-500 mt-2 text-center mb-6">
//             Please go back and click the Submit button on the system check page
//             to start your interview.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               backgroundColor: linearGradientBackground,
//               color: textColor,
//               padding: "10px 20px",
//               borderRadius: "8px",
//             }}
//             className="font-medium"
//           >
//             Go Back
//           </button>
//         </div>
//       );
//     }

//     // Regular loading state for questions loading
//     return <LoadingAnimation message="Loading interview questions..." />;
//   };
//   // ADD: Local stop function that doesn't call backend
//   function stopRecordingLocal() {
//     console.log("Stopping recording locally - no backend call");
//     setTranscriptionActive(false);

//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       console.log("Stopping media recorder locally");
//       mediaRecorder.stop();
//       // Don't process for backend submission
//     }
//   }

//   // ADD: Final submission handler
//   const handleFinalSubmission = () => {
//     console.log("Handling final submission of all interview data");

//     // Save the current transcript for the last question
//     if (currentTranscript) {
//       console.log(
//         `Saving final transcript for question ${questionIndex}:`,
//         currentTranscript.substring(0, 50) + "..."
//       );
//       setAllTranscripts((prev) => ({
//         ...prev,
//         [questionIndex]: currentTranscript,
//       }));
//     }

//     setInterviewCompleted(true);

//     // Stop recording and prepare final submission
//     stopRecordingWithFinalSubmission();

//     setTranscriptionActive(false);

//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//   };

//   // ADD: Final recording stop with submission
//   function stopRecordingWithFinalSubmission() {
//     console.log("Stopping recording and preparing final submission");
//     setTranscriptionActive(false);

//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();

//       mediaRecorder.onstop = function () {
//         console.log("Processing final recording and submitting all data");

//         if (recordedChunks.length > 0) {
//           const blob = new Blob(recordedChunks, { type: "video/mp4" });
//           console.log(`Final video blob created: ${blob.size} bytes`);

//           // Submit all data at once
//           submitFinalInterviewData(blob);
//         } else {
//           console.warn("No recorded chunks for final submission");
//           submitFinalInterviewData(null);
//         }
//       };
//     } else {
//       console.log("No active recording - submitting transcript data only");
//       submitFinalInterviewData(null);
//     }
//   }

//   // ADD: Final submission function (replaces multiple submitInterviewData calls)
//   // const submitFinalInterviewData = (finalVideoBlob = null) => {
//   //   console.log("=== FINAL SUBMISSION - SENDING ALL DATA TO BACKEND ===");

//   //   // Get all transcripts including the current one
//   //   const finalTranscripts = {
//   //     ...allTranscripts,
//   //     [questionIndex]: currentTranscript,
//   //   };

//   //   console.log(
//   //     "Final transcripts collected:",
//   //     Object.keys(finalTranscripts).length,
//   //     "questions"
//   //   );

//   //   // Format all transcripts for backend
//   //   const formattedTranscripts = Object.entries(finalTranscripts).map(
//   //     ([qIndex, transcript]) => ({
//   //       question_id: questions[parseInt(qIndex)]?.id,
//   //       question: questions[parseInt(qIndex)]?.question,
//   //       transcript: transcript || "",
//   //       question_index: parseInt(qIndex),
//   //     })
//   //   );

//   //   // Create comprehensive payload with ALL interview data
//   //   const finalPayload = {
//   //     interview_id: questionsList?.interview_id,
//   //     status: "Completed",
//   //     transcripts: formattedTranscripts,
//   //     total_questions: questions.length,
//   //     completed_questions: formattedTranscripts.length,
//   //     interview_duration: TOTAL_TIME - totalTimeLeft,
//   //     submission_type: "final_complete",
//   //   };

//   //   // Add video if available
//   //   if (finalVideoBlob) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = function () {
//   //       let base64data = reader.result;
//   //       console.log(
//   //         `Final video converted to base64, length: ${base64data.length}`
//   //       );

//   //       const mimeRegex = /^data:.+;base64,/;
//   //       if (mimeRegex.test(base64data)) {
//   //         base64data = base64data.replace(mimeRegex, "");
//   //       }
//   //       while (base64data.length % 4 !== 0) {
//   //         base64data += "=";
//   //       }

//   //       const completePayload = {
//   //         ...finalPayload,
//   //         video: base64data,
//   //         video_size: base64data.length,
//   //       };

//   //       console.log("=== SENDING COMPLETE PAYLOAD WITH VIDEO ===");

//   //       // SINGLE BACKEND CALL
//   //       dispatch(submit_interview(completePayload, handleSubmissionResponse));
//   //     };
//   //     reader.readAsDataURL(finalVideoBlob);
//   //   } else {
//   //     console.log("=== SENDING COMPLETE PAYLOAD WITHOUT VIDEO ===");

//   //     // SINGLE BACKEND CALL
//   //     dispatch(submit_interview(finalPayload, handleSubmissionResponse));
//   //   }
//   // };
//   // FIXED: Add the missing required fields to your payload

// const submitFinalInterviewData = (finalVideoBlob = null) => {
//   console.log('=== FINAL SUBMISSION - FIXED PAYLOAD ===');
  
//   // Get all transcripts including the current one
//   const finalTranscripts = {
//     ...allTranscripts,
//     [questionIndex]: currentTranscript
//   };
  
//   // Format all transcripts for backend
//   const formattedTranscripts = Object.entries(finalTranscripts).map(([qIndex, transcript]) => ({
//     question_id: questions[parseInt(qIndex)]?.id,
//     question: questions[parseInt(qIndex)]?.question,
//     transcript: transcript || '',
//     question_index: parseInt(qIndex)
//   }));
  
//   // FIXED: Get the current/last question for the required individual fields
//   const currentQuestion = questions?.[questionIndex] || questions?.[questions.length - 1];
  
//   if (!currentQuestion) {
//     console.error('ERROR: No current question found');
//     return;
//   }
  
//   // FIXED: Create payload with ALL required fields
//   const finalPayload = {
//     interview_id: questionsList?.interview_id,
//     status: "Completed",
    
//     // ✅ ADD: Required individual question fields (these were missing!)
//     question: currentQuestion.question || '',
//     question_id: currentQuestion.id || '',
//     category: currentQuestion.category || '',
//     sub_category: currentQuestion.sub_category || '',
//     tag: currentQuestion.tag || '',
//     skipped: 0,
    
//     // ✅ KEEP: Your existing fields
//     transcripts: formattedTranscripts,
//     total_questions: questions.length,
//     completed_questions: formattedTranscripts.length,
//     interview_duration: TOTAL_TIME - totalTimeLeft,
//     submission_type: "final_complete"
//   };
  
//   console.log('=== FIXED PAYLOAD WITH REQUIRED FIELDS ===');
//   console.log('Individual question fields:');
//   console.log('- question:', finalPayload.question);
//   console.log('- question_id:', finalPayload.question_id);
//   console.log('- category:', finalPayload.category);
//   console.log('- sub_category:', finalPayload.sub_category);
//   console.log('- tag:', finalPayload.tag);
//   console.log('- skipped:', finalPayload.skipped);
//   console.log('Complete payload:', JSON.stringify(finalPayload, null, 2));
  
//   // Add video if available
//   if (finalVideoBlob) {
//     const reader = new FileReader();
//     reader.onloadend = function() {
//       let base64data = reader.result;
//       console.log(`Final video converted to base64, length: ${base64data.length}`);
      
//       const mimeRegex = /^data:.+;base64,/;
//       if (mimeRegex.test(base64data)) {
//         base64data = base64data.replace(mimeRegex, "");
//       }
//       while (base64data.length % 4 !== 0) {
//         base64data += "=";
//       }
      
//       const completePayload = {
//         ...finalPayload,
//         video: base64data
//       };
      
//       console.log('=== SENDING PAYLOAD WITH VIDEO ===');
//       dispatch(submit_interview(completePayload, handleSubmissionResponse));
//     };
//     reader.readAsDataURL(finalVideoBlob);
//   } else {
//     console.log('=== SENDING PAYLOAD WITHOUT VIDEO ===');
//     dispatch(submit_interview(finalPayload, handleSubmissionResponse));
//   }
// };

// // ALTERNATIVE: If you want to send data for each question individually
// // (but still in one call), use this format:
// const submitFinalInterviewDataAlternative = (finalVideoBlob = null) => {
//   console.log('=== ALTERNATIVE: MULTIPLE QUESTIONS IN ONE CALL ===');
  
//   // Get all transcripts
//   const finalTranscripts = {
//     ...allTranscripts,
//     [questionIndex]: currentTranscript
//   };
  
//   // Create an array of complete question objects
//   const completeQuestions = Object.entries(finalTranscripts).map(([qIndex, transcript]) => {
//     const question = questions[parseInt(qIndex)];
//     return {
//       interview_id: questionsList?.interview_id,
//       status: "Completed",
//       question: question?.question || '',
//       question_id: question?.id || '',
//       category: question?.category || '',
//       sub_category: question?.sub_category || '',
//       tag: question?.tag || '',
//       transcript: transcript || '',
//       skipped: 0,
//       question_index: parseInt(qIndex)
//     };
//   });
  
//   // Send as an array of questions or as a wrapper object
//   const alternativePayload = {
//     interview_id: questionsList?.interview_id,
//     status: "Completed",
//     submission_type: "bulk_final",
//     questions: completeQuestions, // Array of complete question objects
//     total_questions: questions.length,
//     completed_questions: completeQuestions.length
//   };
  
//   console.log('Alternative payload:', JSON.stringify(alternativePayload, null, 2));
  
//   if (finalVideoBlob) {
//     // Add video processing...
//     const reader = new FileReader();
//     reader.onloadend = function() {
//       let base64data = reader.result;
//       const mimeRegex = /^data:.+;base64,/;
//       if (mimeRegex.test(base64data)) {
//         base64data = base64data.replace(mimeRegex, "");
//       }
//       while (base64data.length % 4 !== 0) {
//         base64data += "=";
//       }
      
//       const completePayload = {
//         ...alternativePayload,
//         video: base64data
//       };
      
//       dispatch(submit_interview(completePayload, handleSubmissionResponse));
//     };
//     reader.readAsDataURL(finalVideoBlob);
//   } else {
//     dispatch(submit_interview(alternativePayload, handleSubmissionResponse));
//   }
// };

// // SIMPLEST FIX: Just add the missing fields to your existing payload
// const submitFinalInterviewDataQuickFix = (finalVideoBlob = null) => {
//   // Get your existing payload structure
//   const finalTranscripts = {
//     ...allTranscripts,
//     [questionIndex]: currentTranscript
//   };
  
//   const formattedTranscripts = Object.entries(finalTranscripts).map(([qIndex, transcript]) => ({
//     question_id: questions[parseInt(qIndex)]?.id,
//     question: questions[parseInt(qIndex)]?.question,
//     transcript: transcript || '',
//     question_index: parseInt(qIndex)
//   }));
  
//   // Use the last answered question for the individual fields
//   const lastQuestion = questions?.[questionIndex] || questions?.[Math.max(0, questionIndex - 1)] || questions?.[0];
  
//   const finalPayload = {
//     // ✅ Your existing fields (keep these)
//     interview_id: questionsList?.interview_id,
//     status: "Completed", 
//     transcripts: formattedTranscripts,
//     completed_questions: formattedTranscripts.length,
//     interview_duration: TOTAL_TIME - totalTimeLeft,
//     total_questions: questions.length,
//     submission_type: "final_complete",
    
//     // ✅ ADD these missing required fields:
//     question: lastQuestion?.question || '',
//     question_id: lastQuestion?.id || '',
//     category: lastQuestion?.category || '',
//     sub_category: lastQuestion?.sub_category || '',
//     tag: lastQuestion?.tag || '',
//     skipped: 0
//   };
  
//   console.log('Quick fix payload:', finalPayload);
  
//   if (finalVideoBlob) {
//     const reader = new FileReader();
//     reader.onloadend = function() {
//       let base64data = reader.result;
//       const mimeRegex = /^data:.+;base64,/;
//       if (mimeRegex.test(base64data)) {
//         base64data = base64data.replace(mimeRegex, "");
//       }
//       while (base64data.length % 4 !== 0) {
//         base64data += "=";
//       }
      
//       dispatch(submit_interview({...finalPayload, video: base64data}, handleSubmissionResponse));
//     };
//     reader.readAsDataURL(finalVideoBlob);
//   } else {
//     dispatch(submit_interview(finalPayload, handleSubmissionResponse));
//   }
// };

//   // ADD: Handle submission response
//   const handleSubmissionResponse = (resp) => {
//     console.log("=== FINAL SUBMISSION RESPONSE ===", resp);

//     if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//       window.location.href = "./studentDashboardScreening";
//     } else {
//       window.location.href = "./interview-results";
//     }
//   };

//   // Render three different states with a single parent element
//   let content;
//   if (interviewCompleted) {
//     content = <InterviewOver />;
//   } else if (interviewCancelled) {
//     content = <InterviewCancle />;
//   } else {
//     content = (
//       <div className="active-interview">
//         <WarningModel
//           message={modalMessage}
//           isVisible={isModalVisible}
//           onClose={closeModal}
//         />

//         {/* timer progress bar */}
//         <div className="bg-teal-100 h-[25px] progressBar relative">
//           <div
//             key={questionIndex}
//             className="bg-teal-500 h-[25px] progressFill"
//             style={{
//               animation: `progress-bar-animation ${questions?.[questionIndex]?.duration}s linear`,
//               width: `${
//                 (questionTimeLeft / questions?.[questionIndex]?.duration) * 100
//               }%`,
//             }}
//           />
//           <span className="absolute inset-0 flex items-center justify-center text-black py-3 font-bold">
//             Time Left: {formatTime(questionTimeLeft)}
//           </span>
//         </div>

//         <div className="p-[32px]">
//           <div>
//             {/* question */}
//             <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center">
//               <div className="text-lg font-bold">
//                 {questionIndex + 1}
//                 {". "}
//                 {questions?.[questionIndex]?.question}
//               </div>
//             </div>

//             {/* Permission error message if any */}
//             {permissionError && (
//               <div
//                 style={{
//                   margin: "10px 0",
//                   padding: "10px",
//                   backgroundColor: "#fff3f3",
//                   border: "1px solid #ffcaca",
//                   borderRadius: "4px",
//                   color: "red",
//                 }}
//               >
//                 <p>
//                   <strong>Permission Error:</strong> {permissionError}
//                 </p>
//                 <p>
//                   Please ensure you have granted camera and microphone
//                   permissions to use this application.
//                 </p>
//               </div>
//             )}

//             {/* screens */}
//             <div className="flex flex-col md:flex-row gap-6 mt-8">
//               <div className="relative rounded-lg w-full md:w-2/3">
//                 <img src={image} className="rounded-lg" alt="User" />
//                 <div
//                   className="absolute top-2 right-2 cursor-pointer p-2 bg-white bg-opacity-0 rounded-full"
//                   onClick={() => setIsSpeakerOn(!isSpeakerOn)}
//                 >
//                   {isSpeakerOn ? (
//                     <VolumeUpIcon className="text-white text-2xl" />
//                   ) : (
//                     <VolumeOffIcon className="text-white text-2xl" />
//                   )}
//                 </div>
//               </div>
//               <div className="w-full md:w-1/2">
//                 <div className="relative flex justify-center items-center h-full">
//                   <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
//                     REC
//                   </div>
//                   <video id="vid" className="rounded-lg" muted autoPlay></video>
//                 </div>
//               </div>
//             </div>

//             {/* Live Transcription Component */}
//             <PremiumSpeechTranscription
//               isActive={transcriptionActive}
//               onTranscriptUpdate={handleTranscriptUpdate}
//               questionIndex={questionIndex}
//               resetTranscription={transcriptResetTrigger}
//             />

//             {/* last row of question number and buttons */}
//             <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mt-8">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <button
//                   onClick={handleFinishInterview}
//                   className="bg-red-500 text-white h-[45px] px-8 rounded-lg"
//                 >
//                   Finish Interview
//                 </button>
//                 <button
//                   onClick={skipQuestion}
//                   className="px-8 h-[45px] bg-gray-300 rounded-lg"
//                 >
//                   Skip
//                 </button>
//                 <button
//                   onClick={nextQuestion}
//                   style={{
//                     cursor: "pointer",
//                     borderRadius: "8px",
//                     height: "45px",
//                     background: linearGradientBackground,
//                     color: textColor,
//                     visibility:
//                       questionIndex < questions?.length - 1 ? "" : "hidden",
//                   }}
//                   className="text-secondary px-8"
//                 >
//                   Next Question
//                 </button>
//               </div>
//               <div className="text-xl font-bold">
//                 Question {questionIndex + 1} of {questions?.length}
//               </div>
//             </div>

//             {/* finish interview confirmation modal code */}
//             {showConfirmationPopup && (
//               <div className="fixed z-99999999999999999 inset-0 overflow-y-auto">
//                 <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                   <div
//                     className="fixed inset-0 transition-opacity"
//                     aria-hidden="true"
//                   >
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                   </div>

//                   <span
//                     className="hidden sm:inline-block sm:align-middle sm:h-screen"
//                     aria-hidden="true"
//                   >
//                     &#8203;
//                   </span>
//                   <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="sm:flex sm:items-start">
//                         <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                           <h3 className="text-2xl leading-6 font-medium text-gray-900">
//                             Finish Interview
//                           </h3>
//                           <div className="mt-6">
//                             <p className="text-xl text-gray-500">
//                               Are you sure you want to end the interview?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={confirmEndInterview}
//                       >
//                         Confirm
//                       </button>
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                         onClick={() => setShowConfirmationPopup(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Modified return statement to show loader, waiting screen, or active interview
//   return (
//     <div className="interview-container">
//       {isQuestionsLoading || !interviewStarted || showEnvironmentLoader ? (
//         renderLoading()
//       ) : (
//         <div className="interview-content">{content}</div>
//       )}
//     </div>
//   );
// }



//updatedtest
// import { useEffect, useState } from "react";
// import LinearProgress from "@mui/material/LinearProgress";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
// import { useNavigate, useLocation } from "react-router-dom";
// import { submit_interview } from "../../redux/action";
// import { useDispatch, useSelector } from "react-redux";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import MicIcon from "@mui/icons-material/Mic";
// import image from "../../assets/Interviewer.png";
// import InterviewOver from "./InterviewOver";
// import InterviewCancle from "./InterviewCancel";
// import { Step, StepLabel, Stepper } from '@mui/material';
// import { useDarkMode } from "./../../Dark";
// import './Practice.css';
// import { Height } from "@mui/icons-material";
// import GLOBAL_CONSTANTS from "../../../GlobalConstants";
// import WarningModel from "./WarningModel";
// import PremiumSpeechTranscription from './PremiumSpeechTranscription';
// import { toast } from "react-toastify";

// let mediaRecorder; 

// function formatTime(seconds) {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds - hrs * 3600) / 60);
//   const secs = seconds - hrs * 3600 - mins * 60;
//   return (
//     <div className="flex items-center gap-1">
//       {`${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`}
//     </div>
//   );
// }

// export default function NewGridLayout({ questions, isLoading = true }) {
//   // Added 'isLoading' prop with default value true
//   const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation(); // Add useLocation to get the route state
//   const dispatch = useDispatch();
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [currentTranscript, setCurrentTranscript] = useState('');
//   const [transcriptionActive, setTranscriptionActive] = useState(false);
//   const [transcriptResetTrigger, setTranscriptResetTrigger] = useState(0);
//   const [micPermissionGranted, setMicPermissionGranted] = useState(null);
//   const [permissionError, setPermissionError] = useState('');
//   const [componentInitialized, setComponentInitialized] = useState(false);
  
//   // Check if interview should start (from navigation state)
//   const shouldStartInterview = location.state?.startInterview || false;
//   const initialShowLoader = location.state?.showLoader || false;
  
//   // State to control the environment setup loader
//   const [showEnvironmentLoader, setShowEnvironmentLoader] = useState(initialShowLoader);
  
//   // Store all transcripts throughout the interview
//   const [allTranscripts, setAllTranscripts] = useState({});

//   const { questionsList } = useSelector((state) => state?.data);
  
//   // Enhanced loading state handling
//   useEffect(() => {
//     // Check if questions have been passed as props or are in redux
//     if ((questions && questions.length > 0) || (questionsList?.questions?.length > 0)) {
//       console.log("Questions available, ready for interview...");
//       setIsQuestionsLoading(false);
//     } else {
//       console.log("Waiting for questions to load...");
//       setIsQuestionsLoading(true);
//     }
//   }, [questions, questionsList]);
  
//   // Calculate total time only after questions are loaded
//   const TOTAL_TIME = !isQuestionsLoading ? questions?.reduce((acc, q) => acc + q.duration, 0) : 0;
  
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questionTimeLeft, setQuestionTimeLeft] = useState(
//     !isQuestionsLoading ? questions?.[0]?.duration : 0
//   );
//   const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);
//   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [interviewCancelled, setInterviewCancelled] = useState(false);
//   const [isSpeakerOn, setIsSpeakerOn] = useState(true);
//   const [spokenQuestions, setSpokenQuestions] = useState([]);

//   const { isDarkMode, colorTheme } = useDarkMode();

//   const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
//   const linearGradientBackground = isDarkMode
//     ? reduxColorTheme.dark.selectBackground
//     : reduxColorTheme.light.selectBackground;
//   const buttonTextColor = isDarkMode
//     ? reduxColorTheme.dark.textColor2
//     : reduxColorTheme.light.textColor2;

//   const backgroundColor = isDarkMode
//     ? reduxColorTheme.dark.foreground
//     : reduxColorTheme.light.foreground;

//   const textColor = isDarkMode
//     ? reduxColorTheme.dark.textColor3
//     : reduxColorTheme.light.textColor3;

//   const [warningCount, setWarningCount] = useState(0);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [interviewStarted, setInterviewStarted] = useState(false);

//   const maxWarnings = 3;

//   // Added: Track when questions are loaded - responding to both questions array and parent isLoading prop
//   useEffect(() => {
//     if (questions && questions.length > 0) {
//       console.log("Questions loaded successfully:", questions.length);
//       setIsQuestionsLoading(false);
//     } else {
//       console.log("Questions are still loading or empty");
//       setIsQuestionsLoading(isLoading); // Use the parent loading state
//     }
//   }, [questions, isLoading]);

//   // Only initialize when questions are loaded AND the user has clicked Submit
//   useEffect(() => {
//     if (!isQuestionsLoading && questions?.length > 0 && shouldStartInterview && !componentInitialized) {
//       console.log('Starting interview based on user submit action');
      
//       // Show the environment setup loader for 7 seconds before starting the interview
//       if (showEnvironmentLoader) {
//         // Add toast notification for "Preparing your interview..."
//         toast.info("Preparing your interview...", {
//           position: "top-center",
//           autoClose: 7000, // Match the 7-second duration
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: false,
//           draggable: false,
//           progress: undefined,
//         });
        
//         const setupTimer = setTimeout(() => {
//           console.log('Environment setup complete, starting interview...');
          
//           // Initialize timer values 
//           setQuestionTimeLeft(questions[0]?.duration || 0);
//           setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);
          
//           // Start recording
//           startStreamAndRecording();
//           setComponentInitialized(true);
//           setInterviewStarted(true);
          
//           // Hide the environment loader
//           setShowEnvironmentLoader(false);
          
//           // Add another toast for "Wait ... redirecting to Interview Section"
//           toast.success("Wait ... redirecting to Interview Section", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//           });
          
//         }, 7000); // 7 seconds delay to show the environment setup message
        
//         return () => clearTimeout(setupTimer);
//       } else {
//         // If no loader needed, start immediately
//         // Initialize timer values 
//         setQuestionTimeLeft(questions[0]?.duration || 0);
//         setTotalTimeLeft(questions?.reduce((acc, q) => acc + q.duration, 0) || 0);
        
//         // Start recording
//         startStreamAndRecording();
//         setComponentInitialized(true);
//         setInterviewStarted(true);
//       }
//     }
//   }, [isQuestionsLoading, questions, componentInitialized, shouldStartInterview, showEnvironmentLoader]);

//   // Save current transcript to allTranscripts when it changes
//   useEffect(() => {
//     if (currentTranscript && questionIndex !== undefined) {
//       console.log(`Saving transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
//       setAllTranscripts(prev => ({
//         ...prev,
//         [questionIndex]: currentTranscript
//       }));
//     }
//   }, [currentTranscript, questionIndex]);

//   // Check for microphone permissions early
//   useEffect(() => {
//     // Try to get microphone permission
//     const checkMicPermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         // Stop the tracks immediately after checking
//         stream.getTracks().forEach(track => track.stop());
//         setMicPermissionGranted(true);
//         setPermissionError('');
//         console.log('Microphone permission granted!');
//       } catch (error) {
//         console.error('Microphone permission error:', error);
//         setMicPermissionGranted(false);
//         setPermissionError(`Error accessing microphone: ${error.message}`);
//       }
//     };
    
//     checkMicPermission();
//   }, []);

//   const handleVisibilityChange = () => {
//     if (document.visibilityState === "hidden") {
//       const newWarningCount = warningCount + 1;
//       setWarningCount(newWarningCount);

//       if (newWarningCount < maxWarnings) {
//         setModalMessage(
//           `Warning ${newWarningCount}/${maxWarnings}: Please do not switch tabs or leave this window. Your interview will be terminated after ${
//           maxWarnings - newWarningCount
//           } more ${maxWarnings - newWarningCount <= 1 ? "warning" : "warnings"}.`
//         );
//         setModalVisible(true);
//       }

//       if (newWarningCount >= maxWarnings) {
//         setModalMessage(
//           "You have exceeded the maximum number of warnings. The interview is now terminated."
//         );
//         setModalVisible(true);
//         confirmCancelInterview();
//       }
//     }
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   useEffect(() => {
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [warningCount]);

//   const handleFinishInterview = () => {
//     setShowConfirmationPopup(true);
//   };

//   const handleTranscriptUpdate = (transcript) => {
//     console.log('Transcript updated from child component:', transcript.substring(0, 50) + '...');
//     setCurrentTranscript(transcript);
//   };

//   // Modified function to submit all data in one payload
//   const submitInterviewData = (videoBlob = null, status, skipped = false) => {
//     console.log('Preparing unified submission payload');
    
//     // Include the current transcript for the active question
//     const finalTranscripts = {
//       ...allTranscripts,
//       [questionIndex]: currentTranscript
//     };
    
//     console.log('All collected transcripts:', finalTranscripts);
    
//     const formattedTranscripts = Object.entries(finalTranscripts).map(([qIndex, transcript]) => ({
//       question_id: questions[parseInt(qIndex)]?.id,
//       question: questions[parseInt(qIndex)]?.question,
//       transcript: transcript || ''
//     }));
    
//     console.log('Formatted transcripts for payload:', formattedTranscripts);
    
//     // Base payload that will be used for all submissions
//     const basePayload = {
//       interview_id: questionsList?.interview_id,
//       status: status,
//       transcripts: formattedTranscripts,
//       question: questions[questionIndex]?.question,
//       question_id: questions[questionIndex]?.id,
//       category: questions[questionIndex]?.category,
//       sub_category: questions[questionIndex]?.sub_category,
//       tag: questions[questionIndex]?.tag ? questions[questionIndex]?.tag : "",
//       skipped: skipped ? 1 : 0
//     };
    
//     // If we have a video blob, add it to the payload
//     if (videoBlob) {
//       const reader = new FileReader();
//       reader.onloadend = function() {
//         let base64data = reader.result;
//         console.log(`Video converted to base64, length: ${base64data.length}`);
        
//         const mimeRegex = /^data:.+;base64,/;
//         if (mimeRegex.test(base64data)) {
//           base64data = base64data.replace(mimeRegex, "");
//         }
//         while (base64data.length % 4 !== 0) {
//           base64data += "=";
//         }
        
//         // Complete payload with video
//         const completePayload = {
//           ...basePayload,
//           video: base64data
//         };
        
//         console.log('Sending unified submission to backend');
//         console.log('Payload details (partial):', 
//           JSON.stringify({
//             ...basePayload,
//             video_size: base64data.length,
//             transcript_count: formattedTranscripts.length
//           })
//         );
        
//         // Dispatch the action with the complete payload
//         dispatch(submit_interview(completePayload, (resp) => {
//           console.log("Submission response:", resp);
          
//           if (status === "Completed") {
//             console.log("Interview completed, redirecting...");
//             if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//               window.location.href = "./studentDashboardScreening";
//             } else {
//               window.location.href = "./interview-results";
//             }
//           }
//         }));
//       };
//       reader.readAsDataURL(videoBlob);
//     } else {
//       // Send payload without video
//       console.log('Sending unified submission without video');
//       console.log('Payload details (partial):', 
//         JSON.stringify({
//           ...basePayload,
//           transcript_count: formattedTranscripts.length
//         })
//       );
      
//       // Dispatch the action with just the base payload
//       dispatch(submit_interview(basePayload, (resp) => {
//         console.log("Submission response:", resp);
        
//         if (status === "Completed") {
//           console.log("Interview completed, redirecting...");
//           if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
//             window.location.href = "./studentDashboardScreening";
//           } else {
//             window.location.href = "./interview-results";
//           }
//         }
//       }));
//     }
//   };

//   const nextQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       console.log(`Moving from question ${questionIndex} to question ${questionIndex + 1}`);
      
//       // Save current transcript for this question before moving on
//       if (currentTranscript) {
//         console.log(`Saving transcript for question ${questionIndex} before moving to next:`, currentTranscript.substring(0, 50) + '...');
//         setAllTranscripts(prev => ({
//           ...prev,
//           [questionIndex]: currentTranscript
//         }));
//       }
      
//       stopRecording(false);
//       setRecordedChunks([]);
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
//       // Reset current transcript for the next question
//       setCurrentTranscript('');
//       setTranscriptResetTrigger(prev => prev + 1);
//       startStreamAndRecording();
//     }
//   };

//   const skipQuestion = () => {
//     if (questionIndex < questions.length - 1) {
//       console.log(`Skipping question ${questionIndex}`);
      
//       // Save current transcript for this question before moving on
//       if (currentTranscript) {
//         console.log(`Saving transcript for skipped question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
//         setAllTranscripts(prev => ({
//           ...prev,
//           [questionIndex]: currentTranscript
//         }));
//       }
      
//       stopRecording(true);
//       setRecordedChunks([]);
//       setQuestionIndex((prevIndex) => prevIndex + 1);
//       setQuestionTimeLeft(questions[questionIndex + 1].duration);
      
//       // Reset current transcript for the next question
//       setCurrentTranscript('');
//       setTranscriptResetTrigger(prev => prev + 1);
//       startStreamAndRecording();
//     }
//   };

//   const confirmCancelInterview = () => {
//     console.log('Cancelling interview');
//     setInterviewCancelled(true);
//     stopRecording();
//     setTranscriptionActive(false);
//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//     setShowConfirmationPopup(false);
//   };

//   const confirmEndInterview = () => {
//     console.log('Ending interview, preparing final submission');
    
//     // Save the current transcript for the last question
//     if (currentTranscript) {
//       console.log(`Saving final transcript for question ${questionIndex}:`, currentTranscript.substring(0, 50) + '...');
//       setAllTranscripts(prev => ({
//         ...prev,
//         [questionIndex]: currentTranscript
//       }));
//     }
    
//     setInterviewCompleted(true);
//     stopRecording();
//     setTranscriptionActive(false);
    
//     const videoElement = document.getElementById("vid");
//     const stream = videoElement?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => {
//         track.stop();
//       });
//       videoElement.srcObject = null;
//     }
//     setShowConfirmationPopup(false);
//   };

//   function startStreamAndRecording() {
//     setRecordedChunks([]); // Reset the recordedChunks array here
    
//     console.log('Starting stream and recording...');
    
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(function (stream) {
//         console.log('Media access granted!');
//         setMicPermissionGranted(true);
//         setPermissionError('');
        
//         let videoElement = document.getElementById("vid");
//         if (videoElement) {
//           videoElement.srcObject = stream;
          
//           mediaRecorder = new MediaRecorder(stream);
//           mediaRecorder.ondataavailable = function (event) {
//             if (event.data.size > 0) {
//               console.log(`Received data chunk of size ${event.data.size} bytes`);
//               setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
//             }
//           };
          
//           mediaRecorder.onstop = function () {
//             console.log('Media recorder stopped');
//             console.log(`Total recorded chunks: ${recordedChunks.length}`);
            
//             if (recordedChunks.length > 0) {
//               const blob = new Blob(recordedChunks, { type: "video/mp4" });
//               console.log(`Created video blob of size ${blob.size} bytes`);
              
//               const url = URL.createObjectURL(blob);
//               // Create a download link for the recorded video
//               const a = document.createElement("a");
//               a.href = url;
//               a.download = "recorded-video.mp4";
//               a.style.display = "none";
//               document.body.appendChild(a);
//               a.click();
//               document.body.removeChild(a);

//               // Clear the recordedChunks array
//               setRecordedChunks([]);
//             } else {
//               console.warn('No recorded chunks available to process');
//             }
//           };
          
//           mediaRecorder.start();
//           console.log('Media recorder started');
          
//           // Start transcription after media recorder is started
//           console.log('Activating transcription');
//           setTranscriptionActive(true);
//         } else {
//           console.error('Video element not found');
//         }
//       })
//       .catch(function (error) {
//         console.error('Media permission error:', error);
//         setMicPermissionGranted(false);
//         setPermissionError(`Error: ${error.message}. Please grant microphone permissions.`);
//       }); 
//   }

//   function stopRecording(skipped = false) {
//     // Stop transcription first
//     console.log('Stopping transcription');
//     setTranscriptionActive(false);
    
//     console.log(`Current recorded chunks: ${recordedChunks.length}`);
    
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       console.log('Stopping media recorder');
//       mediaRecorder.stop();
      
//       mediaRecorder.onstop = function () {
//         console.log('Processing recording after stop');
//         console.log(`Recorded chunks size: ${recordedChunks.length}`);
        
//         if (recordedChunks.length === 0) {
//           console.warn('No recorded chunks to process');
          
//           // If it's the end of the interview, ensure we still submit all data
//           if (interviewCompleted) {
//             console.log('Interview completed but no video chunks - still submitting data');
//             submitInterviewData(null, "Completed", skipped);
//           }
//           return;
//         }
        
//         const blob = new Blob(recordedChunks, { type: "video/mp4" });
//         console.log(`Video blob created: ${blob.size} bytes`);
        
//         // Send the combined data (transcript + video)
//         const status = interviewCompleted ? "Completed" : "Inprogress";
//         submitInterviewData(blob, status, skipped);
//       };
//     } else {
//       console.warn("No active recording to stop.");
      
//       // If it's the end of the interview, ensure we still submit all data
//       if (interviewCompleted) {
//         console.log('Interview completed but no active recording - still submitting data');
//         submitInterviewData(null, "Completed", skipped);
//       }
//     }
//   }
  
//   // Simplified speech function that works across browsers
//   const speakOut = (text) => {
//     if ("speechSynthesis" in window && isSpeakerOn && !spokenQuestions.includes(text)) {
//       console.log(`Speaking question: ${text.substring(0, 30)}...`);
      
//       // Cancel any ongoing speech first (good practice)
//       window.speechSynthesis.cancel();
      
//       // Create and configure the utterance
//       const utterance = new SpeechSynthesisUtterance(text);
      
//       // Speak the text
//       window.speechSynthesis.speak(utterance);
      
//       // Track that we've spoken this question
//       setSpokenQuestions(prev => [...prev, text]);
      
//       console.log('Speech request sent');
//     } else {
//       console.log('Speech not attempted:', {
//         synthAvailable: "speechSynthesis" in window,
//         speakerOn: isSpeakerOn,
//         alreadySpoken: spokenQuestions.includes(text)
//       });
//     }
//   };
  
//   useEffect(() => {
//     // Only start timer and speak question if questions are loaded AND interview has started
//     if (!isQuestionsLoading && questions?.length > 0 && interviewStarted) {
//       const interval = setInterval(() => {
//         if (questionTimeLeft > 0) {
//           setQuestionTimeLeft((prevTime) => prevTime - 1);
//         } else {
//           console.log('Question time expired, moving to next question');
//           nextQuestion();
//         }
//         if (totalTimeLeft > 0) {
//           setTotalTimeLeft((prevTime) => prevTime - 1);
//         } else {
//           console.log('Total interview time expired');
//           stopRecording(false);
//           setInterviewCompleted(true);
          
//           const videoElement = document.getElementById("vid");
//           const stream = videoElement?.srcObject;
//           if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach((track) => {
//               track.stop();
//             });
//             videoElement.srcObject = null;
//           }
//         }
//       }, 1000);
      
//       // Speak the current question
//       if (questions[questionIndex]?.question) {
//         speakOut(questions[questionIndex].question);
//       }
      
//       return () => clearInterval(interval);
//     }
//   }, [questionTimeLeft, questionIndex, totalTimeLeft, isQuestionsLoading, questions, interviewStarted]);

//   // Shared loading animation component with customizable message
//   const LoadingAnimation = ({ message }) => (
//     <div className="flex flex-col items-center justify-center min-h-[400px] p-6" 
//       style={{
//         backgroundImage: 'linear-gradient(rgba(27, 32, 43, 0.95), rgba(27, 32, 43, 0.95)), repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(71, 71, 71, 0.1) 50px, rgba(71, 71, 71, 0.1) 50px)',
//         backgroundColor: '#1b202b',
//         width: '100%',
//         height: '100%',
//         minHeight: '500px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column'
//       }}
//     >
//       <h2 
//         style={{ 
//           color: '#4ecca3', 
//           fontSize: '28px',
//           fontWeight: '500',
//           textAlign: 'center',
//           marginBottom: '20px'
//         }}
//       >
//         {message}
//       </h2>
      
//       {/* Loading animation dots */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '15px'
//       }}>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0s'
//         }}></div>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0.2s'
//         }}></div>
//         <div style={{
//           width: '12px',
//           height: '12px',
//           margin: '0 5px',
//           borderRadius: '50%',
//           backgroundColor: '#4ecca3',
//           animation: 'bounce 1.4s infinite ease-in-out both',
//           animationDelay: '0.4s'
//         }}></div>
//       </div>
      
//       {/* Add keyframes for the bounce animation */}
//       <style>
//         {`
//           @keyframes bounce {
//             0%, 80%, 100% { 
//               transform: scale(0);
//             } 
//             40% { 
//               transform: scale(1.0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );

//   // Enhanced loading view
//   const renderLoading = () => {
//     // Show environment setup loader if needed - with the specific grid design
//     if (showEnvironmentLoader && shouldStartInterview) {
//       return <LoadingAnimation message="Setting up your interview environment... ✨↗️" />;
//     }
    
//     // If questions are loaded but interview hasn't started yet (no shouldStartInterview flag)
//     if (!isQuestionsLoading && questions?.length > 0 && !shouldStartInterview) {
//       return (
//         <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
//           <div className="mb-6">
//             <img 
//               src={image} 
//               alt="Interview Ready" 
//               className="w-32 h-32 object-contain mx-auto"
//             />
//           </div>
//           <p className="text-xl font-medium text-center">Your interview is ready to begin</p>
//           <p className="text-sm text-gray-500 mt-2 text-center mb-6">
//             Please go back and click the Submit button on the system check page to start your interview.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               backgroundColor: linearGradientBackground,
//               color: textColor,
//               padding: '10px 20px',
//               borderRadius: '8px',
//             }}
//             className="font-medium"
//           >
//             Go Back
//           </button>
//         </div>
//       );
//     }
    
//     // Regular loading state for questions loading
//     return <LoadingAnimation message="Loading interview questions..." />;
//   };

//   // Render three different states with a single parent element
//   let content;
//   if (interviewCompleted) {
//     content = <InterviewOver />;
//   } else if (interviewCancelled) {
//     content = <InterviewCancle />;
//   } else {
//     content = (
//       <div className="active-interview">
//         <WarningModel
//           message={modalMessage}
//           isVisible={isModalVisible}
//           onClose={closeModal}
//         />

//         {/* timer progress bar */}
//         <div className="bg-teal-100 h-[25px] progressBar relative">
//           <div
//             key={questionIndex}
//             className="bg-teal-500 h-[25px] progressFill"
//             style={{
//               animation: `progress-bar-animation ${questions?.[questionIndex]?.duration}s linear`,
//               width: `${(questionTimeLeft / questions?.[questionIndex]?.duration) * 100}%`,
//             }}
//           />
//           <span className="absolute inset-0 flex items-center justify-center text-black py-3 font-bold">
//             Time Left: {formatTime(questionTimeLeft)}
//           </span>
//         </div>

//         <div className="p-[32px]">
//           <div>
//             {/* question */}
//             <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center">
//               <div className="text-lg font-bold">
//                 {questionIndex + 1}
//                 {". "}
//                 {questions?.[questionIndex]?.question}
//               </div>
//             </div>

//             {/* Permission error message if any */}
//             {permissionError && (
//               <div style={{ 
//                 margin: '10px 0', 
//                 padding: '10px', 
//                 backgroundColor: '#fff3f3', 
//                 border: '1px solid #ffcaca',
//                 borderRadius: '4px',
//                 color: 'red' 
//               }}>
//                 <p><strong>Permission Error:</strong> {permissionError}</p>
//                 <p>Please ensure you have granted camera and microphone permissions to use this application.</p>
//               </div>
//             )}

//             {/* screens */}
//             <div className="flex flex-col md:flex-row gap-6 mt-8">
//               <div className="relative rounded-lg w-full md:w-2/3">
//                   <img
//                     src={image}
//                     className="rounded-lg"
//                     alt="User"
//                   />
//                   <div
//                     className="absolute top-2 right-2 cursor-pointer p-2 bg-white bg-opacity-0 rounded-full"
//                     onClick={() => setIsSpeakerOn(!isSpeakerOn)}
//                   >
//                     {isSpeakerOn ? (
//                       <VolumeUpIcon className="text-white text-2xl" />
//                     ) : (
//                       <VolumeOffIcon className="text-white text-2xl" />
//                     )}
//                   </div>
//               </div>
//               <div className="w-full md:w-1/2">
//                   <div className="relative flex justify-center items-center h-full">
//                     <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
//                       REC
//                     </div>
//                     <video
//                       id="vid"
//                       className="rounded-lg"
//                       muted
//                       autoPlay
//                     ></video>
//                   </div>
//               </div>
//             </div>

//             {/* Live Transcription Component */}
//             <PremiumSpeechTranscription
//               isActive={transcriptionActive}
//               onTranscriptUpdate={handleTranscriptUpdate}
//               questionIndex={questionIndex}
//               resetTranscription={transcriptResetTrigger}
//             />
            
//             {/* last row of question number and buttons */}
//             <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mt-8">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <button
//                 onClick={handleFinishInterview}
//                 className="bg-red-500 text-white h-[45px] px-8 rounded-lg"
//                 >
//                 Finish Interview
//                 </button>
//                 <button
//                     onClick={skipQuestion}
//                     className="px-8 h-[45px] bg-gray-300 rounded-lg"
//                   >
//                     Skip
//                 </button>
//                 <button
//                     onClick={nextQuestion}
//                     style={{
//                       cursor: "pointer",                           
//                       borderRadius: "8px",
//                       height: '45px',
//                       background: linearGradientBackground,
//                       color: textColor,
//                       visibility:
//                         questionIndex < questions?.length - 1
//                           ? ""
//                           : "hidden",
//                     }}
//                     className="text-secondary px-8"
//                   >
//                     Next Question
//                 </button>
//               </div>
//               <div className="text-xl font-bold">
//                 Question {questionIndex + 1} of {questions?.length}
//               </div>
//             </div>
            
//             {/* finish interview confirmation modal code */}
//             {showConfirmationPopup && (
//               <div className="fixed z-99999999999999999 inset-0 overflow-y-auto">
//                 <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                   <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                   </div>

//                   <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//                   <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                       <div className="sm:flex sm:items-start">
//                         <div className="mt-3 text-center sm:mt-0 sm:text-left">
//                           <h3 className="text-2xl leading-6 font-medium text-gray-900">
//                             Finish Interview
//                           </h3>
//                           <div className="mt-6">
//                             <p className="text-xl text-gray-500">
//                               Are you sure you want to end the interview?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={confirmEndInterview}
//                       >
//                         Confirm
//                       </button>
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                         onClick={() => setShowConfirmationPopup(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Modified return statement to show loader, waiting screen, or active interview
//   return (
//     <div className="interview-container">
//       {isQuestionsLoading || !interviewStarted || showEnvironmentLoader ? (
//         renderLoading()
//       ) : (
//         <div className="interview-content">
//           {content}
//         </div>
//       )}
//     </div>
//   );
// }
  
//19 june part 2 testeing
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
  
  // Female voice state
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
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
      console.log("Questions available, ready for interview...");
      setIsQuestionsLoading(false);
    } else {
      console.log("Waiting for questions to load...");
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
      console.log("Questions loaded successfully:", questions.length);
      setIsQuestionsLoading(false);
    } else {
      console.log("Questions are still loading or empty");
      setIsQuestionsLoading(isLoading); // Use the parent loading state
    }
  }, [questions, isLoading]);

  // Enhanced Female Voice Selection Logic
  useEffect(() => {
    const selectConsistentFemaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length === 0) {
        return false; // Voices not loaded yet
      }

      // Enhanced female voice detection with more comprehensive names
      const femaleVoices = voices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();

        return (
          lang.includes('en') && (
            // Common female voice names
            name.includes('female') ||
            name.includes('woman') ||
            // Specific female voice names by platform
            name.includes('samantha') ||
            name.includes('susan') ||
            name.includes('karen') ||
            name.includes('zira') ||
            name.includes('hazel') ||
            name.includes('aria') ||
            name.includes('fiona') ||
            name.includes('moira') ||
            name.includes('tessa') ||
            name.includes('serena') ||
            name.includes('allison') ||
            name.includes('ava') ||
            name.includes('emma') ||
            name.includes('olivia') ||
            name.includes('sophia') ||
            name.includes('sarah') ||
            name.includes('nicole') ||
            name.includes('victoria') ||
            name.includes('melissa') ||
            name.includes('linda') ||
            name.includes('alice') ||
            name.includes('anna') ||
            name.includes('claire') ||
            name.includes('diane') ||
            name.includes('emily') ||
            name.includes('grace') ||
            name.includes('helen') ||
            name.includes('jenny') ||
            name.includes('kate') ||
            name.includes('laura') ||
            name.includes('maria') ||
            name.includes('nancy') ||
            name.includes('rachel') ||
            // Platform-specific patterns
            (name.includes('microsoft') && (name.includes('eva') || name.includes('helen'))) ||
            (name.includes('google') && name.includes('female')) ||
            (name.includes('apple') && name.includes('female'))
          )
        );
      });

      // Prioritize voices by quality and platform
      let selectedVoice;
      if (femaleVoices.length > 0) {
        // Prefer premium/neural voices if available
        const premiumFemaleVoices = femaleVoices.filter(v =>
          v.name.toLowerCase().includes('premium') ||
          v.name.toLowerCase().includes('neural') ||
          v.name.toLowerCase().includes('enhanced')
        );

        selectedVoice = premiumFemaleVoices.length > 0 ? premiumFemaleVoices[0] : femaleVoices[0];
      } else {
        // Fallback: try to find any voice that might be female based on patterns
        const possibleFemaleVoices = voices.filter(voice => {
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase();
          return lang.includes('en') && !name.includes('male') && !name.includes('man');
        });

        selectedVoice = possibleFemaleVoices.length > 0 ? possibleFemaleVoices[0] :
                      (voices.find(v => v.lang.includes('en')) || voices[0]);
      }

      if (selectedVoice) {
        setFemaleVoice(selectedVoice);
        setVoicesLoaded(true);
        return true;
      }

      return false;
    };

    // Try to select voice immediately
    const voiceReady = selectConsistentFemaleVoice();

    if (!voiceReady) {
      // Set up multiple attempts to load voices
      const maxAttempts = 15;
      let attempts = 0;

      const tryLoadVoices = () => {
        attempts++;

        const success = selectConsistentFemaleVoice();
        if (success) {
          return;
        }

        if (attempts < maxAttempts) {
          setTimeout(tryLoadVoices, 300);
        } else {
          // Force set voices loaded even if no female voice found
          setVoicesLoaded(true);
        }
      };

      // Listen for voices changed event
      const handleVoicesChanged = () => {
        selectConsistentFemaleVoice();
      };

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      }

      setTimeout(tryLoadVoices, 100);

      return () => {
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Only initialize when questions are loaded AND the user has clicked Submit
  useEffect(() => {
    if (!isQuestionsLoading && questions?.length > 0 && shouldStartInterview && !componentInitialized) {
      console.log('Starting interview based on user submit action');
      
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
      console.log('Sending unified submission without video');
      console.log('Payload details (partial):', 
        JSON.stringify({
          ...basePayload,
          transcript_count: formattedTranscripts.length
        })
      );
      
      // Dispatch the action with just the base payload
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
    setRecordedChunks([]); // Reset the recordedChunks array here
    
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
            } else {
              console.warn('No recorded chunks available to process');
            }
          };
          
          mediaRecorder.start();
          console.log('Media recorder started');
          
          // Start transcription after media recorder is started
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
  
  // Enhanced female voice speech function
  const speakOut = (text) => {
    if ("speechSynthesis" in window && isSpeakerOn && !spokenQuestions.includes(text)) {

      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();

      // Small delay to ensure cancellation is processed
      setTimeout(() => {
        // Create and configure the utterance
        const utterance = new SpeechSynthesisUtterance(text);

        // Apply the selected female voice for consistency
        if (femaleVoice && voicesLoaded) {
          utterance.voice = femaleVoice;
        } else {
          // Fallback: try to find a female voice on the fly
          const voices = window.speechSynthesis.getVoices();
          const femaleVoiceBackup = voices.find(voice => {
            const name = voice.name.toLowerCase();
            const lang = voice.lang.toLowerCase();
            return lang.includes('en') && (
              name.includes('female') ||
              name.includes('woman') ||
              name.includes('samantha') ||
              name.includes('susan') ||
              name.includes('zira') ||
              name.includes('hazel')
            );
          });

          if (femaleVoiceBackup) {
            utterance.voice = femaleVoiceBackup;
          }
        }

        // Enhanced feminine voice characteristics
        utterance.pitch = 1.2;    // Higher pitch for more feminine sound
        utterance.rate = 0.85;    // Slightly slower for clarity and elegance
        utterance.volume = 0.8;   // Good volume level

        // Error handling
        utterance.onerror = (event) => {
          // Error handled silently
        };

        utterance.onend = () => {
          // Speech completed
        };

        utterance.onstart = () => {
          // Speech started
        };

        // Speak the text with enhanced female voice
        window.speechSynthesis.speak(utterance);

        // Track that we've spoken this question
        setSpokenQuestions(prev => [...prev, text]);

      }, 150); // Small delay to ensure proper cancellation

    }
  };
  
  useEffect(() => {
    // Only start timer and speak question if questions are loaded AND interview has started
    if (!isQuestionsLoading && questions?.length > 0 && interviewStarted && voicesLoaded) {
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
      
      // Speak the current question
      if (questions[questionIndex]?.question) {
        speakOut(questions[questionIndex].question);
      }
      
      return () => clearInterval(interval);
    }
  }, [questionTimeLeft, questionIndex, totalTimeLeft, isQuestionsLoading, questions, interviewStarted, voicesLoaded]);

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