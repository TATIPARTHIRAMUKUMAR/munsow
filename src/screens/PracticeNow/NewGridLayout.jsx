import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

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
  ];
  const TOTAL_TIME = questions.reduce((acc, q) => acc + q.duration, 0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(questions?.[0]?.duration);
  const [totalTimeLeft, setTotalTimeLeft] = useState(TOTAL_TIME);

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      // stopRecording();
      stopRecording();
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionTimeLeft(questions[questionIndex + 1].duration);
      startStreamAndRecording();
    }
  };

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
    } else {
      console.error("No active recording.");
    }
  }

  
  // __________________________ 
  
  
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (questionTimeLeft > 0) {
        setQuestionTimeLeft((prevTime) => prevTime - 1);
      } else {
        nextQuestion();
      }
      if (totalTimeLeft > 0) {
        setTotalTimeLeft((prevTime) => prevTime - 1);
      }
      else 
      stopRecording()

    
    }, 1000);

    return () => clearInterval(interval);
  }, [questionTimeLeft, questionIndex]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading)
    { 
      // camOn();
      startStreamAndRecording()
  }}, [isLoading]);

  return (
    <div className="grid items-center h-full ">
      <div className="p-5 grid gap-3 grid-cols-3 items-center ">
        <div className=" col-span-2 bg-white p-3 leading-10 grid gap-2 rounded-xl ">
          <div className="flex gap-2 leading-6 text-sm text-gray-500">
            <div>Question Duration</div>
            <div>{formatTime(questionTimeLeft)}</div>
          </div>
          <div className="text-2xl">
            {questionIndex + 1}
            {". "}
            {questions[questionIndex]?.question}
          </div>
          <div className="flex w-full justify-between items-center">
            <Button variant="contained" size="large" color="secondary">
              Answer
            </Button>
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

        <div className="col-span-1 bg-white shadow p-4 rounded-xl grid justify-start h-full gap-2">
          <div>
            <div>Total Interview Duration</div>
            <div>{formatTime(totalTimeLeft)}</div>
          </div>
          <div>
            {/* <Audio_Video /> */}
            <video
              id="vid"
              className=" "
              muted
              autoPlay
              style={{ borderRadius: "8px" }}
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
