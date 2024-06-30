import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Typography } from '@mui/material'; 
import { useSelector } from 'react-redux';
import { useDarkMode } from "./../../Dark";
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';

const getIconByName = (name) => {
    switch (name) {
        case 'Job Description':
            return <WorkIcon />;
        case 'Cultural Fit':
            return <PeopleIcon />;
        case 'Hard/Soft Skill':
            return <SchoolIcon />;
        case 'Company Role':
            return <BusinessIcon />;
        default:
            return <Avatar />;
    }
};

const JDCult = () => {
    const { userStats } = useSelector((state) => state.data);

    const [data, setData] = useState([]);
    const { isDarkMode, colorTheme } = useDarkMode();

    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode
        ? reduxColorTheme.dark.textColor2
        : reduxColorTheme.light.textColor2;

    useEffect(() => {
        setData(userStats?.cards ? userStats.cards : []);
    }, [userStats]);

    return (
        <div className="col-span-1 bg-white rounded-lg">
            <p className="text-lg font-semibold p-2" style={{ color: textColor }}>
                Interview Submissions
            </p>
            <Divider style={{ opacity: "0.4" }} />
            <div className='p-5'>
                {data.map((item, index) => (
                    <div key={index}>
                        <div className='flex justify-between items-center pt-4'>
                            <div className='flex flex-row justify-start items-center space-x-4'>
                                <div className="flex-shrink-0">
                                    <Avatar
                                        // style={{ border: 0, borderRadius: '0%' }}
                                        sx={{ width: 35, height: 35 }}
                                    >
                                        {getIconByName(item.name)}
                                    </Avatar>
                                </div>
                                <div>
                                    <Typography variant="h6">{item.name}</Typography>
                                </div>
                            </div>
                            <div>
                                {item.value}
                            </div>
                        </div>
                        {index < data.length - 1 && <Divider className='pt-3' />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JDCult;
