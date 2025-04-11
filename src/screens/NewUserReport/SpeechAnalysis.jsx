// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import MicIcon from '@mui/icons-material/Mic';
// import GraphicEqIcon from '@mui/icons-material/GraphicEq';

// const SpeechAnalysis = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="container mx-auto p-4">
//                 <button         
//                     className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
//                     onClick={() => navigate(-1)}>
//                     <ArrowBackIcon fontSize="small" />
//                     Back to Report
//                 </button>
//             </div>
            
//             {/* Content */}
//             <div className="flex-grow flex flex-col items-center justify-center p-6">
//                 <div className="text-center max-w-lg">
//                     {/* Animated sound waves logo */}
//                     <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
//                         <div className="relative">
//                             <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
//                                 <MicIcon style={{ color: 'white', fontSize: 36 }} />
//                             </div>
//                             {/* Animated sound waves */}
//                             <div className="absolute -top-4 -right-4">
//                                 <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
//                             </div>
//                             <div className="absolute -bottom-4 -left-4">
//                                 <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
//                             </div>
//                         </div>
//                     </div>
                    
//                     <h1 className="text-4xl font-bold mb-4 text-gray-800">
//                         Coming Soon
//                     </h1>
                    
//                     <p className="text-xl mb-8 text-gray-600">
//                         Our speech analysis feature is currently under development. This advanced tool will analyze your 
//                         vocal delivery, speech patterns, and communication effectiveness during interviews.
//                     </p>
                    
//                     <div className="bg-green-100 p-5 rounded-lg shadow-md">
//                         <h3 className="font-bold text-green-800 mb-3 text-lg">Future Voice Analysis Features</h3>
//                         <ul className="text-left text-gray-700 space-y-3">
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Speech Clarity Analysis</strong>
//                                     <p className="text-sm">Evaluation of articulation, pronunciation and overall clarity</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Filler Word Detection</strong>
//                                     <p className="text-sm">Identification of "um", "uh", and other filler words that reduce impact</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Pace & Tone Measurement</strong>
//                                     <p className="text-sm">Analysis of speaking rate, volume variations, and vocal tone</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Confidence Indicators</strong>
//                                     <p className="text-sm">Detection of vocal confidence markers and improvement suggestions</p>
//                                 </span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Footer */}
//             <div className="container mx-auto p-4 text-center text-gray-500 mt-4">
//                 <p>We're working hard to bring you this feature soon!</p>
//             </div>
//         </div>
//     );
// };

// export default SpeechAnalysis;

//new

// src/screens/NewUserReport/SpeechAnalysis.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import MicIcon from '@mui/icons-material/Mic';
// import DescriptionIcon from '@mui/icons-material/Description';
// import GraphicEqIcon from '@mui/icons-material/GraphicEq';

// const SpeechAnalysis = () => {
//     const navigate = useNavigate();
    
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Navigation Bar */}
//             <div className="container mx-auto p-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
//                     <button         
//                         className="bg-gradient-to-r mb-3 sm:mb-0 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
//                         onClick={() => navigate('/reportView')}>
//                         <ArrowBackIcon fontSize="small" />
//                         Back to Report
//                     </button>
                    
//                     <div className="flex flex-wrap gap-2">
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full transition-colors"
//                             onClick={() => navigate('/reportView')}>
//                             <DescriptionIcon fontSize="small" />
//                             Answer Analysis
//                         </button>
                        
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 py-2 px-4 rounded-full transition-colors"
//                             onClick={() => navigate('/video-analysis')}>
//                             <VideocamIcon fontSize="small" />
//                             Video Analysis
//                         </button>
                        
//                         <button
//                             type="button"
//                             disabled
//                             className="flex items-center gap-2 bg-green-700 text-white py-2 px-4 rounded-full cursor-default">
//                             <MicIcon fontSize="small" />
//                             Speech Analysis
//                         </button>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Content */}
//             <div className="container mx-auto p-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//                     {/* Animated sound waves logo */}
//                     <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
//                         <div className="relative">
//                             <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
//                                 <MicIcon style={{ color: 'white', fontSize: 36 }} />
//                             </div>
//                             {/* Animated sound waves */}
//                             <div className="absolute -top-4 -right-4">
//                                 <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
//                             </div>
//                             <div className="absolute -bottom-4 -left-4">
//                                 <GraphicEqIcon style={{ color: '#22c55e', fontSize: 24 }} />
//                             </div>
//                         </div>
//                     </div>
                    
//                     <h1 className="text-4xl font-bold mb-4 text-gray-800">
//                         Coming Soon
//                     </h1>
                    
//                     <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
//                         Our speech analysis feature is currently under development. This advanced tool will analyze your 
//                         vocal delivery, speech patterns, and communication effectiveness during interviews.
//                     </p>
                    
//                     <div className="bg-green-100 p-5 rounded-lg shadow-md max-w-2xl mx-auto">
//                         <h3 className="font-bold text-green-800 mb-3 text-lg">Future Voice Analysis Features</h3>
//                         <ul className="text-left text-gray-700 space-y-3">
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Speech Clarity Analysis</strong>
//                                     <p className="text-sm">Evaluation of articulation, pronunciation and overall clarity</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Filler Word Detection</strong>
//                                     <p className="text-sm">Identification of "um", "uh", and other filler words that reduce impact</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Pace & Tone Measurement</strong>
//                                     <p className="text-sm">Analysis of speaking rate, volume variations, and vocal tone</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-green-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-green-800">Confidence Indicators</strong>
//                                     <p className="text-sm">Detection of vocal confidence markers and improvement suggestions</p>
//                                 </span>
//                             </li>
//                         </ul>
//                     </div>
                    
//                     <p className="text-gray-500 mt-8">
//                         We're working hard to bring you this feature soon!
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SpeechAnalysis;

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