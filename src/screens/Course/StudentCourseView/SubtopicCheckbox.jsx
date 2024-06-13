import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { RadioButtonUnchecked } from '@mui/icons-material';

const SubtopicCheckbox = ({ subtopic, onCheck }) => {
  return (
    <div className="flex items-center mx-2">
      <FormControlLabel
        control={
          <Checkbox
            checked={subtopic.completed}
            onChange={(e) => onCheck(subtopic, e?.target?.checked)}
            name={subtopic.name}
            icon={<RadioButtonUnchecked style={{ color: '#72E5E1' }} />}
            checkedIcon={<CheckCircle style={{ color: '#72E5E1' }} />}
          />
        }
        // label={subtopic.name}
        className="flex-grow"
        // onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
};

export default SubtopicCheckbox;
