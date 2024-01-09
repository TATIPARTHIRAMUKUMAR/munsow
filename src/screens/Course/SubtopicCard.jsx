// SubtopicCard.js
import React from 'react';

const SubtopicCard = ({ subtopic, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
        >
            <h3 className="text-xl font-semibold text-gray-700">{subtopic.name}</h3>
            <p className="text-gray-600 mt-1">{subtopic.description}</p>
        </button>
    );
};

export default SubtopicCard;
