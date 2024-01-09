import React, { useEffect, useRef, useState } from 'react';
import SubtopicPopover from './SubtopicPopover';
import Modal from './Modal';
import PlaceIcon from '@mui/icons-material/Place'; 

const Roadmap = ({ detailedCourse }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [openSubtopic, setOpenSubtopic] = useState(null);
    const popoverRef = useRef(null); 

    const handleTopicClick = (topic) => {
        setSelectedTopic(selectedTopic === topic ? null : topic);
    };

    const handleSubtopicClick = (subtopic) => {
        setOpenSubtopic(subtopic);
    };



    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setSelectedTopic(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
    const [subtopics, setSubtopics] = useState([]);

    const flattenedSubtopics = detailedCourse?.content_data?.flatMap(topic =>
        topic.subtopics.map(subtopic => ({ ...subtopic, topicId: topic.id }))
    );

    const handleNext = () => {
        const nextIndex = currentSubtopicIndex + 1;
        if (nextIndex < flattenedSubtopics.length) {
            setCurrentSubtopicIndex(nextIndex);
            setOpenSubtopic(flattenedSubtopics[nextIndex]);
        } else {
            setOpenSubtopic(null);
        }
    };

    const openSubtopicModal = (topicId, subtopicId) => {
        const index = flattenedSubtopics.findIndex(
            st => st.topicId === topicId && st.id === subtopicId
        );
        if (index !== -1) {
            setCurrentSubtopicIndex(index);
            setOpenSubtopic(flattenedSubtopics[index]);
        }
    };


    return (
        <div className="relative container mx-auto p-20 m-30">
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-12 absolute top-1/2 transform -translate-y-1/2 left-0 right-0">
                <path d="M0,5 C20,-5 40,15 60,5 S80,-5 100,5" fill="transparent" stroke="#374151" stroke-width="2"></path>
            </svg>
            {/* <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-0.5 bg-gray-300"></div> */}

            <div className="flex justify-between items-center -mt-6">
                {detailedCourse?.content_data?.map((topic, index) => (
                    <div key={topic.id} className="flex flex-col items-center relative">
                        <button
                            onClick={() => handleTopicClick(topic)}
                            className={`mt-4 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-white ${selectedTopic === topic ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            <PlaceIcon /> 
                        </button>
                        <span className="text-sm mt-2 w-16 text-center truncate">{topic.name}</span>
                        {selectedTopic === topic && (
                            <SubtopicPopover
                                ref={popoverRef}
                                topic={topic}
                                onSubtopicClick={handleSubtopicClick}
                            />
                        )}
                    </div>
                ))}
            </div>
            {openSubtopic && (
                <Modal
                    subtopic={openSubtopic}
                    onClose={() => setOpenSubtopic(null)}
                    onNext={handleNext}
                    showNextButton={currentSubtopicIndex < flattenedSubtopics.length - 1}
                />
            )}
        </div>
    );
};

export default Roadmap;
