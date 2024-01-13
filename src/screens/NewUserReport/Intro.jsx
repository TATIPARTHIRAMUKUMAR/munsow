
import MunsowLogo from "./../../assets/MunsowLogo.png";

const Intro = (props) => {

  const { position, company, user } = props;

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
          <div className="ml-7">
            <h1 className="text-2xl font-bold mb-4 text-sky">MUNSOW</h1>
            <h1 className="text-3xl font-extrabold mb-4">Candidate Interview<br></br> Assessment Report</h1>
          </div>
        </div>
        <div className="flex justify-center items-center mb-5 mt-48 mb-48">
          <p className="munsow-light-bg px-6 py-4 rounded-full">Position: {position} | {company}</p>
        </div>

        <div className="flex flex-col items-end mr-9 pb-20">
          <h2 className="font-bold">REPORT FOR</h2>
          <h2 className="text-purple uppercase">{user}</h2>
        </div>
      </div>
    </>
  );
};

export default Intro;
