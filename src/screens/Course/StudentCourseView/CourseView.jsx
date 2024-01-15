import React, { useEffect, useState, useRef } from 'react';
import TopicAccordion from './TopicAccordion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedCourse } from '../../../redux/action';
import CourseOverview from '../CourseOverview';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';

const StudentCourseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Maintain a reference to the latest utterance
    const latestUtteranceRef = useRef(null);

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, [dispatch, id]);

    const handleSelectSubtopic = (subtopic) => {
        setSelectedSubtopic(subtopic);
    };

    useEffect(() => {

        const firstUncompletedSubtopic = detailedCourse?.content_data?.flatMap(topic => topic?.subtopics).find(subtopic => !subtopic?.completed);
        setSelectedSubtopic(firstUncompletedSubtopic);
        handleSpeak(firstUncompletedSubtopic?.content);
    }, [detailedCourse]);


    //new code
    useEffect(() => {
        handleSpeak(selectedSubtopic?.content);
    }, [selectedSubtopic]);

    // Cleanup function to stop speech when the component is unmounted
    useEffect(() => {
        return () => {
            handleStop();
        };
    }, []);

    // Cleanup function to stop speech when the route changes
    useEffect(() => {
        const unlisten = () => {
            handleStop();
        };

        // navigate('/', { state: {} });

        return unlisten;
    }, [navigate]);


    const handleSpeak = (text) => {
        const description = text || selectedSubtopic?.content;
        if (description) {
            // Cancel any previous utterances
            if (latestUtteranceRef.current) {
                window.speechSynthesis.cancel();
            }

            const sanitizedDescription = description.replace(/<[^>]*>/g, ''); // Remove HTML tags
            const utterance = new SpeechSynthesisUtterance(sanitizedDescription);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);

            // Update the latest utterance reference
            latestUtteranceRef.current = utterance;
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        // Reset the latest utterance reference
        latestUtteranceRef.current = null;
    };

    return (
        <div className="p-4">
            <CourseOverview course={detailedCourse} show={true} text={"Back"} />

            <div className="flex w-full">
                <div className="w-4/6 p-4 overflow-y-auto rounded-lg bg-white mr-4">
                    {selectedSubtopic && (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: selectedSubtopic.content }} />
                        </div>
                    )}
                </div>

                <div className="w-2/6">
                    <div className="flex items-center justify-end mb-4">
                        {!isSpeaking ? (
                            <PlayCircleOutlineIcon
                                style={{ cursor: 'pointer', fontSize: '4rem',color:"blue" }}
                                onClick={() => handleSpeak(selectedSubtopic?.content)}
                            />
                        ) : (
                            <StopIcon
                                style={{ cursor: 'pointer', fontSize: '4rem',color:"blue" }}
                                onClick={handleStop}
                            />
                        )}
                    </div>

                    {detailedCourse?.content_data?.map((topic) => {
                        const isDefaultOpen = topic?.subtopics?.some(sub => sub === selectedSubtopic && !sub?.completed);
                        return (
                            <TopicAccordion
                                course_id={detailedCourse?.id}
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

export default StudentCourseView;
