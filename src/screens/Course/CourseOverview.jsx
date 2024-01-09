import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const CourseOverview = ({ course }) => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate("/courseList")
    }


    return (
        <div className="bg-white rounded-lg p-6 mb-4 flex">
            <div>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    variant="contained"
                    style={{
                        marginLeft: '1rem',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        backgroundColor: '#886CC0',
                        color: 'white',
                        // boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    Back
                </Button>
            </div>
            <div className='pl-20'>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.name}</h1>
                <p className="text-gray-600">{course.description}</p>
            </div>
            {/* Add more course details here */}
        </div>
    );
};

export default CourseOverview;
