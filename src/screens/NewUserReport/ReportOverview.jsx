  

const ReportOverview = (props) => {

    const { head, overallScore, bgcolor, notes, scores } = props;

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
        <div className="mx-6 my-6">
        <div className={`flex justify-around items-center pb-4 lg:pb-8 ${bgcolor}`}>
            <h1 className="mx-2 px-8 text-2xl lg:text-4xl font-semibold text-purple">{head} Overview</h1>
            <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
                <h1 className={`text-3xl lg:text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}/10</h1>
                <p className=" text-lg font-semibold text-purple">Overall Score</p>
            </div>
        </div>

        <div className="p-8">
            <p className="text-purple font-semibold">{notes}</p>
        </div> 

        <div className={`mx-4 rounded-t-3xl ${bgcolor}`}>
        {scores.map((score, index) => (
            <div className="p-8 flex" key={index}>
                <div className="mr-4">
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