import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate, useNavigation } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList, loadUserReport } from "../../redux/action";
import NoDataPage from "./NoData";
import { prototype } from "postcss/lib/previous-map";
import moment from "moment";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useDarkMode } from "./../../Dark";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//       backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//       borderRadius: 5,
//       backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//     },
//   }));


export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode, colorTheme } = useDarkMode();

    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode
        ? reduxColorTheme.dark.background
        : reduxColorTheme.light.background;
    const backgroundColor = isDarkMode
        ? reduxColorTheme.dark.selectBackground
        : reduxColorTheme.light.selectBackground;
    const PageBackground = isDarkMode
        ? reduxColorTheme.dark.foreground
        : reduxColorTheme.light.foreground;

    useEffect(() => {
        dispatch(loadReportsList())
    }, [])

    useEffect(() => {
        setLessonsList(userReportList);
        setIsLoading(false);  // Set isLoading to false once data is set
    }, [userReportList]);

    const navigate = useNavigate();

    // navigation.navigate('reportView', {
    //     report_data: loadReportsList,      
    //   });

    const renderSkillCapsules = (skillList) => {
        if (skillList.length === 0) {
            return "None";
        } else {
            return skillList.map((skill, index) => (
                <span key={index} className="bg-pink-100 px-1.5 py-1 rounded-xl break-words" style={{maxWidth:"220px"}}>{skill}</span>
            ));
        }
    };
    
    const renderSkillsSection = (skills) => {
        const hardSkills = Object.keys(skills?.hard_skill || {});
        const softSkills = Object.keys(skills?.soft_skill || {});
    
        return (
            <>
                <div className="font-medium flex flex-wrap items-center gap-2">
                    <span className="font-bold">Hard Skills:</span>
                    {renderSkillCapsules(hardSkills)}
                </div>
                <div className="font-medium flex flex-wrap items-center gap-2">
                    <span className="font-bold">Soft Skills:</span>
                    {renderSkillCapsules(softSkills)}
                </div>
            </>
        );
    };
    
       

    const getDarkBgColor = (head) => {
        const firstWord = head.split(' ')[0];
      
        if (firstWord === 'skill') {
          return 'bg-pink-500'; 
        } else if (firstWord === 'role') {
          return 'bg-purple-500'; 
        } else if (firstWord === 'JD') {
            return 'bg-orange-500'; 
        } else if (firstWord === 'cultural') {
            return 'bg-blue-500'; 
        } else {
          return 'bg-lime-500'; 
        }
    };
    const getLightBgColor = (head) => {
        const firstWord = head.split(' ')[0];
      
        if (firstWord === 'skill') {
          return 'bg-pink-100'; 
        } else if (firstWord === 'role') {
          return 'bg-purple-100'; 
        } else if (firstWord === 'JD') {
            return 'bg-orange-100'; 
        } else if (firstWord === 'cultural') {
            return 'bg-blue-100'; 
        } else {
          return 'bg-lime-100'; 
        }
    };

    const [category, setCategory] = useState('all');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
      
    // console.log(category,"category of report");

    // Filtered lessons based on the selected category
    const filteredLessonsList = lessonsList.filter((lesson) => {
        // If the category is "all", return true for all lessons
        if (category === "all") return true;
        
        // Otherwise, return true only for lessons with matching skill_type
        return lesson?.report_json?.report_type === category;
    });

    // Initialize counts
    let skillBasedCount = 0;
    let roleBasedCount = 0;
    let JDBasedCount = 0;
    let CulturalFitCount = 0;

    // Iterate over the filteredLessonsList to count skill-based and role-based reports
    lessonsList.forEach(skill => {
        if (skill?.report_json?.report_type === 'skill based report') {
            skillBasedCount++;
        } else if (skill?.report_json?.report_type === 'role based report') {
            roleBasedCount++;
        }else if (skill?.report_json?.report_type === 'JD based report') {
            JDBasedCount++;
        }else if (skill?.report_json?.report_type === 'Cultural fit report') {
            CulturalFitCount++;
        }
    });

    const AllReports = () => {
        return(
            <div className="shadow-lg m-5 bg-white p-3" style={{borderRadius:"18px"}}>
                <div className="p-3 mb-1 flex justify-between flex-col gap-3 md:flex-row">
                    <div>
                        <h1 className="text-black uppercase">Total Interview Reports</h1>
                        <h1 className="font-bold text-4xl text-zinc-500">{lessonsList?.length}</h1>
                    </div>
                    <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Filter</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label="filter"
                            onChange={handleChange}
                            >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"skill based report"}>Skill based</MenuItem>
                            <MenuItem value={"role based report"}>Role based</MenuItem>
                            <MenuItem value={"JD based report"}>JD based</MenuItem>
                            <MenuItem value={"cultural fit report"}>Cultural Fit</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>
                {/* <div className="">
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <BorderLinearProgress variant="determinate" value={30} style={{width:"50%"}}/>
                    <BorderLinearProgress variant="determinate" value={60} style={{width:"50%"}}/>
                </Stack>
                </div> */}
                <div className="p-3 mb-2">
                    <div className="bg-zinc-200 flex" style={{height:"12px",width:"100%"}}>
                        <div className="bg-pink-500" style={{height:"12px",width:`${skillBasedCount/lessonsList?.length*100}%`}}>

                        </div>
                        <div className="bg-purple-500" style={{height:"12px",width:`${roleBasedCount/lessonsList?.length*100}%`}}>

                        </div>
                        <div className="bg-orange-500" style={{height:"12px",width:`${JDBasedCount/lessonsList?.length*100}%`}}>

                        </div>
                        <div className="bg-blue-500" style={{height:"12px",width:`${CulturalFitCount/lessonsList?.length*100}%`}}>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 divide-x-0 md:grid-cols-4 md:divide-x">
                    <div className="p-3 text-center">
                        <div className="flex items-center gap-2 text-center justify-center">
                            {/* <span className="bg-pink-500 rounded-full" style={{width:"10px",height:"10px"}}>&nbsp;</span> */}
                            <h1 className="font-bold text-4xl text-pink-500">{skillBasedCount}</h1>
                            <p className="text-zinc-500">Skill based Reports</p>
                        </div>  
                    </div>
                    <div className="p-3 text-center">                 
                        <div className="flex items-center gap-2 text-center justify-center">
                            <h1 className="font-bold text-4xl text-purple-500">{roleBasedCount}</h1>
                            <p className="text-zinc-500">Role based Reports</p>
                        </div>                    
                    </div>
                    <div className="p-3 text-center">               
                        <div className="flex items-center gap-2 text-center justify-center">
                            <h1 className="font-bold text-4xl text-orange-500">{JDBasedCount}</h1>
                            <p className="text-zinc-500">JD based Reports</p>
                        </div>                       
                    </div>
                    <div className="p-3 text-center">
                        <div className="flex items-center gap-2 text-center justify-center">
                            <h1 className="font-bold text-4xl text-blue-500">{CulturalFitCount}</h1>
                            <p className="text-zinc-500">Cultural Fit Reports</p>
                        </div>                      
                    </div>
                </div>

            </div>
        );
    };

    

    const ReportCards = ({ id, role, level, report_ready, report_data, result_data, skill_type, skills_list, generated, company }) => {

        const viewReport = (data) => {
            
            // useEffect(()=>{
            // dispatch(loadUserReport(data));
            // navigate("/reportView")
            // },[])


            localStorage.setItem('reportData', JSON.stringify(data));
    
            navigate('/reportView');
            console.log("ee", data);
        };
        // console.log(skills_list,"skills-list")
        console.log(skill_type,"skill_type")
        return (
            <div className="transition-transform duration-300 hover:scale-105 shadow-lg bg-white" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
                    <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
                        <div className={`flex-grow p-3 flex flex-col gap-y-2`}style={{borderRadius:"18px"}}>
                            {skill_type == "skill based report" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(skill_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">Skill based Report</h1>
                            </div>
                            {renderSkillsSection(skills_list)}
                            </> : <></>}
                            {skill_type == "role based report" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(skill_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">Role based Report</h1>
                            </div>
                            <div className="font-medium flex flex-wrap items-center gap-2">
                                <span className="font-bold">Role:</span>
                                <span className="bg-purple-100 px-1.5 py-1 rounded-xl break-words" style={{maxWidth:"220px"}}>{role}</span>
                            </div>
                            <div className="font-medium"><span className="font-bold">Company:&nbsp;</span>{company}</div>
                            </> : <></>}
                            <div className="font-medium"><span className="font-bold">Level:&nbsp;</span>{level}</div>
                            <div className="font-medium"><span className="font-bold">Date:&nbsp;</span>{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>

                        </div>
                        
                        <div className="p-3 w-full text-right">
                            {report_ready === "true" ? (
                                <>
                                    <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
                                </>
                            ) : (
                                <div className="flex items-center justify-center text-orange-300">
                                    <HttpsOutlinedIcon className="mr-2 animate-spin" />
                                    Your report is being generated
                                </div>

                            )}
                        </div>
                    </div>
            </div>
            // <>       
            // <div className="transition-transform duration-300 hover:scale-105 shadow-lg border-current bg-white" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
            //         <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
            //             <div className="flex-grow p-3 flex flex-col gap-y-2" style={{borderRadius:"18px"}}>
            //                 <div className="flex gap-3 items-center">
            //                 <span className="bg-pink-500 rounded-md" style={{width:"8px",height:"24px"}}>&nbsp;</span>
            //                 <h1 className="text-xl text-black font-bold">Skill based Report</h1>
            //                 </div>
                            
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Hard Skills:</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">C++</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">C programming</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">React</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">Python programming</span>
            //                 </div>
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Soft Skills:</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">Teamwork</span>
            //                 </div>
            //                 <div className="font-medium"><span className="font-bold">Level:&nbsp;</span>Beginner</div>
            //                 {/* <span className="font-medium" style={{fontSize:"12px"}}><span className="font-bold bg-pink-200 rounded-lg"></span> <span className="bg-pink-200">{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</span></span> */}
            //                 <div className="font-medium"><span className="font-bold">Date:&nbsp;</span>{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>
            //             </div>
            //             {/* <Divider className="my-5" /> */}
            //             <div className="p-3 w-full text-right">
            //             <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
            //             {/* <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div> */}
            //                 {/* {report_ready === "true" ? (
            //                     <>
            //                         <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIcon />} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
            //                     </>
            //                 ) : (
            //                     <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div>

            //                 )} */}
            //             </div>
            //         </div>
            // </div>
            // <div className="transition-transform duration-300 hover:scale-105 shadow-lg border-current bg-white" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
            //         <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
            //             <div className="flex-grow p-3 flex flex-col gap-y-2" style={{borderRadius:"18px"}}>
            //                 <div className="flex gap-3 items-center">
            //                     <span className="bg-pink-500 rounded-md" style={{width:"8px",height:"24px"}}>&nbsp;</span>
            //                     <h1 className="text-xl text-black font-bold">Skill based Report</h1>
            //                 </div>
                            
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Hard Skills:</span>       
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">C programming</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">React</span>
            //                     <span className="bg-pink-100 px-1.5 py-1 rounded-xl">Python programming</span>
            //                 </div>
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Soft Skills:</span>
            //                     <span className="">None</span>
            //                 </div>
            //                 <div className="font-medium"><span className="font-bold">Level:&nbsp;</span>Beginner</div>
            //                 {/* <span className="font-medium" style={{fontSize:"12px"}}><span className="font-bold bg-pink-200 rounded-lg"></span> <span className="bg-pink-200">{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</span></span> */}
            //                 <div className="font-medium"><span className="font-bold">Date:&nbsp;</span>{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>
            //             </div>
            //             {/* <Divider className="my-5" /> */}
            //             <div className="p-3 w-full text-right">
            //             <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
            //             {/* <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div> */}
            //                 {/* {report_ready === "true" ? (
            //                     <>
            //                         <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIcon />} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
            //                     </>
            //                 ) : (
            //                     <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div>

            //                 )} */}
            //             </div>
            //         </div>
            // </div>   
            // <div className="transition-transform duration-300 hover:scale-105 shadow-lg bg-white border-current" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
            //         <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
            //             <div className="flex-grow p-3 flex flex-col gap-y-2" style={{borderRadius:"18px"}}>
            //                 <div className="flex gap-3 items-center">
            //                     <span className="bg-purple-500 rounded-md" style={{width:"8px",height:"24px"}}>&nbsp;</span>
            //                     <h1 className="text-xl text-black font-bold">Role based Report</h1>
            //                 </div>
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Role:</span>
            //                     <span className="bg-purple-100 px-1.5 py-1 rounded-xl">Manager</span>
            //                 </div>
            //                 <div className="font-medium"><span className="font-bold">Company:&nbsp;</span>Google</div>
            //                 <div className="font-medium"><span className="font-bold">Level:&nbsp;</span>Beginner</div>
            //                 <div className="font-medium"><span className="font-bold">Date:&nbsp;</span>{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>

            //             </div>
            //             {/* <Divider className="my-5" /> */}
            //             <div className="p-3 w-full text-right">
            //             <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
            //                 {/* {report_ready === "true" ? (
            //                     <>
            //                         <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIcon />} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
            //                     </>
            //                 ) : (
            //                     <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div>

            //                 )} */}
            //             </div>
            //         </div>
            // </div>
            // <div className="transition-transform duration-300 hover:scale-105 shadow-lg bg-white border-current" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
            //         <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
            //             <div className="flex-grow p-3 flex flex-col gap-y-2" style={{borderRadius:"18px"}}>
            //                 <div className="flex gap-3 items-center">
            //                     <span className="bg-orange-500 rounded-md" style={{width:"8px",height:"24px"}}>&nbsp;</span>
            //                     <h1 className="text-xl text-black font-bold">JD based Report</h1>
            //                 </div>
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Role:</span>
            //                     <span className="bg-orange-100 px-1.5 py-1 rounded-xl">HR Executive</span>
            //                 </div>
            //                 <div className="font-medium"><span className="font-bold">Company:&nbsp;</span>Microsoft</div>
            //                 <div className="font-medium"><span className="font-bold">Level:&nbsp;</span>Intermediate</div>
            //                 <div className="font-medium"><span className="font-bold">Date:&nbsp;</span>{moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>

            //             </div>
            //             {/* <Divider className="my-5" /> */}
            //             <div className="p-3 w-full text-right">
            //             <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
            //                 {/* {report_ready === "true" ? (
            //                     <>
            //                         <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIcon />} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
            //                     </>
            //                 ) : (
            //                     <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div>

            //                 )} */}
            //             </div>
            //         </div>
            // </div>
            // <div className="transition-transform duration-300 hover:scale-105 shadow-lg bg-white border-current" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
            //         <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
            //             <div className="flex-grow p-3 flex flex-col gap-y-2" style={{borderRadius:"18px"}}>
            //                 <div className="flex gap-3 items-center">
            //                     <span className="bg-blue-500 rounded-md" style={{width:"8px",height:"24px"}}>&nbsp;</span>
            //                     <h1 className="text-xl text-black font-bold">Cultural Fit Report</h1>
            //                 </div>
            //                 <div className="font-medium flex flex-wrap items-center gap-2">
            //                     <span className="font-bold">Role:</span>
            //                     <span className="bg-blue-100 px-1.5 py-1 rounded-xl">Senior Manager</span>
            //                 </div>
            //                 <div className="font-medium"><span className="font-bold">Company:&nbsp;</span> Deloitte</div>
            //                 <div className="font-medium"><span className="font-bold">Level:&nbsp;</span> Beginner</div>
            //                 <div className="font-medium"><span className="font-bold">Date:&nbsp;</span> {moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>

            //             </div>
            //             {/* <Divider className="my-5" /> */}
            //             <div className="p-3 w-full text-right">
            //             <Button className="font-bold py-3 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIosIcon style={{marginLeft:"0px"}}/>} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", borderRadius:"18px" }}>View Report</Button>
            //                 {/* {report_ready === "true" ? (
            //                     <>
            //                         <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] " endIcon={<ArrowForwardIcon />} onClick={() => { viewReport({ ...report_data, ...result_data }); } } style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
            //                     </>
            //                 ) : (
            //                     <div className="flex items-center justify-center text-orange-300">
            //                         <HttpsOutlinedIcon className="mr-2 animate-spin" />
            //                         Your report is being generated
            //                     </div>

            //                 )} */}
            //             </div>
            //         </div>
            // </div>
            // </>        
            
        );
    };


    ReportCards.propTypes = {
        id: PropTypes.number.isRequired,
        role: PropTypes.string.isRequired,
        level: PropTypes.bool.isRequired,
        report_ready: PropTypes.bool.isRequired,
        report_data: PropTypes.bool.isRequired,
        skill_type: PropTypes.string.isRequired,
        skills_list: PropTypes.string.isRequired,
        generated: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,

    }
    return (
        <>
            {lessonsList?.length == 0 ? (<>
                <NoDataPage />
            </>) : (
                <div className="w-full h-full overflow-y-auto px-1 md:px-4" style={{ backgroundColor: PageBackground }}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <CircularProgress style={{ color: "#886cc0" }} />
                        </div>
                    ) : (
                        <>
                        <AllReports />
                        <div
                            className=" p-5 gap-8 pt-5"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                            }}
                            >
                                {/* <ReportCards/> */}
                            {filteredLessonsList.map((o, index) => (
                                <ReportCards id={o?.id} role={o?.specifications?.role} skill_type={o?.report_json?.report_type} report_data={o?.report_json == null ? {} : o?.report_json} result_data={o?.result_json == null ? {} : o?.result_json} report_ready={o?.report_json == null ? "false" : "true"} skills_list={o?.report_json?.hard_and_soft_skill_dic} level={o?.level} generated={o?.updated_date} key={index} company={o?.report_json?.interview_company} />
                            ))}
                        </div>
                        </>
                    )}
                </div>
            )}
        </>
    );

}