import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubtopicCheckbox from './SubtopicCheckbox';
import { useDispatch } from 'react-redux';
import { loadDetailedCourse, track_course } from '../../../redux/action';
import GLOBAL_CONSTANTS from '../../../../GlobalConstants';
import { useParams } from 'react-router-dom';

const TopicAccordion = ({ course_id,topic, onSelectSubtopic, selectedSubtopic, defaultOpen }) => {
    const { id } = useParams();

    const dispatch=useDispatch();
    const handleCheckboxChange = (subtopic, completed) => {
        console.log("courses",topic,subtopic, completed)

        const payload={
            
            // user_id:GLOBAL_CONSTANTS?.user_cred?.id,
            // track:{
                check:completed,
                course_id:course_id,
                topic:topic?.name,
                sub_topic:subtopic?.name
            // }
        }

        dispatch(track_course(payload, (resp) => {
            dispatch(loadDetailedCourse(id));
        }))

    };
    const [isExpanded, setIsExpanded] = useState(defaultOpen);
    const allSubtopicsCompleted = topic?.subtopics?.every(sub => sub.completed);

    const handleAccordionChange = (event, isExpanded) => {
        setIsExpanded(isExpanded);
    };

    return (
        <Accordion 
            className={`bg-white rounded-xl ${allSubtopicsCompleted ? 'bg-blue-200' : ''}`}
            expanded={isExpanded}
            onChange={handleAccordionChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${topic.id}-content`}
                id={`panel${topic.id}-header`}
                className="flex justify-between"
            >
                <h3 className="font-semibold">{topic.name}</h3>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col">
                {topic?.subtopics?.map(subtopic => (
                    <div
                        key={subtopic.name}
                        className={`flex items-center justify-between hover:bg-gray-300 ${selectedSubtopic?.name === subtopic.name ? 'bg-gray-300' : ''}`}
                        onClick={() => onSelectSubtopic(subtopic)}
                    >
                        <SubtopicCheckbox
                            subtopic={subtopic}
                            onCheck={
                                // e.stopPropagation(); 
                                handleCheckboxChange
                            }
                        />
                        <span className="flex-grow cursor-pointer">{subtopic.name}</span>
                    </div>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;
