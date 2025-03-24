// import React, { useEffect, useState, useRef } from 'react';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import WarningIcon from '@mui/icons-material/Warning';
// import CircularProgress from '@mui/material/CircularProgress';


// const PremiumSpeechTranscription = ({ 
//   isActive, 
//   onTranscriptUpdate, 
//   questionIndex,
//   resetTranscription 
// }) => {
//   // State
//   const [transcript, setTranscript] = useState('');
//   const [interimTranscript, setInterimTranscript] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [recognitionState, setRecognitionState] = useState('idle'); // idle, initializing, ready, listening, error
//   const [restartCount, setRestartCount] = useState(0);
//   const [languageDetected, setLanguageDetected] = useState('en-US');
//   const [confidenceScore, setConfidenceScore] = useState(0);
  
//   // Refs
//   const recognitionRef = useRef(null);
//   const recognitionTimeoutRef = useRef(null);
//   const restartTimeoutRef = useRef(null);
  
//   // Constants
//   const MAX_RESTART_ATTEMPTS = 10;
//   const RESTART_DELAY = 1;
//   const SPEECH_TIMEOUT = 10000; // 10 seconds of silence before auto-restart
//   const SUPPORTED_LANGUAGES = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT'];
  
//   // Initialize speech recognition with optimal settings
//   useEffect(() => {
//     // Set initial state
//     setRecognitionState('initializing');
    
//     // Check if browser supports speech recognition
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    
//     if (!SpeechRecognition) {
//       setRecognitionState('error');
//       setErrorMessage('Your browser does not support speech recognition. Please try Chrome or Edge.');
//       return;
//     }
    
//     // Create recognition instance with optimal settings
//     try {
//       const recognition = new SpeechRecognition();
      
//       // Configure recognition for best performance
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.maxAlternatives = 3;
//       recognition.lang = languageDetected;
      
//       // Create grammar list if supported (helps with accuracy)
//       if (SpeechGrammarList) {
//         const speechRecognitionList = new SpeechGrammarList();
//         // Add common interview words to improve recognition
//         const grammar = '#JSGF V1.0; grammar interview; public <interview> = interview | answer | question | experience | skills | thank you | project | work | education;';
//         speechRecognitionList.addFromString(grammar, 1);
//         recognition.grammars = speechRecognitionList;
//       }
      
//       // Handle recognition results with advanced processing
//       recognition.onresult = (event) => {
//         let finalTranscript = '';
//         let currentInterim = '';
//         let highestConfidence = 0;
        
//         // Process results
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const result = event.results[i];
//           const transcript = result[0].transcript;
//           const confidence = result[0].confidence;
          
//           // Track highest confidence score for analytics
//           if (confidence > highestConfidence) {
//             highestConfidence = confidence;
//           }
          
//           if (result.isFinal) {
//             // Process final results with intelligent formatting
//             let processedText = transcript;
            
//             // Smart capitalization
//             processedText = processedText.replace(/^(\w)/, (match) => match.toUpperCase());
//             processedText = processedText.replace(/\. (\w)/g, (match) => '. ' + match.toUpperCase());
            
//             // Add punctuation if missing at the end
//             if (!/[.?!]$/.test(processedText)) {
//               processedText += '.';
//             }
            
//             finalTranscript += processedText + ' ';
//           } else {
//             currentInterim += transcript;
//           }
//         }
        
//         // Update state with new transcripts
//         if (finalTranscript) {
//           setTranscript(prev => {
//             const newTranscript = prev + finalTranscript;
//             onTranscriptUpdate(newTranscript);
//             return newTranscript;
//           });
          
//           // Reset silence timeout when we get final results
//           resetSilenceTimeout();
//         }
        
//         if (currentInterim) {
//           setInterimTranscript(currentInterim);
//         }
        
//         // Update confidence score (useful for UI feedback)
//         setConfidenceScore(highestConfidence);
//       };
      
//       // Comprehensive error handling
//       recognition.onerror = (event) => {
//         console.error('Recognition error:', event.error);
        
//         // Handle different error types
//         switch (event.error) {
//           case 'no-speech':
//             // Don't show error for no-speech, just restart if needed
//             console.log('No speech detected, will auto-restart if needed');
//             break;
            
//           case 'audio-capture':
//             setErrorMessage('Microphone error. Please check your microphone connection.');
//             break;
            
//           case 'not-allowed':
//             setErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
//             break;
            
//           case 'aborted':
//             // Don't show error for normal aborts
//             break;
            
//           case 'network':
//             setErrorMessage('Network error. Please check your internet connection.');
//             break;
            
//           default:
//             setErrorMessage(`Recognition error: ${event.error}`);
//         }
        
//         // If we hit an error while listening, attempt recovery
//         if (isListening) {
//           handleRecognitionFailure();
//         }
//       };
      
//       // Handle end of recognition
//       recognition.onend = () => {
//         // Check if we should still be listening
//         if (isListening) {
//           // Auto-restart logic with backoff strategy
//           restartRecognition();
//         } else {
//           setRecognitionState('ready');
//         }
//       };
      
//       // Additional handlers for better user experience
//       recognition.onsoundstart = () => {
//         // Audio detected, reset silence timeout
//         resetSilenceTimeout();
//       };
      
//       recognition.onnomatch = () => {
//         console.log('Speech recognized but no match found');
//       };
      
//       recognition.onaudiostart = () => {
//         console.log('Audio capturing started');
//       };
      
//       recognition.onaudioend = () => {
//         console.log('Audio capturing ended');
//       };
      
//       // Store the recognition instance
//       recognitionRef.current = recognition;
//       setRecognitionState('ready');
      
//     } catch (error) {
//       console.error('Error initializing speech recognition:', error);
//       setRecognitionState('error');
//       setErrorMessage(`Failed to initialize speech recognition: ${error.message}`);
//     }
    
//     // Cleanup on unmount
//     return () => {
//       clearSilenceTimeout();
//       clearTimeout(restartTimeoutRef.current);
      
//       if (recognitionRef.current) {
//         try {
//           recognitionRef.current.stop();
//         } catch (e) {
//           // Ignore errors on cleanup
//         }
//       }
//     };
//   }, [languageDetected]); // Reinitialize if language changes
  
//   // Reset silence timeout
//   const resetSilenceTimeout = () => {
//     clearSilenceTimeout();
    
//     // Set new timeout to detect extended silence
//     if (isListening) {
//       recognitionTimeoutRef.current = setTimeout(() => {
//         console.log('Silence timeout - no speech detected for a while');
//         // Only restart if we're still supposed to be listening
//         if (isListening && recognitionRef.current) {
//           try {
//             recognitionRef.current.stop(); // This will trigger onend and restart
//           } catch (e) {
//             console.error('Error stopping on silence timeout:', e);
//           }
//         }
//       }, SPEECH_TIMEOUT);
//     }
//   };
  
//   // Clear silence timeout
//   const clearSilenceTimeout = () => {
//     if (recognitionTimeoutRef.current) {
//       clearTimeout(recognitionTimeoutRef.current);
//       recognitionTimeoutRef.current = null;
//     }
//   };
  
//   // Handle recognition failure with smart recovery
//   const handleRecognitionFailure = () => {
//     if (restartCount >= MAX_RESTART_ATTEMPTS) {
//       console.log('Max restart attempts reached, stopping auto-restart');
//       setErrorMessage('Speech recognition has failed multiple times. Please try manually restarting.');
//       setIsListening(false);
//       setRecognitionState('error');
//       return;
//     }
    
//     // Exponential backoff for restarts
//     const delay = RESTART_DELAY * Math.pow(1.5, restartCount);
//     console.log(`Scheduling recovery attempt in ${delay}ms (attempt ${restartCount + 1})`);
    
//     restartTimeoutRef.current = setTimeout(() => {
//       if (isListening) {
//         restartRecognition();
//       }
//     }, delay);
//   };
  
//   // Restart recognition with tracking
//   const restartRecognition = () => {
//     if (!recognitionRef.current || !isListening) return;
    
//     try {
//       // Update restart count for backoff strategy
//       setRestartCount(prev => prev + 1);
      
//       // Start recognition again
//       recognitionRef.current.start();
//       setRecognitionState('listening');
//       console.log('Recognition restarted');
      
//       // Reset silence timer on restart
//       resetSilenceTimeout();
//     } catch (e) {
//       console.error('Error restarting recognition:', e);
      
//       // If we can't restart, we're in real trouble
//       if (e.name === 'InvalidStateError') {
//         // Already running, this is actually good
//         console.log('Recognition is already running');
//       } else {
//         // Real error, handle it
//         setErrorMessage(`Failed to restart: ${e.message}`);
//         setRecognitionState('error');
//       }
//     }
//   };
  
//   // Handle active state changes
//   useEffect(() => {
//     if (recognitionState !== 'ready' && recognitionState !== 'listening' && recognitionState !== 'error') return;
    
//     if (isActive && !isListening) {
//       startTranscription();
//     } else if (!isActive && isListening) {
//       stopTranscription();
//     }
//   }, [isActive, isListening, recognitionState]);
  
//   // Reset transcript when question changes
//   useEffect(() => {
//     console.log('Question changed or reset triggered. Question index:', questionIndex);
    
//     // Reset the transcript
//     setTranscript('');
//     setInterimTranscript('');
//     onTranscriptUpdate('');
    
//     // Reset restart count when question changes
//     setRestartCount(0);
    
//     // Restart transcription if active
//     if (isActive && recognitionState === 'ready') {
//       stopTranscription();
      
//       // Short delay before restarting
//       setTimeout(() => {
//         startTranscription();
//       }, 300);
//     }
//   }, [questionIndex, resetTranscription]);
  
//   // Start transcription with optimal settings
//   const startTranscription = () => {
//     if (recognitionState !== 'ready' && recognitionState !== 'error') return;
    
//     try {
//       // Reset error state if necessary
//       if (recognitionState === 'error') {
//         setErrorMessage('');
//       }
      
//       // Reset restart count when manually starting
//       setRestartCount(0);
      
//       // Start recognition
//       recognitionRef.current.start();
//       setIsListening(true);
//       setRecognitionState('listening');
//       console.log('Speech recognition started');
      
//       // Start silence detection
//       resetSilenceTimeout();
//     } catch (e) {
//       console.error('Error starting recognition:', e);
      
//       // Handle the "already started" case gracefully
//       if (e.name === 'InvalidStateError') {
//         // Recognition is already running, just update our state
//         setIsListening(true);
//         setRecognitionState('listening');
//       } else {
//         // Other errors are more serious
//         setErrorMessage(`Failed to start: ${e.message}`);
//         setRecognitionState('error');
//       }
//     }
//   };
  
//   // Stop transcription safely
//   const stopTranscription = () => {
//     if (!isListening) return;
    
//     // Clear all timers first
//     clearSilenceTimeout();
//     clearTimeout(restartTimeoutRef.current);
    
//     try {
//       // Stop recognition
//       recognitionRef.current.stop();
//       setIsListening(false);
//       console.log('Speech recognition stopped by user');
//     } catch (e) {
//       console.error('Error stopping recognition:', e);
      
//       // Even if stopping fails, update our state
//       setIsListening(false);
//       setRecognitionState('error');
//       setErrorMessage(`Failed to stop: ${e.message}`);
//     }
//   };
  
//   // Manual toggle button handler with debounce
//   const toggleTranscription = () => {
//     // Ignore rapid clicks
//     if (recognitionState === 'initializing') return;
    
//     if (isListening) {
//       stopTranscription();
//     } else {
//       startTranscription();
//     }
//   };
  
//   // Render loading state
//   if (recognitionState === 'initializing') {
//     return (
//       <div className="live-transcription-container">
//         <div style={{ 
//           padding: '20px', 
//           textAlign: 'center',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '15px'
//         }}>
//           <CircularProgress size={40} />
//           <div>Initializing speech recognition...</div>
//         </div>
//       </div>
//     );
//   }
  
//   // Render error state
//   if (recognitionState === 'error' && !isListening) {
//     return (
//       <div className="live-transcription-container">
//         <div style={{ 
//           padding: '20px',
//           border: '1px solid #ffdddd',
//           borderRadius: '8px',
//           backgroundColor: '#fff6f6',
//           marginBottom: '15px'
//         }}>
//           <div style={{ 
//             display: 'flex',
//             alignItems: 'center',
//             color: '#d32f2f',
//             marginBottom: '10px'
//           }}>
//             <ErrorOutlineIcon style={{ marginRight: '8px' }} />
//             <h3 style={{ margin: 0, fontSize: '16px' }}>Speech Recognition Error</h3>
//           </div>
          
//           <p style={{ margin: '10px 0', color: '#333' }}>
//             {errorMessage || 'There was a problem with speech recognition.'}
//           </p>
          
//           <button 
//             onClick={startTranscription} 
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#4caf50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               fontSize: '14px'
//             }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   // Main UI
//   return (
//     <div className="live-transcription-container" style={{ 
//       border: '1px solid #e0e0e0',
//       borderRadius: '8px',
//       padding: '15px',
//       marginTop: '20px',
//       backgroundColor: '#fafafa'
//     }}>
//       {/* Status bar */}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-start', // Changed from space-between since we removed the button
//         marginBottom: '15px',
//         padding: '10px',
//         backgroundColor: '#fff',
//         borderRadius: '4px',
//         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {isListening ? (
//             <MicIcon style={{ color: '#FF4B4B', animation: 'pulse 1.5s infinite' }} />
//           ) : (
//             <MicOffIcon style={{ color: '#888' }} />
//           )}
//           <span style={{ marginLeft: '10px', fontWeight: 500 }}>
//             {isListening ? 'Transcribing...' : 'Transcription paused'}
//           </span>
          
//           {/* Shows confidence level when speaking */}
//           {isListening && confidenceScore > 0 && (
//             <div style={{ 
//               marginLeft: '15px',
//               padding: '2px 8px',
//               backgroundColor: confidenceScore > 0.8 ? '#e6f7e6' : '#fff9e6',
//               borderRadius: '10px',
//               fontSize: '12px'
//             }}>
//               {confidenceScore > 0.8 ? 'High clarity' : 'Moderate clarity'}
//             </div>
//           )}
//         </div>
        
//         {/* Removed the Start/Stop button here */}
//       </div>
      
//       {/* Error message */}
//       {errorMessage && (
//         <div style={{ 
//           color: '#D8000C',
//           backgroundColor: '#FFBABA', 
//           padding: '10px',
//           borderRadius: '4px',
//           marginBottom: '15px',
//           display: 'flex',
//           alignItems: 'center'
//         }}>
//           <WarningIcon style={{ marginRight: '10px' }} />
//           {errorMessage}
//         </div>
//       )}
      
//       {/* Transcript box */}
//       <div style={{
//         backgroundColor: 'white',
//         border: '1px solid #e0e0e0',
//         borderRadius: '4px',
//         padding: '15px',
//         minHeight: '120px',
//         marginBottom: '15px'
//       }}>
//         <h3 style={{ 
//           margin: '0 0 10px 0', 
//           borderBottom: '1px solid #eee',
//           paddingBottom: '8px',
//           fontSize: '16px',
//           fontWeight: 500
//         }}>Live Transcript</h3>
        
//         <div style={{
//           lineHeight: 1.6,
//           fontSize: '15px'
//         }}>
//           {transcript ? (
//             <div style={{ color: '#333' }}>{transcript}</div>
//           ) : (
//             <div style={{ color: '#888', fontStyle: 'italic' }}>
//               {isListening ? 'Listening... speak now' : 'Your speech will appear here...'}
//             </div>
//           )}
          
//           {/* Interim results */}
//           {interimTranscript && (
//             <div style={{ 
//               color: '#888', 
//               marginTop: '10px',
//               fontStyle: 'italic'
//             }}>
//               {interimTranscript}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Status info */}
//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         fontSize: '13px',
//         color: '#666'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Status:</span>
//           {isActive ? 'Active' : 'Inactive'}
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Listening:</span>
//           {isListening ? 'Yes' : 'No'}
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Question:</span>
//           {questionIndex + 1}
//         </div>
//         {restartCount > 0 && (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Restarts:</span>
//             {restartCount}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PremiumSpeechTranscription;

//new
import React, { useEffect, useState, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';


const PremiumSpeechTranscription = ({ 
  isActive, 
  onTranscriptUpdate, 
  questionIndex,
  resetTranscription 
}) => {
  // State
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recognitionState, setRecognitionState] = useState('idle'); // idle, initializing, ready, listening, error
  const [restartCount, setRestartCount] = useState(0);
  const [languageDetected, setLanguageDetected] = useState('en-US');
  const [confidenceScore, setConfidenceScore] = useState(0);
  
  // Refs
  const recognitionRef = useRef(null);
  const recognitionTimeoutRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  
  // Constants
  const MAX_RESTART_ATTEMPTS = 10;
  const RESTART_DELAY = 1;
  const SPEECH_TIMEOUT = 10000; // 10 seconds of silence before auto-restart
  const SUPPORTED_LANGUAGES = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT'];
  
  // Initialize speech recognition with optimal settings
  useEffect(() => {
    // Set initial state
    setRecognitionState('initializing');
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    
    if (!SpeechRecognition) {
      setRecognitionState('error');
      setErrorMessage('Your browser does not support speech recognition. Please try Chrome or Edge.');
      return;
    }
    
    // Create recognition instance with optimal settings
    try {
      const recognition = new SpeechRecognition();
      
      // Configure recognition for best performance
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      recognition.lang = languageDetected;
      
      // Create grammar list if supported (helps with accuracy)
      if (SpeechGrammarList) {
        const speechRecognitionList = new SpeechGrammarList();
        // Add common interview words to improve recognition
        const grammar = '#JSGF V1.0; grammar interview; public <interview> = interview | answer | question | experience | skills | thank you | project | work | education;';
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
      }
      
      // Handle recognition results with advanced processing
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterim = '';
        let highestConfidence = 0;
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const confidence = result[0].confidence;
          
          // Track highest confidence score for analytics
          if (confidence > highestConfidence) {
            highestConfidence = confidence;
          }
          
          if (result.isFinal) {
            // Process final results with intelligent formatting
            let processedText = transcript;
            
            // Smart capitalization
            processedText = processedText.replace(/^(\w)/, (match) => match.toUpperCase());
            processedText = processedText.replace(/\. (\w)/g, (match) => '. ' + match.toUpperCase());
            
            // Add punctuation if missing at the end
            if (!/[.?!]$/.test(processedText)) {
              processedText += '.';
            }
            
            finalTranscript += processedText + ' ';
          } else {
            currentInterim += transcript;
          }
        }
        
        // Update state with new transcripts
        if (finalTranscript) {
          setTranscript(prev => {
            const newTranscript = prev + finalTranscript;
            onTranscriptUpdate(newTranscript);
            return newTranscript;
          });
          
          // Reset silence timeout when we get final results
          resetSilenceTimeout();
        }
        
        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }
        
        // Update confidence score (useful for UI feedback)
        setConfidenceScore(highestConfidence);
      };
      
      // Comprehensive error handling
      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        
        // Handle different error types
        switch (event.error) {
          case 'no-speech':
            // Don't show error for no-speech, just restart if needed
            console.log('No speech detected, will auto-restart if needed');
            break;
            
          case 'audio-capture':
            setErrorMessage('Microphone error. Please check your microphone connection.');
            break;
            
          case 'not-allowed':
            setErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
            break;
            
          case 'aborted':
            // Don't show error for normal aborts
            break;
            
          case 'network':
            setErrorMessage('Network error. Please check your internet connection.');
            break;
            
          default:
            setErrorMessage(`Recognition error: ${event.error}`);
        }
        
        // If we hit an error while listening, attempt recovery
        if (isListening) {
          handleRecognitionFailure();
        }
      };
      
      // Handle end of recognition
      recognition.onend = () => {
        // Check if we should still be listening
        if (isListening) {
          // Auto-restart logic with backoff strategy
          restartRecognition();
        } else {
          setRecognitionState('ready');
        }
      };
      
      // Additional handlers for better user experience
      recognition.onsoundstart = () => {
        // Audio detected, reset silence timeout
        resetSilenceTimeout();
      };
      
      recognition.onnomatch = () => {
        console.log('Speech recognized but no match found');
      };
      
      recognition.onaudiostart = () => {
        console.log('Audio capturing started');
      };
      
      recognition.onaudioend = () => {
        console.log('Audio capturing ended');
      };
      
      // Store the recognition instance
      recognitionRef.current = recognition;
      setRecognitionState('ready');
      
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setRecognitionState('error');
      setErrorMessage(`Failed to initialize speech recognition: ${error.message}`);
    }
    
    // Cleanup on unmount
    return () => {
      clearSilenceTimeout();
      clearTimeout(restartTimeoutRef.current);
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [languageDetected]); // Reinitialize if language changes
  
  // Reset silence timeout
  const resetSilenceTimeout = () => {
    clearSilenceTimeout();
    
    // Set new timeout to detect extended silence
    if (isListening) {
      recognitionTimeoutRef.current = setTimeout(() => {
        console.log('Silence timeout - no speech detected for a while');
        // Only restart if we're still supposed to be listening
        if (isListening && recognitionRef.current) {
          try {
            recognitionRef.current.stop(); // This will trigger onend and restart
          } catch (e) {
            console.error('Error stopping on silence timeout:', e);
          }
        }
      }, SPEECH_TIMEOUT);
    }
  };
  
  // Clear silence timeout
  const clearSilenceTimeout = () => {
    if (recognitionTimeoutRef.current) {
      clearTimeout(recognitionTimeoutRef.current);
      recognitionTimeoutRef.current = null;
    }
  };
  
  // Handle recognition failure with smart recovery
  const handleRecognitionFailure = () => {
    if (restartCount >= MAX_RESTART_ATTEMPTS) {
      console.log('Max restart attempts reached, stopping auto-restart');
      setErrorMessage('Speech recognition has failed multiple times. Please try manually restarting.');
      setIsListening(false);
      setRecognitionState('error');
      return;
    }
    
    // Exponential backoff for restarts
    const delay = RESTART_DELAY * Math.pow(1.5, restartCount);
    console.log(`Scheduling recovery attempt in ${delay}ms (attempt ${restartCount + 1})`);
    
    restartTimeoutRef.current = setTimeout(() => {
      if (isListening) {
        restartRecognition();
      }
    }, delay);
  };
  
  // Restart recognition with tracking
  const restartRecognition = () => {
    if (!recognitionRef.current || !isListening) return;
    
    try {
      // Update restart count for backoff strategy
      setRestartCount(prev => prev + 1);
      
      // Start recognition again
      recognitionRef.current.start();
      setRecognitionState('listening');
      console.log('Recognition restarted');
      
      // Reset silence timer on restart
      resetSilenceTimeout();
    } catch (e) {
      console.error('Error restarting recognition:', e);
      
      // If we can't restart, we're in real trouble
      if (e.name === 'InvalidStateError') {
        // Already running, this is actually good
        console.log('Recognition is already running');
      } else {
        // Real error, handle it
        setErrorMessage(`Failed to restart: ${e.message}`);
        setRecognitionState('error');
      }
    }
  };
  
  // Handle active state changes
  useEffect(() => {
    if (recognitionState !== 'ready' && recognitionState !== 'listening' && recognitionState !== 'error') return;
    
    if (isActive && !isListening) {
      startTranscription();
    } else if (!isActive && isListening) {
      stopTranscription();
    }
  }, [isActive, isListening, recognitionState]);
  
  // Reset transcript when question changes
  useEffect(() => {
    console.log('Question changed or reset triggered. Question index:', questionIndex);
    
    // Reset the transcript
    setTranscript('');
    setInterimTranscript('');
    onTranscriptUpdate('');
    
    // Reset restart count when question changes
    setRestartCount(0);
    
    // Restart transcription if active
    if (isActive && recognitionState === 'ready') {
      stopTranscription();
      
      // Short delay before restarting
      setTimeout(() => {
        startTranscription();
      }, 300);
    }
  }, [questionIndex, resetTranscription]);
  
  // Start transcription with optimal settings
  const startTranscription = () => {
    if (recognitionState !== 'ready' && recognitionState !== 'error') return;
    
    try {
      // Reset error state if necessary
      if (recognitionState === 'error') {
        setErrorMessage('');
      }
      
      // Reset restart count when manually starting
      setRestartCount(0);
      
      // Start recognition
      recognitionRef.current.start();
      setIsListening(true);
      setRecognitionState('listening');
      console.log('Speech recognition started');
      
      // Start silence detection
      resetSilenceTimeout();
    } catch (e) {
      console.error('Error starting recognition:', e);
      
      // Handle the "already started" case gracefully
      if (e.name === 'InvalidStateError') {
        // Recognition is already running, just update our state
        setIsListening(true);
        setRecognitionState('listening');
      } else {
        // Other errors are more serious
        setErrorMessage(`Failed to start: ${e.message}`);
        setRecognitionState('error');
      }
    }
  };
  
  // Stop transcription safely
  const stopTranscription = () => {
    if (!isListening) return;
    
    // Clear all timers first
    clearSilenceTimeout();
    clearTimeout(restartTimeoutRef.current);
    
    try {
      // Stop recognition
      recognitionRef.current.stop();
      setIsListening(false);
      console.log('Speech recognition stopped by user');
    } catch (e) {
      console.error('Error stopping recognition:', e);
      
      // Even if stopping fails, update our state
      setIsListening(false);
      setRecognitionState('error');
      setErrorMessage(`Failed to stop: ${e.message}`);
    }
  };
  
  // Manual toggle button handler with debounce
  const toggleTranscription = () => {
    // Ignore rapid clicks
    if (recognitionState === 'initializing') return;
    
    if (isListening) {
      stopTranscription();
    } else {
      startTranscription();
    }
  };
  
  // Render loading state
  if (recognitionState === 'initializing') {
    return (
      <div className="live-transcription-container">
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <CircularProgress size={40} />
          <div>Initializing speech recognition...</div>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (recognitionState === 'error' && !isListening) {
    return (
      <div className="live-transcription-container">
        <div style={{ 
          padding: '20px',
          border: '1px solid #ffdddd',
          borderRadius: '8px',
          backgroundColor: '#fff6f6',
          marginBottom: '15px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            color: '#d32f2f',
            marginBottom: '10px'
          }}>
            <ErrorOutlineIcon style={{ marginRight: '8px' }} />
            <h3 style={{ margin: 0, fontSize: '16px' }}>Speech Recognition Error</h3>
          </div>
          
          <p style={{ margin: '10px 0', color: '#333' }}>
            {errorMessage || 'There was a problem with speech recognition.'}
          </p>
          
          <button 
            onClick={startTranscription} 
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Main UI
  return (
    <div className="live-transcription-container" style={{ 
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      backgroundColor: '#fafafa'
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Changed from space-between since we removed the button
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isListening ? (
            <MicIcon style={{ color: '#FF4B4B', animation: 'pulse 1.5s infinite' }} />
          ) : (
            <MicOffIcon style={{ color: '#888' }} />
          )}
          <span style={{ marginLeft: '10px', fontWeight: 500 }}>
            {isListening ? 'Transcribing...' : 'Transcription paused'}
          </span>
          
          {/* Shows confidence level when speaking */}
          {isListening && confidenceScore > 0 && (
            <div style={{ 
              marginLeft: '15px',
              padding: '2px 8px',
              backgroundColor: confidenceScore > 0.8 ? '#e6f7e6' : '#fff9e6',
              borderRadius: '10px',
              fontSize: '12px'
            }}>
              {confidenceScore > 0.8 ? 'High clarity' : 'Moderate clarity'}
            </div>
          )}
        </div>
        
        {/* Removed the Start/Stop button here */}
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div style={{ 
          color: '#D8000C',
          backgroundColor: '#FFBABA', 
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <WarningIcon style={{ marginRight: '10px' }} />
          {errorMessage}
        </div>
      )}
      
      {/* Transcript box */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '15px',
        minHeight: '120px',
        marginBottom: '15px'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          borderBottom: '1px solid #eee',
          paddingBottom: '8px',
          fontSize: '16px',
          fontWeight: 500
        }}>Live Transcript</h3>
        
        <div style={{
          lineHeight: 1.6,
          fontSize: '15px'
        }}>
          {transcript ? (
            <div style={{ color: '#333' }}>{transcript}</div>
          ) : (
            <div style={{ color: '#888', fontStyle: 'italic' }}>
              {isListening ? 'Listening... speak now' : 'Your speech will appear here...'}
            </div>
          )}
          
          {/* Interim results */}
          {interimTranscript && (
            <div style={{ 
              color: '#888', 
              marginTop: '10px',
              fontStyle: 'italic'
            }}>
              {interimTranscript}
            </div>
          )}
        </div>
      </div>
      
      {/* Status info */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '13px',
        color: '#666'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Status:</span>
          {isActive ? 'Active' : 'Inactive'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Listening:</span>
          {isListening ? 'Yes' : 'No'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Question:</span>
          {questionIndex + 1}
        </div>
        {restartCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Restarts:</span>
            {restartCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumSpeechTranscription;