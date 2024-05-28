import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import SubtopicCheckbox from './SubtopicCheckbox';
import { useDispatch } from 'react-redux';
import { loadDetailedCourse, track_course } from '../../../redux/action';
import GLOBAL_CONSTANTS from '../../../../GlobalConstants';
import { useParams } from 'react-router-dom';

import { CheckCircle } from '@mui/icons-material';
import { RadioButtonUnchecked } from '@mui/icons-material';

const TopicAccordion = ({ course_id, topic, onSelectSubtopic, selectedSubtopic, defaultOpen }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(defaultOpen);
    const allSubtopicsCompleted = topic?.subtopics?.every(sub => sub.completed);

    const handleAccordionChange = (event, isExpanded) => {
        setIsExpanded(isExpanded);
    };

    const handleMainCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        const updatedSubtopics = topic.subtopics.map(subtopic => ({
            ...subtopic,
            completed: isChecked,
        }));

        const payload = {
            check: isChecked,
            course_id: course_id,
            topic: topic?.name,
            sub_topic: null, // Set to null for main topic checkbox
        };

        dispatch(track_course(payload, (resp) => {
            dispatch(loadDetailedCourse(id));
        }));
    };

    const handleCheckboxChange = (subtopic, completed) => {
        const payload = {
            check: completed,
            course_id: course_id,
            topic: topic?.name,
            sub_topic: subtopic?.name,
        };

        dispatch(track_course(payload, (resp) => {
            dispatch(loadDetailedCourse(id));
        }));
    };

    return (
        <Accordion 
            className={`bg-white rounded-xl ${allSubtopicsCompleted ? 'bg-black-200' : ''}`}
            expanded={isExpanded}
            onChange={handleAccordionChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${topic.id}-content`}
                id={`panel${topic.id}-header`}
                className="flex justify-center"
            >
                <Checkbox
                    checked={allSubtopicsCompleted}
                    onChange={handleMainCheckboxChange}
                    onClick={(e) => e.stopPropagation()}
                    icon={<RadioButtonUnchecked style={{ color: '#72E5E1' }} />}
                    checkedIcon={<CheckCircle style={{ color: '#72E5E1' }} />}
                />
                <h3 className="font-semibold">{topic?.name}</h3>
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
                            onCheck={handleCheckboxChange}
                        />
                        <span className="flex-grow cursor-pointer">{subtopic.name}</span>
                    </div>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;
