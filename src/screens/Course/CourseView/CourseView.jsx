import React, { useEffect, useState } from 'react';
import TopicAccordion from './TopicAccordion';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedCourse } from '../../../redux/action';
import CourseOverview from '../CourseOverview';

const CourseView = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, [dispatch, id]);

    const handleSelectSubtopic = (subtopic) => {
        setSelectedSubtopic(subtopic);
    };

    useEffect(() => {
        // dispatch(loadDetailedCourse(id));
        // Set the first uncompleted subtopic as the default selected subtopic
        const firstUncompletedSubtopic = detailedCourse?.content_data?.flatMap(topic => topic.subtopics).find(subtopic => !subtopic.completed);
        setSelectedSubtopic(firstUncompletedSubtopic);
    }, [detailedCourse]);

    return (
        <div className="container mx-auto p-4">
            <CourseOverview course={detailedCourse} />
            {/* <h1 className="text-2xl font-bold mb-4">{detailedCourse?.name}</h1> */}
            <div className="flex w-full">
                <div className="w-4/6">
                    {selectedSubtopic && (
                        <div className="p-4 bg-gray-400 rounded-lg mr-4">
                            <div dangerouslySetInnerHTML={{ __html: selectedSubtopic.content }} />
                        </div>
                    )}
                </div>


<div className="w-2/6">
    {detailedCourse?.content_data?.map((topic) => {
        const isDefaultOpen = topic.subtopics.some(sub => sub === selectedSubtopic && !sub.completed);
        return (
            <TopicAccordion
                key={topic.id}
                topic={topic}
                onSelectSubtopic={setSelectedSubtopic}
                selectedSubtopic={selectedSubtopic}
                defaultOpen={isDefaultOpen}
            />
        );
    })}
</div>



            </div>
        </div>
    );
};

export default CourseView;
