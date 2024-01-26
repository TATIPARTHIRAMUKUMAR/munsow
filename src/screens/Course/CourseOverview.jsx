import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';

const CourseOverview = ({ course,show,text }) => {
    console.log("show",show)
    const navigate = useNavigate();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const onBack = () => {
        navigate(-1);
    };

    const calculateProgress = () => {
        if (!course || !course.content_data) {
            return 0;
        }

        const totalSubtopics = course.content_data.reduce((acc, topic) => acc + (topic.subtopics?.length || 0), 0);
        const completedSubtopics = course.content_data.reduce((acc, topic) => {
            return acc + (topic.subtopics?.filter(subtopic => subtopic.completed)?.length || 0);
        }, 0);

        return totalSubtopics === 0 ? 0 : Math.round((completedSubtopics / totalSubtopics) * 100);
    };

    const progress = calculateProgress();

    const handleProgressClick = () => {
        setTooltipOpen(true);
    };

    const handleCloseTooltip = () => {
        setTooltipOpen(false);
    };

    const completedSubtopics = course?.content_data?.reduce((acc, topic) => {
        return acc + (topic.subtopics?.filter(subtopic => subtopic.completed)?.length || 0);
    }, 0);

    const totalSubtopics = course?.content_data?.reduce((acc, topic) => acc + (topic.subtopics?.length || 0), 0);

    const tooltipContent = `${completedSubtopics} out of ${totalSubtopics} subtasks completed`;

    return (
        <div className="bg-white rounded-lg p-6 mb-4 flex items-center">
            <div>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    variant="contained"
                    style={{
                        marginLeft: '1rem',
                        backgroundColor: '#886CC0',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {text}
                </Button>
            </div>
            <div className='pl-20'>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.name}</h1>
                <p className="text-gray-600">{course?.description}</p>
            </div>
            {GLOBAL_CONSTANTS?.user_cred?.role_name === "Student" && (
                <div className="flex items-center ml-auto">
                    <Tooltip title={tooltipContent} open={tooltipOpen} onClose={handleCloseTooltip} arrow>
                        <div onClick={handleProgressClick}>
                            <CircularProgress
                                variant="determinate"
                                value={progress}
                                color={progress === 100 ? "success" : "error"}
                                size={40}
                                thickness={5}
                                style={{
                                    marginRight: '1rem',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </Tooltip>
                    <span>{`${progress}% Complete`}</span>
                </div>
            )}
            {(GLOBAL_CONSTANTS?.user_cred?.role_name === "Teacher" && show==true) && (
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        marginLeft: 'auto',
                        marginRight: '1rem',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                    onClick={() => {
                        navigate(`/studentCourseList/edit/${course?.id}`);
                    }}
                >
                    Edit Assigned Users
                </Button>
            )}
        </div>
    );
};

export default CourseOverview;
