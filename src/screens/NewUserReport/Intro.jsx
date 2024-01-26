
import MunsowLogo from "./../../assets/MunsowLogo.png";

export const ReportType = (props) => {

  const { position, company ,hardSkills, softSkills, reportType } = props;
  
  const formatSkills = (skills) => {
    return skills.length > 1 ? skills.join(" | ") : skills[0];
  };

  return(
    <>
      {reportType === "role based report" && (
        <div className="flex justify-center items-center mb-5 mt-40 mb-48">
          <h1>{reportType}</h1>
          <div className="munsow-light-bg px-6 py-4 rounded-full">
            <p>Position: {position}</p>
            <p>Company: {company}</p>
          </div>
        </div>
      )}

      {reportType === "skill based report" && (
        <div className="mt-40 mb-48">
        <div className="flex text-center justify-center items-center mb-5 uppercase text-2xl font-bold mb-4 text-purple">
          <h1>{reportType}</h1>
        </div>
        <div className="flex justify-center items-center mb-5">
          <div className="munsow-light-bg px-6 py-4 rounded-full">
            {hardSkills && <p>Hard Skills: {formatSkills(hardSkills)}</p>}
            {softSkills && <p>Soft Skills: {formatSkills(softSkills)}</p>}
          </div>
        </div>
        </div>
      )}
    </>
  );

};

const Intro = (props) => {

  const { user, unqualified_hard_skills, unqualified_soft_skills, report_type } = props;

  return (
    <>
      <div className="">
        <div className="flex justify-end mr-5 mb-10">
          <img src={MunsowLogo} height="84px" width="84px"/>
        </div>
        <div className="flex items-center">
          <div>
            <div className="w-6 h-11 mb-1 munsow-light-bg"></div>
            <div className="w-6 h-11 mb-1 munsow-dark-bg"></div>
            <div className="w-6 h-11 mb-1 munsow-light-bg"></div>
            <div className="w-6 h-11 mb-1 munsow-dark-bg"></div>
          </div>
          <div className="ml-4 md:ml-7">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-sky">MUNSOW</h1>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Candidate Interview<br></br> Assessment Report</h1>
          </div>
        </div>

        <ReportType
        position="HR"
        company="Google"
        hardSkills={unqualified_hard_skills}
        softSkills={unqualified_soft_skills}
        reportType={report_type}
        />

        <div className="flex flex-col items-end mr-9 pb-20">
          <h2 className="font-bold">REPORT FOR</h2>
          <h2 className="text-purple uppercase">{user}</h2>
        </div>
      </div>
    </>
  );
};

export default Intro;
