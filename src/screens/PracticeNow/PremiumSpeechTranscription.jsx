import React, { useEffect, useState, useRef } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

// Enhanced TranscriptionPopup component that handles both network and clarity issues
const TranscriptionPopup = ({ isOpen, message, onRestart, onClose }) => {
  if (!isOpen) return null;

  // Determine the type of alert (network or clarity)
  const isNetworkIssue = message && message.toLowerCase().includes('network');
  const isClarityIssue = message && message.toLowerCase().includes('clarity');
  
  // Choose icon color based on alert type
  const iconColor = isNetworkIssue ? '#ff9800' : '#f44336';
  const alertTitle = isNetworkIssue ? 'Network Connection Issue' : 
                    isClarityIssue ? 'Voice Clarity Issue' : 'Speech Recognition Issue';

  // Modified restart handler to clear transcript immediately before restarting
  const handleRestart = () => {
    // Force clear the transcripts directly before passing to the original handler
    onRestart();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      padding: '16px',
      zIndex: 1000,
      animation: 'popupFadeIn 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        color: iconColor
      }}>
        <WarningIcon style={{ marginRight: '8px', fontSize: '20px' }} />
        <span style={{ fontWeight: 500 }}>{alertTitle}</span>
      </div>

      <p style={{
        margin: '0 0 16px 0',
        fontSize: '14px',
        color: '#333'
      }}>
        {message || 'There was an issue with the speech recognition.'}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px'
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '6px 12px',
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Dismiss
        </button>
        <button
          onClick={handleRestart}
          style={{
            padding: '6px 12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <SettingsVoiceIcon style={{ fontSize: '16px', marginRight: '4px' }} />
          Restart
        </button>
      </div>
    </div>
  );
};

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
  const [showControls, setShowControls] = useState(false);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedMicId, setSelectedMicId] = useState('');
  const [micPermissionGranted, setMicPermissionGranted] = useState(null);
  const [autoRestartEnabled, setAutoRestartEnabled] = useState(true);
  const [deviceChangeDetected, setDeviceChangeDetected] = useState(false);
  const [lastResetTrigger, setLastResetTrigger] = useState(0);
  const [lastDeviceList, setLastDeviceList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [lowClarityDetected, setLowClarityDetected] = useState(false);
  const [lowClaritySamples, setLowClaritySamples] = useState(0);
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: navigator.onLine,
    lastChecked: Date.now()
  });

  // Refs
  const recognitionRef = useRef(null);
  const recognitionTimeoutRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const transcriptRef = useRef('');
  const resultHistoryRef = useRef([]);
  const continuityBufferRef = useRef([]);
  const audioStreamRef = useRef(null);
  const lastDeviceChangeTimeRef = useRef(0);
  const questionChangeTimeoutRef = useRef(null);
  const isActiveRef = useRef(isActive);
  const deviceCheckIntervalRef = useRef(null);
  const lowClarityTimeoutRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const popupDebounceTimeoutRef = useRef(null);
  const lastSpeechTimeRef = useRef(Date.now());
  const lastRestartTimeRef = useRef(0);

  // Inject popup styles
  useEffect(() => {
    // Initialize lastSpeechTimeRef with current time
    lastSpeechTimeRef.current = Date.now();
    // Initialize lastRestartTimeRef with current time
    lastRestartTimeRef.current = Date.now();

    const existingStyle = document.querySelector('style[data-popup-styles]');
    if (!existingStyle) {
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.setAttribute('data-popup-styles', '');
      styleSheet.innerText = `
        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  // Update isActive ref
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Constants
  const MAX_RESTART_ATTEMPTS = 15;
  const RESTART_DELAY = 800;
  const SPEECH_TIMEOUT = 10000; // Increase from 8000 to 10000 ms (10 seconds)
  const DEVICE_CHANGE_DEBOUNCE = 1000;
  const QUESTION_CHANGE_DELAY = 500;
  const DEVICE_CHECK_INTERVAL = 2000;
  const SUPPORTED_LANGUAGES = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'zh-CN', 'ja-JP', 'ko-KR', 'ru-RU'];
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

  // Modified network status monitor section
  useEffect(() => {
    const handleOnline = () => {
      try {
        console.log('Network connection restored by browser event');
        setNetworkStatus({
          isOnline: true,
          lastChecked: Date.now()
        });
        
        // Clear error message specifically for network errors
        if (errorMessage && errorMessage.toLowerCase().includes('network')) {
          setErrorMessage('');
        }
        
        // Directly close popup if it's a network error popup
        if (showPopup && popupMessage && popupMessage.toLowerCase().includes('network')) {
          console.log('Auto-closing network error popup on connection restore');
          handleClosePopup();
        }
      } catch (error) {
        console.error('Error in handleOnline:', error);
      }
    };
    
    const handleOffline = () => {
      try {
        console.log('Network connection lost by browser event');
        setNetworkStatus({
          isOnline: false,
          lastChecked: Date.now()
        });
        
        if (isListening && isActiveRef.current) {
          handleNetworkError();
        }
      } catch (error) {
        console.error('Error in handleOffline:', error);
      }
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const networkCheckInterval = setInterval(() => {
      try {
        if (isListening && isActiveRef.current) {
          const isOnlineNow = navigator.onLine;
          
          if (!networkStatus.isOnline && isOnlineNow) {
            console.log('Network connection restored by interval check');
            setNetworkStatus({
              isOnline: true,
              lastChecked: Date.now()
            });
            
            // Clear error message specifically for network errors
            if (errorMessage && errorMessage.toLowerCase().includes('network')) {
              setErrorMessage('');
            }
            
            // Always directly close the popup if it's a network error
            if (showPopup && popupMessage && popupMessage.toLowerCase().includes('network')) {
              handleClosePopup();
            }
          }
          else if (networkStatus.isOnline && !isOnlineNow) {
            console.log('Network connection lost by interval check');
            setNetworkStatus({
              isOnline: false,
              lastChecked: Date.now()
            });
            
            handleNetworkError();
          }
        }
      } catch (error) {
        console.error('Error in network check interval:', error);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(networkCheckInterval);
    };
  }, [isListening, networkStatus.isOnline, showPopup, popupMessage]);

  // Confidence indicator component
  const ConfidenceIndicator = ({ score }) => {
    const confidence = score || 0;
    let color = '#f44336';
    let label = 'Low';

    if (confidence >= 0.7) {
      color = '#4caf50';
      label = 'High';
    } else if (confidence >= 0.4) {
      color = '#ff9800';
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

  // Handle browser sleep/wake cycles
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isListening) {
        setTimeout(() => {
          if (!interimTranscript && isListening) {
            forceRestartRecognition();
          }
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isListening, interimTranscript]);

  // Compare audio device lists
  const compareDeviceLists = (oldList, newList) => {
    if (oldList.length !== newList.length) {
      console.log('Device list length changed:', oldList.length, '->', newList.length);
      return true;
    }

    const oldDeviceMap = new Map(oldList.map(device => [device.deviceId, device]));
    const newDeviceMap = new Map(newList.map(device => [device.deviceId, device]));

    for (const [id, device] of oldDeviceMap.entries()) {
      if (!newDeviceMap.has(id)) {
        console.log('Device removed:', device.label || id);
        return true;
      }
    }

    for (const [id, device] of newDeviceMap.entries()) {
      if (!oldDeviceMap.has(id)) {
        console.log('Device added:', device.label || id);
        return true;
      }
    }

    for (const [id, oldDevice] of oldDeviceMap.entries()) {
      const newDevice = newDeviceMap.get(id);
      if (newDevice && oldDevice.label !== newDevice.label) {
        console.log('Device label changed:', oldDevice.label, '->', newDevice.label);
        return true;
      }
    }

    return false;
  };

  // Monitor device changes
  const startDeviceChangeMonitoring = () => {
    if (deviceCheckIntervalRef.current) {
      clearInterval(deviceCheckIntervalRef.current);
    }

    deviceCheckIntervalRef.current = setInterval(async () => {
      try {
        if (!isListening || !isActiveRef.current) return;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(device => device.kind === 'audioinput');

        if (compareDeviceLists(lastDeviceList, mics)) {
          console.log('Device change detected by interval check!');
          handleDeviceChange(mics);
        }

        setLastDeviceList(mics);
      } catch (err) {
        console.error('Error checking devices in interval:', err);
      }
    }, DEVICE_CHECK_INTERVAL);

    return () => {
      if (deviceCheckIntervalRef.current) {
        clearInterval(deviceCheckIntervalRef.current);
      }
    };
  };

  // Updated showRestartPopup function with consistent behavior
  const showRestartPopup = (message) => {
    // Clear any existing timeouts
    if (popupDebounceTimeoutRef.current) {
      clearTimeout(popupDebounceTimeoutRef.current);
      popupDebounceTimeoutRef.current = null;
    }
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }

    // Show popup immediately (no debounce)
    setPopupMessage(message);
    setShowPopup(true);

    // Auto-dismiss after 10 seconds for all alert types
    popupTimeoutRef.current = setTimeout(() => {
      handleClosePopup();
    }, 10000);
  };

  // Enhanced handleClosePopup with network check
  const handleClosePopup = () => {
    // Clear timeouts
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
    if (popupDebounceTimeoutRef.current) {
      clearTimeout(popupDebounceTimeoutRef.current);
      popupDebounceTimeoutRef.current = null;
    }
    
    // Hide the popup
    setShowPopup(false);
    setPopupMessage('');
    
    // Safely check all conditions before restarting
    if (isListening && isActiveRef.current && recognitionRef.current) {
      try {
        setTimeout(() => {
          if (recognitionRef.current && isActiveRef.current) {
            forceRestartRecognition();
          }
        }, 300);
      } catch (error) {
        console.error('Error restarting after popup close:', error);
        // Fallback error handling
        setErrorMessage('Error restarting transcription. Please try manually restarting.');
        setRecognitionState('error');
      }
    }
  };

  // Improved handleNetworkError function
  const handleNetworkError = () => {
    setErrorMessage('Network error. Please check your internet connection.');
    showRestartPopup('Network error detected. Transcription will resume automatically when your connection is restored.');
    
    // Set up a more reliable check for network restoration
    const checkNetworkInterval = setInterval(() => {
      if (navigator.onLine) {
        clearInterval(checkNetworkInterval);
        if (isListening && isActiveRef.current) {
          console.log('Network connection restored, restarting transcription');
          
          // Clear error message specifically for network errors
          if (errorMessage && errorMessage.toLowerCase().includes('network')) {
            setErrorMessage('');
          }
          
          // Directly close the popup
          if (showPopup && popupMessage && popupMessage.toLowerCase().includes('network')) {
            handleClosePopup();
          }
        }
      }
    }, 2000); // Check more frequently
    
    // Safety cleanup
    setTimeout(() => {
      clearInterval(checkNetworkInterval);
    }, 120000);
  };

  // Handle device change
  const handleDeviceChange = async (newDevices = null) => {
    console.log('Audio devices changed, updating device list');

    const now = Date.now();
    if (now - lastDeviceChangeTimeRef.current < DEVICE_CHANGE_DEBOUNCE) {
      console.log('Debouncing device change event');
      return;
    }
    lastDeviceChangeTimeRef.current = now;

    try {
      setDeviceChangeDetected(true);

      let mics;
      if (newDevices) {
        mics = newDevices;
      } else {
        const devices = await navigator.mediaDevices.enumerateDevices();
        mics = devices.filter(device => device.kind === 'audioinput');
      }
      setAudioDevices(mics);
      setLastDeviceList(mics);

      let newMicId = selectedMicId;
      const currentMicStillAvailable = mics.some(device => device.deviceId === selectedMicId);
      if (!currentMicStillAvailable && mics.length > 0) {
        console.log('Currently selected microphone is no longer available');
        const newDefaultMic = mics.find(device => device.deviceId === 'default') || mics[0];
        newMicId = newDefaultMic.deviceId;
        setSelectedMicId(newMicId);

        showRestartPopup('Your microphone is no longer available. Switching to ' +
                        (newDefaultMic.label || 'default microphone'));
      } else if (mics.length > 0 && !newMicId) {
        const defaultDevice = mics.find(device => device.deviceId === 'default' || device.deviceId === '');
        newMicId = defaultDevice ? defaultDevice.deviceId : mics[0].deviceId;
        setSelectedMicId(newMicId);
      }

      if (isListening && currentMicStillAvailable && autoRestartEnabled) {
        showRestartPopup('Audio device changed. Would you like to restart transcription?');
        forceRestartRecognition();
      }
    } catch (err) {
      console.error('Error handling device change:', err);
    }
  };

  // Force restart recognition
  const forceRestartRecognition = () => {

    // Record restart time to provide a grace period
    lastRestartTimeRef.current = Date.now();
    // console.log('Setting restart time for grace period:', lastRestartTimeRef.current);

    setShowPopup(false);

    // ALWAYS clear the transcript when restarting, not just for "no speech detected"
    setTranscript('');
    setInterimTranscript('');
    transcriptRef.current = '';
    onTranscriptUpdate('');

    clearSilenceTimeout();
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    if (questionChangeTimeoutRef.current) {
      clearTimeout(questionChangeTimeoutRef.current);
    }
    if (lowClarityTimeoutRef.current) {
      clearTimeout(lowClarityTimeoutRef.current);
    }
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    if (popupDebounceTimeoutRef.current) {
      clearTimeout(popupDebounceTimeoutRef.current);
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch (e) {
      console.log('Error stopping recognition during force restart:', e);
    }

    setTimeout(() => {
      if (recognitionRef.current && isActiveRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          setRecognitionState('listening');
          resetSilenceTimeout();

          if (deviceChangeDetected) {
            setTimeout(() => {
              setDeviceChangeDetected(false);
            }, 2000);
          }
        } catch (e) {
          console.error('Failed to restart recognition:', e);

          if (e.name === 'InvalidStateError') {
            console.log('Recognition is already running, updating state to match');
            setIsListening(true);
            setRecognitionState('listening');
          } else {
            setErrorMessage('Failed to restart recognition. Please try again.');
            setTimeout(() => {
              if (recognitionRef.current && isActiveRef.current) {
                try {
                  console.log('Second attempt to start recognition');
                  recognitionRef.current.start();
                  setIsListening(true);
                  setRecognitionState('listening');
                } catch (innerError) {
                  console.error('Second attempt to restart recognition failed:', innerError);
                  showRestartPopup('Multiple restart attempts failed. Please try restarting manually.');
                }
              }
            }, 1000);
          }
        }
      }
    }, 300);
  };

  // Reset silence timeout
  const resetSilenceTimeout = () => {
    clearSilenceTimeout();

    if (isListening) {
      // Add more debugging
      console.log('Setting silence timeout. Current state:', {
        interimTranscript: interimTranscript,
        confidenceScore: confidenceScore,
        timeSinceLastSpeech: Date.now() - lastSpeechTimeRef.current,
        timeSinceLastRestart: Date.now() - lastRestartTimeRef.current,
        isListening: isListening
      });

      recognitionTimeoutRef.current = setTimeout(() => {
        
        // Calculate time since last detected speech
        const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current;
        // console.log(`Time since last speech: ${timeSinceLastSpeech}ms`);
        
        // Calculate time since last restart
        const timeSinceLastRestart = Date.now() - lastRestartTimeRef.current;
        // console.log(`Time since last restart: ${timeSinceLastRestart}ms`);
        
        // If we're in the grace period after restart (15 seconds), don't show popup
        if (timeSinceLastRestart < 15000) {
          resetSilenceTimeout();
          return;
        }
        
        // More aggressive approach: If interim transcript exists at all, consider it active speech
        if (interimTranscript && interimTranscript.length > 0) {
          lastSpeechTimeRef.current = Date.now();
          resetSilenceTimeout();
          return;
        }
        
        // REDUCE the time threshold to 3 seconds (was 5 seconds)
        if (timeSinceLastSpeech < 3000) {
          resetSilenceTimeout();
          return;
        }
        
        // Force the confidence score to zero after silence - this helps with future checks
        if (confidenceScore > 0) {
          setConfidenceScore(0);
        }
        
        // Only show popup if we're still listening and not in grace period
        if (isListening && recognitionRef.current && isActiveRef.current) {
          try {
            showRestartPopup('No speech detected for a while. Would you like to restart?');
          } catch (e) {
            console.error('Error handling silence timeout:', e);
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

  // Handle recognition failure
  const handleRecognitionFailure = () => {
    if (restartCount >= MAX_RESTART_ATTEMPTS) {
      setErrorMessage('Speech recognition has failed multiple times. Please try manually restarting or selecting a different microphone.');
      setIsListening(false);
      setRecognitionState('error');
      return;
    }

    showRestartPopup('Speech recognition interrupted. Would you like to restart?');
  };

  // Low clarity detection
  useEffect(() => {
    if (!isListening || confidenceScore === 0) return;

    if (confidenceScore < 0.3) {
      setLowClaritySamples(prev => prev + 1);
      if (lowClaritySamples >= 3 && !lowClarityDetected) {
        setLowClarityDetected(true);
        showRestartPopup('Low voice clarity detected. Your speech may not be recognized correctly. Transcription will restart automatically.');
        
        if (lowClarityTimeoutRef.current) {
          clearTimeout(lowClarityTimeoutRef.current);
        }
        lowClarityTimeoutRef.current = setTimeout(() => {
          setLowClarityDetected(false);
          setLowClaritySamples(0);
        }, 20000);
      }
    } else {
      setLowClaritySamples(prev => Math.max(0, prev - 1));
    }

    return () => {
      if (lowClarityTimeoutRef.current) {
        clearTimeout(lowClarityTimeoutRef.current);
      }
    };
  }, [confidenceScore, isListening, lowClaritySamples, lowClarityDetected]);

  // Periodic silence check
  useEffect(() => {
    // Only run this when listening
    if (!isListening) return;

    
    // Check every 2 seconds if we're truly silent
    const silenceMonitorInterval = setInterval(() => {
      const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current;
      const timeSinceLastRestart = Date.now() - lastRestartTimeRef.current;
      
      // console.log(`Silence monitor check: ${timeSinceLastSpeech}ms since last speech, ${timeSinceLastRestart}ms since last restart`);
      
      // Only show popup if not in grace period (15 seconds after restart)
      if (timeSinceLastRestart > 15000 && timeSinceLastSpeech > 8000 && !showPopup && isListening) {
        showRestartPopup('Long period without speech detected. Would you like to restart?');
      }
    }, 2000);
    
    return () => {
      clearInterval(silenceMonitorInterval);
    };
  }, [isListening, lastSpeechTimeRef.current]);

  // Speech reset functions
  const forceSpeechReset = () => {
    
    // Reset the last speech time
    lastSpeechTimeRef.current = Date.now() - 6000; // Set it to 6 seconds ago
    
    // Reset the silence timeout
    resetSilenceTimeout();
    
    // Reset confidence score to zero
    setConfidenceScore(0);
  };

  const debugForceSilence = () => {
    lastSpeechTimeRef.current = Date.now() - 10000; // Set it to 10 seconds ago
    resetSilenceTimeout();
  };

  // Check microphone permission and devices
  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(device => device.kind === 'audioinput');
        setAudioDevices(mics);
        setLastDeviceList(mics);

        if (mics.length > 0 && mics[0].label) {
          setMicPermissionGranted(true);

          const savedMicId = localStorage.getItem('preferredMic');
          if (savedMicId && mics.some(m => m.deviceId === savedMicId)) {
            setSelectedMicId(savedMicId);
          } else if (mics.length > 0) {
            setSelectedMicId(mics[0].deviceId);
          }
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setMicPermissionGranted(true);

        const devicesWithLabels = await navigator.mediaDevices.enumerateDevices();
        const micsWithLabels = devicesWithLabels.filter(device => device.kind === 'audioinput');
        setAudioDevices(micsWithLabels);
        setLastDeviceList(micsWithLabels);

        if (micsWithLabels.length > 0) {
          const savedMicId = localStorage.getItem('preferredMic');
          if (savedMicId && micsWithLabels.some(m => m.deviceId === savedMicId)) {
            setSelectedMicId(savedMicId);
          } else {
            setSelectedMicId(micsWithLabels[0].deviceId);
          }
        }
      } catch (err) {
        console.error('Error accessing microphone:', err);
        setMicPermissionGranted(false);
        setErrorMessage('Microphone access denied. Please enable microphone access in your browser settings.');
      }
    };

    checkMicPermission();

    const cleanupInterval = startDeviceChangeMonitoring();

    const handleDeviceChangeEvent = () => {
      console.log('Device change event fired by browser');
      handleDeviceChange();
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChangeEvent);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChangeEvent);

      if (audioStreamRef.current) {
        try {
          audioStreamRef.current.getTracks().forEach(track => track.stop());
        } catch (err) {
          console.error('Error stopping audio tracks:', err);
        }
      }

      clearSilenceTimeout();
      
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      
      if (questionChangeTimeoutRef.current) {
        clearTimeout(questionChangeTimeoutRef.current);
        questionChangeTimeoutRef.current = null;
      }
      
      if (deviceCheckIntervalRef.current) {
        clearInterval(deviceCheckIntervalRef.current);
        deviceCheckIntervalRef.current = null;
      }
      
      if (lowClarityTimeoutRef.current) {
        clearTimeout(lowClarityTimeoutRef.current);
        lowClarityTimeoutRef.current = null;
      }
      
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
        popupTimeoutRef.current = null;
      }
      
      if (popupDebounceTimeoutRef.current) {
        clearTimeout(popupDebounceTimeoutRef.current);
        popupDebounceTimeoutRef.current = null;
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        } catch (e) {
          console.log('Error during recognition cleanup:', e);
        }
      }
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (micPermissionGranted === false) {
      setRecognitionState('error');
      return;
    }

    if (micPermissionGranted === null) {
      return;
    }

    setRecognitionState('initializing');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    if (!SpeechRecognition) {
      setRecognitionState('error');
      setErrorMessage('Your browser does not support speech recognition. Please try Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 5;
      recognition.lang = languageDetected;

      if (SpeechGrammarList) {
        const speechRecognitionList = new SpeechGrammarList();
        let grammarWords = PHRASE_LIST.join(' | ');
        const grammar = `#JSGF V1.0; grammar interview; public <interview> = ${grammarWords};`;
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
      }

      recognition.onresult = (event) => {
        try {
          // Record last speech time whenever we get any result
          lastSpeechTimeRef.current = Date.now();
          
          // Reset silence timeout on ANY result (interim or final)
          resetSilenceTimeout();
          
          let finalTranscript = '';
          let currentInterim = '';
          let highestConfidence = 0;
          let shouldProcessResults = false;

          let resultAlternatives = [];

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];

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

            if (confidence > highestConfidence) {
              highestConfidence = confidence;
            }

            if (result.isFinal) {
              let bestTranscript = chooseBestTranscript(result);

              let processedText = bestTranscript;

              continuityBufferRef.current.push(processedText);
              if (continuityBufferRef.current.length > 5) {
                continuityBufferRef.current.shift();
              }

              processedText = processedText.replace(/^(\s*\w)/, (match) => match.toUpperCase());
              processedText = processedText.replace(/\.\s+(\w)/g, (match) => match.toUpperCase());
              processedText = processedText.replace(/\?\s+(\w)/g, (match) => match.toUpperCase());
              processedText = processedText.replace(/!\s+(\w)/g, (match) => match.toUpperCase());

              processedText = fixCommonErrors(processedText);

              if (!/[.?!,;:]$/.test(processedText)) {
                processedText += '.';
              }

              finalTranscript += processedText + ' ';
            } else {
              currentInterim += transcript;
            }
          }

          if (currentInterim) {
            currentInterim = currentInterim.trim();
            currentInterim = currentInterim.replace(/^(\s*\w)/, (match) => match.toUpperCase());
            setInterimTranscript(currentInterim);
          }

          if (finalTranscript) {
            setTranscript(prev => {
              const newTranscript = prev + finalTranscript;
              transcriptRef.current = newTranscript;
              onTranscriptUpdate(newTranscript);
              return newTranscript;
            });
          }

          if (shouldProcessResults && resultAlternatives.length > 0) {
            processResultAlternatives(resultAlternatives);
          }

          setConfidenceScore(highestConfidence);
        } catch (error) {
          console.error('Error processing speech recognition result:', error);
          resetSilenceTimeout();
        }
      };

      recognition.onend = () => {
        try {

          if (isListening && isActiveRef.current) {
            restartRecognition();
          } else {
            setRecognitionState('ready');
          }
        } catch (error) {
          console.error('Error in recognition.onend handler:', error);
          // Fallback to safe state
          setRecognitionState('ready');
        }
      };

      recognition.onspeechstart = () => {
        lastSpeechTimeRef.current = Date.now();
        resetSilenceTimeout();
      };

      recognition.onspeechend = () => {
        // We don't update lastSpeechTime here because we want to
        // give a buffer period after speech ends before showing the popup
        resetSilenceTimeout();
      };

      recognition.onsoundstart = () => {
        resetSilenceTimeout();
      };

      recognition.onnomatch = () => {
        console.log('Speech recognized but no match found');
      };

      recognition.onaudiostart = () => {
        console.log();
      };

      recognition.onaudioend = () => {

        if (isListening && autoRestartEnabled) {

          navigator.mediaDevices.enumerateDevices()
            .then(devices => {
              const mics = devices.filter(device => device.kind === 'audioinput');
              if (compareDeviceLists(lastDeviceList, mics)) {
                console.log('Device list changed after audio end event - handling as device change');
                handleDeviceChange(mics);
              } else {
                console.log('No device list change detected after audio end - using timeout recovery');
                setTimeout(() => {
                  if (isListening && isActiveRef.current) {
                    console.log('No audio recovery detected after timeout, performing force restart');
                    forceRestartRecognition();
                  }
                }, 1000);
              }
            })
            .catch(err => {
              console.error('Error checking devices after audio end:', err);
              forceRestartRecognition();
            });
        }
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error, event);

        switch (event.error) {
          case 'no-speech':
            console.log('No speech detected, will auto-restart if needed');
            break;

          case 'audio-capture':
            setErrorMessage('Microphone error. Please check your microphone connection or try selecting a different microphone.');
            showRestartPopup('Microphone connection issue detected. Transcription will restart automatically.');
            
            if (autoRestartEnabled) {
              navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                  const mics = devices.filter(device => device.kind === 'audioinput');
                  if (compareDeviceLists(lastDeviceList, mics)) {
                    // console.log('Device list changed after audio-capture error - handling as device change');
                    handleDeviceChange(mics);
                  } else {
                    console.log();
                    // Let the popup auto-close trigger the restart
                  }
                })
                .catch(err => {
                  console.error('Error checking devices after audio-capture error:', err);
                  // Let the popup auto-close trigger the restart
                });
            }
            break;

          case 'not-allowed':
            setErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
            setMicPermissionGranted(false);
            break;

          case 'aborted':
            console.log('Recognition aborted');
            break;

          case 'network':
            handleNetworkError();
            break;

          case 'service-not-allowed':
            setErrorMessage('Speech service access was denied. Please reload and try again.');
            break;

          case 'bad-grammar':
            console.log('Grammar error detected, continuing with default grammar');
            break;

          default:
            setErrorMessage(`Recognition error: ${event.error}`);
            showRestartPopup(`Speech recognition issue: ${event.error}. Transcription will restart automatically.`);
        }

        // Don't handle failures for network errors - they are managed by the handleNetworkError function
        // Don't auto-restart for permission issues
        if (isListening && isActiveRef.current && 
            event.error !== 'not-allowed' && 
            event.error !== 'network') {
          // Let the popup auto-close trigger the restart for other errors
        }
      };

      recognitionRef.current = recognition;
      setRecognitionState('ready');

      if (isActive) {
        setTimeout(() => {
          try {
            recognition.start();
            setIsListening(true);
            setRecognitionState('listening');
            console.log('Initial recognition started');
          } catch (e) {
            console.error('Error starting initial recognition:', e);
          }
        }, 500);
      }

    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setRecognitionState('error');
      setErrorMessage(`Failed to initialize speech recognition: ${error.message}`);
    }

    return () => {
      clearSilenceTimeout();
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (questionChangeTimeoutRef.current) {
        clearTimeout(questionChangeTimeoutRef.current);
      }
      if (deviceCheckIntervalRef.current) {
        clearInterval(deviceCheckIntervalRef.current);
      }
      if (lowClarityTimeoutRef.current) {
        clearTimeout(lowClarityTimeoutRef.current);
      }
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
      if (popupDebounceTimeoutRef.current) {
        clearTimeout(popupDebounceTimeoutRef.current);
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Error during recognition cleanup:', e);
        }
      }
    };
  }, [micPermissionGranted, languageDetected, isActive]);

  // Helper functions for speech recognition
  const chooseBestTranscript = (result) => {
    if (result.length === 1) {
      return result[0].transcript;
    }

    let alternatives = [];
    for (let i = 0; i < result.length; i++) {
      alternatives.push({
        transcript: result[i].transcript,
        confidence: result[i].confidence
      });
    }

    alternatives.sort((a, b) => b.confidence - a.confidence);

    if (alternatives[0].confidence > alternatives[1].confidence * 1.2) {
      return alternatives[0].transcript;
    }

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

  const processResultAlternatives = (resultAlternatives) => {
    resultHistoryRef.current = [...resultHistoryRef.current, ...resultAlternatives];
    if (resultHistoryRef.current.length > 5) {
      resultHistoryRef.current = resultHistoryRef.current.slice(-5);
    }
  };

  const fixCommonErrors = (text) => {
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
      'well': 'we\'ll',
      'youre': 'you\'re',
      'youll': 'you\'ll',
      'youd': 'you\'d',
      'youve': 'you\'ve',
      'shes': 'she\'s',
      'shell': 'she\'ll',
      'shed': 'she\'d',
      'hes': 'he\'s',
      'hell': 'he\'ll',
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
      'id': 'I\'d',
      'ill': 'I\'ll',
      'idk': 'I don\'t know',
      'btw': 'by the way',
      'fyi': 'for your information',
      'asap': 'as soon as possible'
    };

    let correctedText = text;
    for (const [error, correction] of Object.entries(corrections)) {
      const regex = new RegExp(`\\b${error}\\b`, 'gi');
      correctedText = correctedText.replace(regex, correction);
    }

    correctedText = correctedText.replace(/\s{2,}/g, ' ');

    return correctedText;
  };

  // Handle active state changes
  useEffect(() => {
    if (recognitionState !== 'ready' && recognitionState !== 'listening' && recognitionState !== 'error') return;

    if (isActive && !isListening) {
      // console.log('isActive changed to true but not listening - starting transcription');
      startTranscription();
    } else if (!isActive && isListening) {
      // console.log('isActive changed to false but still listening - stopping transcription');
      stopTranscription();
    }
  }, [isActive, isListening, recognitionState]);

  // Reset transcript on question change
  useEffect(() => {
    if (resetTranscription === lastResetTrigger) return;

    setLastResetTrigger(resetTranscription);

    console.log(`Question/reset triggered. Question index: ${questionIndex}, Reset trigger: ${resetTranscription}`);

    if (recognitionState === 'idle' || recognitionState === 'initializing') {
      console.log('Recognition not initialized yet, waiting...');
      return;
    }

    setTranscript('');
    setInterimTranscript('');
    transcriptRef.current = '';
    onTranscriptUpdate('');

    continuityBufferRef.current = [];
    resultHistoryRef.current = [];

    setRestartCount(0);

    if (questionChangeTimeoutRef.current) {
      clearTimeout(questionChangeTimeoutRef.current);
    }

    if (isActive) {
      console.log('Question changed - forcing recognition restart');
      questionChangeTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current) {
          forceRestartRecognition();
        }
      }, QUESTION_CHANGE_DELAY);
    }

    return () => {
      if (questionChangeTimeoutRef.current) {
        clearTimeout(questionChangeTimeoutRef.current);
      }
    };
  }, [questionIndex, resetTranscription]);

  // Handle microphone change
  const handleMicrophoneChange = (deviceId) => {
    console.log('Changing microphone to:', deviceId);
    localStorage.setItem('preferredMic', deviceId);
    setSelectedMicId(deviceId);

    if (isListening) {
      handleManualRestart();
    }
  };

  // Request microphone access
  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setMicPermissionGranted(true);

      const devicesWithLabels = await navigator.mediaDevices.enumerateDevices();
      const micsWithLabels = devicesWithLabels.filter(device => device.kind === 'audioinput');
      setAudioDevices(micsWithLabels);

      if (micsWithLabels.length > 0) {
        setSelectedMicId(micsWithLabels[0].deviceId);
      }

      setErrorMessage('');
    } catch (err) {
      console.error('Error requesting microphone access:', err);
      setMicPermissionGranted(false);
      setErrorMessage('Unable to access microphone. Please check your browser settings and ensure you have a working microphone connected.');
    }
  };

  // Start transcription
  const startTranscription = () => {
    if (recognitionState !== 'ready' && recognitionState !== 'error') return;

    if (micPermissionGranted === false) {
      requestMicrophoneAccess();
      return;
    }

    try {
      if (recognitionState === 'error') {
        setErrorMessage('');
      }

      setRestartCount(0);

      continuityBufferRef.current = [];
      resultHistoryRef.current = [];

      setDeviceChangeDetected(false);

      recognitionRef.current.start();
      setIsListening(true);
      setRecognitionState('listening');

      resetSilenceTimeout();
    } catch (e) {
      console.error('Error starting recognition:', e);

      if (e.name === 'InvalidStateError') {
        setIsListening(true);
        setRecognitionState('listening');
      } else {
        setErrorMessage(`Failed to start: ${e.message}`);
        setRecognitionState('error');
      }
    }
  };

  // Stop transcription
  const stopTranscription = () => {
    if (!isListening) return;

    clearSilenceTimeout();
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
    if (questionChangeTimeoutRef.current) {
      clearTimeout(questionChangeTimeoutRef.current);
    }
    if (lowClarityTimeoutRef.current) {
      clearTimeout(lowClarityTimeoutRef.current);
    }
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    if (popupDebounceTimeoutRef.current) {
      clearTimeout(popupDebounceTimeoutRef.current);
    }

    try {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log('Speech recognition stopped by user');
    } catch (e) {
      console.error('Error stopping recognition:', e);

      setIsListening(false);
      setRecognitionState('error');
      setErrorMessage(`Failed to stop: ${e.message}`);
    }
  };

  // Toggle transcription
  const toggleTranscription = () => {
    if (recognitionState === 'initializing') return;

    if (isListening) {
      stopTranscription();
    } else {
      startTranscription();
    }
  };

  // Manual restart
  const handleManualRestart = () => {
    if (recognitionState === 'initializing') return;

    stopTranscription();
    setTimeout(() => {
      startTranscription();
    }, 500);
  };

  // Restart recognition
  const restartRecognition = () => {
    if (!recognitionRef.current) {
      console.error('Recognition reference is null in restartRecognition');
      setRecognitionState('error');
      setErrorMessage('Speech recognition reference is missing. Please refresh the page.');
      return;
    }
    
    if (!isListening || !isActiveRef.current) return;

    try {
      setRestartCount(prev => prev + 1);

      recognitionRef.current.start();
      setRecognitionState('listening');
      console.log('Recognition restarted');

      resetSilenceTimeout();
    } catch (e) {
      console.error('Error restarting recognition:', e);

      if (e.name === 'InvalidStateError') {
        console.log('Recognition is already running');
      } else {
        setErrorMessage(`Failed to restart: ${e.message}`);
        setRecognitionState('error');
      }
    }
  };

  // Render permission request state
  if (micPermissionGranted === false) {
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
            <h3 style={{ margin: 0, fontSize: '16px' }}>Microphone Access Required</h3>
          </div>

          <p style={{ margin: '10px 0', color: '#333' }}>
            Microphone access is required for speech recognition. Please allow microphone access in your browser settings.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button
              onClick={requestMicrophoneAccess}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <KeyboardVoiceIcon />
              Request Microphone Access
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      backgroundColor: '#fafafa',
      position: 'relative'
    }}>
      {/* Device change notification */}
      {deviceChangeDetected && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ff9800',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 100
        }}>
          Device changing...
        </div>
      )}

      {/* Popup component */}
      <TranscriptionPopup
        isOpen={showPopup}
        message={popupMessage}
        onRestart={forceRestartRecognition}
        onClose={handleClosePopup}
      />

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
              color: deviceChangeDetected ? '#ff9800' : '#FF4B4B',
              marginRight: '10px'
            }} />
          ) : (
            <MicOffIcon style={{ color: '#888', marginRight: '10px' }} />
          )}
          <span style={{ fontWeight: 500 }}>
            {deviceChangeDetected ? 'Audio device changed - auto-restarting...' :
             isListening ? 'Transcribing...' : 'Transcription paused'}
          </span>

          {isListening && confidenceScore > 0 && (
            <div style={{ marginLeft: '15px' }}>
              <ConfidenceIndicator score={confidenceScore} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              padding: '6px 12px',
              backgroundColor: showControls ? '#f5f5f5' : '#fff',
              color: '#555',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {showControls ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>
      </div>

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
          lineHeight: '1.6',
          fontSize: '15px'
        }}>
          {transcript ? (
            <div style={{ color: '#333' }}>{transcript}</div>
          ) : (
            <div style={{ color: '#888', fontStyle: 'italic' }}>
              {deviceChangeDetected ? 'Audio device changed, restarting microphone...' :
               isListening ? 'Listening... speak now' : 'Your speech will appear here...'}
            </div>
          )}

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

      {showControls && (
        <>
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>Auto-restart when audio devices change</div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={autoRestartEnabled}
                  onChange={() => setAutoRestartEnabled(!autoRestartEnabled)}
                  style={{ marginRight: '5px' }}
                />
                {autoRestartEnabled ? 'Enabled' : 'Disabled'}
              </label>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              When enabled, transcription will automatically restart when unplugging headphones or changing audio devices
            </div>
          </div>

          {audioDevices.length > 0 && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Select Microphone</div>
              <select
                value={selectedMicId}
                onChange={(e) => handleMicrophoneChange(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                If transcription stops working, try selecting your current microphone here
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            fontSize: '13px',
            color: '#666',
            marginTop: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Status:</span>
              {deviceChangeDetected ? 'Restarting' : isActive ? 'Active' : 'Inactive'}
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

          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Troubleshooting Tips:</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Audio should automatically restart when disconnecting earphones</li>
              <li>If automatic restart fails, use the 'Restart' option in the popup</li>
              <li>Try selecting a different microphone from the dropdown above</li>
              <li>Speak clearly and at a moderate pace</li>
              <li>Minimize background noise</li>
            </ul>
          </div>

          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            borderRadius: '4px',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Debug Tools:</div>
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>
              Last speech detected: {Math.round((Date.now() - lastSpeechTimeRef.current)/1000)}s ago
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={forceSpeechReset}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Force Reset Speech
              </button>
              <button
                onClick={debugForceSilence}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Test Silence Detection
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PremiumSpeechTranscription;
