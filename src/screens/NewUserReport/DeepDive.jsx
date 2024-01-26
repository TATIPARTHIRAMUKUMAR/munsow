
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegThumbsDown } from "react-icons/fa";

const DeepDive = ({ data, bgcolor, head }) => {

  const formatFeedback = (rawFeedback) => {
    const lines = rawFeedback.split('\n');
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line.replace(/"/g, '')}
            {index < lines.length - 1 && <br/>}
        </React.Fragment>
    ));
};

  return (
    <>
      {data?.interview_questions?.map((o, index) => {
        return (

          <>
            <div className="mx-6 my-6 bg-[#FAFAFA]">
              <div className={`mb-8 ${bgcolor}`}>
                <h1 className="text-xl font-semibold text-purple p-5"> {o.question} </h1>
              </div>
              <div className="lg:columns-2 sm:columns-1">
                <div className="p-3">
                  <h3 className="text-lg font-semibold italic text-purple">Candidate's Answer:</h3>
                  <p className="text-purple"> {o.answer} </p>
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="text-lg font-semibold italic text-purple">Sample Answer for reference</h3>
                  <p className="text-purple">{o?.suggested_answer}</p>
                </div>
              </div>
              <div insights className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold italic text-purple">Insights</h3>
                </div>
                <div className="lg:columns-2 sm:columns-1">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold italic text-darkgreen bg-lightgreen p-1 inline-flex mb-4"><AiOutlineLike color="green" className="m-0.5" />What you got right</h3>
                    <p className="bg-lightgreen text-purple rounded-3xl p-4"> {o?.Insights?.what_you_got_right}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold italic text-darkred bg-lightred p-1 inline-flex mb-4"><FaRegThumbsDown color="brown" className="m-1" />What you got wrong</h3>
                    <p className="bg-lightred text-purple rounded-3xl p-4">{o?.Insights?.what_you_got_wrong}</p>
                  </div>
                </div>
              </div>
              <div feedback className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold italic text-purple">Feedback for the Candidate:</h3>
                </div>
                <div>
                {formatFeedback(o?.Insights["feedback_for_the candidate"])?.slice(1, -1)}  
               </div>
              </div>
            </div>
          </>
        );
      })}
    </>)
};

export default DeepDive;
