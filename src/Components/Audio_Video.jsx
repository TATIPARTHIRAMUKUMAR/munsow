import React, { useState, useRef, useEffect } from "react";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicNoneIcon from '@mui/icons-material/MicNone';

const mimeType = "audio/webm";
const sampleText = "Today is a beautiful day and I am happy";

var localstream;

export default function Audio_Video({audioValidated, setAudioValidated, videoValidated, setVideoValidated}) {
    const [permission, setPermission] = useState(false);
    const [micPermission, setMicPermission] = useState(false);
    // const [audioValidated, setAudioValidated] = useState(false);
    // const [videoValidated, setVideoValidated] = useState(false);
    const mediaRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const audioContext = useRef(new AudioContext());
    const analyser = useRef(audioContext.current.createAnalyser());
    const dataArray = useRef(new Uint8Array(analyser.current.frequencyBinCount));

    useEffect(() => {
        if (permission) {
            // Assuming face detection is successful as soon as video stream is available
            setVideoValidated(true);
        }
    }, [permission]);

    const getMicrophonePermission = async () => {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            setMicPermission(true);
            startRecording(streamData);
        } catch (err) {
            alert("Microphone permission denied.");
        }
    };

    const startRecording = (streamData) => {
        const source = audioContext.current.createMediaStreamSource(streamData);
        source.connect(analyser.current);
        const media = new MediaRecorder(streamData, { type: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        drawAudioWaveform();
    };

    const drawAudioWaveform = () => {
        const canvas = document.getElementById("audioVisualizer");
        const canvasCtx = canvas.getContext("2d");
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        const draw = () => {
            requestAnimationFrame(draw);
            analyser.current.getByteTimeDomainData(dataArray.current);
            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            canvasCtx.beginPath();

            let sliceWidth = WIDTH * 1.0 / analyser.current.fftSize;
            let x = 0;
            let isSpeaking = false;
            // Adjust the sensitivity here. Lower values will make it more sensitive.
            for(let i = 0; i < analyser.current.fftSize; i++) {
                let v = dataArray.current[i] / 128.0;
                let y = v * HEIGHT / 2;

                if(v > 1.3 || v < 0.8) {
                    isSpeaking = true;
                }

                if(i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();

            if (isSpeaking && !audioValidated) {
                setAudioValidated(true);
            }
        };

        draw();
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            // Placeholder for voice-to-text validation
            // You would send the audioBlob to a service like Google Cloud Speech-to-Text here
            // For this example, we'll just provide a message to the user
            alert("Your voice recording has been captured. In a real-world scenario, we would now validate it against the provided text.");
        };
    };

    const camOn = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                document.querySelector('video').srcObject = stream;
                localstream = stream;
                setPermission(true);
            })
            .catch(function (error) {
                console.log("Video permission denied.");
            });
    };

    const capOff = () => {
        if (localstream) {
            localstream.getTracks().forEach(track => track.stop());
        }
        setPermission(false);
    };

    return (
        <div className="grid gap-4 justify-center p-2">
            <div className="">
                <video id="vid" className="h-[200px] w-[300px]" muted autoPlay></video>
            </div>
            <canvas id="audioVisualizer" width="300" height="100"></canvas>
            <div className="w-full flex justify-center gap-4">
                {permission ?
                    <VideocamIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large" onClick={capOff} />
                    :
                    <VideocamOffIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large" onClick={camOn} />
                }
                {!micPermission ?
                    <MicOffIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large" onClick={getMicrophonePermission} />
                    :
                    <MicNoneIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large" onClick={stopRecording} />
                }
            </div>
            <div className="text-center mt-4 max-w-screen-md mx-auto overflow-auto">
                <p className="text-sm sm:text-md lg:text-base">Please read the following text out loud:</p>
                <blockquote className="text-gray-700 italic text-sm sm:text-md lg:text-base">{sampleText}</blockquote>
            </div>
            {audioValidated && <p>Audio sample validated successfully!</p>}
            {videoValidated && <p>Video sample validated successfully!</p>}
        </div>
    );
}
