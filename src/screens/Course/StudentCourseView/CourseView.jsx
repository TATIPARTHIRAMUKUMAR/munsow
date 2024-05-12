import React, { useEffect, useState, useRef } from 'react';
import TopicAccordion from './TopicAccordion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedCourse } from '../../../redux/action';
import CourseOverview from '../CourseOverview';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const StudentCourseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenContent, setSpokenContent] = useState('');

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

    useEffect(() => {
        handleSpeak(selectedSubtopic?.content);
    }, [selectedSubtopic]);

    useEffect(() => {
        return () => {
            handleStop();
        };
    }, []);

    useEffect(() => {
        const unlisten = () => {
            handleStop();
        };

        return unlisten;
    }, [navigate]);

    const handleSpeak = (text) => {
        const description = text || selectedSubtopic?.content;
        if (description && !isSpeaking) {
            if (latestUtteranceRef.current) {
                window.speechSynthesis.cancel();
            }
    
            const sanitizedDescription = description.replace(/<[^>]*>/g, '');
            const utterance = new SpeechSynthesisUtterance(sanitizedDescription);
            utterance.rate = 0.75;
    
            // Function to set voice and ensure speech starts only after the voice is set
            function setVoiceAndSpeak() {
                const voices = window.speechSynthesis.getVoices();
                const femaleVoice = voices.find(voice => voice.gender === 'female' || voice.name.toLowerCase().includes('female'));
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                } else {
                    // Retry setting the voice if not found
                    setTimeout(setVoiceAndSpeak, 50);
                    return;
                }
    
                // Log voices to console for debugging
                console.log("Voices loaded, using voice: ", utterance.voice.name);
    
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
    
            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
            } else {
                setVoiceAndSpeak();
            }
    
            utterance.onboundary = (event) => {
                console.log("Boundary event: ", event.charIndex, event.charLength); // Log for debugging
                const start = event.charIndex;
                const end = start + event.charLength;
                const beforeText = sanitizedDescription.slice(0, start);
                const highlightedText = sanitizedDescription.slice(start, end);
                const afterText = sanitizedDescription.slice(end);
    
                // Set highlighted text in state
                setSpokenContent(`${beforeText}<span style="background-color: #886cc0; padding: 5px; border-radius: 5px; color: white;">${highlightedText}</span>${afterText}`);
            };
    
            latestUtteranceRef.current = utterance;
        }
    };
    
    
    
    

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpokenContent('');
        latestUtteranceRef.current = null;
    };

    return (
        <div className="p-4">
            <CourseOverview course={detailedCourse} show={true} text={"Back"} />

            <div className="flex w-full">
                <div className="w-4/6 p-4 overflow-y-auto rounded-lg  mr-4">
                    {selectedSubtopic && (
                        <div dangerouslySetInnerHTML={{ __html: spokenContent || selectedSubtopic.content }} />
                    )}
                </div>

                <div className="w-2/6">
                    <div className="flex items-center justify-end mb-4">
                        {!isSpeaking ? (
                            <VolumeOffIcon
                                style={{ cursor: 'pointer', fontSize: '3rem', color: "#886cc0" }}
                                onClick={() => handleSpeak(selectedSubtopic?.content)}
                            />
                        ) : (
                            <VolumeUpIcon
                                style={{ cursor: 'pointer', fontSize: '3rem', color: "#886cc0" }}
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
