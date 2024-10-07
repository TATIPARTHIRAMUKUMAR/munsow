import React, { useState } from 'react';
import { TextField, Button, IconButton, Paper, InputAdornment, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { createLink, loadLinks } from '../../../redux/action';
import { useDispatch } from 'react-redux';

const CreateLink = () => {
    const dispatch = useDispatch();
    // const navigate=useNavigate();
    const [linkData, setLinkData] = useState({
        name: '',
        max_capacity: '',
        description: '',
        activation_date: '',
        expiry_date: '',
        entity_type: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLinkData({
            ...linkData,
            [name]: name === 'max_capacity' ? parseInt(value, 10) || '' : value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createLink(linkData, () => {
            dispatch(loadLinks());
            navigate(-1)
        }))
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Paper elevation={4} className="w-full max-w-2xl mx-4 p-8 rounded-3xl  ">
                <div className="flex items-center justify-between mb-8">
                    <IconButton onClick={() => navigate(-1)} style={{ color: '#2BE2D0' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h2 className="text-3xl font-bold text-gray-800">Generate New Link</h2>
                    <div></div> 
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        label="Name"
                        fullWidth
                        variant="outlined"
                        name="name"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TextFieldsIcon style={{ color: '#2BE2D0' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Max Capacity"
                        fullWidth
                        variant="outlined"
                        name="max_capacity"
                        type="number"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PeopleIcon style={{ color: '#2BE2D0' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        variant="outlined"
                        name="description"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon style={{ color: '#2BE2D0' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Activation Date"
                            fullWidth
                            variant="outlined"
                            name="activation_date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarTodayIcon style={{ color: '#2BE2D0' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Expiry Date"
                            fullWidth
                            variant="outlined"
                            name="expiry_date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarTodayIcon style={{ color: '#2BE2D0' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <FormControl component="fieldset" className="mb-4">
                            <FormLabel component="legend" className="text-lg font-bold text-gray-700">Select Entity Type</FormLabel>
                            <RadioGroup
                                
                                name="entity_type"                
                                onChange={handleChange}
                                className="mt-2 flex flex-col"
                            >
                                <FormControlLabel value="institution" control={<Radio style={{ color: '#2BE2D0' }} />} label="I am Institution" />
                                <FormControlLabel value="corporate" control={<Radio style={{ color: '#2BE2D0' }} />} label="I am Corporate/Others" />
                            </RadioGroup>
                        </FormControl>              
                    </div>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: '#2BE2D0', color: 'white' }}
                        className="py-3 mt-4"
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default CreateLink;
