import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, CircularProgress, Box, Typography, useTheme } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';

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

const CulturalInterviews = ({ interviewData }) => {
  const theme = useTheme();

  const combinedInterviews = interviewData.map(interview => ({
    label: `${interview.company_name} - ${interview.role}`,
    company_name: interview.company_name,
    role: interview.role,
    data: interview.data,
  }));

  const latestInterview = combinedInterviews.length > 0 ? combinedInterviews[combinedInterviews.length - 1] : null;

  const [selectedInterview, setSelectedInterview] = useState('');

  useEffect(() => {
    if (latestInterview && !selectedInterview) {
      setSelectedInterview(latestInterview.label);
    }
  }, [latestInterview, selectedInterview]);

  const handleChange = (event) => {
    const selectedLabel = event.target.value;
    setSelectedInterview(selectedLabel);
  };

  const selectedInterviewDetails = combinedInterviews.find(
    (interview) => interview.label === selectedInterview
  );

  return (
    <div>
      <p className="text-lg font-bold p-1 ml-3 text-center my-2">Cultural Interview Summary</p>
      {combinedInterviews?.length > 0 ? (
        <>
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
              selectedInterviewDetails?.data?.map((skill, index) => (
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
        </>
      ) : (
        <div className='font-bold mt-[40%]' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
          <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
          <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
            There's not enough data to present any insights. Start attending interviews to see your journey.
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalInterviews;
