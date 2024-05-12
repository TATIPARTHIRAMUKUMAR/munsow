import React, { useState } from 'react';

const JobDescriptionForm = ({ selectedCategory }) => {
    const [jobDetails, setJobDetails] = useState({
        description: '',
        fileData: null,
    });

    const [showMultiSelect, setShowMultiSelect] = useState(false);

    const handleTextAreaChange = (e) => {
        setJobDetails({ ...jobDetails, description: e.target.value });
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setJobDetails({
                    ...jobDetails,
                    fileData: { name: uploadedFile.name, data: reader.result.split(',')[1] },
                });
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleSubmit = () => {
        setShowMultiSelect(true);
    };

    const handleGoBack = () => {
        setShowMultiSelect(false);
        setJobDetails({
            description: '',
            fileData: null,
        });
    };

    const multiSelectOptions = [
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "C++", value: "cpp" },
    ];

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
                            value={jobDetails.description}
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
                            {jobDetails.fileData && (
                                <span className="ml-4 text-gray-700">{jobDetails.fileData.name}</span>
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
                                <input type="checkbox" id={`option-${option.value}`} className="mr-2" />
                                <label htmlFor={`option-${option.value}`} className="text-gray-800">{option.label}</label>
                            </div>
                        ))}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-indigo-500 text-white py-2 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                                onClick={() => console.log("Options selected")}
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
