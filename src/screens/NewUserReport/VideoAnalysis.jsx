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