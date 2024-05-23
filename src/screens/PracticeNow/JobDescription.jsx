import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { interviewSkills } from '../../redux/action';

const JobDescriptionForm = ({ selectedCategory,jdcompany,jdrole,cultcompany,cultrole,selectedOptions,setSelectedOptions }) => {

    const dispatch=useDispatch();

    console.log("test",jdcompany,jdrole,cultcompany,cultrole)
    const [jobDetails, setJobDetails] = useState({
        text: '',
        file: null,
        mode:null,
        company_name: jdcompany || cultcompany,
        company_role: jdrole || cultrole,
        interview_type:selectedCategory=="jd"? "jd_interview":"cultural_interview"
    });

    const [showMultiSelect, setShowMultiSelect] = useState(false);
    const [fileName, setFileName] = useState(false);
    const [multiSelectOptions, setMultiSelectOptions] = useState([]);

    const handleTextAreaChange = (e) => {
        setJobDetails({
            ...jobDetails,
            text: e.target.value,
            mode: 'text'
        });
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setJobDetails({
                    ...jobDetails,
                    file:  reader.result.split(',')[1] ,
                    mode: 'file' 
                });
                setFileName( uploadedFile.name)
            };
            reader.readAsDataURL(uploadedFile);
        }
        console.log("jobDetails",jobDetails)

    };

    const handleSubmit = () => {
        const details = { ...jobDetails };
        if (details.mode === 'text') {
            delete details.file; 
        } else if (details.mode === 'file') {
            delete details.text; 
        }
        setShowMultiSelect(true);
        setJobDetails(details); 
        console.log("jobDetails.mode", details);

        dispatch(interviewSkills(details, (resp) => {
            console.log("resp",resp)
            setMultiSelectOptions(resp?.required_skills)
        }))

    };

    const handleGoBack = () => {
        setShowMultiSelect(false);
        setJobDetails({
            text: '',
            file: null,
            mode: null // Reset mode
        });
    };

    const submitSelection = () => {
        console.log("multiSelectOptions",selectedOptions)

    };

    const handleOptionChange = (option) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(option)
                ? prevSelectedOptions.filter((o) => o !== option)
                : [...prevSelectedOptions, option]
        );
        console.log("option",option)

    };
    // const multiSelectOptions = ["Python", "Java", "C++"];


    return (
        <div className=" bg-white shadow-md rounded-lg p-6">
            {!showMultiSelect ? (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-center">Enter Job Description</h2>
                    <div className="mb-4">
                        <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description
                        </label>
                        <textarea
                            id="job-description"
                            rows="8"
                            className="w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Enter job description..."
                            value={jobDetails.text}
                            onChange={handleTextAreaChange}
                            style={{ minWidth: "800px" }}
                        ></textarea>
                    </div>
                    <div className="mb-8">
                        <label htmlFor="file-upload" className="block text-md font-medium text-gray-700 mb-2">
                            Or Upload a File
                        </label>
                        <div className="flex items-center justify-between">
                            <input
                                type="file"
                                id="file-upload"
                                accept=".txt,.pdf"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="file-upload" className="bg-indigo-500 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors duration-300">
                                Choose File
                            </label>
                            {jobDetails.file && (
                                <span className="ml-4 text-gray-700">{fileName}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-indigo-500 text-white py-2 px-8 rounded-lg mr-4 hover:bg-indigo-600 transition-colors duration-300"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-center">Select Skills</h2>
                    <div className="bg-gray-100 rounded-lg p-6">
                        {multiSelectOptions.map((option, index) => (
                            <div key={index} className="mb-4 flex items-center">
                               <input
                                    type="checkbox"
                                    id={`option-${option}`}
                                    className="mr-2"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                <label htmlFor={`option-${option}`} className="text-gray-800">{option}</label>
                            </div>
                        ))}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-indigo-500 text-white py-2 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                                onClick={() => submitSelection()}
                            >
                                Confirm Selection
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-8 rounded-lg ml-4 hover:bg-gray-400 transition-colors duration-300"
                                onClick={handleGoBack}
                            >
                                Back to reneter JD
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default JobDescriptionForm;
