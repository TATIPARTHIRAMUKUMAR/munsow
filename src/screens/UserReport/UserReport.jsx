import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./UserReport.css";
import UserReportTitle from "./UserReportTitle";
import UserReportPartOne from "./UserReportPartOne";
import UserReportPartTwo from "./UserReportPartTwo";
import UserReportPartThree from "./UserReportPartThree";
import UserReportPartFour from "./UserReportPartFour";
import UserReportPartSeven from "./UserReportPartSeven";
import UserReportPartFive from "./UserReportPartFive";
import UserReportPartSix from "./UserReportPartSix";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUserReport } from "../../redux/action";
import { useNavigate } from 'react-router-dom';


const UserReport = () => {
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({});
  const { userReport } = useSelector(state => state?.data)

  const navigate = useNavigate();




  useEffect(() => {
    setReportData(userReport);
  }, [userReport])

  const handleGeneratePdf = async () => {
    setLoading(true);
    const pdfContainer = reportTemplateRef.current;
    const pdfWidth = 210; // A4 width in points (about 8.27 inches)
    const pdfHeight =
      (pdfContainer.clientHeight * pdfWidth) / pdfContainer.clientWidth; // Maintain aspect ratio

    // Create a canvas from your HTML content
    const canvas = await html2canvas(pdfContainer);

    // Convert the canvas to a data URL
    const imgData = canvas.toDataURL("image/png");

    // Create a jsPDF instance
    const doc = new jsPDF({
      format: [pdfWidth, pdfHeight],
      orientation: "portrait", // You can also use 'landscape' for landscape mode
    });

    // Insert the image into the PDF
    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
    doc.save("UserReports.pdf");
    setLoading(false);
  };

  return (
    <div className="body flex-grow-1 overflow-y-scroll">
      <div className="container mx-auto">
        {/* Back button */}
        <button
          className="bg-gradient-to-r m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-4 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          ← View All Reports
        </button>
        <div ref={reportTemplateRef} className="bg-white">
          <div>
            <UserReportTitle userData={reportData} />
          </div>
          <div>
            <UserReportPartOne userData={reportData?.behavioral_presentation_and_grooming} />
          </div>
          <div>
            <Divider className="pt-5" />
            <UserReportPartTwo userData={reportData?.interview_score_by_category} user={reportData} />
            <Divider className="pt-5" />
          </div>
          <div>
            <Divider className="pt-5" />
            <UserReportPartThree userData={reportData?.interview_score_by_category} user={reportData} />
            <Divider className="pt-5" />
          </div>
          {
            reportData?.interview_score_by_category?.data.find(o => o.main_title === "Equipped Mastery")?.length > 0 && (
              <div>
                <Divider className="pt-5" />
                <UserReportPartFour userData={reportData?.interview_score_by_category} user={reportData} />
                <Divider className="pt-5" />
              </div>
            )
          }
          <div>
            <Divider className="pt-5" />
            <UserReportPartFive userData={reportData?.where_you_stand} />
            <Divider className="pt-5" />
          </div>
          <div>
            <Divider className="pt-5" />
            <UserReportPartSix userData={reportData} />
            <Divider className="pt-5" />
          </div>
          <div>
            <UserReportPartSeven userData={reportData} />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-center items-center mt-4 mb-5">
            <button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-full flex justify-center items-center"
              onClick={() => handleGeneratePdf()}
            >
              DOWNLOAD AS PDF{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff", marginLeft: "10px" }} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReport;
