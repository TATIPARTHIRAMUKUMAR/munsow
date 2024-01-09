// // CourseView.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { loadDetailedCourse } from '../../redux/action';
// import CourseOverview from './CourseOverview';
// import TopicAccordion from './TopicAccordion';
// import SubtopicCard from './SubtopicCard';
// import Modal from './Modal';
// import Roadmap from './Roadmap';

// const CourseView = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const { detailedCourse } = useSelector((state) => state?.data);

//     const [openTopic, setOpenTopic] = useState(null);
//     const [openSubtopic, setOpenSubtopic] = useState(null);

//     const toggleTopic = (id) => {
//         setOpenTopic(openTopic === id ? null : id);
//     };

//     const toggleSubtopic = (subtopic) => {
//         setOpenSubtopic(openSubtopic === subtopic ? null : subtopic);
//     };

//     useEffect(() => {
//         dispatch(loadDetailedCourse(id));
//     }, []);


//     return (
//         <div className=" p-10">
//             <CourseOverview course={detailedCourse} />
//             <Roadmap detailedCourse={detailedCourse} />


//         </div>
//     );
// };

// export default CourseView;
























import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadDetailedCourse } from '../../redux/action';
import CourseOverview from './CourseOverview';
import TopicAccordion from './TopicAccordion';
import SubtopicCard from './SubtopicCard';
import Modal from './Modal';

const CourseView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);

    const [openTopic, setOpenTopic] = useState(null);
    const [openSubtopic, setOpenSubtopic] = useState(null);

    const toggleTopic = (id) => {
        setOpenTopic(openTopic === id ? null : id);
    };

    const toggleSubtopic = (subtopic) => {
        setOpenSubtopic(openSubtopic === subtopic ? null : subtopic);
    };

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, []);


    const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
    const flattenedSubtopics = detailedCourse.content_data?.flatMap(topic => 
        topic.subtopics.map(subtopic => ({ ...subtopic, topicId: topic.id }))
    );

    const handleNext = () => {
        const nextIndex = currentSubtopicIndex + 1;
        if (nextIndex < flattenedSubtopics?.length) {
            setCurrentSubtopicIndex(nextIndex);
            setOpenSubtopic(flattenedSubtopics[nextIndex]);
        } else {
            setOpenSubtopic(null);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 md:px-0">
            <CourseOverview course={detailedCourse} />
            {detailedCourse?.content_data?.map((topic) => (
                <TopicAccordion
                    key={topic.id}
                    topic={topic}
                    isOpen={openTopic === topic.id}
                    onToggle={() => toggleTopic(topic.id)}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {topic.subtopics.map((subtopic) => (
                            <SubtopicCard
                                key={subtopic.id}
                                subtopic={subtopic}
                                onClick={() => toggleSubtopic(subtopic)}
                            />
                        ))}
                    </div>
                </TopicAccordion>
            ))}
             <Modal 
                subtopic={openSubtopic} 
                onClose={() => setOpenSubtopic(null)}
                onNext={handleNext}
                showNextButton={currentSubtopicIndex < flattenedSubtopics?.length - 1} 
            />
        </div>
    );
};

export default CourseView;




