import React from 'react';
import { Avatar, Divider, Typography } from '@mui/material'; // Import Material-UI components
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import hardSkill from '../../assets/tools.png'
import sofSkills from '../../assets/expertise.png'
const SecondRow = () => {
    return (
        <div className="col-span-1 bg-white rounded-lg">
            <p className="text-[#886cc0] text-lg font-semibold p-2">Hard Skill vs Soft Skill Trend</p>
            <Divider style={{opacity:"0.4"}}/>
            <div className='p-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-row justify-start items-center space-x-4'>
                        <div className="flex-shrink-0">
                            <Avatar
                                style={{border: 0, borderRadius: '0%'}}
                                src={hardSkill}
                                alt="Image Description"
                                sx={{ width: 35, height: 35 }}
                            />
                        </div>
                        <div>
                            <Typography variant="h6">Hard Skills</Typography>
                            <p className='text-gray-600 text-opacity-50 text-sm font-semibold'>Increased by 6.5%</p>
                        </div>
                    </div>
                    <div>
                        <TrendingUpIcon fontSize="large" style={{ color: "green" }} />
                    </div>
                </div>
                <Divider className='pt-4' />
                <div className='flex justify-between items-center pt-4'>
                    <div className='flex flex-row justify-start items-center space-x-4'>
                        <div className="flex-shrink-0">
                            <Avatar
                                style={{border: 0, borderRadius: '0%'}}
                                src={sofSkills}
                                alt="Image Description"
                                sx={{ width: 35, height: 35 }}
                            />
                        </div>
                        <div>
                            <Typography variant="h6">Soft skills</Typography>
                            <p className='text-gray-600 text-opacity-50 text-sm font-semibold'>Decreased by 6.5%</p>

                        </div>
                    </div>
                    <div>
                        <TrendingDownIcon fontSize="large" style={{ color: "red" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondRow;
