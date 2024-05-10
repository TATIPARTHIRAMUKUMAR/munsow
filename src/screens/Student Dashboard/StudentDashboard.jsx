import React, { useState, useEffect } from "react";
import image from "../../assets/testPng.png";
import image2 from "../../assets/dashboard_std.png";
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { interviewAllowed, loadUserStats } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";
import MeterChart from "./MeterChart";

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

  // console.log(userStats,"UserStats..")



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

  // console.log(averageScores,"scoresss")
  // if (averageScores) {
  //   console.log(averageScores["Knowledge/Skills"], "Knowledge/Skills score");
  //   console.log(averageScores["Mindset/Attitude"], "Mindset/Attitude score");
  //   console.log(averageScores["Practical Thinking"], "Practical Thinking score");
  // } else {
  //   console.log("Average scores are not available yet.");
  // }
  
  return (
    <div style={{ background: backgroundColor }} className="px-6 py-6">
      <div className=" gap-7 mb-5 relative overflow-auto max-w-full h-auto">
        <div className="flex flex-col sm:flex-row  w-[100%] gap-4 mb-5 relative overflow-auto max-w-full h-auto">
          <div className=" w-[100%] sm:w-[63%] relative overflow-auto max-w-full h-auto">
            <div
              style={{
                background: linearGradientBackground
              }}
              className="relative overflow-auto max-w-full h-auto p-10 flex justify-between rounded-lg"
            >
              <div className="text-white relative overflow-auto max-w-full h-auto">
                <div className="text-3xl font-bold color- relative overflow-auto max-w-full h-auto" style={{ color: textColor }}>
                  Hello {GLOBAL_CONSTANTS?.user_cred?.first_name}{" "}
                  {GLOBAL_CONSTANTS?.user_cred?.last_name} !!!
                </div>
                {/* <p className="text-3xl font-bold pt-1">Apritha!!!</p> */}
                <p className="text-lg py-3 relative overflow-auto max-w-full h-auto" style={{ color: textColor }}>
                  Are you ready for your next interview?
                </p>
                <div className="flex space-x-4 pt-5 overflow-auto flex flex-col sm:flex-row">
                  <button
                    className="mb-4 sm:mb-0 ml-4 sm:ml-0 "
                    style={{
                      background: "white",
                      hover: "gray-100",
                      color: textColor,
                      fontWeight: "bold",
                      padding: "8px 16px",
                      border: "1px solid gray-300",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => {
                      navigateUser()
                      // navigate("/practice");
                    }}
                  >
                    Practice Now
                  </button>
                  <button
                    className=" text-white font-semibold py-2 px-4 border rounded-lg shadow"
                    style={{ color: textColor, borderColor: textColor }}
                    onClick={() => {
                      navigate("/report");
                    }}
                  >
                    View My Interview Reports
                  </button>
                </div>
              </div>
              {/* <div className="overflow-auto">
                <img
                  className="h-40 w-40 bg-transparent max-w-full h-auto"
                  src={image2}
                />
              </div> */}
            </div>
          </div>
          <div className=" w-[100%] sm:w-[37%] relative overflow-auto max-w-full h-auto">
            <div>
              <SecondRow />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly w-[100%] gap-4 relative overflow-auto max-w-full ">
          <div className=" w-[100%] sm:w-[70%] relative bg-white overflow-auto max-w-full rounded-lg">
          {averageScores ? (
          <div className="flex ">
            <div className="w-[33%]">
              <div className="bg-white mt-4">
                <MeterChart
                title={"Mindset/Attitude"}
                score={averageScores["Mindset/Attitude"]}
                container={"container1"}
                color={"#bf83c2"}
                />
              </div>
            </div>
            <div className="w-[33%]">
              <div className="bg-white mt-4">
                <MeterChart
                title={"Knowledge/Skills"}
                score={averageScores["Knowledge/Skills"]}
                container={"container2"}
                color={"#8ab97d"}
                />
              </div>
            </div>
            <div className="w-[34%]">
              <div className="bg-white mt-4">
                <MeterChart
                title={"Practical Thinking"}
                score={averageScores["Practical Thinking"]}
                container={"container3"}
                color={"#faa542"}
                />
              </div>
            </div>
          </div>
          ) : (
            <p>Loading...</p>
          )}
            
          </div>
          <div className=" w-[100%] sm:w-[30%] relative overflow-auto max-w-full h-auto">
            {/* <p className="text-gray-500 text-md pb-2">Hard Skill vs Soft Skill Trend</p> */}
            <div className="bg-white pb-4 rounded-lg">
              <Carousel />
            </div>
          </div>
        </div>
        
      </div>

      <div>
        <div className="bg-white rounded-lg">
          <BarChartLines />
        </div>
      </div>

    </div>
  );
}