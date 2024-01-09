import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubtopicCheckbox from './SubtopicCheckbox';

const TopicAccordion = ({ topic, onSelectSubtopic }) => {
    const handleCheckboxChange = (subtopic, completed) => {
        // Handle checkbox change logic, potentially updating Redux store
    };

    return (
        <Accordion className="bg-white shadow-md rounded-lg">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${topic.id}-content`}
                id={`panel${topic.id}-header`}
                className="flex justify-between"
            >
                <h3 className="font-semibold">{topic.name}</h3>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col">
                {topic.subtopics.map(subtopic => (
                    <div
                        key={subtopic.name}
                        className="flex items-center justify-between"
                        onClick={() => onSelectSubtopic(subtopic)}
                    >
                        <SubtopicCheckbox
                            subtopic={subtopic}
                            onCheck={(e) => {
                                e.stopPropagation(); // Prevent the accordion from toggling
                                handleCheckboxChange(subtopic, e.target.checked);
                            }}
                        />
                        <span className="flex-grow cursor-pointer">{subtopic.name}</span>
                        
                    </div>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;
