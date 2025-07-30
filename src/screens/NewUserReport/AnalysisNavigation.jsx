import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';

// This component provides consistent navigation across analysis pages
const AnalysisNavigation = ({ currentPage = "answer" }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handlePdfDownload = () => {
        setLoading(true);
        // This would connect to your PDF generation logic
        setTimeout(() => {
            setLoading(false);
            navigate('/reportView');
        }, 1000);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <button         
                    className="bg-gradient-to-r mb-3 sm:mb-0 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
                    onClick={() => navigate('/reportView')}>
                    <ArrowBackIcon fontSize="small" />
                    Back to Report
                </button>
                
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        disabled={currentPage === "answer"}
                        className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                            currentPage === "answer" 
                                ? "bg-blue-700 text-white cursor-default" 
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={handlePdfDownload}>
                        <DescriptionIcon fontSize="small" />
                        Answer Analysis
                        {loading && (<CircularProgress size={20} style={{ color: "#fff" }} />)}
                    </button>
                    
                    <button
                        type="button"
                        disabled={currentPage === "video"}
                        className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                            currentPage === "video" 
                                ? "bg-purple-700 text-white cursor-default" 
                                : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                        onClick={() => navigate('/video-analysis')}>
                        <VideocamIcon fontSize="small" />
                        Video Analysis
                    </button>
                    
                    <button
                        type="button"
                        disabled={currentPage === "speech"}
                        className={`flex items-center gap-2 py-2 px-4 rounded-full transition-colors ${
                            currentPage === "speech" 
                                ? "bg-green-700 text-white cursor-default" 
                                : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                        onClick={() => navigate('/speech-analysis')}>
                        <MicIcon fontSize="small" />
                        Speech Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalysisNavigation;