import React from "react";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useState } from "react";
import MicOffIcon from '@mui/icons-material/MicOff';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { useRef } from "react";
const mimeType = "audio/webm";


var localstream;

export default function Audio_Video() {
    const [ permission,setPermission  ] = useState(false)
    const [ micPermission,setMicPermission  ] = useState(false)
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
  
    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setMicPermission(true);
                setStream(streamData);
                startRecording();
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    }
    
  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    console.log(media)
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
       if (typeof event.data === "undefined") return;
       if (event.data.size === 0) return;
       localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    console.log(    mediaRecorder.current)
    setMicPermission(false)
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
       const audioBlob = new Blob(audioChunks, { type: mimeType });
       const audioUrl = URL.createObjectURL(audioBlob);
       setAudio(audioUrl);
       setAudioChunks([]);
    };
  };

function camOn(){
if (navigator.mediaDevices.getUserMedia !== null) {
  var options = { 
    video:true, 
    audio:true 
  };  
  navigator.getUserMedia(options, function(stream) { 
    vid.srcObject = stream;
    localstream = stream;
    vid.play();
    console.log(stream,"streaming");
    setPermission(true);
  }, function(e) { 
    console.log("background error : " + e.name);
  }); 
}
}
function capOff() {
  //clearInterval(theDrawLoop);
  //ExtensionData.vidStatus = 'off';
  vid.pause();
  vid.src = "";
  localstream.getTracks().forEach(x=>x.stop());
  setPermission(false);
  console.log("all capture devices off");
}
  return <div className="grid gap-4 justify-center p-2">
  <div className="" >
        <video id="vid" className="h-[200px] w-[300px] " muted  autoplay  ></video>
  </div>
  
  <div className="w-full flex justify-center gap-4 " >
    
    {
        permission ? 
    <VideocamIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large"  onClick={()=>{ capOff() }} />
    :
    <div  >
    <VideocamOffIcon className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large"  onClick={()=>{ camOn() }} />
    </div>
    }

    {
    !micPermission ?
    <MicOffIcon   className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large" onClick={()=>{
      getMicrophonePermission();
    }} />
    : 
    <MicNoneIcon  className="text-purple-500 bg-white p-1 rounded-full cursor-pointer" fontSize="large"  onClick={()=>{
      stopRecording();

    }}
    />
    }


  </div>


  </div>;
}