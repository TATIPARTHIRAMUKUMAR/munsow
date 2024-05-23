import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Divider, LinearProgress, Box } from '@mui/material';


const culturalInterviews = [
    {
        Interview: 1,
        skillScores: [
            { name: 'Communication', score: 5 },
            { name: 'Teamwork', score: 4 },
            { name: 'Creativity', score: 2 },
            { name: 'Adaptability', score: 3 },
        ]
    },
    {
        Interview: 2,
        skillScores: [
            { name: 'Communication', score: 4 },
            { name: 'Problem-Solving', score: 5 },
            { name: 'Leadership', score: 3 },
        ]
    },
    {
        Interview: 3,
        skillScores: [
            { name: 'Creativity', score: 5 },
            { name: 'Teamwork', score: 8 },
            { name: 'Communication', score: 4 },
            { name: 'Time Management', score: 3 },
        ]
    },
    {
        Interview: 4,
        skillScores: [
            { name: 'Communication', score: 5 },
            { name: 'Teamwork', score: 4 },
            { name: 'Creativity', score: 2 },
            { name: 'Adaptability', score: 3 },
            { name: 'Conflict Resolution', score: 4 },
        ]
    },
    {
        Interview: 5,
        skillScores: [
            { name: 'Problem-Solving', score: 5 },
            { name: 'Leadership', score: 4 },
            { name: 'Creativity', score: 3 },
        ]
    },
    {
        Interview: 6,
        skillScores: [
            { name: 'Adaptability', score: 5 },
            { name: 'Teamwork', score: 3 },
            { name: 'Communication', score: 4 },
        ]
    },
    {
        Interview: 7,
        skillScores: [
            { name: 'Conflict Resolution', score: 4 },
            { name: 'Teamwork', score: 4 },
            { name: 'Communication', score: 3 },
        ]
    },
];

const CulturalInterviews = () => {
  const latestInterview = Math.max(...culturalInterviews.map(interview => interview.Interview));
  
  const [selectedInterview, setSelectedInterview] = useState(latestInterview);

  const handleChange = (event) => {
    setSelectedInterview(event.target.value);
  };

  const selectedInterviewDetails = culturalInterviews.find(
    (interview) => interview.Interview === selectedInterview
  );

  const getColorClass = (score) => {
    if (score <= 4) return '#ef4444';
    if (score <= 7) return '#f97316';
    return '#22c55e';
  };

  return (
    <div>
      <p className="text-lg font-bold p-2">
        Cultural Interview Summary
      </p>
      <Divider style={{ opacity: '0.4' }} />
      <div className="flex justify-end mt-3 mb-4 mr-3">
        <FormControl style={{ width: '160px' }} size="small">
          <InputLabel id="interview-select-label">Select Interview</InputLabel>
          <Select
            labelId="interview-select-label"
            id="interview-select"
            value={selectedInterview}
            label="Select Interview"
            onChange={handleChange}
          >
            {culturalInterviews
              .slice() // Create a shallow copy of the array
              .sort((a, b) => b.Interview - a.Interview) // Sort in descending order
              .map((interview) => (
                <MenuItem key={interview.Interview} value={interview.Interview}>
                  Interview-{interview.Interview}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className="mt-5 mx-5 mb-3">
            {selectedInterviewDetails &&
            selectedInterviewDetails.skillScores.map((skill, index) => (
                <div key={index} className="flex items-center mb-4">
                <span className="w-1/3">{skill.name}</span>
                <Box className="w-1/2" sx={{ mx: 2 }}>
                    <LinearProgress
                    variant="determinate"
                    value={(skill.score / 10) * 100}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                        backgroundColor: getColorClass(skill.score),
                        },
                    }}
                    />
                </Box>
                <span className={`w-1/6 text-center font-semibold`}
                        style={{color:getColorClass(skill.score)}}>{skill.score}/10</span>
                </div>
            ))}
      </div>
    </div>
  );
};

export default CulturalInterviews;