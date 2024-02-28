

import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import "./practiceNowstyles.css";


const InterviewOver = () => {
    const navigate = useNavigate();
    const svgRef = useRef(null);

    useEffect(() => {
        // SVG bounce animation on load
        const svg = svgRef.current;
        svg.style.transform = 'scale(1.2)';
        setTimeout(() => {
            svg.style.transform = 'scale(1)';
        }, 200);
    }, []);

    const goToDashboard = () => {
        navigate("/studentDashboard");
    }
    const goToReport = () => {
        navigate("/report");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 animate-gradient-x">

            {/* Main Card */}
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">

                {/* Completion Icon or Illustration */}
                <svg ref={svgRef} className="w-20 h-20 text-green-500 mb-5 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>

                <h2 className="text-4xl font-bold mb-6 text-#886cc0">Interview Complete</h2>

                {/* Thank you message */}
                <p className="text-xl mb-8 font-medium">Thank you for your time. Your effort is much appreciated!</p>

                {/* Guidance or description */}
                <p className="mb-8 font-medium text-gray-600">Your report is underway. You'll be notified once it's ready. Meanwhile, monitor its progress under "My Interviews".</p>
                <div className='flex justify-center gap-6'>
                    <button
                        className="bg-[#886cc0]  text-white font-bold py-2 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 hover-mouse cursor-pointer"
                        onClick={goToDashboard}
                    >
                        <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        Dashboard
                    </button>
                    <button
                        className="bg-[#886cc0]  text-white font-bold py-2 px-6 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110 cursor-pointer"
                        onClick={goToReport}
                    >
                        <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        My Interview Reports
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InterviewOver;