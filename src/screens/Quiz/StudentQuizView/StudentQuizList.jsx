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

import { deleteQuiz, loadAssignments, loadQuestionBanks } from '../../../redux/action';

import { useDarkMode } from "./../../../Dark";


const QuizCard = ({ quiz, onClick, onClick1, title }) => {
    const dispatch = useDispatch();
    const controls = useAnimation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        controls.start({ opacity: 1, scale: 1 });
    }, [controls]);

    const handleCardClick = async () => {
        await controls.start({ opacity: 0.9, scale: 0.95 });
        onClick(quiz.id);
    };

    const handleResultsClick = async () => {
        await controls.start({ opacity: 0.9, scale: 0.95 });
        onClick1(quiz.result_id);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteQuiz(quiz.id, (resp) => {
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
            className={`w-full h-auto mx-auto inline-block rounded-lg overflow-hidden cursor-pointer 
        shadow-md bg-[#F0F0F0] hover:shadow-2xl transition-shadow duration-300 transform ${quiz.is_locked ? 'opacity-50 pointer-events-none' : 'hover:scale-105'
                }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="p-4 flex flex-col justify-between h-full">
                <div className="justify-between mb-2">
                    <h2 className="text-lg font-bold mb-2">{quiz.name}</h2>
                    <p className="text-gray-600 text-md my-4">{quiz.description}</p>
                    {quiz.deadline != null && (<p className="text-gray-600 text-md">Deadline : {quiz.deadline}</p>)}
                    <p className="text-gray-600 text-md">Skills Required : {quiz?.skills_required}</p>
                    <p className="text-gray-600 text-md">Minutes Allowed : {quiz.max_time_min}</p>
                </div>
                {quiz.is_locked && quiz.allows_late_submission && (
                    <div className="text-red-500 text-sm mt-2 md:mt-0 md:ml-2">
                        Late submission is allowed.
                    </div>
                )}
                <div className="flex flex-col justify-between items-center p-2 border rounded-lg shadow-md bg-white md:flex-row">

                    {quiz.status != "Evaluation completed" && (<div className="flex flex-col items-center mb-4 md:flex-row md:mb-0">
                        <div className='flex text-md mr-4'>
                            {quiz.questions?.length} Questions
                        </div>
                    </div>)}






                    <div>
                        {quiz.status === 'Evaluation completed' ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleResultsClick}
                                style={{
                                    backgroundColor: linearGradientBackground,
                                    color: textColor
                                }}
                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                See Results
                            </motion.button>
                        ) : quiz.is_locked ? (
                            quiz.allows_late_submission ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCardClick}
                                    style={{
                                        backgroundColor: linearGradientBackground,
                                        color: textColor
                                    }}
                                    className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    Start
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: linearGradientBackground,
                                        color: textColor,
                                        cursor: 'not-allowed'
                                    }}
                                    className="px-4 py-2 shadow-xl font-bold rounded-md transition duration-300 focus:outline-none"
                                    disabled
                                >
                                    Locked
                                </motion.button>
                            )
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCardClick}
                                style={{
                                    backgroundColor: linearGradientBackground,
                                    color: textColor
                                }}
                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Start
                            </motion.button>
                        )}

                        {quiz.completed_attempt < quiz.number_of_reattempt && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCardClick}
                                style={{
                                    backgroundColor: linearGradientBackground,
                                    color: textColor,
                                    marginLeft:"10px"
                                }}
                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                ReAttempt
                            </motion.button>
                        )}

                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {"Delete Assignment?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ margin: '20px', fontSize: '16px', textAlign: 'center' }}>
                        Are you sure you want to delete this Assignment?
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

const ScrollableContainer = ({ title, quizzes, handleCardClick, handleResultsClick, textColor, visibleCount }) => {
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
        <div className="max-w-7xl ">
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
                            <QuizCard key={quiz?.id} quiz={quiz} onClick={handleCardClick} onClick1={handleResultsClick}
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
                            <QuizCard key={quiz?.id} quiz={quiz} onClick={handleCardClick} title={title} onClick1={handleResultsClick} />
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
    const { assignmentsList } = useSelector((state) => state?.data);
    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;


    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;


    useEffect(() => {
        dispatch(loadAssignments());
    }, [dispatch]);

    useEffect(() => {
        console.log("assignmentsList", assignmentsList)
    }, [assignmentsList]);

    const handleCardClick = (quizId) => {
        const path = `/studentQuizList/view/${quizId}`;
        navigate(path);
    };

    const handleResultsClick = (quizId) => {
        const path = `/assignments/view/${quizId}`;
        navigate(path);
    };

    return (
        <div className="max-w-8xl mx-auto p-8">
            <div className='flex justify-end'>
                <div className={` px-8 py-4 flex rounded-lg gap-6`}
                    style={{
                        backgroundColor: linearGradientBackground
                    }}>
                    <div className='flex bg-white px-4 py-4 w-[50%] rounded-lg'>
                        <p className='w-[60%] text-md flex justify-center items-center'>No. of Quizzes Attended</p>
                        <h1 className='w-[40%] text-3xl font-bold flex justify-center items-center'>0</h1>
                    </div>
                    <div className='flex bg-white px-4 py-4 w-[50%] rounded-lg'>
                        <p className='w-[65%] text-md flex justify-center items-center'>No. of Pending Quizzes</p>
                        <h1 className='w-[35%] text-3xl font-bold flex justify-center items-center'>{assignmentsList?.length}</h1>
                    </div>
                </div>
            </div>
            <ScrollableContainer
                title={"To do Quizzes"}
                quizzes={assignmentsList}
                handleCardClick={handleCardClick}
                handleResultsClick={handleResultsClick}
                textColor="#242D36"
                visibleCount={100}
            />
            {/* <ScrollableContainer
                title= {QuizList[1].name}
                quizzes={QuizList[1].data}
                handleCardClick={handleCardClick}
                textColor="#242D36"
                visibleCount={4}
            /> */}
        </div>
    );
};

export default StudentQuizList;
