import './UserReport.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const SummarySnapshot = (props) => {
  const { interview_score_by_category, behavioral_presentation_and_grooming, presentation_and_grooming_score, readiness_score, head, report_data } = props;

  const presentationScore = Math.round(presentation_and_grooming_score);
  const readinessScore = Math.round(readiness_score);

  //for score value color
  const getScoreColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'text-red'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'text-orange'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'text-green'; // Apply green color
    } else {
      return 'text-gray'; // Default color or handle other cases
    }
  };
  //for progress bar in 3 main skill bucket in skill and role based report (use class name only and range 0-10)
  const progressBarColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'bar-red-bg'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'bar-orange-bg'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'bar-green-bg'; // Apply green color
    } else {
      return 'bg-grey'; // Default color or handle other cases
    }
  };

  //for progress bar in all skills list of JD and cultural fit report (use hex value only and range 0-100)
  const progressBarColorSkills = (x) => {
    if (x >= 0 && x <= 40) {    
      return '#FF555B'; // Apply red color
    } else if (x >= 50 && x <= 70) {   
      return '#FE9663'; // Apply yellow color
    } else if (x >= 80 && x <= 100) {
      return '#00BF6F'; // Apply green color
    } else {
      return '#1976d2'; // Default color or handle other cases
    }
  };

  const BorderLinearProgress = styled(LinearProgress, { shouldForwardProp: (prop) => prop !== 'value' })(({ theme, value }) => {
  console.log('Value:', value); // Log the value to check if it's received correctly
  return ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: progressBarColorSkills(value),
      width: `${value}%`, // Dynamically set the width based on the value
    },
  });
  });


  const getBackgroundColor = (head) => {
    const firstWord = head.split(' ')[0];
  
    if (firstWord === 'Behavioural') {
      return 'bg-purple'; // Apply purple color
    } else if (firstWord === 'Practical') {
      return 'bg-orange'; // Apply orange color
    } else if (head.startsWith('Domain Knowledge')) {
      return 'bg-green'; // Apply green color
    } else {
      return 'bg-gray'; // Default color or handle other cases
    }
  };

  // const bgColor = getBackgroundColor(head);

  //static sub-segment titles
  const setTitle = (head, index) => {
    const firstWord = head.split(' ')[0];
    let title = "";
  
    if (firstWord === 'Behavioural') {
      return ["Adaptability","Collaboration","Integrity","Resilience"][index];
    } else if (firstWord === 'Practical') {
      return ["Creativity","Logic","Decision Making","Analytical Skills"][index];
    } else if (head.startsWith('Domain Knowledge')) {
      return ["Expertise","Innovation","Learning Ability","Technical Skills"][index];
    } else {
      return ["hello1","hello2","hello3","hello4"][index];
    }
  };

  return (
    <>
      <div className="py-10 mx-3 my-3 md:mx-6 md:my-6 bg-grey">
        <h1 className="mx-8 font-bold text-2xl">Summary Snapshot</h1>
        <div className="mx-4 my-8 md:mx-6 md:my-12 rounded-3xl py-6 bg-white flex justify-around ">
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(readinessScore)} mb-4`}>{readinessScore}/10</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Overall Readiness Score</h3>
          </div>
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(presentationScore)} mb-4`}>{presentationScore}/10</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Presentation and Grooming</h3>
          </div>
        </div>
        <div className="munsow-dark-bg text-white py-1">
          <h2 className="text-center font-bold">Munsow Interview Classification Highlights</h2>
        </div>

        {report_data?.report_type === "skill based report" ? (
          <div>
          {interview_score_by_category?.data?.map((category, index) => (
            <div key={index} className={`mx-4 md:mx-8 my-8 rounded-3xl py-6 ${getBackgroundColor(category?.main_title)}`}>
              <div className="flex flex-col lg:flex-row lg:justify-around items-center">
                <div>
                  <h1 className="text-xl font-bold text-purple p-3 text-center">{category?.main_title}</h1>
                </div>
                <div className="rounded-full bg-white w-48 p-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-start">
                      <div className="w-full bg-gray-300 rounded-full">
                        <div
                          style={{ width: `${(category?.secured_marks / 10) * 100}%` }}
                          className={`text-center text-xs text-white ${progressBarColor(category?.secured_marks)} rounded-full`}
                        >
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : report_data?.report_type === "role based report" ? (
          <div>
          {interview_score_by_category?.data?.map((category, index) => (
            <div key={index} className={`mx-4 md:mx-8 my-8 rounded-3xl py-6 ${getBackgroundColor(category?.main_title)}`}>
              <div className="flex flex-col lg:flex-row lg:justify-around items-center">
                <div>
                  <h1 className="text-xl font-bold text-purple p-3 text-center">{category?.main_title}</h1>
                </div>
                <div className="rounded-full bg-white w-48 p-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-start">
                      <div className="w-full bg-gray-300 rounded-full">
                        <div
                          style={{ width: `${(category?.secured_marks / 10) * 100}%` }}
                          className={`text-center text-xs text-white ${progressBarColor(category?.secured_marks)} rounded-full`}
                        >
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : report_data?.report_type === "JD based report" ? (
          <div>
          <h3 className="uppercase text-zinc-500 px-8 pt-5">JD Skills Evaluated</h3>
          <div className="mx-4 md:mx-6 my-8 rounded-3xl py-6 bg-white">
            {/* //loop below div for dynamic skills */}
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">HTML</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={100} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(10)}`}>10/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">CSS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={90} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(9)}`}>9/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">NodeJS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={90} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(9)}`}>9/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">MongoDB</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={80} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(8)}`}>8/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">ReactJS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={70} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(7)}`}>7/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">Communication</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1}}>
                <BorderLinearProgress variant="determinate" value={40} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(4)}`}>4/10</p>
              </div>
            </div>
          </div>
          </div>
        ) : report_data?.report_type === "cultural fit report" ? (
          <div>

          <h3 className="uppercase text-zinc-500 px-8 pt-5">Cultural Skills Evaluated</h3>
          <div className="mx-4 md:mx-6 my-8 rounded-3xl py-6 bg-white">
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">HTML</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={100} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(10)}`}>10/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">CSS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={90} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(9)}`}>9/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">NodeJS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={90} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(9)}`}>9/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">MongoDB</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={80} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(8)}`}>8/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">ReactJS</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={70} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(7)}`}>7/10</p>
              </div>
            </div>
            <div className="px-4 py-2 flex items-center">
              <div className="basis-1/4">
                <p className="bold text-xl">Communication</p>
              </div>
              <div className="basis-1/2">
              <Stack spacing={2} sx={{ flexGrow: 1}}>
                <BorderLinearProgress variant="determinate" value={40} />
              </Stack>
              </div>
              <div className="basis-1/4 flex justify-end">
                <p className={`bold text-xl ${getScoreColor(4)}`}>4/10</p>
              </div>
            </div>
          </div>
          </div>
        ) : null
        }

      </div>
    </>
  );
};

export default SummarySnapshot;