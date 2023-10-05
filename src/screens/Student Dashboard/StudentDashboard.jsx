import React, { useEffect, useState } from "react";
import image from "../../assets/testPng.png";
import image2 from "../../assets/dashboard_std.png";
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { loadUserStats } from "../../redux/action";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function StudentDashboard() {
  console.log("student dashboard");
  const [videoId, setVideoId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const createVideo = async () => {
    const API_KEY = "c2FpbGlraGl0aDEwOEBnbWFpbC5jb20:UY58mosKaXVN27C6x13DC";

    const response = await axios.post(
      "https://api.d-id.com/talks",
      {
        script: {
          type: "text",
          subtitles: "false",
          provider: {
            type: "microsoft",
            voice_id: "en-US-JennyNeural",
          },
          ssml: "false",
          input:
            "Hi my name is farhan and i am doing this test for avatar creation for mock interviews... are you listening to me?",
        },
        config: {
          fluent: "false",
          pad_audio: "0.0",
        },
        source_url:
          'https://clips-presenters.d-id.com/amy/FLZ1USJl7m/vzswgDCwKZ/image.png',
      },
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoidHJpYWwiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9iaWxsaW5nX2ludGVydmFsIjoibW9udGgiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wbGFuX2dyb3VwIjoiZGVpZC10cmlhbCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9jcmVkaXRzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vcHJvdmlkZXIiOiJhdXRoMCIsImh0dHBzOi8vZC1pZC5jb20vaXNfbmV3IjpmYWxzZSwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfa2V5X21vZGlmaWVkX2F0IjoiMjAyMy0xMC0wNFQxOTo0ODoyNy42MDFaIiwiaHR0cHM6Ly9kLWlkLmNvbS9vcmdfaWQiOiIiLCJodHRwczovL2QtaWQuY29tL2FwcHNfdmlzaXRlZCI6WyJTdHVkaW8iXSwiaHR0cHM6Ly9kLWlkLmNvbS9jeF9sb2dpY19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY3JlYXRpb25fdGltZXN0YW1wIjoiMjAyMy0xMC0wNFQxOTo0NDo1My42NTZaIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfZ2F0ZXdheV9rZXlfaWQiOiJtc3AyaGxjbno0IiwiaHR0cHM6Ly9kLWlkLmNvbS9oYXNoX2tleSI6InBsTGc2X3p4NWdhdGZmblM2VU5xUCIsImh0dHBzOi8vZC1pZC5jb20vcHJpbWFyeSI6dHJ1ZSwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6InNhaWxpa2hpdGgxMDhAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY1MWRjMGI1MGQ4NWE3OWE0Y2MzYzFkNSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5NjQ0ODk3NCwiZXhwIjoxNjk2NTM1Mzc0LCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.ip6CJS0Co36OrKzsPcKW_WAR1-hhRmOF2RtIYNY8fjvd9bZt-eM99GjSCO0q5qt0lk0PVUlz6q5Dbjxxafav5zS0tBJaDdA3rP5AQnn5ci1coMUQ7GVpsnWfkIofiAFKdaEpuWlfPPW4bmMyWzMP43fSidhiShn1kgNBH2xk1uDTrUvzsaAXlhLTZyO1NzXezuCSney4fJTmjW0ePWoWfpp3tu3hs03DpBZv4VAes--y3b8T4CEf75Bcd4oO9ldr5-u-PjTzZGBzp4_KfPyHYrBefT0c7xXcuBEdvb8cXCpS4ZF4w_n91PAL810QQC0Q497TfuCxRcv7QKaLp2d-lg`,
          "content-type": "application/json",
        },
      }
    );
    setVideoId(response.data.id);
  };

  const getVideo = async () => {
    const url = 'https://api.d-id.com/talks/tlk_9TrJ-j1j8O_xT7ng6CSO5';
const headers = {
  accept: 'application/json',
    authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoidHJpYWwiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9iaWxsaW5nX2ludGVydmFsIjoibW9udGgiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wbGFuX2dyb3VwIjoiZGVpZC10cmlhbCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9jcmVkaXRzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vcHJvdmlkZXIiOiJhdXRoMCIsImh0dHBzOi8vZC1pZC5jb20vaXNfbmV3IjpmYWxzZSwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfa2V5X21vZGlmaWVkX2F0IjoiMjAyMy0xMC0wNFQxOTo0ODoyNy42MDFaIiwiaHR0cHM6Ly9kLWlkLmNvbS9vcmdfaWQiOiIiLCJodHRwczovL2QtaWQuY29tL2FwcHNfdmlzaXRlZCI6WyJTdHVkaW8iXSwiaHR0cHM6Ly9kLWlkLmNvbS9jeF9sb2dpY19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vY3JlYXRpb25fdGltZXN0YW1wIjoiMjAyMy0xMC0wNFQxOTo0NDo1My42NTZaIiwiaHR0cHM6Ly9kLWlkLmNvbS9hcGlfZ2F0ZXdheV9rZXlfaWQiOiJtc3AyaGxjbno0IiwiaHR0cHM6Ly9kLWlkLmNvbS9oYXNoX2tleSI6InBsTGc2X3p4NWdhdGZmblM2VU5xUCIsImh0dHBzOi8vZC1pZC5jb20vcHJpbWFyeSI6dHJ1ZSwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6InNhaWxpa2hpdGgxMDhAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY1MWRjMGI1MGQ4NWE3OWE0Y2MzYzFkNSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5NjQ0ODk3NCwiZXhwIjoxNjk2NTM1Mzc0LCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.ip6CJS0Co36OrKzsPcKW_WAR1-hhRmOF2RtIYNY8fjvd9bZt-eM99GjSCO0q5qt0lk0PVUlz6q5Dbjxxafav5zS0tBJaDdA3rP5AQnn5ci1coMUQ7GVpsnWfkIofiAFKdaEpuWlfPPW4bmMyWzMP43fSidhiShn1kgNBH2xk1uDTrUvzsaAXlhLTZyO1NzXezuCSney4fJTmjW0ePWoWfpp3tu3hs03DpBZv4VAes--y3b8T4CEf75Bcd4oO9ldr5-u-PjTzZGBzp4_KfPyHYrBefT0c7xXcuBEdvb8cXCpS4ZF4w_n91PAL810QQC0Q497TfuCxRcv7QKaLp2d-lg`,
};

axios.get(url, { headers })
  .then(response => {
    console.log(response.data);
    setVideoUrl(response.data.result_url);
  })
  .catch(error => {
    console.error(error);
  });
    
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserStats());
    createVideo();
  }, []);

  useEffect(() => {
      getVideo()
  },[videoId])

  return (
    <div>
        <video controls width="640" height="360" autoPlay>
        <source src="https://d-id-talks-prod.s3.us-west-2.amazonaws.com/auth0%7C651dc0b50d85a79a4cc3c1d5/tlk_9TrJ-j1j8O_xT7ng6CSO5/1696531097815.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
    </video>
      <div
        className="grid grid-cols-2 gap-7 px-6 py-6"
        style={{ "grid-template-columns": "64% 34%" }}
      >
        <div className="col-span-1 ">
          <div
            style={{
              background:
                "linear-gradient(180.43deg, #886CC0 19.43%, #c3b5df 87.63%)",
            }}
            className=" p-10 flex justify-between rounded-lg"
          >
            <div className="text-white">
              <div className="text-3xl font-bold color-">
                Hello {GLOBAL_CONSTANTS?.user_cred?.first_name}{" "}
                {GLOBAL_CONSTANTS?.user_cred?.last_name} !!!
              </div>
              {/* <p className="text-3xl font-bold pt-1">Apritha!!!</p> */}
              <p className="text-lg py-3">
                Are you ready for your next interview?
              </p>
              <div className="flex space-x-4 pt-5">
                <button
                  className="bg-white hover:bg-gray-100 text-[#886CC0] font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow"
                  onClick={() => {
                    navigate("/practice");
                  }}
                >
                  Practice Now
                </button>
                <button
                  className=" text-white font-semibold py-2 px-4 border rounded-lg shadow"
                  onClick={() => {
                    navigate("/report");
                  }}
                >
                  View My Reports
                </button>
              </div>
            </div>
            <div>
              <img className="h-40 w-40 bg-transparent" src={image2} />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <SecondRow />
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-lg">
            <BarChartLines />
          </div>
        </div>
        <div className="col-span-1">
          {/* <p className="text-gray-500 text-md pb-2">Hard Skill vs Soft Skill Trend</p> */}
          <div className="bg-white  rounded-lg">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
