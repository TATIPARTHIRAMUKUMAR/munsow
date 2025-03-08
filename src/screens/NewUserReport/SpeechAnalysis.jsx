import React from 'react';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const SpeechAnalysis = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Content */}
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    {/* Animated sound waves logo */}
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <div className="relative">
                            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                                <MicIcon style={{ color: 'white', fontSize: 36 }} />
                            </div>
                            {/* Animated sound waves */}
                            <div className="absolute -top-4 -right-4">
                                <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
                            </div>
                            <div className="absolute -bottom-4 -left-4">
                                <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        Coming Soon
                    </h1>
                    
                    <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                        Our speech analysis feature is currently under development. This advanced tool will analyze your 
                        vocal delivery, speech patterns, and communication effectiveness during interviews.
                    </p>
                    
                    <div className="bg-green-100 p-5 rounded-lg shadow-md max-w-2xl mx-auto">
                        <h3 className="font-bold text-green-800 mb-3 text-lg">Future Voice Analysis Features</h3>
                        <ul className="text-left text-gray-700 space-y-3">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">•</span>
                                <span>
                                    <strong className="text-green-800">Speech Clarity Analysis</strong>
                                    <p className="text-sm">Evaluation of articulation, pronunciation and overall clarity</p>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">•</span>
                                <span>
                                    <strong className="text-green-800">Filler Word Detection</strong>
                                    <p className="text-sm">Identification of "um", "uh", and other filler words that reduce impact</p>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">•</span>
                                <span>
                                    <strong className="text-green-800">Pace & Tone Measurement</strong>
                                    <p className="text-sm">Analysis of speaking rate, volume variations, and vocal tone</p>
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">•</span>
                                <span>
                                    <strong className="text-green-800">Confidence Indicators</strong>
                                    <p className="text-sm">Detection of vocal confidence markers and improvement suggestions</p>
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    <p className="text-gray-500 mt-8">
                        We're working hard to bring you this feature soon!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpeechAnalysis;