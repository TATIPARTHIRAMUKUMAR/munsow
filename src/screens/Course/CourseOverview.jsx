import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';

import { useDarkMode } from "./../../Dark";
import { useSelector } from 'react-redux';

const CourseOverview = ({ course,show,text }) => {
    console.log("show",show)
    const navigate = useNavigate();
    const { colorTheme } = useSelector((state) => state?.data);

    const { isDarkMode } = useDarkMode();

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;

    const onBack = () => {
        navigate(-1);
    };


    return (
        <div className="bg-white rounded-lg p-6 mb-4 flex items-center">
            <div>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    variant="contained"
                    style={{
                        backgroundColor: linearGradientBackground,
                        color: textColor,
                        marginLeft: '1rem',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {text}
                </Button>
            </div>
            <div className='flex justify-center pl-20 w-9/12 flex-col'>
                <h1 className="flex text-3xl font-semibold text-gray-800 mb-4 items-center">{course?.name}</h1>
                <p className="text-gray-600">{course?.description}</p>
            </div>
            {/* {GLOBAL_CONSTANTS?.user_cred?.role_name === "Student" && (
                <div className="flex items-center">
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
            )} */}
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
