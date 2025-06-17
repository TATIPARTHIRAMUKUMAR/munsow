//interviewcancel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import "./practiceNowstyles.css";

import { useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";

const InterviewCancel = () => {
    const navigate = useNavigate();
    const svgRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [showSvg, setShowSvg] = useState(true);


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


    // useEffect(() => {
    //     // SVG bounce animation on load
    //     const svg = svgRef.current;
    //     svg.style.transform = 'scale(1.2)';
    //     setTimeout(() => {
    //         svg.style.transform = 'scale(1)';
    //     }, 200);
    // }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowSvg(false);
            setShowModal(true);
        }, 2000);
    }, []);

    const goToDashboard = () => {
        navigate("/studentDashboard");
    }
    const goToReport = () => {
        navigate("/report");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen " style={{ background: backgroundColor}} >
            {showSvg && (
                // <svg width="400" height="400">
                //     <circle fill="none" stroke="#68E534" stroke-width="20" cx="200" cy="200" r="190" class="circle" stroke-linecap="round" transform="rotate(-90 200 200) "/>
                //     <polyline fill="none" stroke="#68E534" stroke-width="24" points="88,214 173,284 304,138" stroke-linecap="round" stroke-linejoin="round" class="tick" />
                // </svg>
                <svg width="200" height="200">
                    <circle fill="none" stroke="#FF0000" strokeWidth="10" cx="100" cy="100" r="95" className="circle" strokeLinecap="round" transform="rotate(-90 100 100)" />
                    <line x1="60" y1="60" x2="140" y2="140" stroke="#FF0000" strokeWidth="12" strokeLinecap="round" />
                    <line x1="140" y1="60" x2="60" y2="140" stroke="#FF0000" strokeWidth="12" strokeLinecap="round" />
                </svg>
            )}

            {/* Main Card */}
            {showModal && (
            <div className="bg-white p-[100px] w-[750px] h-[400px] rounded-2xl shadow-xl text-center  transition-transform duration-300 hover:scale-105 hover:shadow-2xl">

                {/* Completion Icon or Illustration */}
                {/* <svg ref={svgRef} className="w-20 h-20 text-green-500 mb-5 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg> */}

                {/* <svg width="100" height="100">
                    <circle fill="none" stroke="#68E534" strokeWidth="5" cx="50" cy="50" r="45" className="circle" strokeLinecap="round" transform="rotate(-90 50 50)" style={{animation: "circle 2s forwards"}} />
                    <polyline fill="none" stroke="#68E534" strokeWidth="6" points="22,54 43,71 76,41" strokeLinecap="round" strokeLinejoin="round" className="tick" style={{animation: "tick 1s forwards"}} />
                </svg> */}

                <h2 className="text-4xl font-bold mb-6 text-red">Interview Terminated!</h2>

                {/* Thank you message */}
                <p className="text-xl mb-8 font-medium">You have exceeded the maximum number of warnings. The interview is now terminated.</p>

                {/* Guidance or description */}
                <p className="mb-10 font-medium text-gray-600">Your report won't be generated! So kindly try again!</p>
                {/* <div className='flex justify-center gap-10'>
                    <button
                        className="font-bold py-2 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 hover-mouse cursor-pointer"
                        onClick={goToDashboard}
                        style={{
                            background: linearGradientBackground,
                            color: textColor
                        }}
                    >
                        
                        Dashboard
                    </button>
                    <button
                        className="font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 cursor-pointer"
                        onClick={goToReport}
                        style={{
                            background: linearGradientBackground,
                            color: textColor
                        }}
                    >
                       
                        My Interview Reports
                    </button>
                </div> */}
            </div>
            )}
        </div>
    )
}

export default InterviewCancel;

