
// const topics = [
//   { id: 1, title: 'What is [topic]?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec fringilla odio. In hac habitasse platea dictumst. Integer eu turpis id urna egestas rhoncus.' },
//   { id: 2, title: 'Where is [topic] used?', content: 'This content explains where [topic] is commonly used, such as in various industries and fields.' },
//   { id: 3, title: 'What are job roles in [topic]?', content: 'Discover the various job roles associated with [topic], from entry-level to advanced positions.' },
//   { id: 4, title: 'What are key skills in [topic]?', content: 'Learn about the essential skills needed to excel in [topic].' },
//   { id: 5, title: 'Where is [topic] used?', content: 'An expanded description of the applications of [topic] in different domains.' },
//   { id: 6, title: 'What are the trends in [topic]?', content: 'Stay updated with the latest trends and advancements in [topic].' }
// ];

// import React, { useState, useEffect } from 'react';
// import { useDarkMode } from "./../../Dark";
// import { useSelector, useDispatch } from 'react-redux';
// import './TopicBrief.css';
// import { useParams } from 'react-router-dom';
// import { loadDetailedTree } from '../../redux/action';

// const TopicBrief = () => {
//     const { id } = useParams();
//     // const responseData = location.state?.responseData; // Get the response from the API
//     const [selectedTopicName, setSelectedTopicName] = useState(null);
//     const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);
//     const [showRoadMap, setShowRoadMap] = useState(false);
//     const [expandedTopic, setExpandedTopic] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const { colorTheme } = useSelector((state) => state?.data);
//     const { isDarkMode } = useDarkMode();
//     const dispatch = useDispatch();
//     const courseData = useSelector((state) => state?.data?.detailedTree);

//     useEffect(() => {
//         dispatch(loadDetailedTree(id));
//     }, []);

//     const linearGradientBackground = isDarkMode
//         ? colorTheme.dark.selectBackground
//         : colorTheme.light.selectBackground;

//     const textColor = isDarkMode
//         ? colorTheme.dark.background
//         : colorTheme.light.background;

//     const handleExpand = (title) => {
//         setExpandedTopic(expandedTopic === title ? null : title);
//         setSelectedTopicName(title);
//     };

//     const handleNextClick = () => {
//         setShowRoadMap(true);
//     };

//     const handleSubtopicSelect = (subtopicId) => {
//         setSelectedSubtopicId(subtopicId);
//         setShowPopup(true);
//     };

//     // Get the list of topics from API response
//     const topics = courseData?.content?.content || [];

//     console.log('topics :', topics);

//     // Get the selected topic based on its name
//     const selectedTopic = topics.find(topic => topic.name === selectedTopicName);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white">
//         {!showRoadMap ? (
//             <>
//                 <h2 className="text-3xl font-semibold mb-2">{ courseData?.content?.course_name || 'Course'}</h2>
//                 <p className="text-gray-600 mb-8">
//                     Please Go Through the Topic Brief and Choose a Topic
//                 </p>

//                 <div className="topic-container">
//                     {topics.map((topic, index) => (
//                         <div 
//                             key={index} 
//                             className={`topic-card ${expandedTopic === topic.name ? 'expanded' : ''}`} 
//                             onClick={() => handleExpand(topic.name)}
//                             style={{
//                                 border: selectedTopicName === topic.name ? `1.5px solid ${linearGradientBackground}` : 'none'
//                             }}
//                         >
//                             <input type="radio" id={`topic-${index}`} name="topic" value={index} checked={selectedTopicName === topic.name} onChange={() => {}} className="absolute top-0 left-0 opacity-0" />
//                             <h3 className="text-lg font-semibold">{topic.name}</h3>
//                             {expandedTopic === topic.name && topic.description && (
//                                 <p className="text-gray-700 mt-2">{topic.description}</p>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     onClick={handleNextClick}
//                     className="px-8 py-2 rounded-md shadow-lg mt-9 transition-all"
//                     style={{
//                         background: linearGradientBackground,
//                         color: textColor,
//                     }}
//                 >
//                     Next
//                 </button>
//             </>
//         ) : (
//             <>
//             {selectedOption === "Flashcard" ? (
//                 <>
//                     Hello World!
//                 </>
//             ) : (
//                 <>
//                     <h2 className="text-3xl font-semibold mb-2">{selectedTopic?.name}</h2>
//                     <p className="text-gray-600 mb-8">Topic Road Map</p>

//                     <div className="flex flex-col gap-4 mb-8 justify-center items-start">
//                         {selectedTopic?.subtopics.map((subtopic, index) => (
//                         <div 
//                             key={index} 
//                             className={`flex radio-button-container items-center bg-white shadow-lg rounded-md p-4 transition-all cursor-pointer hover:bg-teal-50`} 
//                             style={{ width: '300px', display: 'flex', alignItems: 'center' }} 
//                             onClick={() => handleSubtopicSelect(index)}
//                         >
//                             <div className="custom-radio">
//                                 <input 
//                                     type="radio" 
//                                     id={`subtopic-${index}`} 
//                                     name="subtopic" 
//                                     value={index} 
//                                     checked={selectedSubtopicId === index} 
//                                     onChange={() => handleSubtopicSelect(index)} 
//                                     className="absolute opacity-0"
//                                 />
//                                 <label htmlFor={`subtopic-${index}`}>
//                                     <div className="radio-circle">
//                                         <div className="checkmark">&#10003;</div> {/* Unicode for checkmark */}
//                                     </div>
//                                 </label>
//                             </div>
//                             <h3 className="text-lg font-semibold ml-4">{subtopic.name}</h3>
//                         </div>
//                         ))}
//                     </div>

//                     {showPopup && selectedTopic?.subtopics.find((_, index) => index === selectedSubtopicId) && (
//                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <div className="bg-white p-1 rounded-lg shadow-lg max-w-lg w-full relative gradient-border"> 
//                                 <div className='p-7'>
//                                     <button 
//                                         className="absolute top-2 right-5 text-gray-700 hover:text-gray-900 text-2xl"
//                                         onClick={() => setShowPopup(false)}
//                                     >
//                                         &times; 
//                                     </button>

//                                     <h3 className="text-xl font-semibold mb-2">
//                                         {selectedTopic.subtopics.find((_, index) => index === selectedSubtopicId)?.name}
//                                     </h3>
//                                     <p className="text-gray-700 mb-4">
//                                         {selectedTopic.subtopics.find((_, index) => index === selectedSubtopicId)?.description}
//                                     </p>

//                                     <div className="flex justify-between gap-4 mb-4">
//                                         <div className="flex items-center p-4 bg-white shadow-md rounded-md flex-1 relative border-gradient cursor-pointer"
//                                             onClick={() => document.getElementById("Flashcard").checked = true}
//                                         >
//                                             <div className="flex flex-col justify-start w-full">
//                                                 <h4 className="text-lg font-semibold mb-1">Flashcards</h4>
//                                                 <p className="text-gray-500 text-xs">Helps you learn</p>
//                                             </div>
//                                             <div className="custom-radio">
//                                                 <input 
//                                                     type="radio" 
//                                                     id={`Flashcard`} 
//                                                     name="subtopic" 
//                                                     className="absolute opacity-0"
//                                                 />
//                                                 <label htmlFor={`Flashcard`}>
//                                                     <div className="radio-circle">
//                                                         <div className="checkmark">&#10003;</div> 
//                                                     </div>
//                                                 </label>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-center p-4 bg-white shadow-md rounded-md flex-1 relative border-gradient cursor-pointer"
//                                             onClick={() => document.getElementById("Quiz").checked = true}
//                                         >
//                                             <div className="flex flex-col justify-start w-full">
//                                                 <h4 className="text-lg font-semibold mb-1">Quiz</h4>
//                                                 <p className="text-gray-500 text-xs">Test Yourself</p>
//                                             </div>
//                                             <div className="custom-radio">
//                                                 <input 
//                                                     type="radio" 
//                                                     id={`Quiz`} 
//                                                     name="subtopic" 
//                                                     className="absolute opacity-0"
//                                                 />
//                                                 <label htmlFor={`Quiz`}>
//                                                     <div className="radio-circle">
//                                                         <div className="checkmark">&#10003;</div> 
//                                                     </div>
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <button 
//                                         className="px-4 py-2 rounded-md shadow-lg w-full"
//                                         onClick={() => setSelectedOption("Flashcard")}
//                                         style={{
//                                             background: linearGradientBackground,
//                                             color: textColor  
//                                         }}
//                                     >
//                                         Start
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <button 
//                         onClick={() => setShowRoadMap(false)}
//                         className="bg-teal-500 text-white px-8 py-2 rounded-md shadow-lg hover:bg-teal-600 transition-all"
//                         >
//                             Back to Topics
//                     </button>
//                 </>
//             )}
//             </>
//         )}
//     </div>
//     );
// };
        
// export default TopicBrief;

import React, { useState, useEffect } from 'react';
import { useDarkMode } from "./../../Dark";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadDetailedTree } from '../../redux/action';
import './TopicBrief.css';
import './FlashcardSelection'
import FlashcardSelection from './FlashcardSelection';

const TopicBrief = () => {
    const { id } = useParams();
    const [selectedTopicName, setSelectedTopicName] = useState(null);
    const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);
    const [showRoadMap, setShowRoadMap] = useState(false);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const { colorTheme } = useSelector((state) => state?.data);
    const { isDarkMode } = useDarkMode();
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state?.data?.detailedTree);

    useEffect(() => {
        dispatch(loadDetailedTree(id));
    }, [dispatch, id]);

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const textColor = isDarkMode
        ? colorTheme.dark.background
        : colorTheme.light.background;

    const handleExpand = (title) => {
        setExpandedTopic(expandedTopic === title ? null : title);
        setSelectedTopicName(title);
    };

    const handleNextClick = () => {
        setShowRoadMap(true);
    };

    const handleSubtopicSelect = (subtopicId) => {
        setSelectedSubtopicId(subtopicId);
        setShowPopup(true);
    };

    const handleStart = () => {
        setSelectedOption("Flashcard");
        setFlashcards(selectedTopic?.subtopics[selectedSubtopicId]?.flashcards);
    };

    const topics = courseData?.content?.content || [];
    const selectedTopic = topics.find(topic => topic.name === selectedTopicName);

    return (
        <div className="flex flex-col justify-center bg-gradient-to-b from-[#E0F7FA] to-white">
        {!showRoadMap ? (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h2 className="text-3xl font-semibold mb-2">{courseData?.content?.course_name || 'Course'}</h2>
                <p className="text-gray-600 mb-8">Please Go Through the Topic Brief and Choose a Topic</p>
                
                <div className="topic-container">
                    {topics.map((topic, index) => (
                        <div 
                            key={index} 
                            className={`topic-card ${expandedTopic === topic.name ? 'expanded' : ''}`} 
                            onClick={() => handleExpand(topic.name)}
                            style={{
                                border: selectedTopicName === topic.name ? `1.5px solid ${linearGradientBackground}` : 'none'
                            }}
                        >
                            <input type="radio" id={`topic-${index}`} name="topic" value={index} checked={selectedTopicName === topic.name} onChange={() => {}} className="absolute top-0 left-0 opacity-0" />
                            <h3 className="text-lg font-semibold">{topic.name}</h3>
                            {expandedTopic === topic.name && topic.description && (
                                <p className="text-gray-700 mt-2">{topic.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleNextClick}
                    className="px-8 py-2 rounded-md shadow-lg mt-9 transition-all"
                    style={{
                        background: linearGradientBackground,
                        color: textColor,
                    }}
                >
                    Next
                </button>
            </div>
        ) : (
            <>
            {selectedOption === "Flashcard" ? (
                <>
                    <FlashcardSelection  
                        selectedSubtopicName={ selectedTopic?.subtopics[selectedSubtopicId]?.name }
                        flashcards={ flashcards }
                    />
                </>
            ) : (
                <div className='flex flex-col items-center justify-center min-h-screen '>
                    <h2 className="text-3xl font-semibold mb-2">{selectedTopic?.name}</h2>
                    <p className="text-gray-600 mb-8">Topic Road Map</p>

                    <div className="flex flex-col gap-4 mb-8 justify-center items-start">
                        {selectedTopic?.subtopics.map((subtopic, index) => (
                            <div 
                                key={index} 
                                className="flex radio-button-container items-center bg-white shadow-lg rounded-md p-4 cursor-pointer hover:bg-teal-50" 
                                onClick={() => handleSubtopicSelect(index)}
                            >
                                <div className="custom-radio">
                                    <input 
                                        type="radio" 
                                        id={`subtopic-${index}`} 
                                        name="subtopic" 
                                        value={index} 
                                        checked={selectedSubtopicId === index} 
                                        onChange={() => handleSubtopicSelect(index)} 
                                        className="absolute opacity-0"
                                    />
                                    <label htmlFor={`subtopic-${index}`}>
                                        <div className="radio-circle">
                                            <div className="checkmark">&#10003;</div>
                                        </div>
                                    </label>
                                </div>
                                <h3 className="text-lg font-semibold ml-4">{subtopic.name}</h3>
                            </div>
                        ))}
                    </div>

                    {showPopup && selectedTopic?.subtopics.find((_, index) => index === selectedSubtopicId) && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-1 rounded-lg shadow-lg max-w-lg w-full relative gradient-border"> 
                                <div className='p-7'>
                                    <button 
                                        className="absolute top-2 right-5 text-gray-700 hover:text-gray-900 text-2xl"
                                        onClick={() => setShowPopup(false)}
                                    >
                                        &times; 
                                    </button>

                                    <h3 className="text-xl font-semibold mb-2">
                                        {selectedTopic.subtopics.find((_, index) => index === selectedSubtopicId)?.name}
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        {selectedTopic.subtopics.find((_, index) => index === selectedSubtopicId)?.description}
                                    </p>

                                    <div className="flex justify-between gap-4 mb-4">
                                        <div className="flex items-center p-4 bg-white shadow-md rounded-md flex-1 relative border-gradient cursor-pointer"
                                            onClick={() => document.getElementById("Flashcard").checked = true}
                                        >
                                            <div className="flex flex-col justify-start w-full">
                                                <h4 className="text-lg font-semibold mb-1">Flashcards</h4>
                                                <p className="text-gray-500 text-xs">Helps you learn</p>
                                            </div>
                                            <div className="custom-radio">
                                                <input 
                                                    type="radio" 
                                                    id={`Flashcard`} 
                                                    name="subtopic" 
                                                    className="absolute opacity-0"
                                                />
                                                <label htmlFor={`Flashcard`}>
                                                    <div className="radio-circle">
                                                        <div className="checkmark">&#10003;</div> 
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-white shadow-md rounded-md flex-1 relative border-gradient cursor-pointer"
                                            onClick={() => document.getElementById("Quiz").checked = true}
                                        >
                                            <div className="flex flex-col justify-start w-full">
                                                <h4 className="text-lg font-semibold mb-1">Quiz</h4>
                                                <p className="text-gray-500 text-xs">Test Yourself</p>
                                            </div>
                                            <div className="custom-radio">
                                                <input 
                                                    type="radio" 
                                                    id={`Quiz`} 
                                                    name="subtopic" 
                                                    className="absolute opacity-0"
                                                />
                                                <label htmlFor={`Quiz`}>
                                                    <div className="radio-circle">
                                                        <div className="checkmark">&#10003;</div> 
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        className="px-4 py-2 rounded-md shadow-lg w-full"
                                        onClick={handleStart}
                                        style={{
                                            background: linearGradientBackground,
                                            color: textColor  
                                        }}
                                    >
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={() => setShowRoadMap(false)}
                        className="bg-teal-500 text-white px-8 py-2 rounded-md shadow-lg hover:bg-teal-600 transition-all"
                        >
                        Back to Topics
                    </button>
                </div>
            )}
            </>
        )}
    </div>
    );
};
        
export default TopicBrief;
