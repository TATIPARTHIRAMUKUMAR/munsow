import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, StepConnector, TextField, Button, Divider, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import { useDispatch, useSelector } from 'react-redux';
import { assign_assignment, assign_users, assignment_update, course_content, create_assignment, create_course, loadQuestionBanks, loadStudentList } from '../../redux/action';
// import AssignUsers from './AssignUsers';
// import TopicandSubtopic from './Topic/TopicandSubtopic';
// import GLOBAL_CONSTANTS from '../../../GlobalConstants';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';
import AssignUsers from '../Course/AssignUsers';
import AssignmentForm from './ThirdStep';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 17,
        left: 'calc(-50% + 1.5rem)',
        right: 'calc(50% + 1.5rem)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#886CC0',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#886CC0',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const CreateAssignment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [courseDetails, setCourseDetails] = useState({ name: '', description: '' });

    const [selectedRows, setSelectedRows] = useState([]);
    const [courseData, setCoursedata] = useState({});

    const [topics, setTopics] = useState([]);
    const { questionBanksList } = useSelector((state) => state?.data);



    const steps = ['Assignment Details', 'Assign Users', ' Assignment Configurations'];

    const [params, setParams] = useState({
        limit: 100,
        mode: "Student",
        branch_name: GLOBAL_CONSTANTS?.user_cred?.branch_name
    })

    useEffect(() => {
        dispatch(loadStudentList(params))
        dispatch(loadQuestionBanks())
    }, [dispatch, params])

    const handleNext = () => {
        if (currentStep === 0) {
            // setCurrentStep(prevStep => prevStep + 2);
            const dataToSubmit = {
                ...assignmentDetails,
                question_bank_ids: assignmentDetails.question_bank_ids.map(qb => qb.id)
            };
            console.log(dataToSubmit);


            dispatch(create_assignment(dataToSubmit, (resp) => {
                console.log("resp", resp)
                setCoursedata(resp?.data)
                setCurrentStep(prevStep => prevStep + 1);
            }))
        }
        else if (currentStep == 1) {
            console.log("selectedRows", selectedRows)
            const payload = {
                "assignment_id": courseData?.assignment_id,
                "user_ids": selectedRows
            }
            dispatch(assign_assignment(payload, (resp) => {
                setCurrentStep(prevStep => prevStep + 1);
            }))
        }
        else if (currentStep == 2) {
            console.log("selectedRows", selectedRows)
            const payload = {
                "course_id": courseData?.course_id,
                "content": topics
            }
            dispatch(course_content(payload, (resp) => {
                navigate("/courseList")
            }))
        }

    };

    const handleChange = (event) => {
        setCourseDetails({ ...courseDetails, [event.target.name]: event.target.value });
    };

    const onBack = () => {
        navigate("/courseList")
    }



    const [assignmentDetails, setAssignmentDetails] = useState({
        name: '',
        description: '',
        question_bank_ids: [],
        number_of_questions: ''
    });

    // const questionBankOptions = ['Bank 1', 'Bank 2', 'Bank 3'];

    const handleChange1 = (event) => {
        const { name, value } = event.target;
        setAssignmentDetails(prevDetails => ({
            ...prevDetails,
            [name]: name === 'number_of_questions' ? parseInt(value) : value
        }));
    };

    const handleMultiSelectChange = (event) => {
        const { value } = event.target;
        setAssignmentDetails(prevDetails => ({
            ...prevDetails,
            question_bank_ids: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...assignmentDetails,
            questionBanks: assignmentDetails.questionBanks.map(qb => qb.id)
        };
        console.log(dataToSubmit);
        // You can then send dataToSubmit to your backend
    };

    const [formData, setFormData] = useState(null);

  const handleSave = (data) => {
    setFormData(data);
    console.log(data); // For demonstration purposes

    dispatch(assignment_update(data, (resp) => {
        navigate("/assignments")
    }))

  };

    return (
        <div className="p-5">
            <div className="w-full mx-auto bg-white rounded-xl">
                <div className='flex justify-between w-full items-center'>
                    <div className='w-2/5'>
                        <div className='flex'>
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
                                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Assignment List
                            </Button>

                            {/* <p className="text-xl font-semibold mt-5 mx-5 ">Course Creation</p> */}
                        </div>
                    </div>
                    <div className='w-4/5'>
                        <Stepper activeStep={currentStep} alternativeLabel style={{ marginTop: "2rem" }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        style={{
                                            // color:"#886CC0",
                                            color: index <= currentStep ? '#886CC0' : 'inherit',
                                            fontSize: "2.5rem"
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>

                {/* <Divider /> */}



                <Divider style={{ marginTop: "1rem" }} />

                <div className="flex mt-4 p-4 items-center justify-center">
                    {currentStep === 0 && (
                        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Assignment Details</h2>
                            <TextField
                                label="Assignment Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={assignmentDetails.name}
                                onChange={handleChange1}
                                className="mb-4"
                            />
                            <label className="block text-sm font-medium text-gray-700 py-3">
                                Assignment Description
                            </label>
                            <textarea
                                className="w-full p-4 border rounded-md mb-4 resize-none"
                                rows={6}
                                name="description"
                                value={assignmentDetails.description}
                                onChange={handleChange1}
                            />
                            <FormControl fullWidth className="mb-4">
                                <InputLabel>Question Banks</InputLabel>
                                <Select
                                    multiple
                                    value={assignmentDetails.question_bank_ids}
                                    onChange={handleMultiSelectChange}
                                    renderValue={(selected) => selected.map(qb => qb.name).join(', ')}
                                >
                                    {questionBanksList.map((option) => (
                                        <MenuItem key={option.id} value={option}>
                                            <Checkbox checked={assignmentDetails.question_bank_ids.indexOf(option) > -1} />
                                            <ListItemText primary={option.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Number of Questions"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="number_of_questions"
                                value={assignmentDetails.number_of_questions}
                                onChange={handleChange1}
                                type="number"
                                className="mb-4"
                            />
                        </div>

                    )}
                    {currentStep === 1 && (
                        <AssignUsers selectedRows={selectedRows} setSelectedRows={setSelectedRows} courseData={courseData} setCoursedata={setCoursedata} />
                    )}
                    {currentStep === 2 && (
                              <AssignmentForm onSave={handleSave} assignment_id={courseData?.assignment_id}/>

                    )}
                </div>

                <div className="mt-4 p-6 flex justify-end">
                    {currentStep < steps.length - 1 && (
                        <Button
                            variant="contained"
                            // color="primary"
                            style={{ backgroundColor: "#886CC0" }}
                            onClick={handleNext}
                            className="next-button bg-[#886CC0]"
                        >
                            Next
                        </Button>
                    )}

                    {/* {currentStep === steps.length - 1 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNext}
                            // onClick={() => console.log('Submit Data:', courseDetails)}
                            className="submit-button"
                        >
                            Submit
                        </Button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;
