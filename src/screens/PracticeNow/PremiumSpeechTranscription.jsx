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
  const [processingBuffer, setProcessingBuffer] = useState([]);
  const [lastProcessedIndex, setLastProcessedIndex] = useState(-1);
  
  // Refs
  const recognitionRef = useRef(null);
  const recognitionTimeoutRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const transcriptRef = useRef('');
  const resultHistoryRef = useRef([]);
  const continuityBufferRef = useRef([]);
  
  // Constants
  const MAX_RESTART_ATTEMPTS = 15; // Increased from 10
  const RESTART_DELAY = 800; // Increased from 1ms to 800ms for better stability
  const SPEECH_TIMEOUT = 8000; // Reduced from 10s to 8s to be more responsive
  const SUPPORTED_LANGUAGES = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'zh-CN', 'ja-JP', 'ko-KR', 'ru-RU'];
  const RESULT_BUFFER_SIZE = 5; // Buffer last 5 results for context
  const PHRASE_LIST = [
    'experience', 'skills', 'project', 'education', 'challenge', 'leadership',
    'teamwork', 'problem', 'solution', 'development', 'management', 'technical',
    'software', 'programming', 'application', 'algorithm', 'database', 'system',
    'network', 'interface', 'component', 'architecture', 'framework', 'library',
    'implementation', 'test', 'debugging', 'deployment', 'integration', 'analysis',
    'design', 'performance', 'security', 'scalability', 'maintenance', 'optimization',
    'documentation', 'collaboration', 'communication', 'requirement', 'specification',
    'methodology', 'agile', 'scrum', 'waterfall', 'iteration', 'sprint', 'backlog',
    'milestone', 'deadline', 'budget', 'resource', 'stakeholder', 'client', 'team',
    'manager', 'lead', 'mentor', 'coach', 'review', 'feedback', 'assessment', 'evaluation'
  ];
  
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
      recognition.maxAlternatives = 5; // Increased from 3 to 5 for better word alternatives
      recognition.lang = languageDetected;
      
      // Create grammar list if supported (helps with accuracy)
      if (SpeechGrammarList) {
        const speechRecognitionList = new SpeechGrammarList();
        
        // Add common interview words to improve recognition
        let grammarWords = PHRASE_LIST.join(' | ');
        const grammar = `#JSGF V1.0; grammar interview; public <interview> = ${grammarWords};`;
        
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
      }
      
      // Handle recognition results with advanced processing
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterim = '';
        let highestConfidence = 0;
        let shouldProcessResults = false;
        
        // Store result alternatives for processing
        let resultAlternatives = [];
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          
          // Store all alternatives for this result
          if (result.isFinal) {
            let alternatives = [];
            for (let j = 0; j < result.length; j++) {
              alternatives.push({
                transcript: result[j].transcript,
                confidence: result[j].confidence
              });
            }
            resultAlternatives.push(alternatives);
            shouldProcessResults = true;
          }
          
          const transcript = result[0].transcript;
          const confidence = result[0].confidence;
          
          // Track highest confidence score for analytics
          if (confidence > highestConfidence) {
            highestConfidence = confidence;
          }
          
          if (result.isFinal) {
            // Get the best version among alternatives
            let bestTranscript = chooseBestTranscript(result);
            
            // Process final results with intelligent formatting
            let processedText = bestTranscript;
            
            // Store in history for context-aware processing
            continuityBufferRef.current.push(processedText);
            if (continuityBufferRef.current.length > 5) {
              continuityBufferRef.current.shift();
            }
            
            // Smart capitalization
            processedText = processedText.replace(/^(\s*\w)/, (match) => match.toUpperCase());
            processedText = processedText.replace(/\.\s+(\w)/g, (match) => match.toUpperCase());
            processedText = processedText.replace(/\?\s+(\w)/g, (match) => match.toUpperCase());
            processedText = processedText.replace(/!\s+(\w)/g, (match) => match.toUpperCase());
            
            // Fix common speech recognition errors
            processedText = fixCommonErrors(processedText);
            
            // Add punctuation if missing at the end
            if (!/[.?!,;:]$/.test(processedText)) {
              processedText += '.';
            }
            
            finalTranscript += processedText + ' ';
          } else {
            currentInterim += transcript;
          }
        }
        
        // Process interim results for better responsiveness
        if (currentInterim) {
          // Basic formatting for interim results
          currentInterim = currentInterim.trim();
          currentInterim = currentInterim.replace(/^(\s*\w)/, (match) => match.toUpperCase());
          
          setInterimTranscript(currentInterim);
        }
        
        // Update state with new transcripts
        if (finalTranscript) {
          // Update the transcript with new content
          setTranscript(prev => {
            const newTranscript = prev + finalTranscript;
            // Keep reference in ref for comparison
            transcriptRef.current = newTranscript;
            // Call the parent component with update
            onTranscriptUpdate(newTranscript);
            return newTranscript;
          });
          
          // Reset silence timeout when we get final results
          resetSilenceTimeout();
        }
        
        // Process all alternatives for better word choice if we have final results
        if (shouldProcessResults && resultAlternatives.length > 0) {
          processResultAlternatives(resultAlternatives);
        }
        
        // Update confidence score (useful for UI feedback)
        setConfidenceScore(highestConfidence);
      };
      
      // Choose the best transcript from multiple alternatives
      const chooseBestTranscript = (result) => {
        // If only one alternative, return it
        if (result.length === 1) {
          return result[0].transcript;
        }
        
        // Get all alternatives with their confidence scores
        let alternatives = [];
        for (let i = 0; i < result.length; i++) {
          alternatives.push({
            transcript: result[i].transcript,
            confidence: result[i].confidence
          });
        }
        
        // Sort by confidence
        alternatives.sort((a, b) => b.confidence - a.confidence);
        
        // Check if highest confidence is significantly better
        if (alternatives[0].confidence > alternatives[1].confidence * 1.2) {
          return alternatives[0].transcript;
        }
        
        // If confidences are close, prefer the one with more words
        let highestWordCount = 0;
        let bestTranscript = alternatives[0].transcript;
        
        for (let i = 0; i < Math.min(3, alternatives.length); i++) {
          const wordCount = alternatives[i].transcript.split(/\s+/).length;
          if (wordCount > highestWordCount) {
            highestWordCount = wordCount;
            bestTranscript = alternatives[i].transcript;
          }
        }
        
        return bestTranscript;
      };
      
      // Process and optimize results using alternatives
      const processResultAlternatives = (resultAlternatives) => {
        // Add to history for later processing if needed
        resultHistoryRef.current = [...resultHistoryRef.current, ...resultAlternatives];
        if (resultHistoryRef.current.length > RESULT_BUFFER_SIZE) {
          resultHistoryRef.current = resultHistoryRef.current.slice(-RESULT_BUFFER_SIZE);
        }
      };
      
      // Fix common speech recognition errors
      const fixCommonErrors = (text) => {
        // Replace common misrecognitions
        const corrections = {
          'i\'m a': 'I am a',
          'i\'ve': 'I have',
          'i\'d': 'I would',
          'thats': 'that\'s',
          'dont': 'don\'t',
          'doesnt': 'doesn\'t',
          'didnt': 'didn\'t',
          'couldnt': 'couldn\'t',
          'wouldnt': 'wouldn\'t',
          'shouldnt': 'shouldn\'t',
          'wont': 'won\'t',
          'cant': 'can\'t',
          'isnt': 'isn\'t',
          'arent': 'aren\'t',
          'werent': 'weren\'t',
          'wasnt': 'wasn\'t',
          'havent': 'haven\'t',
          'hasnt': 'hasn\'t',
          'hadnt': 'hadn\'t',
          'theyre': 'they\'re',
          'theyll': 'they\'ll',
          'theyd': 'they\'d',
          'weve': 'we\'ve',
          'wed': 'we\'d',
          'well': 'we\'ll', // Context sensitive, might need refinement
          'youre': 'you\'re',
          'youll': 'you\'ll',
          'youd': 'you\'d',
          'youve': 'you\'ve',
          'shes': 'she\'s',
          'shell': 'she\'ll',
          'shed': 'she\'d',
          'hes': 'he\'s',
          'hell': 'he\'ll', // Context sensitive, might need refinement
          'hed': 'he\'d',
          'its': 'it\'s',
          'itll': 'it\'ll',
          'itd': 'it\'d',
          'whats': 'what\'s',
          'wheres': 'where\'s',
          'whens': 'when\'s',
          'hows': 'how\'s',
          'whos': 'who\'s',
          'whys': 'why\'s',
          'im': 'I\'m',
          'ive': 'I\'ve',
          'id': 'I\'d', // Context sensitive, might need refinement
          'ill': 'I\'ll',
          'idk': 'I don\'t know',
          'btw': 'by the way',
          'fyi': 'for your information',
          'asap': 'as soon as possible'
        };
        
        // Replace words with corrections
        let correctedText = text;
        for (const [error, correction] of Object.entries(corrections)) {
          const regex = new RegExp(`\\b${error}\\b`, 'gi');
          correctedText = correctedText.replace(regex, correction);
        }
        
        // Fix double spaces
        correctedText = correctedText.replace(/\s{2,}/g, ' ');
        
        return correctedText;
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
            
          case 'service-not-allowed':
            setErrorMessage('Speech service access was denied. Please reload and try again.');
            break;
            
          case 'bad-grammar':
            // Just log and continue - don't show error to user
            console.log('Grammar error detected, continuing with default grammar');
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
    const delay = RESTART_DELAY * Math.pow(1.5, Math.min(restartCount, 8));
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
    transcriptRef.current = '';
    onTranscriptUpdate('');
    
    // Reset continuity buffer
    continuityBufferRef.current = [];
    
    // Reset result history
    resultHistoryRef.current = [];
    
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
      
      // Reset buffer states
      continuityBufferRef.current = [];
      resultHistoryRef.current = [];
      
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
  
  // Manually restart transcription - can be useful if things get stuck
  const handleManualRestart = () => {
    if (recognitionState === 'initializing') return;
    
    stopTranscription();
    setTimeout(() => {
      startTranscription();
    }, 500);
  };
  
  // Create progress indicator component
  const ConfidenceIndicator = ({ score }) => {
    // Default to 0 if score is undefined
    const confidence = score || 0;
    let color = '#f44336'; // Red for low confidence
    let label = 'Low';
    
    if (confidence >= 0.7) {
      color = '#4caf50'; // Green for high confidence
      label = 'High';
    } else if (confidence >= 0.4) {
      color = '#ff9800'; // Orange for medium confidence
      label = 'Medium';
    }
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: color 
        }}></div>
        <span style={{ fontSize: '12px', color: '#666' }}>{label} clarity</span>
      </div>
    );
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
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
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
            
            <button 
              onClick={handleManualRestart} 
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reset Recognition
            </button>
          </div>
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
        justifyContent: 'space-between',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isListening ? (
            <MicIcon style={{ 
              color: '#FF4B4B', 
              animation: 'pulse 1.5s infinite',
              marginRight: '10px'
            }} />
          ) : (
            <MicOffIcon style={{ color: '#888', marginRight: '10px' }} />
          )}
          <span style={{ fontWeight: 500 }}>
            {isListening ? 'Transcribing...' : 'Transcription paused'}
          </span>
          
          {/* Shows confidence level when speaking */}
          {isListening && confidenceScore > 0 && (
            <div style={{ marginLeft: '15px' }}>
              <ConfidenceIndicator score={confidenceScore} />
            </div>
          )}
        </div>
        
        {/* Added manual controls */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {errorMessage && (
            <button
              onClick={handleManualRestart}
              style={{
                padding: '6px 12px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SettingsVoiceIcon style={{ fontSize: '16px', marginRight: '4px' }} />
              Restart
            </button>
          )}
        </div>
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
        {languageDetected !== 'en-US' && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Language:</span>
            {languageDetected}
          </div>
        )}
      </div>
      
      {/* Language selector - only show when not actively listening */}
      {!isListening && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Speech Recognition Language</div>
          <select 
            value={languageDetected}
            onChange={(e) => setLanguageDetected(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'en-US' ? 'English (US)' : 
                 lang === 'en-GB' ? 'English (UK)' :
                 lang === 'es-ES' ? 'Spanish' :
                 lang === 'fr-FR' ? 'French' :
                 lang === 'de-DE' ? 'German' :
                 lang === 'it-IT' ? 'Italian' :
                 lang === 'zh-CN' ? 'Chinese (Mandarin)' :
                 lang === 'ja-JP' ? 'Japanese' :
                 lang === 'ko-KR' ? 'Korean' :
                 lang === 'ru-RU' ? 'Russian' : lang}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Changing the language will restart speech recognition
          </div>
        </div>
      )}
      
      {/* Tips for better transcription */}
      {!isListening && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          fontSize: '13px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Tips for best transcription:</div>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>Speak clearly and at a moderate pace</li>
            <li>Use a good quality microphone if available</li>
            <li>Minimize background noise</li>
            <li>Complete your thoughts before pausing</li>
            <li>If you notice errors, try restarting the transcription</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PremiumSpeechTranscription;

