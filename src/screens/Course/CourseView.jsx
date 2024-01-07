import React, { useEffect, useState } from 'react';

const courseData={
    name: "Course Name",
    content_data: [
        {
            id: 1,
            name: "Topic 1",
            subtopics: [
                { name: "Subtopic 1", description: "Description 1" },
                // ... more subtopics
            ]
        },
        // ... more topics
    ]
}

const CourseView = () => {
    const [openTopic, setOpenTopic] = useState(null);

    const toggleTopic = (id) => {
        setOpenTopic(openTopic === id ? null : id);
    };

    useEffect(() => {
        console.log('CourseComponent rendered');
      }, []);

    return (
        <div className="container mx-auto py-8 px-4 md:px-0">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">{courseData.name}</h1>
            {courseData.content_data.map((topic) => (
                <div key={topic.id} className="mb-12">
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-t-lg shadow-lg">
                        <h2 className="text-2xl text-white font-bold">{topic.name}</h2>
                        <button
                            onClick={() => toggleTopic(topic.id)}
                            className="text-white text-lg focus:outline-none">
                            {openTopic === topic.id ? '▲' : '▼'}
                        </button>
                    </div>
                    <div className={`transition-all duration-700 ease-linear ${openTopic === topic.id ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-white rounded-b-lg shadow-lg">
                            {topic.subtopics.map((subtopic) => (
                                <div key={subtopic.name} className="bg-gray-100 p-4 rounded-lg shadow transition duration-500 ease-in-out hover:bg-blue-50">
                                    <h3 className="text-xl font-semibold text-gray-700">{subtopic.name}</h3>
                                    <p className="text-gray-600 mt-2">{subtopic.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseView;
