
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegThumbsDown } from "react-icons/fa";


const DeepDive = (props) => {

  const { head, ques, queScore, candidateAns, sampleAns, gotRight, gotWrong, feedback, report_data } = props;

  const feedbackData = feedback;

  // Parse the feedbackData string into an object
  // const feedbackObject = JSON.parse(feedbackData);

  const getScoreColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'text-red'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'text-orange'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'text-green'; // Apply green color
    } else {
      return 'text-gray'; // Default color or handle other cases
    }
  };

  const getBackgroundColor = (head) => {
    const firstWord = head.split(' ')[0];
  
    if (firstWord === 'Behavioural') {
      return 'bg-purple'; // Apply purple color
    } else if (firstWord === 'Practical') {
      return 'bg-orange'; // Apply orange color
    } else if (head.startsWith('Domain Knowledge')) {
      return 'bg-green'; // Apply green color
    } else {
      return 'munsow-light-bg'; // Default color or handle other cases
    }
  };

  const bgColor = getBackgroundColor(head);

  const formatFeedback = (rawFeedback) => {
    const lines = rawFeedback.split('\n');
    return lines?.map((line, index) => (
        <React.Fragment key={index}>
            {line.replace(/"/g, '')}
            {index < lines.length - 1 && <br/>}
        </React.Fragment>
    ));
};

  return (

    <>
    <div className="mx-3 my-3 md:mx-6 md:my-6">
    {report_data?.report_type === "skill based report" ? (
      <>
        <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 mb-8 ${bgColor}`}>
          <h1 className={`mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple`}>{head}&nbsp;Deep&nbsp;Dive</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(queScore)}`}>{queScore ? `${queScore}/10` : ("N/A")}</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
          </div>
        </div>
        <div className={`mb-8 ${bgColor}`}>
          <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
        </div>
      </>
    ) : report_data?.report_type === "role based report" ? (
      <>
        <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 mb-8 ${bgColor}`}>
          <h1 className={`mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple`}>{head}&nbsp;Deep&nbsp;Dive</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(queScore)}`}>{queScore ? `${queScore}/10` : ("N/A")}</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
          </div>
        </div>
        <div className={`mb-8 ${bgColor}`}>
          <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
        </div>
      </>
    ) : report_data?.report_type === "JD based report" ? (
      <>
        <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 mb-8 bg-green`}>
          <h1 className={`mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple`}>JD Interview&nbsp;Deep&nbsp;Dive</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(queScore)}`}>{queScore ? `${queScore}/10` : ("N/A")}</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
          </div>
        </div>
        <div className={`mb-8 bg-green`}>
          <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
        </div>
      </>
    ) : report_data?.report_type === "cultural fit report" ? (
      <>
        <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 mb-8 bg-purple`}>
          <h1 className={`mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple`}>Cultural Interview&nbsp;Deep&nbsp;Dive</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(queScore)}`}>{queScore ? `${queScore}/10` : ("N/A")}</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
          </div>
        </div>
        <div className={`mb-8 bg-purple`}>
          <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
        </div>
      </>
        ) : null
        }
      
      <div className="p-4 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        
       
          <div className="">
            <h3 className="text-lg font-semibold italic text-purple mb-4">Candidate's Answer:</h3>
            {candidateAns && ( <p className="text-purple">{candidateAns}</p>  )}
          </div>
       
        
       
          <div className="">
            <h3 className="text-lg font-semibold italic text-purple mb-4">Sample Answer for reference</h3>
            {sampleAns && ( <p className="text-purple">{sampleAns}</p>  )}
          </div>
       

      </div>

      { gotRight && gotWrong && (
        <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Insights</h3>
        </div>
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          { gotRight && (
            <div className="">
              <h3 className="text-sm font-semibold italic text-darkgreen bg-lightgreen p-3 rounded-2xl inline-flex mb-4"><AiOutlineLike color="green" className="m-0.5" />What you got right</h3>
              <p className="bg-lightgreen text-purple rounded-3xl p-4">{gotRight}</p>
            </div>
          )}
          {gotWrong &&(
            <div className="">
              <h3 className="text-sm font-semibold italic text-darkred bg-lightred p-3 rounded-2xl inline-flex mb-4"><FaRegThumbsDown color="brown" className="m-1" />What you got wrong</h3>
              <p className="bg-lightred text-purple rounded-3xl p-4">{gotWrong}</p>
            </div>
          )}
        
        </div>
      </div>
      )}

      {feedback && (
        <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Feedback for the Candidate:</h3>
        </div>
        {formatFeedback(feedback)}
        </div>
      )}
      


    </div>
    </>
  );
};

export default DeepDive;