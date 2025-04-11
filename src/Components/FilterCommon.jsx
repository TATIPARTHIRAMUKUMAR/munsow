import React, { useState, useEffect, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange'; 
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const CustomDateRangePicker = ({ startDate, endDate, setEndDate, setStartDate, onDateSelect }) => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            key: 'selection',
        },
    ]);
    const [showPicker, setShowPicker] = useState(false);
    const [focusInput, setFocusInput] = useState('startDate');

    const startDateInputRef = useRef(null);
    const endDateInputRef = useRef(null);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
        setShowPicker(false);
        if (onDateSelect) {
            onDateSelect(ranges.selection);
        }
    };

    useEffect(() => {
        if (showPicker) {
            if (focusInput === 'startDate') {
                startDateInputRef.current.focus();
            } else {
                endDateInputRef.current.focus();
            }
        }
        if (startDateInputRef?.current?.value) {
            setStartDate(startDateInputRef?.current?.value);
        }
        if (endDateInputRef?.current?.value) {
            setEndDate(endDateInputRef.current?.value);
        }
    }, [showPicker, focusInput]);

    const formattedStartDate = format(dateRange[0].startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(dateRange[0].endDate, 'yyyy-MM-dd');

    return (
        <div className="App">
            <div className="flex items-center space-x-4">
                <TextField
                    InputProps={{
                        readOnly: true,
                        startAdornment: ( 
                            <InputAdornment position="start">
                                <DateRangeIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputRef={startDateInputRef}
                    variant="outlined"
                    value={formattedStartDate}
                    onFocus={() => {
                        setShowPicker(true);
                        setFocusInput('startDate');
                    }}
                />
                <TextField
                    InputProps={{
                        readOnly: true,
                        startAdornment: ( 
                            <InputAdornment position="start">
                                <DateRangeIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputRef={endDateInputRef}
                    variant="outlined"
                    value={formattedEndDate}
                    onFocus={() => {
                        setShowPicker(true);
                        setFocusInput('endDate');
                    }}
                />
                {showPicker && (
                    <CloseIcon
                        onClick={() => setShowPicker(false)}
                        style={{ cursor: 'pointer', fontSize: 24, color: 'gray' }}
                    />
                )}
            </div>
            {showPicker && (
                <div className='border p-5 my-2' style={{ borderRadius: '8px', padding: '5px', background: 'gray' }}>
                    <DateRangePicker
                        ranges={dateRange}
                        onChange={handleSelect}
                        className="dateRangePicker"
                        moveRangeOnFirstSelection={false}
                        rangeColors={['#3d91ff']}
                        focusedRange={[0, focusInput === 'startDate' ? 0 : 1]}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDateRangePicker;
