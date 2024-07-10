import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { delete_course, loadcourses } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';
import courseImg from "../../../assets/course-bg.webp";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDarkMode } from '../../../Dark';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Checkbox from '@mui/material/Checkbox';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { CheckCircle } from '@mui/icons-material';
import bannerImg from '../../../assets/thumbnail.png';
import bannerImg2 from '../../../assets/virginiaBannner.png';
import bannerImg3 from '../../../assets/banner.jpeg';
import noData from '../../../assets/NoData.jpeg'

const CourseCard = ({ course, onClick, title }) => {
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
            className="w-full h-auto mx-auto inline-block rounded-lg overflow-hidden cursor-pointer 
            shadow-md bg-[#F0F0F0] hover:shadow-2xl transition-shadow duration-300 transform hover:scale-130"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <img src={bannerImg} alt="Course" className={` ${title === "Continue Learning..." ? 'w-[228px]' : 'w-[228px]'}   max-w-full h-auto m-3 rounded-lg object-cover`} />
            <div className="p-6">
                <div className="flex justify-between mb-2">
                    <h2 className="text-xl mb-2">{course?.course_name}</h2>
                    {/* <IconButton
                        variant="text"
                        color="error"
                    >
                        <DeleteIcon onClick={handleOpen} />
                    </IconButton> */}
                </div>

                <p className="text-gray-600 text-sm mb-4">{course?.description}</p>
                <div className="flex justify-between items-center">
                    
                        {title === "Continue Learning..." ? (
                            <>
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
                                    Resume
                                </motion.button>
                            </>
                            ) : (
                                <>
                                    {/* <div className='flex'>
                                        <TimerOutlinedIcon /> 2hr 14mins
                                    </div> */}
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

const ScrollableContainer = ({ title, courses, handleCardClick, handleBannerClick, textColor, visibleCount }) => {
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
            Math.min(prevIndex + visibleCount, courses.length - visibleCount)
        );
    };

    const handlePrev = () => {
        setVisibleStartIndex((prevIndex) =>
            Math.max(prevIndex - visibleCount, 0)
        );
    };

    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const handleEnrollClick = (course) => {
        if (handleBannerClick) {
            handleBannerClick({
                name: course.course_name,
                description: course.course_description,
                courses: [course]
            });
        }
    };

    return (
        <div className="max-w-7xl p-8">
            <div className="mb-6 flex items-center justify-between">
                <div className='flex'>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {(courses.length > 4 && title !== 'Suggested Courses') && (
                        <>
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
                        </>
                    )}
                </div>
                {(courses.length > 4 && title !== 'Suggested Courses') && (
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
                                    className={`group ${visibleStartIndex >= courses.length - visibleCount ? 'cursor-not-allowed' : ''} 
                                        w-7 h-7 flex items-center justify-center`}
                                    onClick={handleNext}
                                    disabled={visibleStartIndex >= courses.length - visibleCount}
                                    style={{ backgroundColor: textColor }}
                                >
                                    <ArrowForwardIosIcon className="pl-[5px] text-gray-300" />
                                </IconButton>
                            </>
                        )}
                    </div>
                )}
            </div>
            {showAll ? (
                <>
                    {title === 'Continue Learning...' && (
                        <div className="relative overflow-x-auto overflow-hidden">
                            <motion.div
                                key={visibleStartIndex}
                                initial={{ x: 100, opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`grid grid-cols-4 gap-8`}
                            >
                                {courses.map((course) => (
                                    <CourseCard key={course?.id} course={course} onClick={handleCardClick} title={title} />
                                ))}
                            </motion.div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {title === 'Suggested Courses' ? (
                        <div className="relative overflow-x-auto overflow-hidden">
                            <motion.div
                                key={visibleStartIndex}
                                initial={{ x: 100, opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`grid grid-cols-4 gap-8`}
                            >
                                {/* {courses.slice(visibleStartIndex, visibleStartIndex + visibleCount).map((course) => (
                                    <CourseCard key={course?.id} course={course} onClick={handleCardClick} title={title} />
                                ))} */}
                                <motion.div
                                    className="w-full h-auto mx-auto inline-block rounded-lg overflow-hidden cursor-pointer 
                                            shadow-md bg-[#F0F0F0] hover:shadow-2xl transition-shadow duration-300 transform hover:scale-130"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <img src={bannerImg} alt="Course" className='w-[228px] max-w-full h-auto m-3 rounded-lg object-cover' />
                                    <div className="p-6">
                                        <div className="flex flex-col justify-between mb-2">
                                            <h2 className="text-xl mb-2">Virginia Tech</h2>
                                            <p className="text-gray-600 text-sm mb-4 ">
                                                Become A DGCA, Govt of India certified Drone Pilot Course
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleEnrollClick({ course_name: 'Virginia Tech', course_description: 'This program is designed for students to specialize in drones technology.' })}
                                                style={{
                                                    backgroundColor: linearGradientBackground,
                                                    color: textColor
                                                }}
                                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                            >
                                                Enroll
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
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
                                {courses.slice(visibleStartIndex, visibleStartIndex + visibleCount).map((course) => (
                                    <CourseCard key={course?.id} course={course} onClick={handleCardClick} title={title} />
                                ))}
                            </motion.div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const assignmentTest = [
    {
        name: "Assignment Due on Hybrid Operation and Aerodynamics",
        completed: true
    },
    {
        name: "Assignment Due on Basic Principles of Flight",
        completed: false
    },
    {
        name: "Upcoming Test on Weather and Meteorology",
        completed: false
    },
    {
        name: "Assignment Due on Hybrid Operations and Aerodynamics",
        completed: false
    },
    {
        name: "Assignment Due on Hybrid Operation and Aerodynamics",
        completed: true
    },
    {
        name: "Assignment Due on Basic Principles of Flight",
        completed: false
    },
    {
        name: "Upcoming Test on Weather and Meteorology",
        completed: false
    },
    {
        name: "Assignment Due on Hybrid Operations and Aerodynamics",
        completed: false
    }
];

const categories = [
    {
        name: "Business & Management",
        courses: [
            {
                course_id: 1,
                course_name: "Introduction to Business Management",
                course_time: "2hr 10mins"
            },
            {
                course_id: 2,
                course_name: "Advanced Project Management",
                course_time: "3hr 45mins"
            },
            {
                course_id: 3,
                course_name: "Financial Analysis and Planning",
                course_time: "4hr 30mins"
            }
        ]
    },
    {
        name: "Technology & Software",
        courses: [
            {
                course_id: 4,
                course_name: "Full Stack Web Development",
                course_time: "6hr 20mins"
            },
            {
                course_id: 5,
                course_name: "Introduction to Artificial Intelligence",
                course_time: "5hr 15mins"
            },
            {
                course_id: 6,
                course_name: "Cybersecurity Fundamentals",
                course_time: "3hr 50mins"
            }
        ]
    },
    {
        name: "Health & Medicine",
        courses: [
            {
                course_id: 7,
                course_name: "Nutrition and Wellness",
                course_time: "2hr 45mins"
            },
            {
                course_id: 8,
                course_name: "Introduction to Public Health",
                course_time: "4hr 10mins"
            },
            {
                course_id: 9,
                course_name: "Emergency First Aid",
                course_time: "1hr 30mins"
            }
        ]
    },
    {
        name: "Arts & Humanities",
        courses: [
            {
                course_id: 10,
                course_name: "History of Modern Art",
                course_time: "3hr 20mins"
            },
            {
                course_id: 11,
                course_name: "Creative Writing Workshop",
                course_time: "4hr 5mins"
            },
            {
                course_id: 12,
                course_name: "Introduction to Philosophy",
                course_time: "2hr 50mins"
            }
        ]
    },
    {
        name: "Science & Engineering",
        courses: [
            {
                course_id: 13,
                course_name: "Basics of Electrical Engineering",
                course_time: "3hr 40mins"
            },
            {
                course_id: 14,
                course_name: "Quantum Physics",
                course_time: "5hr 25mins"
            },
            {
                course_id: 15,
                course_name: "Environmental Science",
                course_time: "4hr 30mins"
            }
        ]
    }
];


const TaskManager = () => {
    const [assignments, setAssignments] = useState(assignmentTest);

    const handleCheckboxChange = (assignment, checked) => {
        setAssignments(assignments.map(a =>
            a.name === assignment.name ? { ...a, completed: checked } : a
        ));
    };

    return (
        <div className='flex justify-center bg-white w-[40%] mt-4 mr-4 p-4 rounded-lg'>
            <div className='w-full'>
                <h3 className=' text-2xl font-bold mb-4'>Task Manager</h3>
                <div className='bg-[#F0F0F0] shadow-xl rounded-lg p-4 h-[280px] overflow-x-auto'>
                    {assignments.map(assignment => (
                        <div
                            key={assignment.name}
                            className={`flex items-center justify-between hover:bg-gray-300 p-2  rounded-md `}
                        >
                            <Checkbox
                                checked={assignment.completed}
                                onChange={(e) => handleCheckboxChange(assignment, e.target.checked)}
                                icon={<RadioButtonUnchecked style={{ color: '#72E5E1' }} />}
                                checkedIcon={<CheckCircle style={{ color: '#72E5E1' }} />}
                            />
                            <span className="flex-grow cursor-pointer">{assignment.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StudentCourseList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const controls = useAnimation();
    const { courses } = useSelector((state) => state?.data);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBanner, setSelectedBanner] = useState(null);

    useEffect(() => {
        dispatch(loadcourses());
    }, [dispatch]);

    const handleCardClick = (courseId) => {
        const path = `/studentCourseList/view/${courseId}`;
        navigate(path);
    };
    
    const handleCardClick2 = async (course) => {
        await controls.start({ opacity: 0.9, scale: 0.95 });
        handleCardClick(course.course_id);
    };
    

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBannerClick = (banner) => {
        setSelectedBanner(banner);
    }

    const { colorTheme } = useSelector((state) => state?.data);
    const isDarkMode = false;

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;

    const banner = [
        {
            name: "Virginia Tech",
            description: "This program is designed for students to specialize in drones technology.",
            courses: courses
        }
    ]

    return (
        <div className="container mx-auto p-4">
            {courses ? (
                <>
                    {selectedBanner ? (
                        <>
                            <button
                                onClick={() => setSelectedBanner(null)}
                                className='rounded-full border-solid border-black border-2 p-1 shadow-lg hover:shadow-xl hover:bg-opacity-10'
                                style={{
                                    backgroundColor: "transparent",
                                    color: textColor,
                                    marginLeft: '1rem',
                                    marginBottom: '30px'
                                }}
                            >
                                <ArrowBackIosIcon className='pl-2' />
                            </button>
                            <h1 className="text-2xl font-bold ml-8 mb-8">{selectedBanner.name}</h1>
                            <div className="grid grid-cols-4 gap-4 ml-8">
                                {selectedBanner.courses.map((course) => (
                                    <div
                                        key={course.course_id}
                                        className="p-4 bg-gray-200 rounded-lg shadow hover:shadow-xl hover:bg-opacity-80 transition duration-300"
                                    >
                                        <img src={bannerImg} alt="Course" className={`w-[240px] max-w-full h-auto rounded-lg object-cover`} />
                                        <h2 className="text-lg font-semibold my-5">{course.course_name}</h2>
                                        <div className='flex justify-end'>
                                            {/* <div className='flex'>
                                                <TimerOutlinedIcon /><p className="text-gray-600">{course.course_time}</p>
                                            </div> */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    backgroundColor: linearGradientBackground,
                                                    color: textColor
                                                }}
                                                onClick={() => handleCardClick2(course)}
                                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                            >
                                                Start
                                            </motion.button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : selectedCategory ? (
                        <>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className='rounded-full border-solid border-black border-2 p-1 shadow-lg hover:shadow-xl hover:bg-opacity-10'
                                style={{
                                    backgroundColor: "transparent",
                                    color: textColor,
                                    marginLeft: '1rem',
                                    marginBottom: '30px'
                                }}
                            >
                                <ArrowBackIosIcon className='pl-2' />
                            </button>
                            <h1 className="text-2xl font-bold ml-8 mb-8">{selectedCategory.name}</h1>
                            <div className="grid grid-cols-4 gap-4 ml-8">
                                {selectedCategory.courses.map((course) => (
                                    <div
                                        key={course.course_id}
                                        className="p-4 bg-gray-200 rounded-lg shadow hover:shadow-xl hover:bg-opacity-80 transition duration-300"
                                    >
                                        <img src={bannerImg} alt="Course" className={`w-[240px] max-w-full h-auto rounded-lg object-cover`} />
                                        <h2 className="text-lg font-semibold my-5">{course.course_name}</h2>
                                        <div className='flex justify-between'>
                                            <div className='flex'>
                                                <TimerOutlinedIcon /><p className="text-gray-600">{course.course_time}</p>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    backgroundColor: linearGradientBackground,
                                                    color: textColor
                                                }}
                                                className="px-4 py-2 font-bold shadow-xl rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                            >
                                                Start
                                            </motion.button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {banner[0].courses.length !== 0 && (
                                <div className="image-container relative mx-8 my-5" onClick={() => handleBannerClick(banner[0])}>
                                    <img src={bannerImg2} alt="Banner" className="w-full h-[270px] object-cover object-center rounded-lg shadow-lg hover:shadow-2xl cursor-pointer" />
                                </div>
                            )}
                            {/* <div className="w-full flex overflow-x-auto gap-2"> */}
                                {/* <ScrollableContainer
                                    title="Continue Learning..."
                                    courses={courses}
                                    handleCardClick={handleCardClick}
                                    textColor="#242D36"
                                    visibleCount={4}
                                /> */}
                                <ScrollableContainer
                                    title="Continue Learning..."
                                    courses={courses}
                                    handleCardClick={handleCardClick}
                                    handleBannerClick={handleBannerClick}
                                    textColor="#242D36"
                                    visibleCount={4}
                                />
                                {/* <TaskManager /> */}
                            {/* </div> */}
                            {/* {courses && (
                                <ScrollableContainer
                                    title="Suggested Courses"
                                    courses={courses}
                                    handleCardClick={handleCardClick}
                                    textColor="#242D36"
                                    visibleCount={4}
                                />
                            )} */}
                            {courses && (
                                <ScrollableContainer
                                    title="Suggested Courses"
                                    courses={courses}
                                    handleCardClick={handleCardClick}
                                    handleBannerClick={() => handleBannerClick(banner[0])}
                                    textColor="#242D36"
                                    visibleCount={4}
                                />
                            )}
                            <div>
                                <h1 className="text-2xl font-bold ml-8 mb-8">Categories</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-8 mb-5">
                                    {categories.map((category) => (
                                        <div
                                            key={category.name}
                                            style={{ backgroundColor: textColor }}
                                            className="w-[270px] rounded-3xl flex items-center justify-center mb-4 h-[50px] font-bold cursor-pointer hover:bg-opacity-80 shadow-md hover:shadow-xl transition"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            <h3 className="text-white">{category.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className='flex items-center justify-center flex-col'>
                    <img src={noData} alt="No Data" className="object-cover  w-[45%] h-[45%] mt-8" />
                    <h1 style={{ color: 'grey' }} className='font-bold text-4xl mt-8'>No Courses Available</h1>
                </div>
            )}
        </div>
    );
};


export default StudentCourseList;
