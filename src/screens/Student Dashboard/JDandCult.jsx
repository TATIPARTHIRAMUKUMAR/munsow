import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Typography } from '@mui/material'; // Import Material-UI components
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import hardSkill from '../../assets/tools.png'
import sofSkills from '../../assets/expertise.png'
import { useSelector } from 'react-redux';


import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'; // Import for the flat trend icon
import { useDarkMode } from "./../../Dark";

import { FaFileAlt, FaUsers, FaBuilding, FaHeadSideVirus, FaUserTie } from 'react-icons/fa';

const JDCult = () => {
    const { userStats } = useSelector((state) => state.data);

    const [data, setData] = useState([]);
    const { isDarkMode, colorTheme } = useDarkMode();

    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode
        ? reduxColorTheme.dark.textColor2
        : reduxColorTheme.light.textColor2;

    useEffect(() => {
        setData(userStats?.cards ? userStats.cards : {})
        console.log("data1 : ", userStats)
        // setdataWithSerialNumbers(userStats?.graphs?.length > 0 ? userStats.graphs[0].data : [])
    }, [userStats])

    return (
        <div className="col-span-1 bg-white rounded-lg">
            <p className="ml-2 text-lg font-semibold p-2" style={{ color: "black" }}>
            Interviews Taken
            </p>
            <div className='p-5'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-row justify-start text-md font-bold items-center space-x-3 ml-3'>
                        <div className="flex-shrink-0">
                            <FaFileAlt style={{ color: textColor, fontSize: '30px' }} />
                        </div>
                        <div>
                            <Typography variant="h7" style={{ color: textColor }}>Job Description Specific</Typography>
                           
                        </div>
                    </div>
                    <div className='text-lg font-bold'>
                       {data[0]?.value}
                    </div>
                </div>
                <div className='flex justify-between items-center mt-7'>
                    <div className='flex flex-row justify-start text-md font-bold items-center space-x-3 ml-3'>
                        <div className="flex-shrink-0">
                            <FaUsers style={{ color: textColor, fontSize: '30px' }} />
                        </div>
                        <div>
                            <Typography variant="h7" style={{ color: textColor }}>Cultural Fit Specific</Typography>
                           
                        </div>
                    </div>
                    <div className='text-lg font-bold'>
                       {data[1]?.value}
                    </div>
                </div>
                <div className='flex justify-between items-center mt-7'>
                    <div className='flex flex-row justify-start text-md font-bold items-center space-x-3 ml-3'>
                        <div className="flex-shrink-0">
                            <FaHeadSideVirus style={{ color: textColor, fontSize: '30px' }} />
                        </div>
                        <div>
                            <Typography variant="h7" style={{ color: textColor }}>Skill Specific</Typography>
                           
                        </div>
                    </div>
                    <div className='text-lg font-bold'>
                       {data[2]?.value}
                    </div>
                </div>
                <div className='flex justify-between items-center mt-7'>
                    <div className='flex flex-row justify-start text-md font-bold items-center space-x-3 ml-3'>
                        <div className="flex-shrink-0">
                            <FaUserTie style={{ color: textColor, fontSize: '30px' }} />
                        </div>
                        <div>
                            <Typography variant="h7" style={{ color: textColor }}>Company Role Specific</Typography>
                           
                        </div>
                    </div>
                    <div className='text-lg font-bold'>
                       {data[3]?.value}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JDCult;