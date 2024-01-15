

const ReportOverview = (props) => {

    const { head, overallScore, bgcolor, scoreclr, title1, score1, desc1, title2, score2, desc2, title3, score3, desc3, title4, score4, desc4, } = props;

    return (
        <>
        <div className="mx-6 my-6">
        <div className={`flex justify-around items-center pb-8 ${bgcolor}`}>
            <h1 className="text-4xl font-semibold text-purple">{head} Overview</h1>
            <div className="flex flex-col bg-white p-8 rounded-b-3xl">
                <span className={`flex text-4xl font-bold justify-center ${scoreclr}`}>{overallScore}/10</span>
                <span className="flex justify-center text-lg font-semibold text-purple">Overall Score</span>
            </div>
        </div>

        <div className="p-8">
            <p className="text-purple font-semibold">Arpitha exhibited a growth mindset and a positive attitude throughout the interview. However, she sometiomes sounded defensive when asked about past failures, instead of embracing them as learning opportunities.</p>
        </div> 

        <div className={`mx-4 rounded-t-3xl ${bgcolor}`}>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-red">{score1}/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">{title1}</h1>
                <p className="text-purple">{desc1}</p>
            </div>
        </div>   
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-orange">{score2}/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">{title2}</h1>
                <p className="text-purple">{desc2}</p>
            </div>
        </div>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-green">{score3}/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">{title3}</h1>
                <p className="text-purple">{desc3}</p>
            </div>
        </div>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-red">{score4}/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">{title4}</h1>
                <p className="text-purple">{desc4}</p>
            </div>
        </div>
        </div>
        </div>
        </>
    );
  };
  
export default ReportOverview;