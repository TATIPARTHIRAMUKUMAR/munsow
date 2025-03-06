import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InterviewResults from "./InterviewResults";

const LoadResultsData = () => {
    const [questions, setQuestions] = useState([]);
    const { questionsList } = useSelector(state => state?.data);

    useEffect(() => {
        setQuestions(questionsList?.questions ? questionsList?.questions : []);
        console.log("results questions", questions, questionsList);
    }, [questionsList]);

    return (
        <div>
            {questions.length > 0 && <InterviewResults />}
        </div>
    );
};

export default LoadResultsData;