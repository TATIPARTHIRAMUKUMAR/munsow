//src/Pages/Practice/InterviewOver.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import "./practiceNowstyles.css";
import { useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";

const InterviewOver = () => {
    const navigate = useNavigate();
    const svgRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [showSvg, setShowSvg] = useState(true);
    const [redirectCountdown, setRedirectCountdown] = useState(5);

    const { isDarkMode } = useDarkMode();
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
        // Show checkmark animation then modal
        setTimeout(() => {
            setShowSvg(false);
            setShowModal(true);
        }, 2000);

        // Start countdown for redirect
        const countdownInterval = setInterval(() => {
            setRedirectCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    // Redirect based on user role
                    if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
                        navigate("/studentDashboardScreening");
                    } else {
                        navigate("/interview-results");
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [navigate]);

    const goToDashboard = () => {
        if (GLOBAL_CONSTANTS?.user_cred?.role_id === 5) {
            navigate("/studentDashboardScreening");
        } else {
            navigate("/studentDashboard");
        }
    };

    const goToResults = () => {
        navigate("/interview-results");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen" style={{ background: backgroundColor }}>
            {showSvg && (
                <svg width="200" height="200">
                    <circle 
                        fill="none" 
                        stroke="#68E534" 
                        strokeWidth="10" 
                        cx="100" 
                        cy="100" 
                        r="95" 
                        className="circle" 
                        strokeLinecap="round" 
                        transform="rotate(-90 100 100)"
                    />
                    <polyline 
                        fill="none" 
                        stroke="#68E534" 
                        strokeWidth="12" 
                        points="44,107 86.5,142 152,69" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="tick" 
                    />
                </svg>
            )}

            {showModal && (
                <div className="bg-white p-[100px] w-[850px] h-[500px] rounded-2xl shadow-xl text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6" style={{ color: '#886cc0' }}>
                        Interview Complete
                    </h2>

                    <p className="text-xl mb-8 font-medium">
                        Thank you for your time. Your effort is much appreciated!
                    </p>

                    <p className="text-lg mb-8 font-medium text-gray-600">
                        Your interview results are being processed.
                    </p>

                    <p className="mb-10 font-medium text-gray-600">
                        Redirecting in {redirectCountdown} seconds...
                    </p>

                    <div className="flex justify-center gap-10">
                        <button
                            className="font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 cursor-pointer"
                            onClick={goToDashboard}
                            style={{
                                background: linearGradientBackground,
                                color: textColor
                            }}
                        >
                            Dashboard
                        </button>
                        
                        {GLOBAL_CONSTANTS?.user_cred?.role_id !== 5 && (
                            <button
                                className="font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 cursor-pointer"
                                onClick={goToResults}
                                style={{
                                    background: linearGradientBackground,
                                    color: textColor
                                }}
                            >
                                View Results
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewOver;