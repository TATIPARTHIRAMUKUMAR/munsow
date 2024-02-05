
import MunsowLogo from "./../../assets/MunsowLogo.png";

const Intro = (props) => {

  const { user, report_data } = props;

  const formatSkills = (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) {
      return "None";
    }
    return skills.length > 1 ? skills.join(" | ") : skills[0];
  };


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

        {report_data?.report_type === "skill based report" ? (
          <div className="mt-40 mb-48">
          <div className="flex text-center justify-center items-center mb-5 uppercase text-2xl font-bold mb-4 text-purple">
            <h1>{report_data?.report_type}</h1>
          </div>
          <div className="flex justify-center items-center mb-5">
            <div className="munsow-light-bg px-6 py-4 rounded-full">
              <p className="text-lg">Hard Skills: {formatSkills(Object.keys(report_data?.hard_and_soft_skill_dic?.hard_skill || {}))}</p>
              <p className="text-lg">Soft Skills: {formatSkills(Object.keys(report_data?.hard_and_soft_skill_dic?.soft_skill || {}))}</p>
            </div>
          </div>
          </div>
        ) : report_data?.report_type === "role based report" ? (
          <div className="mt-40 mb-48">
          <div className="flex text-center justify-center items-center mb-5 uppercase text-2xl font-bold mb-4 text-purple">
            <h1>{report_data?.report_type}</h1>
          </div>
          <div className="flex justify-center items-center mb-5">
            <div className="munsow-light-bg px-6 py-4 rounded-full">
              <p className="text-lg">Position: {report_data?.interview_position}</p>
              <p className="text-lg">Company: {report_data?.interview_company}</p>
            </div>
          </div>
          </div>
        ) : null
        }
        

        <div className="flex flex-col items-end mr-9 pb-20">
          <h2 className="font-bold">REPORT FOR</h2>
          <h2 className="text-purple uppercase">{user}</h2>
        </div>
      </div>
    </>
  );
};

export default Intro;
