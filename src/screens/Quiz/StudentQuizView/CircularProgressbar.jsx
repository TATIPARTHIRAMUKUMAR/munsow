import React from 'react';
import { CircularProgress, Box, Typography, useTheme } from '@mui/material';

const getColor = (percentage, theme) => {
    if (percentage <= 30) return "#d63333";
    if (percentage <= 75) return theme.palette.warning.main;
    return "#24d653";
};

const getLighterColor = (percentage, theme) => {
    if (percentage <= 30) return "#f0b9b9";
    if (percentage <= 75) return "#f0ccb9";
    return "#9df2b4";
};

const CircularProgressbar = ({ value }) => {
    const theme = useTheme();
    const color = getColor(value, theme);
    const lighterColor = getLighterColor(value, theme);

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                value={100}
                thickness={4}
                style={{ color: lighterColor }}
            />
            <CircularProgress
                variant="determinate"
                value={value}
                thickness={4}
                style={{ color, position: 'absolute', left: 0 }}
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
                <Typography variant="caption" component="div" color="textSecondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularProgressbar;
