import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./QuizBrief.css";
import { loadDetailedQuiz } from "../../redux/action";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from "./../../Dark";

const QuizBrief = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const quizData = useSelector((state) => state?.data?.detailedQuiz);
    const questions = quizData?.MCQs?.questions || [];
    const { width, height } = useWindowSize();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [score, setScore] = useState(0);
    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        dispatch(loadDetailedQuiz(id));
    }, [dispatch, id]);

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const textColor = isDarkMode
        ? colorTheme.dark.background
        : colorTheme.light.background;

    useEffect(() => {
        if (questions.length > 0) {
            setAnswers(Array(questions.length).fill(null));
            setStatus(Array(questions.length).fill("Not Attempted"));
        }
    }, [questions]);

    const handleOptionSelect = (optionKey) => {
        const updatedAnswers = [...answers];
        const updatedStatus = [...status];
        updatedAnswers[currentQuestionIndex] = optionKey;
        updatedStatus[currentQuestionIndex] = "Attempted";
        setAnswers(updatedAnswers);
        setStatus(updatedStatus);
    };

    const handleNavigation = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSkip = () => {
        const updatedStatus = [...status];
        updatedStatus[currentQuestionIndex] = "Skipped";

        setStatus(updatedStatus);
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    const handlePrevNext = (direction) => {
        setCurrentQuestionIndex((prevIndex) =>
            direction === "next"
                ? Math.min(prevIndex + 1, questions.length - 1)
                : Math.max(prevIndex - 1, 0)
        );
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.correct_answer) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        setShowPopup(true);
    };

    const renderQuestionStatus = () => {
        return questions.map((_, index) => (
            <button
                key={index}
                className={`status-circle ${
                    status[index] === "Attempted"
                        ? "attempted"
                        : status[index] === "Skipped"
                        ? "skipped"
                        : "not-attempted"
                }`}
                onClick={() => handleNavigation(index)}
            >
                {index + 1}
            </button>
        ));
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate("/studentMRCLM");
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (!quizData || questions.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="quiz-container">
            <h1 className="quiz-title font-bold mx-[150px]"
                style={{
                    background: linearGradientBackground,
                    color: textColor
                }}
            >Quiz</h1>
            <div className="quiz-content">
                <div className="question-box">
                    <h2>{`Question ${currentQuestionIndex + 1}/${questions.length}`}</h2>
                    <p>{currentQuestion?.question}</p>
                    <div className="options">
                        {currentQuestion?.options &&
                            Object.entries(currentQuestion.options).map(([key, value]) => (
                                <button
                                    key={key}
                                    className={`option ${
                                        answers[currentQuestionIndex] === key
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleOptionSelect(key)}
                                >
                                    {value}
                                </button>
                            ))}
                    </div>
                </div>
                <div className="navigation">
                    <button onClick={() => handlePrevNext("prev")} 
                        style={{
                            color: textColor,
                            backgroundColor: linearGradientBackground
                        }}
                        >Prev</button>
                    <button onClick={handleSkip}
                        style={{
                            color: textColor,
                            backgroundColor: linearGradientBackground
                        }}
                    >Skip</button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={() => handlePrevNext("next")} 
                        style={{
                            color: textColor,
                            backgroundColor: linearGradientBackground
                        }}
                        >Next</button>
                    ) : (
                        <button onClick={handleSubmit}
                        style={{
                            color: textColor,
                            backgroundColor: linearGradientBackground
                        }}
                        >Submit</button>
                    )}
                </div>
                <div className="status-panel">
                    <h3>Question Status</h3>
                    <div className="status-circles">{renderQuestionStatus()}</div>
                </div>
            </div>
            {/* {showPopup && (
                <>
                    <Confetti width={width} height={height} />
                    <div className="popup-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="popup-content bg-[#242D36] text-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
                            <h2 className="text-3xl font-bold text-[#0fe1d2] mb-4">
                                🎉 Congratulations! 🎉
                            </h2>
                            <p className="text-lg mb-2">
                                Your Score: <strong className="text-[#0fe1d2]">{score} / {questions.length}</strong>
                            </p>
                            <p className="text-sm mb-6">
                                {score === questions.length
                                    ? "Perfect Score! You're amazing!"
                                    : score > questions.length / 2
                                    ? "Great job! Keep it up!"
                                    : "Don't worry, try again to improve!"}
                            </p>
                            <button
                                onClick={handlePopupClose}
                                className="bg-[#0fe1d2] hover:bg-[#10c7b8] text-[#242D36] font-semibold py-2 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
                            >
                                Close and Continue 🚀
                            </button>
                        </div>
                    </div>
                </>
            )} */}

            {showPopup && (
                <>
                    <Confetti width={width} height={height} />
                    <div className="popup-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="popup-content bg-white text-[#242D36] rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
                            <h2 className="text-3xl font-bold text-[#0fe1d2] mb-4">
                                🎉 Congratulations! 🎉
                            </h2>
                            <p className="text-lg mb-2">
                                Your Score: <strong className="text-[#0fe1d2]">{score} / {questions.length}</strong>
                            </p>
                            <p className="text-sm mb-6">
                                {score === questions.length
                                    ? "Perfect Score! You're amazing!"
                                    : score > questions.length / 2
                                    ? "Great job! Keep it up!"
                                    : "Don't worry, try again to improve!"}
                            </p>
                            <button
                                onClick={handlePopupClose}
                                className="bg-[#0fe1d2] hover:bg-[#10c7b8] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                Close and Continue 🚀
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizBrief;
