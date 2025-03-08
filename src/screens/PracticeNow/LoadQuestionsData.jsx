import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewGridLayout from "./NewGridLayout";

export default function LoadQuestionsData() {

    const [questions1, setQuestions] = useState([]);

    const { questionsList } = useSelector(state => state?.data)

    useEffect(() => {
        setQuestions(questionsList?.questions ? questionsList?.questions : [])
        console.log("questions", questions1, questionsList)
        //questions = questionsList?.questions ? questionsList?.questions : []
    }, [questionsList])

    return (<div>
        {questions1.length > 0 && (
            <NewGridLayout questions={questions1}/>
        )}
    </div>);
}
