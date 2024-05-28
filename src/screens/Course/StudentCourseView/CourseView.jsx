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
import GLOBAL_CONSTANTS from '../../../../GlobalConstants';
import Tooltip from '@mui/material/Tooltip';

import { useDarkMode } from "./../../../Dark";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { PDFExport } from "@progress/kendo-react-pdf";

const StudentCourseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailedCourse, colorTheme } = useSelector((state) => state?.data);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenContent, setSpokenContent] = useState('');
    const { isDarkMode } = useDarkMode();
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);

    const linearGradientBackground = isDarkMode
        ? colorTheme.dark.selectBackground
        : colorTheme.light.selectBackground;

    const textColor = isDarkMode
        ? colorTheme.dark.textColor3
        : colorTheme.light.textColor3;

    const cardColor = isDarkMode
        ? colorTheme.dark.cardColor
        : colorTheme.light.cardColor;

    // Maintain a reference to the latest utterance
    const latestUtteranceRef = useRef(null);

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, [dispatch, id]);

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
        if (description) {
            // Cancel any ongoing speech synthesis
            window.speechSynthesis.cancel();

            const sanitizedDescription = description.replace(/<[^>]*>/g, '');
            const chunks = sanitizedDescription.match(/.{1,200}/g) || [];

            let chunkIndex = 0;

            const speakNextChunk = () => {
                if (chunkIndex < chunks.length) {
                    const chunk = chunks[chunkIndex++];
                    const utterance = new SpeechSynthesisUtterance(chunk);
                    utterance.rate = 1.0;
                    setVoiceAndSpeak(utterance);
                    utterance.onend = speakNextChunk;

                    latestUtteranceRef.current = utterance;
                } else {
                    setIsSpeaking(false);
                    setSpokenContent('');
                }
            };

            const setVoiceAndSpeak = (utterance) => {
                const voices = window.speechSynthesis.getVoices();
                const femaleVoice = voices.find(voice => voice.gender === 'female' || voice.name.toLowerCase().includes('female'));
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                } else {
                    setTimeout(() => setVoiceAndSpeak(utterance), 50);
                    return;
                }

                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            };

            speakNextChunk();
        }
    };

    const handleSelectSubtopic = (subtopic) => {
        if (subtopic !== selectedSubtopic) {
            // Stop any current speech synthesis
            handleStop();
            setSelectedSubtopic(subtopic);
            handleSpeak(subtopic.content);

            // Find the new indices
            const newTopicIndex = detailedCourse?.content_data?.findIndex(topic =>
                topic.subtopics?.some(sub => sub.id === subtopic.id)
            );
            const newSubtopicIndex = detailedCourse?.content_data?.[newTopicIndex]?.subtopics?.findIndex(sub => sub.id === subtopic.id);

            setCurrentTopicIndex(newTopicIndex);
            setCurrentSubtopicIndex(newSubtopicIndex);
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpokenContent('');
        latestUtteranceRef.current = null;
    };

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const calculateProgress = () => {
        if (!detailedCourse || !detailedCourse.content_data) {
            return 0;
        }

        const totalSubtopics = detailedCourse.content_data.reduce((acc, topic) => acc + (topic.subtopics?.length || 0), 0);
        const completedSubtopics = detailedCourse.content_data.reduce((acc, topic) => {
            return acc + (topic.subtopics?.filter(subtopic => subtopic.completed)?.length || 0);
        }, 0);

        return totalSubtopics === 0 ? 0 : Math.round((completedSubtopics / totalSubtopics) * 100);
    };

    const progress = calculateProgress();

    const handleProgressClick = () => {
        setTooltipOpen(true);
    };

    const handleCloseTooltip = () => {
        setTooltipOpen(false);
    };

    const completedSubtopics = detailedCourse?.content_data?.reduce((acc, topic) => {
        return acc + (topic.subtopics?.filter(subtopic => subtopic.completed)?.length || 0);
    }, 0);

    const totalSubtopics = detailedCourse?.content_data?.reduce((acc, topic) => acc + (topic.subtopics?.length || 0), 0);

    const tooltipContent = `${completedSubtopics} out of ${totalSubtopics} subtasks completed`;

    let styleObj = {
        color: 'red'
    }

    const topics = detailedCourse.content_data;

    const handleNext = () => {
        const currentTopic = topics[currentTopicIndex];
        const currentSubtopics = currentTopic?.subtopics;

        if (currentSubtopicIndex < currentSubtopics?.length - 1) {
            const nextSubtopic = currentSubtopics[currentSubtopicIndex + 1];
            setSelectedSubtopic(nextSubtopic);
            setCurrentSubtopicIndex(currentSubtopicIndex + 1);
        } else if (currentTopicIndex < topics.length - 1) {
            const nextTopic = topics[currentTopicIndex + 1];
            const nextSubtopic = nextTopic.subtopics[0];
            setSelectedSubtopic(nextSubtopic);
            setCurrentTopicIndex(currentTopicIndex + 1);
            setCurrentSubtopicIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentSubtopicIndex > 0) {
            const previousSubtopic = topics[currentTopicIndex].subtopics[currentSubtopicIndex - 1];
            setSelectedSubtopic(previousSubtopic);
            setCurrentSubtopicIndex(currentSubtopicIndex - 1);
        } else if (currentTopicIndex > 0) {
            const previousTopic = topics[currentTopicIndex - 1];
            const previousSubtopic = previousTopic.subtopics[previousTopic.subtopics.length - 1];
            setSelectedSubtopic(previousSubtopic);
            setCurrentTopicIndex(currentTopicIndex - 1);
            setCurrentSubtopicIndex(previousTopic.subtopics.length - 1);
        }
    };

    const handleDownload = () => {

    }

    return (
        <div className="p-4">
            <CourseOverview course={detailedCourse} show={true} text={"Back"} />

            <div className="flex w-full">
                <div className="w-4/6 p-4 overflow-y-auto rounded-lg mr-4">
                    {selectedSubtopic && (
                        <div style={styleObj} dangerouslySetInnerHTML={{ __html: spokenContent || selectedSubtopic.content }} />
                    )}

                    <div className='flex justify-between mt-9'>
                        <Button
                            variant="contained"
                            startIcon={<FileDownloadOutlinedIcon />}
                            style={{ margin: '10px', backgroundColor: '#D5D5D5', color: textColor, borderRadius: '10px', textTransform: 'none' }}
                            autoFocus
                            onClick={handleDownload}
                        >
                            Download
                        </Button>
                        <div className='flex justify-end'>
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIosIcon />}
                                style={{ margin: '10px', backgroundColor: '#E0F7DA', color: textColor, borderRadius: '10px', textTransform: 'none' }}
                                autoFocus
                                onClick={handlePrevious}
                                disabled={currentTopicIndex === 0 && currentSubtopicIndex === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIosIcon />}
                                style={{ margin: '10px', backgroundColor: linearGradientBackground, color: textColor, borderRadius: '10px', textTransform: 'none' }}
                                autoFocus
                                onClick={handleNext}
                                disabled={currentTopicIndex === topics?.length - 1 && currentSubtopicIndex === topics[topics?.length - 1]?.subtopics?.length - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                </div>

                <div className={`w-2/6 `} >
                    <div className={`p-5 bg-[#${cardColor}] rounded-xl`} >
                        {GLOBAL_CONSTANTS?.user_cred?.role_name === "Student" && (
                            <div className="flex flex-col bg-white p-3 rounded-xl shadow-lg">
                                <div className="flex justify-end">
                                    <p className='font-semibold'>Progress</p>
                                </div>
                                <svg width="0" height="0">
                                    <defs>
                                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#e01cd5" />
                                            <stop offset="100%" stopColor="#1CB5E0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <div className="w-full flex justify-between items-center">
                                    <Tooltip title={tooltipContent} open={tooltipOpen} onClose={handleCloseTooltip} arrow>
                                        <div onClick={handleProgressClick} className="flex items-center w-full">
                                            <span className="mx-2 font-semibold">{`${progress}%`}</span>
                                            <div className="flex-grow h-2 bg-[#798FA4] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${progress}%`,
                                                        background: '#72E5E1',
                                                        border: '2px solid #798FA4'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </Tooltip>
                                </div>

                            </div>
                        )}
                        {/* <div className="flex items-center justify-end mb-4">
                            {!isSpeaking ? (
                                <VolumeOffIcon
                                    style={{ cursor: 'pointer', fontSize: '3rem', color: textColor }}
                                    onClick={() => handleSpeak(selectedSubtopic?.content)}
                                />
                            ) : (
                                <VolumeUpIcon
                                    style={{ cursor: 'pointer', fontSize: '3rem', color: linearGradientBackground }}
                                    onClick={handleStop}
                                />
                            )}
                        </div> */}

                        <div className='mt-5'>
                            <div className="flex justify-end mb-3">
                                <p className='font-semibold'>Topics</p>
                            </div>
                            {detailedCourse?.content_data?.map((topic, topicIndex) => {
                                const isDefaultOpen = topic?.subtopics?.some(sub => sub === selectedSubtopic && !sub?.completed);
                                return (
                                    <div className='mb-3 rounded-xl shadow-lg' key={topic.id}>
                                        <TopicAccordion
                                            course_id={detailedCourse?.id}
                                            key={topic.id}
                                            topic={topic}
                                            onSelectSubtopic={handleSelectSubtopic}
                                            selectedSubtopic={selectedSubtopic}
                                            defaultOpen={isDefaultOpen}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCourseView;
