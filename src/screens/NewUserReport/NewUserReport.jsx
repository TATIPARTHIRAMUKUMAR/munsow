import React, { useRef, useState } from "react";
import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from 'react-router-dom';
import ReportOverview from "./ReportOverview";
import DeepDive from "./DeepDive";
import Intro from "./Intro";
import Extro from "./Extro";
import CuratedSummary from "./CuratedSummary";
import Presentation from "./Presentation";
import SummarySnapshot from "./SummarySnapshot";

import { PDFExport } from "@progress/kendo-react-pdf";


const NewUserReport = () => {
  let userReport = {};
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
    const storedReportData = localStorage.getItem('reportData');
    
    if (storedReportData) {
      userReport = JSON.parse(storedReportData);
    } else {
      console.log('No report data found in local storage');
    }
  
  console.log(userReport, 'userReport..') // use this data to show in reports
  
  const pdfExportComponent = useRef(null);

const handleGeneratePdf = () => {
  setLoading(true);
  pdfExportComponent.current.save();
  setLoading(false);
};
  

  return (
    <div className="body flex-grow-1 overflow-y-scroll">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="flex flex-col sm:flex-row relative overflow-auto max-w-full h-auto">
          <button         
          className="bg-gradient-to-r m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-4 transition-all duration-300"
          onClick={() => navigate(-1)}>
            ← View All Reports
          </button>
          <button
                type="button"
                className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-full h-[40px] mt-5 w-[300px] sm:w-[200px] mx-4 sm:self-start"
                onClick={handleGeneratePdf}
              >
                DOWNLOAD AS PDF{" "}
                {loading && (
                  <CircularProgress style={{ color: "#fff", marginLeft: "10px" }} />
                )}
          </button>
        </div>
        
        <PDFExport
          ref={pdfExportComponent}
          paperSize="A4"
          scale={0.545}
          margin="1cm"
          fileName="UserReports.pdf"
          forcePageBreak=".page-break"
        >
        <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
          
          <div>
            <Intro
              user={userReport?.user_name}
              report_data={userReport}
            />
          </div>

          <div className="page-break">
            <SummarySnapshot
              interview_score_by_category={userReport?.interview_score_by_category}
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
              readiness_score={userReport?.readiness_score}
            />
          </div> 
    
          <div className="page-break">
            <Presentation              
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
            />
          </div>
        
          
            {userReport?.interview_score_by_category.data.map((category, index) => (
              <div className="page-break">
              <ReportOverview
              key={index} 
              head={category.main_title}
              overallScore={category.secured_marks}
              notes={category.notes}
             
              scores={category.sub_segements.map((segment, sIndex) => ({
                title: segment.title,
                score: segment.secured_marks,
                desc: segment.notes,
              }))}
              />
            </div>
            ))}
          
          {userReport?.interview_score_by_category.data.map((category, index) => (
          <div key={index} className="page-break">
          {category.interview_questions.map((question, qIndex) => (
            <DeepDive
              key={qIndex}
              head={category.main_title}
              
              ques={question.question}
              candidateAns={question.answer}
              sampleAns={question.suggested_answer}
              gotRight={question.Insights.what_you_got_right}
              gotWrong={question.Insights.what_you_got_wrong}
              feedback={question.Insights["feedback_for_the candidate"]}
            />
          ))}
          </div>
          ))}

        <div className="page-break">
          <CuratedSummary
            report_type={userReport?.report_type}
            skillSuggestions={userReport?.skill_based_suggestions}
            report_data={userReport}
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

export default NewUserReport;