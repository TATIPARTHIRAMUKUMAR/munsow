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
  // console.log('Value:', value); // Log the value to check if it's received correctly
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

  const formatScore = (score) => {
    if (score <= 10) {
        return score;
    } else {
        const decimalScore = score / 10;
        return Math.floor(decimalScore);
    }
  };

  // const formatScore = (score) => {
  //   if (score <= 10) {
  //       return score;
  //   } else {
  //       const roundedScore = (score / 10).toFixed(1);
  //       return parseFloat(roundedScore);
  //   }
  // };

  return (
    <>
      <div className="py-10 mx-3 my-3 md:mx-6 md:my-6 bg-grey">
        <h1 className="mx-8 font-bold text-2xl">Summary Snapshot</h1>
        <div className="mx-4 my-8 md:mx-6 md:my-12 rounded-3xl py-6 bg-white flex justify-around ">
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(formatScore(readinessScore))} mb-4`}>{readinessScore ? `${formatScore(readinessScore)}/10` : "0/10"}</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Overall Readiness Score</h3>
          </div>
          <div className="text-center">
            <h1 className={`text-2xl md:text-4xl font-bold ${getScoreColor(formatScore(presentationScore))} mb-4`}>{presentationScore ? `${formatScore(presentationScore)}/10` : "0/10"}</h1>
            <h3 className="max-[375px]:text-base text-xl font-bold text-purple">Presentation and Grooming</h3>
          </div>
        </div>
        {/* //temporary commented (Not to be Removed) */}
        {/* <div className="munsow-dark-bg text-white py-1">
          <h2 className="text-center font-bold">Munsow Interview Classification Highlights</h2>
        </div> */}

        {report_data?.interview_type === "skill_interview" ? (  
          <></>
          //temporary commented (Not to be Removed) 
          // <div>
          // {interview_score_by_category?.data?.map((category, index) => (
          //   <div key={index} className={`mx-4 md:mx-8 my-8 rounded-3xl py-6 ${getBackgroundColor(category?.main_title)}`}>
          //     <div className="flex flex-col lg:flex-row lg:justify-around items-center">
          //       <div>
          //         <h1 className="text-xl font-bold text-purple p-3 text-center">{category?.main_title}</h1>
          //       </div>
          //       <div className="rounded-full bg-white w-48 p-4">
          //         <div className="relative pt-1">
          //           <div className="flex mb-2 items-center justify-start">
          //             <div className="w-full bg-gray-300 rounded-full">
          //               <div
          //                 style={{ width: `${(category?.secured_marks / 10) * 100}%` }}
          //                 className={`text-center text-xs text-white ${progressBarColor(category?.secured_marks)} rounded-full`}
          //               >
          //                 &nbsp;
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // ))}
          // </div>
        ) : report_data?.interview_type === "company_role_interview" ? (
          <></>
          //temporary commented (Not to be Removed)
          // <div>
          // {interview_score_by_category?.data?.map((category, index) => (
          //   <div key={index} className={`mx-4 md:mx-8 my-8 rounded-3xl py-6 ${getBackgroundColor(category?.main_title)}`}>
          //     <div className="flex flex-col lg:flex-row lg:justify-around items-center">
          //       <div>
          //         <h1 className="text-xl font-bold text-purple p-3 text-center">{category?.main_title}</h1>
          //       </div>
          //       <div className="rounded-full bg-white w-48 p-4">
          //         <div className="relative pt-1">
          //           <div className="flex mb-2 items-center justify-start">
          //             <div className="w-full bg-gray-300 rounded-full">
          //               <div
          //                 style={{ width: `${(category?.secured_marks / 10) * 100}%` }}
          //                 className={`text-center text-xs text-white ${progressBarColor(category?.secured_marks)} rounded-full`}
          //               >
          //                 &nbsp;
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // ))}
          // </div>
        ) : report_data?.interview_type === "jd_interview" ? (
          <div>
          <h3 className="uppercase text-zinc-500 px-8 pt-5">JD Skills Evaluated</h3>
          <div className="mx-4 md:mx-6 my-8 rounded-3xl py-6 bg-white">
            {report_data?.graph_data?.map((jd) => (
            <div className="px-4 py-2 block md:flex items-center">
              <div className="basis-1/4 text-center md:text-start">
                <p className="bold text-xl">{jd?.skill_name}</p>
              </div>
              <div className="basis-1/2 p-4 md:p-0 text-center">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={jd?.scored*10} />
              </Stack>
              </div>
              <div className="basis-1/4 text-center md:text-center">
                <p className={`bold text-xl ${getScoreColor(jd?.scored)}`}>{jd?.scored}/{jd?.total}</p>
              </div>
            </div>
            ))}
          </div>
          </div>
        ) : report_data?.interview_type === "cultural_interview" ? (
          <div>
          <h3 className="uppercase text-zinc-500 px-8 pt-5">Cultural Skills Evaluated</h3>
          <div className="mx-4 md:mx-6 my-8 rounded-3xl py-6 bg-white">
            {report_data?.graph_data?.map((cultural) => (
            <div className="px-4 py-2 block md:flex items-center">
              <div className="basis-1/4 text-center md:text-start">
                <p className="bold text-xl">{cultural?.skill_name}</p>
              </div>
              <div className="basis-1/2 p-4 md:p-0 text-center">
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <BorderLinearProgress variant="determinate" value={cultural?.scored*10} />
              </Stack>
              </div>
              <div className="basis-1/4 text-center md:text-center">
                <p className={`bold text-xl ${getScoreColor(cultural?.scored)}`}>{cultural?.scored}/{cultural?.total}</p>
              </div>
            </div>
            ))}
          </div>
          </div>
        ) : null
        }

      </div>
    </>
  );
};

export default SummarySnapshot;