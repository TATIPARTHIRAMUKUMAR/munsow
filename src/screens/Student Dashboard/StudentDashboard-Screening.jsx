import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserStats, interviewAllowed } from "../../redux/action";
import { useDarkMode } from "../../Dark";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";

export default function StudentDashboardScreenig() {
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
      }));
    } else {
      navigate("/practice");
    }
  };

  return (
    <div style={{ background: backgroundColor, minHeight: "100vh" }}> 
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 px-10 py-20 relative overflow-auto max-w-full h-auto" style={{ background: backgroundColor }}>
        <div className="col-span-2 relative overflow-auto max-w-full h-auto">
          <div style={{ background: linearGradientBackground }} className="relative overflow-auto max-w-full h-auto p-10 flex justify-between rounded-lg">
            <div className="text-white relative overflow-auto max-w-full h-auto">
              <div className="text-3xl font-bold" style={{ color: textColor }}>
                Hello {GLOBAL_CONSTANTS?.user_cred?.first_name} {GLOBAL_CONSTANTS?.user_cred?.last_name} !!!
              </div>
              <p className="text-lg py-3" style={{ color: textColor }}>
                Are you ready for your next interview?
              </p>
              <div className="flex space-x-4 pt-5 overflow-auto flex-col sm:flex-row">
                <button className="mb-4 sm:mb-0 ml-4 sm:ml-0" style={{
                  background: "white",
                  hover: "gray-100",
                  color: textColor,
                  fontWeight: "bold",
                  padding: "8px 16px",
                  border: "1px solid gray-300",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }} onClick={navigateUser}>
                  Practice Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="card bg-white shadow-lg rounded-lg p-6">
            <div className="text-2xl font-bold" style={{ color: textColor }}>Number of Interviews Allocated</div>
            <div className="text-xl" style={{ color: textColor }}>8</div>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-6">
            <div className="text-2xl font-bold" style={{ color: textColor }}>Number of Interviews Conducted</div>
            <div className="text-xl" style={{ color: textColor }}>5</div>
          </div>
        </div>
      </div>
    </div>
  );
}
