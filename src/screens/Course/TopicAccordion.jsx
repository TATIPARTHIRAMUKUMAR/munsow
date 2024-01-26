import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TopicAccordion = ({ topic, isOpen, onToggle, children }) => {
    return (
        <Accordion expanded={isOpen} onChange={onToggle}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h2 className="text-xl font-semibold">{topic.name}</h2>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;
