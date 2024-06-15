import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Box, Typography, useTheme } from '@mui/material';

const getColor = (score, theme) => {
  if (score <= 3) return "#d63333";
  if (score <= 7) return theme.palette.warning.main;
  return "#24d653";
};

const getLighterColor = (score, theme) => {
  if (score <= 3) return "#f0b9b9";
  if (score <= 7) return "#f0ccb9";
  return "#9df2b4";
};

const JDInterviews = ({ interviewData }) => {
  const theme = useTheme();

  const combinedInterviews = interviewData.map(interview => ({
    label: `${interview.company_name} - ${interview.role}`,
    company_name: interview.company_name,
    role: interview.role,
    data: interview.data,
  }));

  const latestInterview = combinedInterviews.length > 0 ? combinedInterviews[combinedInterviews.length - 1] : null;

  const [selectedInterview, setSelectedInterview] = useState(latestInterview ? latestInterview.label : '');

  useEffect(() => {
    if (latestInterview) {
      setSelectedInterview(latestInterview.label);
    }
  }, [latestInterview]);

  const handleChange = (event) => {
    setSelectedInterview(event.target.value);
  };

  const selectedInterviewDetails = combinedInterviews.find(
    (interview) => interview.label === selectedInterview
  );

  return (
    <div>
      <p className="text-lg font-bold p-1 ml-3 text-center my-2">JD Interview Summary</p>
      <div className="flex justify-start mt-1 mb-4 ml-5">
      <FormControl 
        sx={{
          width: '310px',
          backgroundColor: '#F0F0F0',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
              borderRadius: '8px',
            },
          },
        }}
        size="small"
        >
          <Select
            value={selectedInterview}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                padding: '8px 14px', // Adjust padding if needed
              },
            }}
          >
            {combinedInterviews.map((interview, index) => (
              <MenuItem key={index} value={interview.label}>
                {interview.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="mt-5 mx-5 mb-3">
        {selectedInterviewDetails &&
          selectedInterviewDetails.data.map((skill, index) => (
            <div key={index} className="flex flex-col items-center mb-9">
              <Box position="relative" display="inline-flex" sx={{ width: 70, height: 70 }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  thickness={4}
                  sx={{ color: getLighterColor(skill.scored, theme), width: '100% !important', height: '100% !important' }}
                />
                <CircularProgress
                  variant="determinate"
                  value={(skill.scored / skill.total) * 100}
                  thickness={4}
                  sx={{ color: getColor(skill.scored, theme), position: 'absolute', left: 0, width: '100% !important', height: '100% !important' }}
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="caption" component="div" color="textSecondary" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {skill.scored}
                  </Typography>
                </Box>
              </Box>
              <span className="flex justify-center text-center w-[220px]">{skill.skill_name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JDInterviews;
