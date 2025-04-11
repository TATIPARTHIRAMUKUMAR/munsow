import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Divider, Pagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList, loadStatus, loadUserReport } from "../../redux/action";
import NoDataPage from "./NoData";
import moment from "moment-timezone";

import { useDarkMode } from "./../../Dark";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { stringify } from "postcss";


const styles = {
    tooltip: {
        backgroundColor: 'white',
        color: 'white',
        fontSize: '20rem',
        // padding: '10px',
        borderRadius: '4px'
    },
    heading: {
        fontWeight: 'bold',
        marginTop: '10px',
        fontSize: "20px",
        marginBottom: '5px'
    }
};
export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList, statusList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(10);  // Number of reports per page
    const { isDarkMode, colorTheme } = useDarkMode();
    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode ? reduxColorTheme.dark.background : reduxColorTheme.light.background;
    const backgroundColor = isDarkMode ? reduxColorTheme.dark.selectBackground : reduxColorTheme.light.selectBackground;
    const [filterType, setFilterType] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        dispatch(loadReportsList());
        dispatch(loadStatus());
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
        dispatch(loadReportsList({ interview_filter: selectedOption, page_number: newPage }));

    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        const filteredReports = userReportList.filter(report => report.report_type.includes(event.target.value));
        setLessonsList(filteredReports);
    };

    const selectionChange = (event) => {
        setSelectedOption(event.target.value);
        dispatch(loadReportsList({ interview_filter: event.target.value, page_number: currentPage }));
    };

    const ReportCards = ({ id, role, level, report_ready, report_data, result_data, skill_type, skills_list, generated, company, report_type, jdSkills,cultSkills }) => {
        const viewReport = (data) => {
            localStorage.setItem('reportData', JSON.stringify(data));
            navigate('/reportView');
            console.log("Report Data:", data);
        };
        const formattedDate = moment(generated).add(5, 'hours').add(30, 'minutes').format('MMMM DD, YYYY HH:mm:ss');



        // useEffect(() => {
        //     if (selectedOption) {
        //         console.log("Selected Option:", selectedOption);

        //         dispatch(loadReportsList({interview_filter: selectedOption}));
        //         // API call to send the selected option to the backend
        //         // You can use fetch or axios to send the data
        //         // Example:
        //         // fetch('your-api-url', {
        //         //   method: 'POST',
        //         //   headers: {
        //         //     'Content-Type': 'application/json',
        //         //   },
        //         //   body: JSON.stringify({ option: selectedOption }),
        //         // });
        //     }
        // }, [selectedOption]);
        const renderSkillsSection = (skills, title) => {
            if (!skills || skills.length === 0) {
                return null;
            }

            return (
                <>
                    <div style={styles.heading}>{title}</div>
                    {skills.map(skill => <div key={skill} style={{ fontSize: "13px" }}>{skill}</div>)}
                </>
            );
        };
        const renderSkills = (skillsList) => {
            const hardSkills = Object.keys(skillsList?.hard_skill || {});
            const softSkills = Object.keys(skillsList?.soft_skill || {});
            const allSkills = hardSkills.concat(softSkills);
            const skillsString = allSkills.join(' | ');

            if (skillsString.length > 20) {
                return (
                    <Tooltip title={
                        <>
                            {renderSkillsSection(hardSkills, "Hard Skills")}
                            {renderSkillsSection(softSkills, "Soft Skills")}
                        </>
                    }
                        arrow
                        // style={{background:"black"}}
                        placement="top"
                        PopperProps={{ style: styles.tooltip }}>
                        <span>
                            {skillsString.substring(0, 17)}...
                            <InfoIcon style={{ fontSize: "1rem", marginLeft: "4px" }} />
                        </span>
                    </Tooltip>
                );
            }
            return skillsString;
        };

        const jdCult = (skills, type) => {

            // const allSkills = hardSkills.concat(softSkills);
            const skillsString = skills?.join(' ');

            if (skillsString?.length > 20) {
                return (
                    <Tooltip title={
                        <>
                            {renderSkillsSection(skills, type)}
                            {/* {renderSkillsSection(softSkills, "Soft Skills")} */}
                        </>
                    }
                        arrow
                        // style={{background:"black"}}
                        placement="top"
                        PopperProps={{ style: styles.tooltip }}>
                        <span>
                            {skillsString.substring(0, 17)}...
                            <InfoIcon style={{ fontSize: "1rem", marginLeft: "4px" }} />
                        </span>
                    </Tooltip>
                );
            }
            return skillsString;
        };

        return (
            <div className="transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg">
                <div className="flex flex-col h-full p-4 bg-white">
                    <div className="flex-grow p-2 flex flex-col gap-y-2">
                        {report_type === "company_role_interview" ? (
                            <div className="text-xl font-semibold">Role Based Report</div>
                        ) : report_type === "skill_interview" ? (
                            <div className="text-xl font-semibold">Skill based report
                                <div className="text-base text-[#886cc0]">
                                    Skills : {renderSkills(skills_list)}
                                </div>
                            </div>
                        ) : report_type === "cultural_interview" ? (<div className="text-xl font-semibold">Cultural Interview Report
                            <div className="text-base text-[#886cc0]">
                                Skills : {jdCult(cultSkills, "Cultural Fit Skills")}
                            </div>
                        </div>
                        ) : (<div className="text-xl font-semibold">JD Based Report
                            <div className="text-base text-[#886cc0]">
                                Skills : {jdCult(jdSkills, "Job Descripition Skills")}
                            </div>
                        </div>)}
                        {(report_type === "cultural_interview" || report_type === "jd_interview" || report_type === "company_role_interview") && <div className="font-medium"><span className="font-bold">Role:</span> {role}</div>}
                        {(report_type === "cultural_interview" || report_type === "jd_interview" || report_type === "company_role_interview") && <div className="font-medium"><span className="font-bold">Company:</span> {company}</div>}
                        {(report_type === "company_role_interview" || report_type === "skill_interview") && <div className="font-medium"><span className="font-bold">Level:</span> {level}</div>}
                        <div className="font-medium"><span className="font-bold">Generated On:</span> {formattedDate} IST</div>
                    </div>
                    <Divider className="my-5" />
                    <div className="py-2 w-full">
                        {report_ready === "true" ? (
                            <Button className="font-bold w-full py-2 transition-colors duration-300" endIcon={<ArrowForwardIcon />} onClick={() => viewReport({ ...report_data, ...result_data })} style={{ color: textColor, background: backgroundColor, fontWeight: "600", }}>View Report</Button>
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
            <div className="p-7 flex justify-between ">
                <Pagination count={Math.ceil(lessonsList.length / reportsPerPage)} page={currentPage} onChange={handleChangePage} />

                <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={(e) => selectionChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                >
                    <option value="">All Reports</option>
                    {statusList?.map((option) => (
                        <option key={option.id} value={option.name}>
                            {option.name.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </div>
            {lessonsList.length === 0 ? <NoDataPage /> : (
                <div className="w-full h-full overflow-y-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <CircularProgress style={{ color: "#886cc0" }} />
                        </div>
                    ) : (
                        <div className="p-5 gap-8 pt-5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))" }}>
                            {currentReports.map((o, index) => (
                                <ReportCards key={index} id={o.id} report_type={o.interview_type} role={o.specifications?.role} skill_type={o.report_json?.report_type} report_data={o.report_json || {}} result_data={o.result_json || {}} report_ready={o.report_json ? "true" : "false"} skills_list={o.report_json?.hard_and_soft_skill_dic} level={o.level} generated={o.updated_date} company={o.specifications?.company} jdSkills={o.specifications?.jd_skill} cultSkills={o.specifications?.cultural_skill}/>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
