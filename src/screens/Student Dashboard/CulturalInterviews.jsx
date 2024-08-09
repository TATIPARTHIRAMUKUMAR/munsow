import React, { useState } from 'react';
import { FormControl, Button, InputLabel, Select, MenuItem, Divider, LinearProgress, Box } from '@mui/material';

// const interviewData = [
//   {
//     "company_name": "Cognizant",
//     "role": "Software Developer",
//     "data": [
//       { "skill_name": "Python", "scored": 70, "total": 100 },
//       { "skill_name": "Java", "scored": 60, "total": 100 },
//       { "skill_name": "C++", "scored": 50, "total": 100 },
//       { "skill_name": "C", "scored": 40, "total": 100 }
//     ]
//   },
//   {
//     "company_name": "Cognizant",
//     "role": "Senior Software Developer",
//     "data": [
//       { "skill_name": "Python", "scored": 70, "total": 100 },
//       { "skill_name": "Java", "scored": 60, "total": 100 },
//       { "skill_name": "C++", "scored": 50, "total": 100 },
//       { "skill_name": "C1", "scored": 30, "total": 100 }
//     ]
//   }
// ];

const CulturalInterviews = ({ interviewData, type }) => {
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const selectedInterview = interviewData[currentDataIndex];

  const handleChange = (event) => {
    const newIndex = interviewData.findIndex(interview => interview.role === event.target.value);
    setCurrentDataIndex(newIndex);
  };

  const getColorClass = (score) => {
    if (score <= 4) return '#ef4444';
    if (score <= 7) return '#f97316';
    return '#22c55e';
  };

  const moveNext = () => {
    setCurrentDataIndex(prev => (prev + 1) % interviewData?.length);
  };

  const movePrevious = () => {
    setCurrentDataIndex(prev => (prev - 1 + interviewData?.length) % interviewData?.length);
  };

  return (
    <div>
      <p className="text-lg font-bold p-2">
        Cultural Fit Interview Summary
      </p>
      <Divider style={{ opacity: '0.4' }} />
      <p className="text-lg p-2 text-center">
        {selectedInterview?.company_name} - {selectedInterview?.role}
      </p>
      {/* <div className="flex justify-end mt-3 mb-4 mr-3">
                <FormControl style={{ width: '200px' }} size="small">
                    <InputLabel id="role-select-label">Select Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        label="Select Role"
                        value={selectedInterview.role}
                        onChange={handleChange}
                    >
                        {interviewData.map((interview, index) => (
                            <MenuItem key={index} value={interview.role}>
                                {interview.role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div> */}

      <div className="mt-5 mx-5 mb-3">
        {selectedInterview?.data?.map((skill, index) => (
          <div key={index} className="flex items-center mb-4">
            <span className="w-1/3">{skill.skill_name}</span>
            <Box className="w-1/2" sx={{ mx: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(skill.scored / skill.total) * 100}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColorClass(skill.scored),
                  },
                }}
              />
            </Box>
            <span className={`w-1/6 text-center font-semibold`}
              style={{ color: getColorClass(skill.scored) }}>{skill.scored}/{skill.total}</span>
          </div>
        ))}
        <>{type == "admin" && (
          interviewData.map((skill, index) => (
            <div key={index} className="flex items-center mb-4">
              <span className="w-1/3">{skill.skill_name}</span>
              <Box className="w-1/2" sx={{ mx: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={(skill.scored / skill.total) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getColorClass(skill.scored),
                    },
                  }}
                />
              </Box>
              <span className={`w-1/6 text-center font-semibold`}
                style={{ color: getColorClass(skill.scored) }}>{skill.scored}/{skill.total}</span>
            </div>
          )))
        }
        </>

      </div>
      <>
        {type !== "admin" && (


          <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
            <Button variant="contained" onClick={movePrevious} disabled={currentDataIndex === 0}>
              Previous
            </Button>
            <Button variant="contained" onClick={moveNext} disabled={currentDataIndex === interviewData.length - 1}>
              Next
            </Button>
          </Box>
        )}
      </>
    </div>
  );
};

export default CulturalInterviews;
