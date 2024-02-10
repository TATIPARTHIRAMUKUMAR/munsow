import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUserReport } from "../../redux/action";
import { useNavigate } from 'react-router-dom';
import SkillSuggestions from "./SkillSuggestions";
import SkillsDisplay from "./SkillsDisplay";
import ReportOverview from "./ReportOverview";
import DeepDive from "./DeepDive";
import Intro from "./Intro";
import Extro from "./Extro";
import CuratedSummary from "./CuratedSummary";
import Presentation from "./Presentation";
import SummarySnapshot from "./SummarySnapshot";

import { Document, Page, Text, pdf } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { saveAs } from 'file-saver';


import generatePDF from "react-to-pdf";


const NewUserReport = () => {
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({});
  const { userReport } = useSelector(state => state?.data)

  const navigate = useNavigate();

  const options = {
    filename: "user-report.pdf",
    page: {
      margin: 20,
    },
    // Define page breaks based on element IDs
    pagebreak: {
      before: ["#SummarySnapshot", "#Presentation", "#ReportOverview", "#DeepDive", "#CuratedSummary", "#Extro"],
    },
  };

  const handleGeneratePdf = async () => {
    try {
      setLoading(true);
      await generatePDF(() => reportTemplateRef.current, options);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setReportData(userReport);
  }, [userReport])

  console.log(userReport, 'userreport') // use this data to show in reports

   //Example functions for handling dynamic data for ReportOverview component
   const getDynamicDataForReportOverview = (index) => {
    const category = userReport?.interview_score_by_category.data[index];
    return {
      head: category.main_title,
      overallScore: category.secured_marks,
      notes: category.notes,
      scores: category.sub_segements.map((segment, sIndex) => ({
        title: segment.title,
        score: segment.secured_marks,
        desc: segment.notes,
      })),
    };
  };
  
  
  // Example functions for handling dynamic data for DeepDive component
    const getDynamicDataForDeepDive = (index, qIndex) => {
    const category = userReport?.interview_score_by_category.data[index];

    const question = category.interview_questions[qIndex];
    return {
      head: category.main_title,
      ques: question.question,
      candidateAns: question.answer,
      sampleAns: question.suggested_answer,
      gotRight: question.Insights.what_you_got_right,
      gotWrong: question.Insights.what_you_got_wrong,
      feedback: question.Insights["feedback_for_the candidate"],
    };
  };
  

  const UserReportDocument =  (
    <Document>
      <Page size="A4">
        <Text>
          {console.log('////??? : ', userReport)}
          <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
              
              <div id="Intro">
                <Intro
                  user={userReport?.user_name}
                  unqualified_hard_skills={userReport?.unqualified_hard_skills}
                  unqualified_soft_skills={userReport?.unqualified_soft_skills}
                  report_type={userReport?.report_type}
                />
              </div>
  
              <div id="SummarySnapshot">
                <SummarySnapshot
                  title={userReport?.interview_score_by_category.data[0].main_title}
                  interview_score_by_category={userReport?.interview_score_by_category}
                  behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
                />
              </div> 
        
              <div id="Presentation">
                <Presentation              
                  behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
                />
              </div>
  
                    
                {userReport?.interview_score_by_category.data.map((category, index) => (
                  <div key='' id="ReportOverview">
                    <ReportOverview
                      key={index}
                      className="report-overview-component overflow-ellipsis"  // Add a class name to identify the component
                      {...getDynamicDataForReportOverview(index)}
                    />
                  </div>
                ))}
              
              
                {userReport?.interview_score_by_category.data.map((category, index) => (
                  <>
                    {category.interview_questions.map((question, qIndex) => (
                      <div key={index} id="DeepDive"> 
                      <DeepDive
                        className="deep-dive-component overflow-ellipsis"
                        {...getDynamicDataForDeepDive(index, qIndex)}
                      />
                      </div>
                    ))
                    }
                  </>
                ))}
            
  
            <div id="CuratedSummary">
              <CuratedSummary
                report_type={userReport?.report_type}
                skillSuggestions={userReport?.skill_based_suggestions}
              /> 
            </div>
  
            <div id="Extro">
              <Extro/>
            </div>
  
          </div>
        </Text>
      </Page>
    </Document>
  );


  // const handleGeneratePdf = () => {
  //   try {
  //     setLoading(true);
  //     const pdfBlob = pdf(UserReportDocument).toBlob();
  //     console.log('<><><> : ', pdfBlob)
  //     saveAs(pdfBlob, 'UserReport.pdf');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  //   // ReactDOM.render(<UserReportDocument userReport={userReport} />, document.getElementById('root'));
  // };
  

//   const handleGeneratePdf = async () => {
//     // try{
//       console.log('In')
//     setLoading(true);
//     const pdfContainer = reportTemplateRef.current;
  
//     const pdf = new jsPDF({
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait",
//       compress: true, // Enable compression
//     });
  
//     // Iterate through each component
//     const components = pdfContainer.children;
//     for (let i = 0; i < components.length; i++) {
//       if (i > 0) {
//         pdf.addPage();
//       }

//       const pdfContent = document.querySelector("#pdf-content");

//       if (pdfContent) {
//         const pdfOptions = {
//           margin: 10,
//           filename: "UserReports.pdf",
//           image: { type: "jpeg", quality: 0.98 }, 
//           html2canvas: { scale: 2 },
//           jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//         };

//           html2pdf().from(pdfContent).set(pdfOptions).save();
//         }
//     //   const component = components[i];
//     //   // const isMobile = window.innerWidth <= 700;
//     //   const canvas = await html2canvas(component, {
//     //     scale: 3, // Adjust the scale as needed
//     //     logging: false, // Disable logging for cleaner output
//     //     // width: pdf.internal.pageSize.getWidth() * 3,
//     //     // height: component.offsetHeight
//     //   });
//     //   // canvas.width = component.offsetWidth * 3.9; // Adjust the scale as needed
//     //   // canvas.height = component.offsetHeight * 4; // Adjust the scale as needed

//     //   const imageData = canvas.toDataURL("image/png");
  
//     //   pdf.addImage(
//     //     imageData,
//     //     "PNG",
//     //     0,
//     //     0,
//     //     pdf.internal.pageSize.getWidth(),
//     //     pdf.internal.pageSize.getHeight(),
//     //     "",
//     //     "FAST"
//     //   );
//     // }
  
//     // pdf.save("UserReports.pdf");
//     setLoading(false);

//   // }catch (error) {
//   //   console.error("Error during PDF generation:", error);
//   //   setLoading(false);
//   // }
//   }
// }

// const handleGeneratePdf = async () => {
//   try {
//     setLoading(true);

//     const pdfContainer = reportTemplateRef.current;
//     const pdf = new jsPDF({
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait",
//       compress: true,
//     });

//     // Iterate through each component
//     const components = pdfContainer.children;
//     for (let i = 0; i < components.length; i++) {
//       if (i > 0) {
//         pdf.addPage();
//       }

//       const pdfContent = components[i];
//       console.log("//////////", pdfContent)

//       await pdf.html(pdfContent, {
//         x: 10,
//         y: 19,
//         width: pdf.internal.pageSize.getWidth(),
//         height:  pdf.internal.pageSize.getHeight(),
//       });
//     }

//     // Save the final PDF
//     pdf.save("UserReports.pdf");
//     setLoading(false);
//   } catch (error) {
//     console.error("Error during PDF generation:", error);
//     setLoading(false);
//   }
// };


  // --------------------------------------------------------------------------------------------------------------------------------

  // const handleGeneratePdf = () => {
  //   console.log('inside')
  //   setLoading(true)
  //   const pdfContent = document.querySelector("#pdf-content");

  //   if (pdfContent) {
  //     const pdfOptions = {
  //       filename: "UserReports.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait"},
  //     };

  //     // code to try giving dynamic height but is returning empty file & warning 
  //     // const contentHeight = (pdfContent.clientHeight)/96 * 25.4;
  //     // console.log('////// ', contentHeight)
  //     // pdfOptions.jsPDF.format = [210, contentHeight + 20];

  //     // code to give static width & height
  //     // pdfOptions.jsPDF.format = [210, 400];
  //     // html2pdf().from(pdfContent).set(pdfOptions).save();

  //     // Code to fix cut off data
  //     html2pdf().from(pdfContent).set({ ...pdfOptions, 
  //       pagebreak: { 
  //       before: ['#SummarySnapshot', '#Presentation', '#ReportOverview', '#DeepDive', '#CuratedSummary', '#Extro'],
  //       mode: ['avoid-all'] } }
  //       ).save();
  //   }
  //   setLoading(false)
  // };


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
        
        <div ref={reportTemplateRef} className="bg-white" id="pdf-content">
          
          <div id="Intro">
            <Intro
              user={userReport?.user_name}
              unqualified_hard_skills={userReport?.unqualified_hard_skills}
              unqualified_soft_skills={userReport?.unqualified_soft_skills}
              report_type={userReport?.report_type}
            />
          </div>

          <div id="SummarySnapshot">
            <SummarySnapshot
              title={userReport?.interview_score_by_category.data[0].main_title}
              interview_score_by_category={userReport?.interview_score_by_category}
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
            />
          </div> 
    
          <div id="Presentation">
            <Presentation              
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
            />
          </div>

                
            {userReport?.interview_score_by_category.data.map((category, index) => (
              <div key='' id="ReportOverview">
                <ReportOverview
                  key={index}
                  className="report-overview-component overflow-ellipsis"  // Add a class name to identify the component
                  {...getDynamicDataForReportOverview(index)}
                />
              </div>
            ))}
          
          
            {userReport?.interview_score_by_category.data.map((category, index) => (
              <>
                {category.interview_questions.map((question, qIndex) => (
                  <div key={index} id="DeepDive"> 
                  <DeepDive
                    className="deep-dive-component overflow-ellipsis"
                    {...getDynamicDataForDeepDive(index, qIndex)}
                  />
                  </div>
                ))
                }
              </>
            ))}
        

        <div id="CuratedSummary">
          <CuratedSummary
            report_type={userReport?.report_type}
            skillSuggestions={userReport?.skill_based_suggestions}
          /> 
        </div>

        <div id="Extro">
          <Extro/>
        </div>

        </div>

      </div>
    </div>
  );
};

export default NewUserReport;
