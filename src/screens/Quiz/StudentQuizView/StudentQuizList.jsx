import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgressbar from './CircularProgressbar';

import { loadQuestionBanks } from '../../../redux/action';

import { useDarkMode } from "./../../../Dark";


const QuizList = [
    {
        name: "To Do Quizzes",
        data: [
            {
                quiz_id: 1,
                quiz_name: "Python Basics",
                quiz_description: "Introduction to Python programming",
                number_questions: 10
            },
            {
                quiz_id: 2,
                quiz_name: "JavaScript Essentials",
                quiz_description: "Fundamentals of JavaScript",
                number_questions: 12
            },
            {
                quiz_id: 3,
                quiz_name: "HTML and CSS",
                quiz_description: "Basics of web development with HTML and CSS",
                number_questions: 15
            },
            {
                quiz_id: 4,
                quiz_name: "React Basics",
                quiz_description: "Getting started with React",
                number_questions: 20
            },
            {
                quiz_id: 5,
                quiz_name: "Node.js Introduction",
                quiz_description: "Learn the basics of Node.js",
                number_questions: 18
            },
            {
                quiz_id: 6,
                quiz_name: "SQL Fundamentals",
                quiz_description: "Introduction to databases with SQL",
                number_questions: 14
            },
            {
                quiz_id: 7,
                quiz_name: "Data Structures",
                quiz_description: "Learn about different data structures",
                number_questions: 16
            }
        ]
    },
    {
        name: "Completed Quizzes",
        data: [
            {
                quiz_id: 1,
                quiz_name: "Python Advanced",
                quiz_description: "Advanced concepts in Python programming",
                percentage: 60
            },
            {
                quiz_id: 2,
                quiz_name: "JavaScript Advanced",
                quiz_description: "Advanced JavaScript programming techniques",
                percentage: 90
            },
            {
                quiz_id: 3,
                quiz_name: "CSS Grid and Flexbox",
                quiz_description: "Layout techniques with CSS Grid and Flexbox",
                percentage: 30
            },
            {
                quiz_id: 4,
                quiz_name: "Redux Basics",
                quiz_description: "State management with Redux",
                percentage: 88
            },
            {
                quiz_id: 5,
                quiz_name: "Express.js Introduction",
                quiz_description: "Basics of building web applications with Express.js",
                percentage: 66
            },
            {
                quiz_id: 6,
                quiz_name: "MongoDB Basics",
                quiz_description: "Introduction to NoSQL databases with MongoDB",
                percentage: 82
            },
            {
                quiz_id: 7,
                quiz_name: "Algorithms",
                quiz_description: "Introduction to algorithms and problem solving",
                percentage: 75
            }
        ]
    }
]

const QuizCard = ({ quiz, onClick, title }) => {
    const dispatch = useDispatch();
    const controls = useAnimation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        controls.start({ opacity: 1, scale: 1 });
    }, [controls]);

    const handleCardClick = async () => {
        await controls.start({ opacity: 0.9, scale: 0.95 });
        onClick(quiz.quiz_id);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        dispatch(delete_quiz(quiz.quiz_id, (resp) => {
            dispatch(loadQuestionBanks());
        }))
        setOpen(false);
    };

    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

        
    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;


    return (
        <motion.div
            className="w-full h-auto mx-auto inline-block rounded-lg overflow-hidden cursor-pointer 
            shadow-md bg-[#F0F0F0] hover:shadow-2xl transition-shadow duration-300 transform hover:scale-130"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="p-6 flex flex-col justify-between h-full">
                <div className="justify-between mb-2">
                    <h2 className="text-lg font-bold mb-2">{quiz?.quiz_name}</h2>
                    {/* <IconButton
                        variant="text"
                        color="error"
                    >
                        <DeleteIcon onClick={handleOpen} />
                    </IconButton> */}
                </div>

                <p className="text-gray-600 text-md my-4 w-full whitespace-normal">{quiz?.quiz_description}</p>
                <div className="flex justify-between items-center">
                    
                        {title === "Completed Quizzes" ? (
                            <>
                                <div>
                                    <CircularProgressbar value={quiz.percentage} />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCardClick}
                                    style={{
                                        backgroundColor: linearGradientBackground,
                                        color: textColor
                                    }}
                                    className="px-4 py-2 shadow-xl font-bold rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    Re-Take
                                </motion.button>
                            </>
                            ) : (
                                <>
                                    <div className='flex text-md'>
                                        {quiz.number_questions} Questions
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCardClick}
                                        style={{
                                            backgroundColor: linearGradientBackground,
                                            color: textColor
                                        }}
                                        className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        Start
                                    </motion.button>
                                </>
                            )}
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {"Delete Quiz?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ margin: '20px', fontSize: '16px', textAlign: 'center' }}>
                        Are you sure you want to delete this quiz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose} variant="outlined" color="primary" style={{ margin: '10px' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error" startIcon={<DeleteIcon />} style={{ margin: '10px' }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </motion.div>
    );
};

const ScrollableContainer = ({ title, quizzes, handleCardClick, textColor, visibleCount }) => {
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const handleSeeAllClick = () => {
        setShowAll(true);
    };

    const handleBackClick = () => {
        setShowAll(false);
    };

    const handleNext = () => {
        setVisibleStartIndex((prevIndex) =>
            Math.min(prevIndex + visibleCount, quizzes.length - visibleCount)
        );
    };

    const handlePrev = () => {
        setVisibleStartIndex((prevIndex) =>
            Math.max(prevIndex - visibleCount, 0)
        );
    };

    return (
        <div className="max-w-7xl p-8">
            <div className="mb-6 flex items-center justify-between">
                <div className='flex'>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {!showAll && (
                        <a
                            className="ml-3 mt-2 cursor-pointer underline"
                            onClick={handleSeeAllClick}
                        >
                            See All
                        </a>
                    )}
                    {showAll && (
                        <a
                            className="ml-3 mt-2 cursor-pointer underline"
                            onClick={handleBackClick}
                        >
                            Go Back
                        </a>
                    )}
                </div>
                <div className="flex space-x-2">
                    {!showAll && (
                        <>
                            <IconButton
                                className={`group ${visibleStartIndex === 0 ? 'cursor-not-allowed' : ''} 
                                w-7 h-7 flex items-center justify-center `}
                                onClick={handlePrev}
                                disabled={visibleStartIndex === 0}
                                style={{ backgroundColor: textColor }}
                            >
                                <ArrowBackIosIcon className="pl-[5px] text-gray-300" />
                            </IconButton>
                            <IconButton
                                className={`group ${visibleStartIndex >= quizzes.length - visibleCount ? 'cursor-not-allowed' : ''} 
                                w-7 h-7 flex items-center justify-center`}
                                onClick={handleNext}
                                disabled={visibleStartIndex >= quizzes.length - visibleCount}
                                style={{ backgroundColor: textColor }}
                            >
                                <ArrowForwardIosIcon className="pl-[5px] text-gray-300" />
                            </IconButton>
                        </>
                    )}
                </div>
            </div>
            {showAll ? (
                <div className="relative overflow-x-auto overflow-hidden">
                    <motion.div
                        key={visibleStartIndex}
                        initial={{ x: 100, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`grid ${title === "Continue Learning..." ? 'grid-cols-4' : 'grid-cols-4'} gap-8`}
                    >
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz?.id} quiz={quiz} onClick={handleCardClick}
                            title={title} />
                        ))}
                    </motion.div>
                </div>
            ) : (
                <div className="relative overflow-x-auto overflow-hidden">
                    <motion.div
                        key={visibleStartIndex}
                        initial={{ x: 100, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`grid ${title === "Continue Learning..." ? 'grid-cols-4' : 'grid-cols-4'} gap-8
                        overflow-x-scroll overflow-y-hidden whitespace-nowrap `}
                    >
                        {quizzes.slice(visibleStartIndex, visibleStartIndex + visibleCount).map((quiz) => (
                            <QuizCard key={quiz?.id} quiz={quiz} onClick={handleCardClick} title={title} />
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const StudentQuizList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state) => state?.data);
    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

        
    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;


    useEffect(() => {
        dispatch(loadQuestionBanks());
    }, [dispatch, quizzes]);

    const handleCardClick = (quizId) => {
        const path = `/studentQuizList/view/${quizId}`;
        navigate(path);
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className='flex justify-end'>
                <div className={` px-8 py-4 flex rounded-lg gap-6`}
                    style={{
                        backgroundColor: linearGradientBackground
                    }}>
                    <div className='flex bg-white px-4 py-4 w-[50%] rounded-lg'>
                        <p className='w-[60%] text-md flex justify-center items-center'>No. of Quizzes Attended</p>
                        <h1 className='w-[40%] text-3xl font-bold flex justify-center items-center'>{QuizList[0].data.length}</h1>
                    </div>
                    <div className='flex bg-white px-4 py-4 w-[50%] rounded-lg'>
                        <p className='w-[65%] text-md flex justify-center items-center'>No. of Pending Quizzes</p>
                        <h1 className='w-[35%] text-3xl font-bold flex justify-center items-center'>{QuizList[1].data.length}</h1>
                    </div>
                </div>
            </div>
            <ScrollableContainer
                title= {QuizList[0].name}
                quizzes={QuizList[0].data}
                handleCardClick={handleCardClick}
                textColor="#242D36"
                visibleCount={4}
            />
            <ScrollableContainer
                title= {QuizList[1].name}
                quizzes={QuizList[1].data}
                handleCardClick={handleCardClick}
                textColor="#242D36"
                visibleCount={4}
            />
        </div>
    );
};

export default StudentQuizList;
