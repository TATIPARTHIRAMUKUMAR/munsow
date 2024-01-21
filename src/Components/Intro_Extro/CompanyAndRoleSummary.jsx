import React from "react";

const CompanyAndRoleSummary = () => {
  return (
    <div className="container  ">
      <div className="content pt-2">
        <div
          className=" text mb-4"
          style={{
            color: "#452B4E",
            fontWeight: "700",
            fontSize: "23.5px",
            margin: "20px",
          }}
        >
          Company and Role Based Curated Summary
        </div>
        <div className="about d-flex mb-4">
          <div className="lefttitles">About the Company</div>
          <div className="rightcontent">
            <ul className="ul-part">
              <li>
                Deloitte is a global leader in consulting and has a robust
                framework for HR transformation, which includes cloud
                technologies, process improvement, and change management.
                Familiarize yourself with their approach.
              </li>
              <li>
                Deloitte's culture values learning and growth. Emphasize your
                eagerness to learn and develop your skills.
              </li>
              <li>
                {" "}
                Deloitte often works with diverse, global teams. If you have any
                experiences working in diverse or cross-cultural settings, be
                sure to mention these.
              </li>
            </ul>
          </div>
        </div>
        <div className="about d-flex mb-4">
          <div className="lefttitles">Company related recent news</div>
          <div className="rightcontent">
            <ul className="ul-part">
              <li>
                {" "}
                In recent news, Deloitte has announced plans to increase their
                investment in Al and digital transformation services. Mentioning
                awareness of this can show that you stay updated with company
                news.
              </li>
            </ul>
          </div>
        </div>
        <div className="about d-flex mb-4 ">
          <div className="lefttitles">Role-specific Skills</div>
          <div className="rightcontent">
            <ul className="ul-part">
              <li>
                Showcasing your experience with digital HR platforms is crucial
                for a HR Transformation Consultant role at Deloitte.
              </li>
              <li>
                {" "}
                Deloitte's HR Transformation services also involve process
                redesign and change management. Share examples of your
                experience in these areas.
              </li>
            </ul>
          </div>
        </div>
        <div className="about d-flex">
          <div className="lefttitles">Industry Trends</div>
          <div className="rightcontent">
            <ul className="ul-part">
              <li>
                {" "}
                The HR industry is increasingly leveraging Al and machine
                learning for various HR functions. Highlighting your awareness
                and any experience you have with these technologies could
                beneficial.
              </li>
              <li>
                According to a recent study, HR departments are playing a key
                role in environmental, social and governance (ESG) initiatives.
                This is also an area that Deloitte is focusing on, as per recent
                news. Be prepared to discuss your views or experience in this
                area.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAndRoleSummary;
