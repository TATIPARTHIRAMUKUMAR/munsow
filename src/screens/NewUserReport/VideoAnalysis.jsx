// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VideocamIcon from '@mui/icons-material/Videocam';

// const VideoAnalysis = () => {
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
//                     {/* Company Logo */}
//                     <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
//                         <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center">
//                             <VideocamIcon style={{ color: 'white', fontSize: 36 }} />
//                         </div>
//                     </div>
                    
//                     <h1 className="text-4xl font-bold mb-4 text-gray-800">
//                         Coming Soon
//                     </h1>
                    
//                     <p className="text-xl mb-8 text-gray-600">
//                         Our video analysis feature is currently under development. This advanced tool will provide 
//                         in-depth insights about your body language, facial expressions, and visual presentation during interviews.
//                     </p>
                    
//                     <div className="bg-purple-100 p-5 rounded-lg shadow-md">
//                         <h3 className="font-bold text-purple-800 mb-3 text-lg">Future Video Analysis Features</h3>
//                         <ul className="text-left text-gray-700 space-y-3">
//                             <li className="flex items-start">
//                                 <span className="text-purple-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-purple-800">Body Language Analysis</strong>
//                                     <p className="text-sm">Assessment of posture, hand gestures, and overall body positioning</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-purple-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-purple-800">Facial Expression Recognition</strong>
//                                     <p className="text-sm">Analysis of facial expressions to gauge confidence and engagement</p>
//                                 </span>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="text-purple-600 mr-2 mt-1">•</span>
//                                 <span>
//                                     <strong className="text-purple-800">Eye Contact Tracking</strong>
//                                     <p className="text-sm">Evaluation of eye contact consistency and engagement indicators</p>
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

// export default VideoAnalysis;

//new
// src/screens/NewUserReport/VideoAnalysis.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import MicIcon from '@mui/icons-material/Mic';
// import DescriptionIcon from '@mui/icons-material/Description';

// const VideoAnalysis = () => {
//     const navigate = useNavigate();
//     const [videoMetrics, setVideoMetrics] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // In a real implementation, this would be an API call to get results
//         // For now, we'll use sample data that matches your example
//         setTimeout(() => {
//             const sampleVideoMetrics = {
//                 overallScore: 4,
//                 metrics: [
//                     {
//                         category: "Eye Contact",
//                         score: 1,
//                         maxScore: 10,
//                         feedback: "Very minimal eye contact was made, which can come across as disinterested or lacking in confidence."
//                     },
//                     {
//                         category: "Posture",
//                         score: 3,
//                         maxScore: 10,
//                         feedback: "There was a noticeable lack of good posture, which could be worked on to portray a more positive, engaged demeanor."
//                     },
//                     {
//                         category: "Grooming",
//                         score: 10,
//                         maxScore: 10,
//                         feedback: "Exceptional grooming and professional attire were observed, portraying a strong, positive, and professional first impression."
//                     },
//                     {
//                         category: "Hand Gestures",
//                         score: 0,
//                         maxScore: 10,
//                         feedback: "No hand gestures were observed, which could make the verbal communication less engaging or expressive."
//                     },
//                     {
//                         category: "Facial Expressions",
//                         score: 6,
//                         maxScore: 10,
//                         feedback: "The candidate exhibited a fair range of facial expressions, indicating a decent level of engagement in the conversation."
//                     },
//                     {
//                         category: "Background and Lighting",
//                         score: 0,
//                         maxScore: 10,
//                         feedback: "The background was cluttered and the lighting was poor, making it hard to focus on the candidate during the interview."
//                     },
//                     {
//                         category: "Audio Quality",
//                         score: 10,
//                         maxScore: 10,
//                         feedback: "Excellent audio quality with no noticeable background noise was observed, ensuring highly effective communication."
//                     },
//                     {
//                         category: "Device Position",
//                         score: 1,
//                         maxScore: 10,
//                         feedback: "Significant issues with the device positioning were observed, making it hard to maintain visual contact with the candidate."
//                     }
//                 ],
//                 candidateName: "Sameera Hazel"
//             };
            
//             setVideoMetrics(sampleVideoMetrics);
//             setLoading(false);
//         }, 1500); // Simulate loading delay
//     }, []);

//     // Function to get the color based on score
//     const getScoreColor = (score, maxScore) => {
//         const percentage = (score / maxScore) * 100;
//         if (percentage >= 80) return "text-green-500";
//         if (percentage >= 60) return "text-yellow-500";
//         if (percentage >= 40) return "text-orange-500";
//         return "text-red-500";
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Navigation Bar */}
//             <div className="container mx-auto p-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
//                     <button         
//                         className="bg-gradient-to-r mb-3 sm:mb-0 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
//                         onClick={() => navigate('/report')}>
//                         <ArrowBackIcon fontSize="small" />
//                         Back to Report
//                     </button>
                    
//                     <div className="flex flex-wrap gap-2">
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full transition-colors"
//                             onClick={() => navigate('/report')}>
//                             <DescriptionIcon fontSize="small" />
//                             Answer Analysis
//                         </button>
                        
//                         <button
//                             type="button"
//                             disabled
//                             className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-full cursor-default">
//                             <VideocamIcon fontSize="small" />
//                             Video Analysis
//                         </button>
                        
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-full transition-colors"
//                             onClick={() => navigate('/speech-analysis')}>
//                             <MicIcon fontSize="small" />
//                             Speech Analysis
//                         </button>
//                     </div>
//                 </div>
//             </div>
            
//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//                 </div>
//             ) : (
//                 <div className="container mx-auto p-4">
//                     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                         {/* Header Section */}
//                         <div className="relative bg-gray-800 text-white p-6">
//                             <h1 className="text-3xl font-bold mb-2">Presentation and Grooming</h1>
//                             <div className="absolute top-6 right-6 bg-white text-gray-800 rounded-full px-6 py-3 shadow-lg">
//                                 <div className="text-3xl font-bold text-center text-red-500">{videoMetrics.overallScore}/10</div>
//                                 <div className="text-sm font-medium text-center">Overall Score</div>
//                             </div>
//                         </div>
                        
//                         {/* Metrics Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//                             {videoMetrics.metrics.map((metric, index) => (
//                                 <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
//                                     <div className="p-4">
//                                         <div className={`text-4xl font-bold ${getScoreColor(metric.score, metric.maxScore)}`}>
//                                             {metric.score}/{metric.maxScore}
//                                         </div>
//                                         <h3 className="text-lg font-semibold text-gray-800 mt-2">{metric.category}</h3>
//                                         <p className="text-gray-600 mt-2">
//                                             {videoMetrics.candidateName} ,{metric.feedback}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* Summary Section */}
//                         <div className="bg-gray-100 p-6">
//                             <h2 className="text-xl font-semibold mb-3">Video Analysis Summary</h2>
//                             <p className="text-gray-700">
//                                 Based on the analysis of your video interview, there are several areas where improvements could be made
//                                 to enhance your overall presentation. While your grooming and audio quality are excellent, focus on improving
//                                 your eye contact, posture, hand gestures, and ensuring a better background setup for future interviews.
//                             </p>
                            
//                             <div className="mt-4">
//                                 <h3 className="font-medium text-gray-800 mb-2">Key Improvement Areas:</h3>
//                                 <ul className="list-disc list-inside text-gray-700 space-y-1">
//                                     <li>Maintain consistent eye contact with the camera</li>
//                                     <li>Improve posture to appear more engaged and confident</li>
//                                     <li>Use appropriate hand gestures to enhance communication</li>
//                                     <li>Ensure a clean, well-lit background for professional appearance</li>
//                                     <li>Position your device at eye level for better visual connection</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default VideoAnalysis;

// import React, { useRef, useState } from "react";
// import "./UserReport.css";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate } from 'react-router-dom';
// import ReportOverview from "./ReportOverview";
// import DeepDive from "./DeepDive";
// import Intro from "./Intro";
// import Extro from "./Extro";
// import CuratedSummary from "./CuratedSummary";
// import Presentation from "./Presentation";
// import SummarySnapshot from "./SummarySnapshot";
// import { PDFExport } from "@progress/kendo-react-pdf";

// // Import icons for the analysis buttons
// import VideocamIcon from '@mui/icons-material/Videocam';
// import MicIcon from '@mui/icons-material/Mic';
// import DescriptionIcon from '@mui/icons-material/Description';


// const VideoAnalysis = () => {
//   let userReport = {};
//   const reportTemplateRef = useRef(null);
//   const [loading, setLoading] = useState(false);
 
//   const navigate = useNavigate();
//   const storedReportData = localStorage.getItem('reportData');
    
//   if (storedReportData) {
//     userReport = JSON?.parse(storedReportData);
//   } else {
//     console.log('No report data found in local storage');
//   }
  
//   console.log(userReport, 'userReport..') // use this data to show in reports
  
//   const pdfExportComponent = useRef(null);

//   const handleGeneratePdf = () => {
//     setLoading(true);
//     pdfExportComponent.current.save();
//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//   };
  
//   const navigateToAnswerAnalysis = () => {
//     navigate('/reportView');
//   };
//   const navigateToVideoAnalysis = () => {
//     navigate("/video-analysis");
//   };

//   const navigateToSpeechAnalysis = () => {
//     navigate("/speech-analysis");
//   };

//   return (
//     <div className="body flex-grow-1 overflow-y-scroll">
//       <div className="container mx-auto">
//         {/* Navigation and Action Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-start mb-4 relative overflow-auto max-w-full h-auto">
//           <button         
//             className="bg-gradient-to-r m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-2 transition-all duration-300"
//             onClick={() => navigate('/report')}>
//             ← View All Reports
//           </button>
          
//           {/* Analysis Action Buttons */}
//           <div className="flex flex-wrap gap-2 mt-5 mr-5">
//             <button
//               type="button"
//               className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-full transition-colors"
//               onClick={navigateToAnswerAnalysis}>
//               <DescriptionIcon fontSize="small" />
//               Answer Analysis {loading && (<CircularProgress size={20} style={{ color: "#fff" }} />)}
//             </button>
            
//             <button
//               type="button"
//               className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 py-2 px-4 rounded-full transition-colors"
//               onClick={navigateToVideoAnalysis}>
//               <VideocamIcon fontSize="small" />
//               Video Analysis
//             </button>
            
//             <button
//               type="button"
//               className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-full transition-colors"
//               onClick={navigateToSpeechAnalysis}>
//               <MicIcon fontSize="small" />
//               Speech Analysis
//             </button>
//           </div>
//         </div>
        
//         <PDFExport
//           ref={pdfExportComponent}
//           paperSize="A4"
//           scale={0.545}
//           margin="1cm"
//           fileName="UserReports.pdf"
//           forcePageBreak=".page-break"
//         >
//         <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
          
//           {/* <div>
//             <Intro
//               user={userReport?.user_name}
//               report_data={userReport}
//               interview_type={userReport?.interview_type}
//             />
//           </div> */}

    
//           <div className="page-break">
//             <Presentation              
//               behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
//               presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
//             />
//           </div>
          

//       </div>
//         </PDFExport> 
//       </div>
//     </div>
//   );
// };

// export default VideoAnalysis;

//new2
import React, { useRef, useState } from "react";
import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import Presentation from "./Presentation";
import { PDFExport } from "@progress/kendo-react-pdf";
import Intro2 from "./Intro2";
import Extro from "./Extro";

const VideoAnalysis = () => {
  let userReport = {};
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  const storedReportData = localStorage.getItem('reportData');
    
  if (storedReportData) {
    userReport = JSON?.parse(storedReportData);
  } else {
    console.log('No report data found in local storage');
  }
  
  const pdfExportComponent = useRef(null);

  const handleGeneratePdf = () => {
    setLoading(true);
    pdfExportComponent.current.save();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="body flex-grow-1 overflow-y-scroll">
      <div className="container mx-auto">
        {/* Navigation and PDF Download Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 relative overflow-auto max-w-full h-auto">
          <button         
            className="bg-gradient-to-r m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-2 transition-all duration-300"
            onClick={() => navigate('/report')}>
            ← View All Reports
          </button>
          
          <button
            type="button"
            className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-full transition-colors mt-5 mr-5"
            onClick={handleGeneratePdf}>
            DOWNLOAD AS PDF {loading && (<CircularProgress size={20} style={{ color: "#fff", marginLeft: "10px" }} />)}
          </button>
        </div>
        
        <PDFExport
          ref={pdfExportComponent}
          paperSize="A4"
          scale={0.545}
          margin="1cm"
          fileName="Video_Analysis.pdf"
          forcePageBreak=".page-break"
        >
        <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
            <div>
            <Intro2
              user={userReport?.user_name}
              report_data={userReport}
              interview_type={userReport?.interview_type}
            />
            </div>          
            <div className="page-break">
            <Presentation              
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
            />
          </div>
            <div className="page-break">
                <Extro/>
            </div>
        </div>
        </PDFExport> 
      </div>
    </div>
  );
};

export default VideoAnalysis;