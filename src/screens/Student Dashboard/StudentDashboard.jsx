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
    // ******************** DID ****************
    // const API_KEY = "YOUR_API_KEY";

    // const response = await axios.post(
    //   "https://api.d-id.com/talks",
    //   {
    //     script: {
    //       type: "text",
    //       subtitles: "false",
    //       provider: {
    //         type: "microsoft",
    //         voice_id: "en-US-JennyNeural",
    //       },
    //       ssml: "false",
    //       input:
    //         "Hi my name is farhan and i am doing this test for avatar creation for mock interviews... are you listening to me?",
    //     },
    //     config: {
    //       fluent: "false",
    //       pad_audio: "0.0",
    //     },
    //     source_url:
    //       "https://clips-presenters.d-id.com/amy/FLZ1USJl7m/vzswgDCwKZ/image.png",
    //   },
    //   {
    //     headers: {
    //       accept: "application/json",
    //       authorization:
    //       "YOUR_API_KEY",
    //       "content-type": "application/json",
    //     },
    //   }
    // );
    // ********************** DID ***************

    // ******************** Syntesia ****************

    const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
    const apiUrl = "https://api.synthesia.io/v2/videos";

    const requestData = {
      test: true,
      title: "Hello, World!",
      description:
        "This is my first synthetic video, made with the Synthesia API!",
      visibility: "public",
      ctaSettings: {
        label: "Click me!",
        url: "https://www.synthesia.io",
      },
      callbackId: "email@example.com",
      input: [
        {
          scriptText:
            "This is my first synthetic video, made with the Synthesia API!",
          avatar: "anna_costume1_cameraA",
          avatarSettings: {
            voice: "1364e02b-bdae-4d39-bc2d-6c4a34814968",
            horizontalAlign: "center",
            scale: 1.0,
            style: "rectangular",
          },
          background: "off_white",
        },
      ],
      soundtrack: "urban",
    };

    axios
      .post(apiUrl, requestData, {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Video creation response:", response.data);
        setVideoId(response.data.id);
      })
      .catch((error) => {
        console.error("Error creating video:", error);
      });
  };

  const getVideo = async () => {
    // ******************** DID ****************
    // const url = `https://api.d-id.com/talks/${videoId}`;
    // const headers = {
    //   accept: "application/json",
    //   authorization:
    //     "YOUR_API_KEY",
    // };

    // axios
    //   .get(url, { headers })
    //   .then((response) => {
    //     setVideoUrl(response.data.result_url);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // ******************** DID ****************

    // ******************** synthesia ****************

    const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key// Replace with the video ID you want to retrieve
    const apiUrl = `https://api.synthesia.io/v2/videos/${videoId}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: API_KEY,
        },
      })
      .then((response) => {
        console.log("Video retrieval response:", response.data);
        // setVideoUrl(response.data.result_url);
      })
      .catch((error) => {
        console.error("Error retrieving video:", error);
      });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserStats());
    createVideo();
  }, []);

  useEffect(() => {
    getVideo();
  }, [videoId]);

  console.log(videoUrl);

  return (
    <div>
      <video controls src={videoUrl} width="640" height="360" autoPlay></video>
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
