import React, { useRef, useState } from "react";
import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import DeepDive from "./DeepDive";
import Intro from "./Intro";
import Extro from "./Extro";
import CuratedSummary from "./CuratedSummary";
import SummarySnapshot from "./SummarySnapshot";
import { PDFExport } from "@progress/kendo-react-pdf";

const AnswerAnalysis = () => {
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
  
  console.log(userReport, 'userReport..') // use this data to show in reports
  
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
          fileName="Answer_Analysis.pdf"
          forcePageBreak=".page-break"
        >
        <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
          
          <div>
            <Intro
              user={userReport?.user_name}
              report_data={userReport}
              interview_type={userReport?.interview_type}
            />
          </div>

          <div className="page-break">
            <SummarySnapshot
              interview_score_by_category={userReport?.interview_score_by_category}
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
              readiness_score={userReport?.readiness_score}
              report_data={userReport}
            />
          </div> 
    
          {userReport?.interview_score_by_category?.data?.map((category, index) => (
          <>
          {category?.interview_questions?.map((question, qIndex) => (
            <div key={index} id="DeepDive" className="page-break">
            <DeepDive
              key={qIndex}
              head={category.main_title}
              report_data={userReport}
              ques={question.question}
              queScore={question.score}
              candidateAns={question.answer}
              sampleAns={question.suggested_answer}
              gotRight={question.Insights.what_you_got_right}
              gotWrong={question.Insights.what_you_got_wrong}
              feedback={question.Insights["feedback_for_the candidate"]?.slice(0, -1)}
            />
            </div>
          ))}
          </>
          ))}

        {userReport?.interview_type === "skill_interview" ? (
          <div className="page-break">
          <CuratedSummary
            interview_type={userReport?.interview_type}
            skillSuggestions={userReport?.skill_based_suggestions}
            report_data={userReport}
          /> 
          </div>
        ) : userReport?.interview_type === "company_role_interview" ? (
          <div className="page-break">
          <CuratedSummary
            interview_type={userReport?.interview_type}
            skillSuggestions={userReport?.skill_based_suggestions}
            report_data={userReport}
          /> 
          </div>
        ) : userReport?.interview_type === "jd_interview" ? (
          <></>
        ) : userReport?.interview_type === "cultural_interview" ? (
          <></>
        ) : null
        }

        <div className="page-break">
          <Extro/>
        </div>

      </div>
        </PDFExport> 
      </div>
    </div>
  );
};

export default AnswerAnalysis;