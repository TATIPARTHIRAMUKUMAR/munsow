import React, { useEffect } from "react";
import videoSrc from "../../assets/caption.mp4";
import person1 from "../../assets/download.jpeg";
import Button from "@mui/material/Button";
import { useRecordWebcam } from "react-record-webcam";
export default function NewGridLayout() {
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam();

  const recordWebcam = useRecordWebcam({ frameRate: 60 });
  console.log(recordWebcam, "recordWebcam");
  const getSource = () => {
    return "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3";
  };

  // useEffect(() => {
  //   handleStartRecording()
  // },[])
  const handleStartRecording = async () => {
    try {
      const recording = await createRecording();
      console.log(recording, "recording");
      if (!recording) {
        return;
      }
      await openCamera(recording.id);
      await startRecording(recording.id);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await stopRecording(recording.id);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 900,
            marginBottom: "10px",
          }}
        >
          <Button variant="contained">End Interview </Button>
          <Button variant="contained">Skip Question </Button>
          <Button variant="contained">Repeat Question </Button>
          {/* re record answer ------ */}
        </div>
        <div
          style={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Button variant="contained">i Have finished answering </Button>
          {/* Next Question */}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="">
          <img
            src={person1}
            style={{ width: 900, height: 500, objectFit: "cover" }}
          />
          <audio controls>
            <source src="https://www.computerhope.com/jargon/m/example.mp3" />
          </audio>
        </div>
        <div
          style={{
            background: "rgb(219 234 254)",
            width: 400,
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "rgb(126 150 184)",
              padding: "10px 15px",
              borderRadius: "10px",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Standby
          </div>
          {/* prep record  */}

          <div>Interview</div>
          <div
            style={{
              background: "rgb(126 150 184)",
              padding: "10px 15px",
              borderRadius: "10px",
              marginBottom: 20,
            }}
          >
            10:00
          </div>
          <div>Question</div>
          <div
            style={{
              background: "rgb(126 150 184)",
              padding: "10px 15px",
              borderRadius: "10px",
              marginBottom: 20,
            }}
          >
            5:00
          </div>
          <button onClick={handleStartRecording}>Start</button>
          <div className="recordings">
            {activeRecordings.map((recording) => {
              return (
                <>
                <div key={recording.id}>
                  <video ref={recording.webcamRef} autoPlay muted />
                </div>
                 </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
