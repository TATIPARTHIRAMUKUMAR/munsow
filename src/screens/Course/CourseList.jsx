import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { delete_course, loadcourses } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import courseImg from "../../assets/course-bg.webp";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDarkMode } from '../../Dark';

const CourseCard = ({ course, onClick }) => {
    const dispatch = useDispatch();
    const controls = useAnimation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        controls.start({ opacity: 1, scale: 1 });
    }, [controls]);

    const handleCardClick = async () => {
        await controls.start({ opacity: 0.9, scale: 0.95 });
        onClick(course.course_id);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        dispatch(delete_course(course.course_id, (resp) => {
            dispatch(loadcourses());
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
            className="w-full h-auto mx-auto rounded-lg overflow-hidden cursor-pointer shadow-md bg-white hover:shadow-xl transition-shadow duration-300"

            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
        >
            <img src={courseImg} alt="Course" className="w-full h-44 object-cover" />
            <div className="p-6">
                <div className="flex justify-between mb-2">
                    <h2 className="text-xl font-semibold mb-2">{course?.course_name}</h2>
                    <IconButton
                        variant="text"
                        color="error"
                    >
                        <DeleteIcon onClick={handleOpen} />
                    </IconButton>
                </div>

                <p className="text-gray-600 text-sm mb-4">{course?.description}</p>
                <div className="flex justify-between items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            backgroundColor: linearGradientBackground,
                            color: textColor
                        }}
                        onClick={handleCardClick}
                        className=" text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Explore More
                    </motion.button>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {"Delete Course?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ margin: '20px', fontSize: '16px', textAlign: 'center' }}>
                        Are you sure you want to delete this course?
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

const CourseList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courses } = useSelector((state) => state?.data);

    useEffect(() => {
        dispatch(loadcourses());
    }, [dispatch]);

    const handleCardClick = (courseId) => {
        const path = `/courseList/view/${courseId}`;
        navigate(path);
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
        <div className="max-w-7xl mx-auto p-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Courses List</h1>
                <button
                    onClick={() => navigate("/courseList/create")}
                    style={{
                        backgroundColor: linearGradientBackground,
                        color: textColor
                    }}
                    className=" text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Create Course
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {courses?.map((course) => (
                    <CourseCard key={course?.id} course={course} onClick={handleCardClick} />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
