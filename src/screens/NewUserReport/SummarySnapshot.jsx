
const componentColors = ["bg-purple", "bg-green", "bg-orange"];

const SkillCategory = ({ title, scores, bgcolor, overallScore }) => {
  const progressBarWidth = (overallScore / 10) * 100; // Calculate percentage width based on overallScore

  return(
    <div className={`mx-8 my-8 rounded-3xl py-6 ${bgcolor}`}>
    <div className="flex mb-8 justify-around items-center">
    <div>
      <h1 className="text-xl font-bold text-purple">{title}</h1>
    </div>
    <div className="rounded-full bg-white w-48 p-4">
      <div class="relative pt-1"> 
        <div class="flex mb-2 items-center justify-start">
          <div class="w-full bg-gray-300 rounded-full">
            <div style={{ width: `${progressBarWidth}%` }} class="text-center text-xs text-white bg-rose-500 rounded-full">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  <div className="lg:columns-2 sm:columns-1">
      {scores.map((score, index) => (
        <div className="flex justify-center" key={index}>
          <span className="flex items-center justify-start gap-2 p-2">
            <h1 className={`text-xl font-bold ${score.color}`}>{score.value}/10</h1>
            <p className="text-purple font-bold underline">{score.title}</p>
          </span>
        </div>
      ))}
  </div>
  </div>
  );
};


const SummarySnapshot = (props) => {
  // const completionPercentage = 50;

  const { interview_score_by_category,wholeData } = props;
  
  return (

    <>
      <div className="py-10 mx-6 my-6 bg-grey">
        <h1 className="mx-8 font-bold text-2xl">Summary Snapshot</h1>
        <div className="mx-8 my-12 rounded-3xl py-6 bg-white flex justify-around ">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green mb-4">{wholeData?.readiness_score}</h1>
            <h3 className="font-bold text-purple">Overall Readiness Score</h3>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green mb-4">{wholeData?.presentation_and_grooming_score}</h1>
            <h3 className="font-bold text-purple">Presentation and Grooming</h3>
          </div>
        </div>
        <div className="munsow-dark-bg text-white py-1">
          <h2 className="text-center font-bold">Munsow Interview Classification Highlights</h2>
        </div>
        {/* <div className="mx-8 my-8 rounded-3xl py-6 bg-purple">
          <div className="flex mb-8 justify-around items-center">
            <div>
              <h1 className="text-xl font-bold text-purple">{head}</h1>
            </div>
            <div className="rounded-full bg-white w-48 p-4">
              <div class="relative pt-1"> 
                <div class="flex mb-2 items-center justify-start">
                  <div class="w-full bg-gray-300 rounded-full">
                    <div style={{width: "50%"}} class="text-center text-xs text-white bg-rose-500 rounded-full">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">{score1}/10</h1><p className="text-purple font-bold underline">{title1}</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-green font-bold">{score2}/10</h1><p className="text-purple font-bold underline">{title2}</p></span>
            </div>
            <div className="">
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-orange font-bold">{score3}/10</h1><p className="text-purple font-bold underline">{title3}</p></span>
              <span className="flex items-center gap-2 p-2"><h1 className="text-xl text-red font-bold">{score4}/10</h1><p className="text-purple font-bold underline">{title4}</p></span>
            </div>
          </div>
        </div> */}
        {interview_score_by_category.data.map((category, index) => (
          <SkillCategory
            key={index}
            title={category.main_title}
            bgcolor={componentColors[index % componentColors.length]}
            overallScore={interview_score_by_category.data[index].secured_marks}
            scores={[
              { title: category.sub_segements[0].title, value: category.sub_segements[0].secured_marks, color: 'text-red' },
              { title: category.sub_segements[1].title, value: category.sub_segements[1].secured_marks, color: 'text-green' },
              { title: category.sub_segements[2].title, value: category.sub_segements[2].secured_marks, color: 'text-orange' },
              { title: category.sub_segements[3].title, value: category.sub_segements[3].secured_marks, color: 'text-red' },
              // Add more scores as needed
            ]}
          />
        ))}
      </div>
    </>
  );
};

export default SummarySnapshot;