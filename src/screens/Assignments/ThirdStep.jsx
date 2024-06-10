import React, { useState } from 'react';

const AssignmentForm = ({ onSave, assignment_id }) => {
    const [skills_required, setOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [max_time_min, setMaxTime] = useState('');
    const [always_open_submission, setAlwaysOpen] = useState(true);
    const [deadline, setDeadline] = useState('');
    const [allows_late_submission, setAllowLateSubmission] = useState(false);
    const [attempts_allowed, setNumberOfAttempts] = useState('');
    const [auto_reminders, setAutoReminder] = useState(false);

    const handleAddOption = (e) => {
        if (e.key === 'Enter' && newOption.trim() !== '') {
            setOptions([...skills_required, newOption.trim()]);
            setNewOption('');
        }
    };

    const handleRemoveOption = (index) => {
        setOptions(skills_required.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString('en-US') : null;
        const formData = {
            assignment_id,
            skills_required,
            max_time_min: parseInt(max_time_min, 10),
            always_open_submission,
            deadline: always_open_submission ? null : formattedDeadline,
            allows_late_submission: always_open_submission ? null : allows_late_submission,
            attempts_allowed: always_open_submission ? null : parseInt(attempts_allowed, 10),
            auto_reminders,
        };
        onSave(formData);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg w-full">
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Required Skills</label>
                <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyDown={handleAddOption}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter a skill and press Enter"
                />
                <div className="mt-3">
                    {skills_required.map((option, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mt-2 relative group">
                            {option}
                            <button
                                onClick={() => handleRemoveOption(index)}
                                className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Maximum Time for Assignment (in minutes)</label>
                <input
                    type="number"
                    value={max_time_min}
                    onChange={(e) => setMaxTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter time in minutes"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Always Open Assignment</label>
                <div className="flex items-center">
                    <label className="flex items-center mr-6">
                        <input
                            type="radio"
                            name="alwaysOpen"
                            value={true}
                            checked={always_open_submission === true}
                            onChange={() => setAlwaysOpen(true)}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2">True</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="alwaysOpen"
                            value={false}
                            checked={always_open_submission === false}
                            onChange={() => setAlwaysOpen(false)}
                            className="form-radio text-blue-600"
                        />
                        <span className="ml-2">False</span>
                    </label>
                </div>
            </div>
            {!always_open_submission && (
                <>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Deadline for Assignment</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Allow Late Submission</label>
                        <div className="flex items-center">
                            <label className="flex items-center mr-6">
                                <input
                                    type="radio"
                                    name="allowLateSubmission"
                                    value={true}
                                    checked={allows_late_submission === true}
                                    onChange={() => setAllowLateSubmission(true)}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="allowLateSubmission"
                                    value={false}
                                    checked={allows_late_submission === false}
                                    onChange={() => setAllowLateSubmission(false)}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Number of Attempts Allowed</label>
                        <input
                            type="number"
                            value={attempts_allowed}
                            onChange={(e) => setNumberOfAttempts(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter number of attempts"
                        />
                    </div>
                </>
            )}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Auto Reminder</label>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={auto_reminders}
                        onChange={() => setAutoReminder(!auto_reminders)}
                        className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">{auto_reminders ? 'Enabled' : 'Disabled'}</span>
                </div>
            </div>
            <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Save
            </button>
        </div>
    );
};

export default AssignmentForm;
