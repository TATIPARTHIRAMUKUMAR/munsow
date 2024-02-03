import React, { useEffect } from "react";
import image from "../../assets/testPng.png";
import image2 from "../../assets/dashboard_std.png";
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { loadUserStats } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isDarkMode, colorTheme } = useDarkMode();

  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
  const linearGradientBackground = isDarkMode
    ? reduxColorTheme.dark.selectBackground
    : reduxColorTheme.light.selectBackground;

  const backgroundColor = isDarkMode
    ? reduxColorTheme.dark.foreground
    : reduxColorTheme.light.foreground;
  const headerBgColor = isDarkMode
    ? reduxColorTheme.dark.background
    : reduxColorTheme.light.background;

  const headerTextColor = isDarkMode
    ? reduxColorTheme.dark.textColor
    : reduxColorTheme.light.textColor;

  const textColor = isDarkMode
    ? reduxColorTheme.dark.textColor3
    : reduxColorTheme.light.textColor3;

  useEffect(() => {
    dispatch(loadUserStats());
  }, []);

  return (
    <div style={{ background: backgroundColor, marginTop: "15px" }}>
      {/* <div
        className="flex justify-between text-3xl font-bold px-8 py-8 relative overflow-auto max-w-full h-auto"
        style={{ background: headerBgColor, color: headerTextColor }}
      >
        <div>Dashboard</div>{" "}
        <div>
          <span className="text-2xl font-semibold ">
            {/* {userData?.user_name} }Apritha
          </span>
        </div>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 px-6 py-6 relative overflow-auto max-w-full h-auto">
        <div className="col-span-2 relative overflow-auto max-w-full h-auto">
          <div
            style={{
              background: linearGradientBackground,
            }}
            className="relative overflow-auto max-w-full h-auto p-10 flex justify-between rounded-lg"
          >
            <div
              className=" relative overflow-auto max-w-full h-auto"
              style={{ color: textColor }}
            >
              <div className="text-3xl font-bold color- relative overflow-auto max-w-full h-auto">
                Hello {GLOBAL_CONSTANTS?.user_cred?.first_name}{" "}
                {GLOBAL_CONSTANTS?.user_cred?.last_name} !!!
              </div>
              {/* <p className="text-3xl font-bold pt-1">Apritha!!!</p> */}
              <p className="text-lg py-3 relative overflow-auto max-w-full h-auto">
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
                    navigate("/practice");
                  }}
                >
                  Practice Now
                </button>
                <button
                  className="  font-semibold py-2 px-2 border-2 rounded-lg shadow"
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
        <div className="col-span-1 relative overflow-auto max-w-full h-auto">
          <div>
            <SecondRow />
          </div>
        </div>
        <div className="col-span-2 relative overflow-auto max-w-full h-auto">
          <div className="bg-white rounded-lg">
            <BarChartLines />
          </div>
        </div>
        <div className="col-span-1 relative overflow-auto max-w-full h-auto">
          {/* <p className="text-gray-500 text-md pb-2">Hard Skill vs Soft Skill Trend</p> */}
          <div className="bg-white  rounded-lg">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
