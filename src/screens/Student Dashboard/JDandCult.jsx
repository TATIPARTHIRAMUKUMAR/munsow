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
        console.log("data1", data)
        // setdataWithSerialNumbers(userStats?.graphs?.length > 0 ? userStats.graphs[0].data : [])
    }, [userStats])

    return (
        <div className="col-span-1 bg-white rounded-lg">
            <p className=" text-lg font-semibold p-2" style={{ color: textColor }}>
                JD  vs Cult 
            </p>            <Divider style={{ opacity: "0.4" }} />
            <div className='p-5'>
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
                            <Typography variant="h6">JD</Typography>
                           
                        </div>
                    </div>
                    <div>
                       {data[0]?.value}
                    </div>
                </div>
                <Divider className='pt-3' />
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
                            <Typography variant="h6">Cult</Typography>
                            

                        </div>
                    </div>
                    <div>
                    {data[1]?.value}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JDCult;
