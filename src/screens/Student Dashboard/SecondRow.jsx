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

const SecondRow = () => {
    const { userStats } = useSelector((state) => state.data);

    const [data, setData] = useState([]);
    const { isDarkMode, colorTheme } = useDarkMode();

    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode
        ? reduxColorTheme.dark.textColor3
        : reduxColorTheme.light.textColor3;

    useEffect(() => {
        setData(userStats?.skill_trends ? userStats.skill_trends : {})
        console.log("data1 : ", data)
        // setdataWithSerialNumbers(userStats?.graphs?.length > 0 ? userStats.graphs[0].data : [])
    }, [userStats])

    const renderTrendIcon = (value) => {
        if (value > 0) {
            return <TrendingUpIcon fontSize="large" style={{ color: "green" }} />;
        } else if (value < 0) {
            return <TrendingDownIcon fontSize="large" style={{ color: "red" }} />;
        } else {
            return <TrendingFlatIcon fontSize="large" style={{ color: "gray" }} />;
        }
    };

    return (
        <div className="col-span-1 bg-white rounded-lg">
            <p className=" text-lg font-semibold p-2" style={{ color: textColor }}>
                Hard Skill vs Soft Skill Trend
            </p>            <Divider style={{ opacity: "0.4" }} />
            <div className='p-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-row justify-start items-center space-x-4'>
                        <div className="flex-shrink-0">
                            <Avatar
                                style={{ border: 0, borderRadius: '0%' }}
                                src={hardSkill}
                                alt="Image Description"
                                sx={{ width: 35, height: 35 }}
                            />
                        </div>
                        <div>
                            <Typography variant="h6">Hard Skills</Typography>
                            <p className='text-gray-600 text-opacity-50 text-sm font-semibold'>
                                {data?.hard_skill > 0 ? "Increased by" : "Decreased by"} {Math.abs(data?.hard_skill)}%
                            </p>
                        </div>
                    </div>
                    <div>
                        {renderTrendIcon(data?.hard_skill)}
                    </div>
                </div>
                <Divider className='pt-4' />
                <div className='flex justify-between items-center pt-4'>
                    <div className='flex flex-row justify-start items-center space-x-4'>
                        <div className="flex-shrink-0">
                            <Avatar
                                style={{ border: 0, borderRadius: '0%' }}
                                src={sofSkills}
                                alt="Image Description"
                                sx={{ width: 35, height: 35 }}
                            />
                        </div>
                        <div>
                            <Typography variant="h6">Soft skills</Typography>
                            <p className='text-gray-600 text-opacity-50 text-sm font-semibold'>
                                {data?.soft_skill > 0 ? "Increased by" : "Decreased by"} {Math.abs(data?.soft_skill)}%
                            </p>

                        </div>
                    </div>
                    <div>
                        {renderTrendIcon(data?.soft_skill)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondRow;
