import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Divider, Pagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList, loadUserReport } from "../../redux/action";
import NoDataPage from "./NoData";
import moment from "moment";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useDarkMode } from "./../../Dark";

export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(10);  // Number of reports per page
    const { isDarkMode, colorTheme } = useDarkMode();
    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode ? reduxColorTheme.dark.background : reduxColorTheme.light.background;
    const backgroundColor = isDarkMode ? reduxColorTheme.dark.selectBackground : reduxColorTheme.light.selectBackground;
    const PageBackground = isDarkMode ? reduxColorTheme.dark.foreground : reduxColorTheme.light.foreground;
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        dispatch(loadReportsList());
    }, [dispatch]);

    useEffect(() => {
        setLessonsList(userReportList);
        setIsLoading(false);
    }, [userReportList]);

    const navigate = useNavigate();

    // Pagination logic
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = lessonsList.slice(indexOfFirstReport, indexOfLastReport);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        const filteredReports = userReportList.filter(report => report.report_type.includes(event.target.value));
        setLessonsList(filteredReports);
    };

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

        if (firstWord === 'skill_interview') {
          return 'bg-pink-500'; 
        } else if (firstWord === 'company_role_interview') {
          return 'bg-purple-500'; 
        } else if (firstWord === 'jd_interview') {
            return 'bg-orange-500'; 
        } else if (firstWord === 'cultural_interview') {
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
        return lesson?.interview_type === category;
    });

    // Initialize counts
    let skillBasedCount = 0;
    let roleBasedCount = 0;
    let JDBasedCount = 0;
    let CulturalFitCount = 0;

    // Iterate over the filteredLessonsList to count skill-based and role-based reports
    lessonsList.forEach(skill => {
        if (skill?.interview_type === 'skill_interview') {
            skillBasedCount++;
        } else if (skill?.interview_type === 'company_role_interview') {
            roleBasedCount++;
        }else if (skill?.interview_type === 'jd_interview') {
            JDBasedCount++;
        }else if (skill?.interview_type === 'cultural_interview') {
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
                            <MenuItem value={"all"}>All Reports</MenuItem>
                            <MenuItem value={"skill_interview"}>Skill based</MenuItem>
                            <MenuItem value={"company_role_interview"}>Role based</MenuItem>
                            <MenuItem value={"jd_interview"}>JD based</MenuItem>
                            <MenuItem value={"cultural_interview"}>Cultural Fit</MenuItem>
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


    const ReportCards = ({ id, role, level, report_ready, report_data, result_data, skill_type, skills_list, generated, company, report_type, jdSkills, cultSkills}) => {
        const viewReport = (data) => {
            localStorage.setItem('reportData', JSON.stringify(data));
            navigate('/reportView');
            console.log("Report Data:", data);
        };

        // console.log(skill_type,"skill_type")
        return (
            <div className="transition-transform duration-300 hover:scale-105 shadow-lg bg-white" style={{borderRadius:"18px",border:"2px solid #d9dde3"}}>
                    <div className="flex flex-col h-full p-1.5" style={{borderRadius:"18px"}}>
                        <div className={`flex-grow p-3 flex flex-col gap-y-2`}style={{borderRadius:"18px"}}>
                            {report_type == "skill_interview" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(report_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">Skill based Report</h1>
                            </div>
                            {renderSkillsSection(skills_list)}
                            </> : <></>}
                            {report_type == "company_role_interview" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(report_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">Role based Report</h1>
                            </div>
                            <div className="font-medium flex flex-wrap items-center gap-2">
                                <span className="font-bold">Role:</span>
                                <span className="bg-purple-100 px-1.5 py-1 rounded-xl break-words" style={{maxWidth:"220px"}}>{role}</span>
                            </div>
                            <div className="font-medium"><span className="font-bold">Company:&nbsp;</span>{company}</div>
                            </> : <></>}
                            {report_type == "jd_interview" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(report_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">JD based Report</h1>
                            </div>
                            <div className="font-medium flex flex-wrap items-center gap-2">
                                <span className="font-bold">Role:</span>
                                <span className="bg-purple-100 px-1.5 py-1 rounded-xl break-words" style={{maxWidth:"220px"}}>{role}</span>
                            </div>
                            <div className="font-medium"><span className="font-bold">Company:&nbsp;</span>{company}</div>
                            </> : <></>}
                            {report_type == "cultural_interview" ? 
                            <>
                            <div className="flex gap-3 items-center">
                                <span className={`${getDarkBgColor(report_type)} rounded-md`} style={{width:"8px",height:"24px"}}>&nbsp;</span>
                                <h1 className="text-xl text-black font-bold">Cultural Fit Report</h1>
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
                       
        );
    };

    return (
        <>
            {/* <FormControl variant="filled" className="w-full max-w-xs mb-4">
                <InputLabel id="report-filter-label">Filter Reports</InputLabel>
                <Select labelId="report-filter-label" value={filterType} onChange={handleFilterChange} className="text-sm">
                    <MenuItem value="">All Reports</MenuItem>
                    <MenuItem value="role based report">Role Based Reports</MenuItem>
                    <MenuItem value="skill based report">Skill Based Reports</MenuItem>
                </Select>
            </FormControl> */}
            {lessonsList.length === 0 ? <NoDataPage /> : (
                <div className="w-full h-full overflow-y-auto px-1 md:px-4" style={{ backgroundColor: PageBackground }}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <CircularProgress style={{ color: "#886cc0" }} />
                        </div>
                    ) : (
                        <>
                        <AllReports />
                        <div className="p-5 gap-8 pt-5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))" }}>
                            {filteredLessonsList.map((o, index) => (
                                <ReportCards key={index} id={o.id} report_type={o.interview_type} role={o.specifications?.role} skill_type={o.report_json?.report_type} report_data={o.report_json || {}} result_data={o.result_json || {}} report_ready={o.report_json ? "true" : "false"} skills_list={o.report_json?.hard_and_soft_skill_dic} level={o.level} generated={o.updated_date} company={o.specifications?.company} jdSkills={o.specifications?.jd_skill} cultSkills={o.specifications?.cultural_skill} />
                            ))}
                        </div>
                        </>
                    )}
                    {/* <Pagination count={Math.ceil(lessonsList.length / reportsPerPage)} page={currentPage} onChange={handleChangePage} className="py-3" /> */}
                </div>
            )}
        </>
    );
}
