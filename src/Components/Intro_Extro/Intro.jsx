import React from "react";
import "./Intro.css";
import CompanyAndRoleSummary from "./CompanyAndRoleSummary";
import Extro from "./Extro";
import SummarySnapshot from "./SummarySnapshot";
import Presentation from "./Presentation";
import MunsowLogo from "./Images/MunsowLogo.png";
const Intro = () => {
  return (
    <>
      <div className="body d-flex flex-grow-1 overflow-y-scroll ">
        <div className="container mx-auto d-flex align-items-center justify-content-center">
          <div style={{ marginLeft: "450px", marginTop: "10%" }}>
            <img
              src={MunsowLogo}
              alt="munsow"
              width={"100px"}
              height={"100%"}
            />
          </div>
          <div className="content">
            <div className="ml-0 title-part text-left flex">
              <div className="color-box d-flex flex-column">
                <div className="color-box-item mb-1"></div>
                <div className="color-box-item mb-1"></div>
                <div className="color-box-item mb-1"></div>
                <div className="color-box-item mb-1"></div>
              </div>
              <div className="ml-4 d-flex flex-col">
                <div className="title">MUNSOW</div>
                <div className="title1">
                  Candidate Interview Assessment Report
                </div>
              </div>
            </div>

            <div className="ml-4 text-center title2">
              Position: HR Transformation Consultant | Deloitte
            </div>

            <div className="ml-4  text-right title3">
              <div style={{ fontWeight: "bold" }}>REPORT FOR</div>
              <div>MANDA ARPITHA</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CompanyAndRoleSummary />
        <Extro />
        <SummarySnapshot />
        <Presentation />
      </div>
    </>
  );
};

export default Intro;
