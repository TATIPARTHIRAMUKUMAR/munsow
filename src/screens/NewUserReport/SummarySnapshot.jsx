const SummarySnapshot = (props) => {
  const { interview_score_by_category, behavioral_presentation_and_grooming, presentation_and_grooming_score, readiness_score, head } = props;

  const presentationScore = Math.round(presentation_and_grooming_score);
  const readinessScore = Math.round(readiness_score);

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
  const progressBarColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'bg-red-500'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'bg-orange-500'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'bg-green-500'; // Apply green color
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
      return 'bg-gray'; // Default color or handle other cases
    }
  };

  // const bgColor = getBackgroundColor(head);

  //static sub-segment titles
  const setTitle = (head, index) => {
    const firstWord = head.split(' ')[0];
    let title = "";
  
    if (firstWord === 'Behavioural') {
      return ["Adaptability","Collaboration","Integrity","Resilience"][index];
    } else if (firstWord === 'Practical') {
      return ["Creativity","Logic","Decision Making","Analytical Skills"][index];
    } else if (head.startsWith('Domain Knowledge')) {
      return ["Expertise","Innovation","Learning Ability","Technical Skills"][index];
    } else {
      return ["hello1","hello2","hello3","hello4"][index];
    }
  };

  return (
    <>
      <div className="py-10 mx-3 my-3 md:mx-6 md:my-6 bg-grey">
        <h1 className="mx-8 font-bold text-2xl">Summary Snapshot</h1>
        <div className="mx-4 my-8 md:mx-6 md:my-12 rounded-3xl py-6 bg-white flex justify-around ">
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(readinessScore)} mb-4`}>{readinessScore}/10</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Overall Readiness Score</h3>
          </div>
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(presentationScore)} mb-4`}>{presentationScore}/10</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Presentation and Grooming</h3>
          </div>
        </div>
        <div className="munsow-dark-bg text-white py-1">
          <h2 className="text-center font-bold">Munsow Interview Classification Highlights</h2>
        </div>

        {interview_score_by_category.data.map((category, index) => (
          <div key={index} className={`mx-4 md:mx-8 my-8 rounded-3xl py-6 ${getBackgroundColor(category.main_title)}`}>
            <div className="flex flex-col lg:flex-row mb-8 lg:justify-around items-center">
              <div>
                <h1 className="text-xl font-bold text-purple p-3 text-center">{category.main_title}</h1>
              </div>
              <div className="rounded-full bg-white w-48 p-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-start">
                    <div className="w-full bg-gray-300 rounded-full">
                      <div
                        style={{ width: `${(category.secured_marks / 10) * 100}%` }}
                        className={`text-center text-xs text-white ${progressBarColor(category.secured_marks)} rounded-full`}
                      >
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:columns-2 sm:columns-1">
              {category.sub_segements.map((segment, sIndex) => (
                <div key={sIndex} className="flex justify-center">
                  <span className="flex items-center justify-start gap-2 p-2">
                    <h1 className={`text-xl font-bold ${getScoreColor(segment.secured_marks)}`}>
                      {segment.secured_marks}/10
                    </h1>
                    <p className="text-purple font-bold underline">{segment?.title}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SummarySnapshot;