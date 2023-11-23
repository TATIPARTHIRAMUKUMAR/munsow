import React, { useState, useEffect, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';

const CustomDateRangePicker = ({ startDate, endDate, setEndDate, setStartDate,onDateSelect }) => {
    console.log("new Date()",startDate)
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(startDate) ,
            endDate: new Date(endDate) ,
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
                console.log("afterstartclick")
                startDateInputRef.current.focus();
            } else {
                endDateInputRef.current.focus();
            }
        }
        if (startDateInputRef?.current?.value) {
            setStartDate(startDateInputRef?.current?.value)
        }
        if (endDateInputRef?.current?.value) {
            setEndDate(endDateInputRef.current?.value)
        }
        console.log(startDateInputRef?.current?.value, endDateInputRef.current?.value)
    }, [showPicker, focusInput]);

    const formattedStartDate = format(dateRange[0].startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(dateRange[0].endDate, 'yyyy-MM-dd');

    return (
        <div className="App">
            <input
                readOnly
                ref={startDateInputRef}
                className="p-2 border rounded"
                value={formattedStartDate}
                onFocus={() => {
                    setShowPicker(true);
                    setFocusInput('startDate');
                }}
            />
            
            <input
                readOnly
                ref={endDateInputRef}
                className="p-2 border rounded"
                value={formattedEndDate}
                onFocus={() => {
                    setShowPicker(true);
                    setFocusInput('endDate');
                }}
            />
            {showPicker && (
                <DateRangePicker
                    ranges={dateRange}
                    onChange={handleSelect}
                    className="dateRangePicker"
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#3d91ff']}
                    focusedRange={[0, focusInput === 'startDate' ? 0 : 1]}
                />
            )}
        </div>
    );
};

export default CustomDateRangePicker;
