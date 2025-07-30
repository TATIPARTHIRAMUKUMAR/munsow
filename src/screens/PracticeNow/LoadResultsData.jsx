// //src/Pages/Practice/LoadResultsData.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import InterviewResults from "./InterviewResults";

// const LoadResultsData = () => {
//     const [questions, setQuestions] = useState([]);
//     const { questionsList } = useSelector(state => state?.data);

//     useEffect(() => {
//         setQuestions(questionsList?.questions ? questionsList?.questions : []);
//         console.log("results questions", questions, questionsList);
//     }, [questionsList]);

//     return (
//         <div>
//             {questions.length > 0 && <InterviewResults />}
//         </div>
//     );
// };

// export default LoadResultsData;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InterviewResults from "./InterviewResults";
import { loadInterviewResults } from "../../redux/action"; // Import the action from the first code

const LoadResultsData = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();
    const { questionsList, interviewResults } = useSelector(state => state?.data);

    useEffect(() => {
        console.log("📊 LoadResultsData - Redux State:", {
            questionsList: questionsList,
            questionsLength: questionsList?.questions?.length || 0,
            interviewResults: interviewResults
        });

        // Set questions from questionsList if available
        if (questionsList?.questions && questionsList.questions.length > 0) {
            console.log("✅ Setting questions from questionsList:", questionsList.questions.length);
            setQuestions(questionsList.questions);
            setIsLoading(false);
        } else {
            console.log("⚠️ No questions found in questionsList, attempting to load interview results");
            
            // If no questions in questionsList, try to load interview results
            // This handles cases where user navigates directly to results page
            dispatch(loadInterviewResults((resp) => {
                if (resp?.data?.questions) {
                    console.log("✅ Loaded questions from interview results:", resp.data.questions.length);
                    setQuestions(resp.data.questions);
                } else {
                    console.log("❌ No questions found in interview results");
                    setError("No interview data found");
                }
                setIsLoading(false);
            }));
        }
    }, [questionsList, dispatch]);

    // Debug logging when questions state changes
    useEffect(() => {
        console.log("📝 Questions state updated:", {
            questionsCount: questions.length,
            firstQuestion: questions[0]?.question?.substring(0, 50) + "..." || "N/A"
        });
    }, [questions]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-lg font-medium">Loading interview results...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <div className="text-red-500 text-lg font-medium mb-4">❌ {error}</div>
                <p className="text-gray-600 text-center">
                    Unable to load interview results. Please try refreshing the page or contact support.
                </p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    // Success state - render results
    return (
        <div>
            {questions.length > 0 ? (
                <>
                    <InterviewResults questions={questions} />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                    <p className="text-lg font-medium text-gray-600">No interview questions available</p>
                    <p className="text-sm text-gray-500 mt-2">
                        This might indicate that the interview data hasn't been properly saved or loaded.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoadResultsData;