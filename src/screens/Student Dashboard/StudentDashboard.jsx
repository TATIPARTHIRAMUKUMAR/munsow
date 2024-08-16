import React, { useState, useEffect } from "react";
import image from "../../assets/testPng.png";
import image2 from "../../assets/dashboard_std.png";
import image3 from "../../assets/StudentDashboard.svg";
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { interviewAllowed, loadUserStats } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";
import MeterChart from "./MeterChart";

import CulturalInterviews from "./CulturalInterviews";
import JDInterviews from "./JDInterviews";
import JDCult from "./JDandCult";
import { Divider } from "antd";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userStats } = useSelector((state) => state.data);

  // State to store average scores
  const [averageScores, setAverageScores] = useState(null);

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

  useEffect(() => {
    dispatch(loadUserStats());
  }, []);


  const navigateUser = () => {
    if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
      dispatch(interviewAllowed(1, (resp) => {
        if (resp) {
          navigate("/practice");
        }
      }))
    }
    else {
      navigate("/practice");
    }
  };

  useEffect(() => {

    // Calculate average scores
   const calculateAverageScores = (userStats) => {
    if (!userStats || !userStats.graphs || !Array.isArray(userStats.graphs)) {
      return null;
    }

    const { graphs } = userStats;
    const { totalInterviews, skillSums } = graphs.reduce(
      (accumulator, graph) => {
        const { data } = graph;
        data.forEach((interview) => {
          accumulator.totalInterviews++;
          Object.keys(interview).forEach((key) => {
            if (key !== "name") {
              accumulator.skillSums[key] += interview[key];
            }
          });
        });
        return accumulator;
      },
      {
        totalInterviews: 0,
        skillSums: {
          "Knowledge/Skills": 0,
          "Mindset/Attitude": 0,
          "Practical Thinking": 0,
        },
      }
    );

    const averageScores = {
      "Knowledge/Skills": Math.round(skillSums["Knowledge/Skills"] / totalInterviews),
      "Mindset/Attitude": Math.round(skillSums["Mindset/Attitude"] / totalInterviews),
      "Practical Thinking": Math.round(skillSums["Practical Thinking"] / totalInterviews),
    };

    return averageScores;
  };

    const scores = calculateAverageScores(userStats);
    if (scores) {
      setAverageScores(scores);
    }
  }, [userStats]);

  
  return (
    <div style={{ background: backgroundColor }} className="px-6 py-6 relative z-10 overflow-visible">
      <div className="gap-5 relative overflow-visible max-w-full flex w-full">
        <div className="flex flex-row sm:flex-col w-[100%] sm:w-[63%] gap-4 mb-5 relative max-w-full">
          <div className="w-[100%] relative overflow-visible max-w-full">
            <div
              style={{ background: linearGradientBackground }}
              className="relative overflow-visible z-50 max-w-full h-auto p-10 flex justify-between rounded-lg"
            >
              <div className="text-white relative overflow-visible max-w-full h-auto">
                <div className="text-3xl font-bold relative overflow-visible max-w-full h-auto" style={{ color: textColor }}>
                  Welcome Back, {GLOBAL_CONSTANTS?.user_cred?.first_name} {GLOBAL_CONSTANTS?.user_cred?.last_name}
                </div>
                <p className="text-lg py-3 relative overflow-visible max-w-full h-auto" style={{ color: textColor }}>
                  Are you ready for your next interview?
                </p>
                <div className="flex space-x-4 pt-5 overflow-visible flex flex-col sm:flex-row">
                  <button
                    className="text-white font-semibold py-2 px-4 border rounded-lg shadow"
                    style={{ color: textColor, borderColor: textColor }}
                    onClick={() => {
                      navigate("/report");
                    }}
                  >
                    View My Interview Reports
                  </button>
                  <button
                    className="mb-4 sm:mb-0 ml-4 sm:ml-0"
                    style={{
                      background: "white",
                      color: textColor,
                      fontWeight: "bold",
                      padding: "8px 16px",
                      border: "1px solid gray-300",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => {
                      navigateUser();
                    }}
                  >
                    Practice Now
                  </button>
                </div>
              </div>
              <div className="absolute top-[-60px] right-0 flex justify-center items-center overflow-visible">
                <img className="bg-transparent max-w-full h-auto overflow-visible" src={image3} alt="Student Dashboard" />
              </div>
            </div>
          </div>
        <div className="flex flex-col sm:flex-row justify-evenly gap-4 relative max-w-full">
        <div className="w-[100%] sm:w-[50%] relative bg-white overflow-auto max-w-full rounded-lg h-[515px]">
          <JDInterviews interviewData={userStats?.graphs?.length > 0 ? userStats?.graphs[1]?.data : []} />
        </div>
        <div className="w-[100%] sm:w-[50%] relative bg-white overflow-auto max-w-full rounded-lg h-[515px]">
          <CulturalInterviews interviewData={userStats?.graphs?.length > 0 ? userStats?.graphs[2]?.data : []} />
        </div>
      </div>
       
      </div>

      
      <div className="flex flex-row sm:flex-col w-[100%] sm:w-[37%]">
        <div className="w-[100%] relative overflow-auto max-w-full h-auto">
          <div className="bg-white rounded-lg mb-4">
            <JDCult />
          </div>
        </div>
        <div className="w-[100%] relative overflow-auto max-w-full h-auto">
          <div className="bg-white rounded-lg mb-4">
            <SecondRow />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly mb-4 w-[100%] gap-4 relative overflow-auto max-w-full ">
          
          <div className=" w-[100%] relative overflow-auto max-w-full">
            <div className="rounded-lg" style={{ backgroundColor: linearGradientBackground, height: "210px" }}>
              <Carousel />
            </div>
            
          </div>
        </div>
      </div>
      </div>

      <div>
        <div className=" w-[100%] relative bg-white overflow-auto max-w-full rounded-lg mb-4">
        <p className=" text-lg font-bold pl-3 mt-3" style={{ color: "black" }}>
          Role Based & Skill Based Interview Summary
        </p>
        <Divider style={{ opacity: "1" }} />
        {averageScores ? (
        <div className="flex h-[280px]">
          <div className="w-[21%] mx-[6%] bg-white">
              <MeterChart
              title={"Mindset/Attitude"}
              score={averageScores["Mindset/Attitude"]}
              container={"container1"}
              color={"#bf83c2"}
              />
          </div>
          <div className="w-[21%] mx-[6%] bg-white">
              <MeterChart
              title={"Knowledge/Skills"}
              score={averageScores["Knowledge/Skills"]}
              container={"container2"}
              color={"#8ab97d"}
              />
          </div>
          <div className="w-[21%] mx-[6%] bg-white">
              <MeterChart
              title={"Practical Thinking"}
              score={averageScores["Practical Thinking"]}
              container={"container3"}
              color={"#faa542"}
              />
          </div>
        </div>
        ) : (
          <p>Loading...</p>
        )}
          
        </div>
        <div className="bg-white rounded-lg">
          <BarChartLines />
        </div>
       
      </div>

    </div>
  );
}