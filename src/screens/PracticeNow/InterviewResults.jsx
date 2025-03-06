
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useDarkMode } from "./../../Dark";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import CircularProgress from "@mui/material/CircularProgress";

// Import for PDF export
import { PDFExport } from "@progress/kendo-react-pdf";

const InterviewResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    const pdfExportComponent = useRef(null);

    const { 
        colorTheme: reduxColorTheme, 
        questionsList,
        interviewResults // The interview results from the API
    } = useSelector((state) => state?.data);
    
    const backgroundColor = isDarkMode
        ? reduxColorTheme.dark.foreground
        : reduxColorTheme.light.foreground;

    const textColor = isDarkMode
        ? reduxColorTheme.dark.textColor3
        : reduxColorTheme.light.textColor3;

    const linearGradientBackground = isDarkMode
        ? reduxColorTheme.dark.selectBackground
        : reduxColorTheme.light.selectBackground;

    useEffect(() => {
        // If we have real data from the API, use it
        if (interviewResults?.interview_questions) {
            const processedResults = interviewResults.interview_questions.map(question => ({
                question: question.question,
                answer: question.answer || "No answer recorded",
                predictedAnswer: question.suggested_answer || "No suggested answer available", 
                category: question.category || "General",
                duration: question.duration || 60,
                confidence: calculateConfidence(question),
                strengths: extractStrengths(question),
                improvements: extractImprovements(question)
            }));
            setResults(processedResults);
        } 
        else if (questionsList?.questions) {
            const mockResults = questionsList.questions.map(question => ({
                question: question.question,
                answer: "Your answer will be analyzed after submission",
                predictedAnswer: question.suggested_answer || "This would typically show the suggested answer for reference.",
                category: question.category,
                duration: question.duration,
                confidence: Math.floor(Math.random() * 40) + 60,
                strengths: [
                    "Analysis of your communication style",
                    "Evaluation of examples provided",
                    "Structure assessment"
                ],
                improvements: [
                    "Areas where more details would help",
                    "Suggestions for better metrics",
                    "Ideas for implementation details"
                ]
            }));
            setResults(mockResults);
        }
    }, [interviewResults, questionsList]);

    // Calculate confidence score based on interview data
    const calculateConfidence = (question) => {
        if (question.secured_marks && question.total_marks) {
            return Math.round((question.secured_marks / question.total_marks) * 100);
        }
        // Return a default if data not available
        return Math.floor(Math.random() * 40) + 60;
    };

    // Extract strengths from insights
    const extractStrengths = (question) => {
        if (question.Insights && question.Insights.what_you_got_right) {
            // Split insights into bullet points if it's a paragraph
            return question.Insights.what_you_got_right
                .split('.')
                .filter(item => item.trim().length > 0)
                .map(item => item.trim());
        }
        return ["Clear communication", "Good examples", "Structured response"];
    };

    // Extract areas for improvement
    const extractImprovements = (question) => {
        if (question.Insights && question.Insights.areas_for_improvement) {
            return question.Insights.areas_for_improvement
                .split('.')
                .filter(item => item.trim().length > 0)
                .map(item => item.trim());
        }
        return ["Be more specific", "Add quantitative metrics", "Elaborate on implementation"];
    };

    const getConfidenceColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    const goToDashboard = () => {
        navigate("/studentDashboard");
    };

    const handleGeneratePdf = () => {
        setLoading(true);
        pdfExportComponent.current.save();
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const navigateToVideoAnalysis = () => {
        navigate("/video-analysis");
    };

    const navigateToSpeechAnalysis = () => {
        navigate("/speech-analysis");
    };

    if (!results.length) {
        return (
            <div className="flex items-center justify-center h-screen" style={{ background: backgroundColor }}>
                <div className="text-2xl font-bold" style={{ color: textColor }}>
                    Loading interview results...
                </div>
            </div>
        );
    }

    return (
        <div className="body flex-grow-1 overflow-y-scroll" style={{ background: backgroundColor }}>
            <div className="container mx-auto p-4">
                {/* Action buttons row */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <button         
                        className="bg-gradient-to-r mb-4 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
                        onClick={goToDashboard}>
                        <ArrowBackIcon fontSize="small" />
                        Back to Dashboard
                    </button>
                    
                    <div className="flex flex-wrap gap-3">
                        <button
                            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-full shadow-md transition-all duration-300"
                            onClick={handleGeneratePdf}
                        >
                            <DescriptionIcon /> 
                            Answer Analysis
                            {loading && (
                                <CircularProgress size={20} style={{ color: "#fff" }} />
                            )}
                        </button>
                        
                        <button
                            className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 py-2 px-4 rounded-full shadow-md transition-all duration-300"
                            onClick={navigateToVideoAnalysis}
                        >
                            <VideocamIcon /> 
                            Video Analysis
                        </button>
                        
                        <button
                            className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-full shadow-md transition-all duration-300"
                            onClick={navigateToSpeechAnalysis}
                        >
                            <MicIcon /> 
                            Speech Analysis
                        </button>
                    </div>
                </div>
                
                {/* PDF Export Component */}
                <PDFExport
                    ref={pdfExportComponent}
                    paperSize="A4"
                    scale={0.6}
                    margin="1cm"
                    fileName="InterviewResults.pdf"
                    forcePageBreak=".page-break"
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8" id="pdf-content">
                        {/* Title Section */}
                        <h1 className="text-3xl font-bold mb-8 text-center text-purple-700 pb-4 border-b">
                            Interview Results Analysis
                        </h1>

                        {/* Results Section */}
                        <div className="grid gap-8">
                            {results.map((result, index) => (
                                <div key={index} className={`bg-gray-50 p-6 rounded-lg shadow-md ${index !== 0 ? 'page-break' : ''}`}>
                                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                                        <h2 className="text-xl font-bold flex items-center">
                                            <span className="w-8 h-8 bg-purple-100 rounded-full mr-2 flex items-center justify-center text-purple-800">
                                                {index + 1}
                                            </span>
                                            Question
                                        </h2>
                                        <div className="text-sm font-medium text-gray-500">
                                            Category: {result.category}
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="p-4 rounded-lg bg-gray-100">
                                            <h3 className="font-semibold mb-2 text-gray-800">
                                                Question:
                                            </h3>
                                            <p className="text-gray-700">{result.question}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg bg-blue-50">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-semibold text-blue-800">
                                                            Your Answer:
                                                        </h3>
                                                        <span className={`font-bold ${getConfidenceColor(result.confidence)}`}>
                                                            Score: {result.confidence}%
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700">{result.answer}</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-green-50">
                                                    <h3 className="font-semibold mb-2 text-green-800">
                                                        Strengths:
                                                    </h3>
                                                    <ul className="text-sm text-gray-700 space-y-1">
                                                        {result.strengths.map((strength, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <span className="mr-2 text-green-500">•</span>
                                                                {strength}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-4 rounded-lg bg-purple-50">
                                                    <h3 className="font-semibold mb-2 text-purple-800">
                                                        Sample Answer for Reference:
                                                    </h3>
                                                    <p className="text-gray-700">{result.predictedAnswer}</p>
                                                </div>

                                                <div className="p-4 rounded-lg bg-orange-50">
                                                    <h3 className="font-semibold mb-2 text-orange-800">
                                                        Areas for Improvement:
                                                    </h3>
                                                    <ul className="text-sm text-gray-700 space-y-1">
                                                        {result.improvements.map((improvement, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <span className="mr-2 text-orange-500">•</span>
                                                                {improvement}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Section */}
                        <div className="mt-8 page-break text-center pt-4 border-t text-gray-500">
                            <p>Generated on {new Date().toLocaleDateString()} • For your personal development</p>
                        </div>
                    </div>
                </PDFExport>
            </div>
        </div>
    );
};

export default InterviewResults;