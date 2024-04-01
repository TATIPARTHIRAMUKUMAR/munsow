import React from "react";

const Presentation = (props) => {

  const { behavioral_presentation_and_grooming, presentation_and_grooming_score } = props;

  const roundedScore = Math.round(presentation_and_grooming_score);

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

  return (
    
    <>
      <div className="mx-3 my-3 md:mx-6 md:my-6">
        <div className="flex justify-around items-center pb-4 lg:pb-8 munsow-dark-bg">
          <h1 className="mx-4 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-white">Presentation and Grooming</h1>
          <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(roundedScore)}`}>{roundedScore}/10</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
          </div>
        </div>

        <div className="p-4 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">

          {behavioral_presentation_and_grooming?.data?.map((value, index) => (
            <div className="">
              <h1 className={`text-center text-4xl font-bold ${getScoreColor(value.secured_marks)}`}>{value.secured_marks}/10</h1>
              <h3 className="text-center text-lg font-semibold text-purple">{value.title}</h3>
              <p className="text-purple text-center">{value.notes}</p>
            </div>
          ))}

        </div>
      

      </div>
    </>
  );
};

export default Presentation;