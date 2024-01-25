  

const ReportOverview = (props) => {

    const { head, overallScore, notes, scores } = props;

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
        return 'bg-gray'; // Default color or handle other cases
      }
    };

    const bgColor = getBackgroundColor(head);


    return (
        <>
        <div className="mx-3 my-3 md:mx-6 md:my-6 report-overview-component">
        <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 ${bgColor}`}>
            <h1 className="mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple">{head} Overview</h1>
            <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
                <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}/10</h1>
                <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
            </div>
        </div>

        <div className="p-8">
            <p className="text-purple font-semibold">{notes}</p>
        </div> 

        <div className={`mx-4 rounded-t-3xl ${bgColor}`}>
        {scores.map((score, index) => (
            <div className="p-4 md:p-8 flex" key={index}>
                <div className="mr-2 md:mr-4">
                    <span className={`text-2xl font-bold ${getScoreColor(score.score)}`}>{score.score}/10</span>
                </div>
                <div>
                    <h1 className="text-purple font-semibold underline py-1">{score.title}</h1>
                    <p className="text-purple">{score.desc}</p>
                </div>
            </div>
        ))}

        </div>
        </div>
        </>
    );
  };
  
export default ReportOverview;