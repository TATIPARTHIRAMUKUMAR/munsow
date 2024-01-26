import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const SubtopicCheckbox = ({ subtopic, onCheck }) => {
  return (
    <div className="flex items-center mx-2">
      <FormControlLabel
        control={
          <Checkbox
            checked={subtopic.completed}
            onChange={(e) => onCheck(subtopic, e.target.checked)}
            name={subtopic.name}
            color="primary"
          />
        }
        // label={subtopic.name}
        className="flex-grow"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
};

export default SubtopicCheckbox;
