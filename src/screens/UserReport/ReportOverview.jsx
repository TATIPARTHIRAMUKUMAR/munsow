// import { useEffect, useState } from "react";

const ReportOverview = (props) => {

    const { head, score, bgcolor, scoreclr } = props;

    return (
        <>
        <div className={`mt-5 flex justify-around items-center bg-purple pb-8 ${bgcolor}`}>
            <h1 className="md:ms-4 text-4xl font-semibold text-purple">{head} Overview...</h1>
            <div className="flex flex-col bg-white p-8 rounded-b-3xl">
                <span className={`flex text-4xl font-bold justify-center ${scoreclr}`}>{score}</span>
                <span className="flex justify-center text-lg font-semibold text-purple">Overall Score</span>
            </div>
        </div>

        <div className="p-8">
            <p className="text-purple font-semibold">Arpitha exhibited a growth mindset and a positive attitude throughout the interview. However, she sometiomes sounded defensive when asked about past failures, instead of embracing them as learning opportunities.</p>
        </div> 

        <div className={`mx-4 rounded-t-3xl ${bgcolor}`}>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-red">6/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">Resilience</h1>
                <p className="text-purple">Arpitha showed resilience in dealing with past challenges, but there were moments where she appered defensive when asked about failures. It's essential to present these instances as learning experiences.</p>
            </div>
        </div>   
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-orange">7/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">Teamwork</h1>
                <p className="text-purple">She shared relevant instances of successful team collaboration. However, she could improve on recognizing and articulating the contributions of team members to project successes.</p>
            </div>
        </div>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-green">9/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">Adaptability</h1>
                <p className="text-purple">Arpitha provided good examples of adapting to changing circumtances in her previous roles, demonstrating her ability to manage change effectively.</p>
            </div>
        </div>
        <div className="p-8 flex">
            <div className="mr-4">
                <span className="text-2xl font-bold text-red">5/10</span>
            </div>
            <div>
                <h1 className="text-purple font-semibold underline py-1">Initiative</h1>
                <p className="text-purple">While Arpitha showed initiative in certain scenarios, she may need to emphasize more proactive behavior in identifying and addressing challenges.</p>
            </div>
        </div>
        </div>
        </>
    );
  };
  
export default ReportOverview;