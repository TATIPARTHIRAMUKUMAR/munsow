import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList, loadUserReport } from "../../redux/action";
import NoDataPage from "./NoData";

export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        dispatch(loadReportsList())
    }, [])

    useEffect(() => {
        setLessonsList(userReportList);
        setIsLoading(false);  // Set isLoading to false once data is set
    }, [userReportList]);

    const navigate = useNavigate();


    const ReportCards = ({ id, role, level, report_ready, report_data, skill_type,skills_list }) => {

        const viewReport = (data) => {
            console.log("d", data)
            //    useEffect(()=>{
            dispatch(loadUserReport(data));
            navigate("/reportView")
            //   },[])
        };

        return (
            <div className="max-h-[320px] transition-transform duration-300 hover:scale-105">
                <div className="flex flex-col h-full  p-4 border border-[#886cc050] rounded-lg shadow-lg">
                    <div className="flex-grow p-2 flex flex-col gap-y-2">
                        {skill_type == "role based report" ? <div className="text-xl font-semibold">Role: {role}</div> : <div className="text-xl font-semibold">Skill based report
                            <div className="text-base text-[#886cc0]">
                                Skills : {Object.keys(skills_list?.hard_skill || {}).map((skill, index) => (
                                    <>
                                        {skill} <span className="px-2">|</span>
                                    </>
                                ))}
                                {Object.keys(skills_list?.soft_skill || {}).map((skill, index) => (
                                    <>
                                        {skill}
                                    </>
                                ))}
                            </div>
                        </div>}
                        <div className="font-medium">Level: {level}</div>
                    </div>
                    <Divider className="my-5" />
                    <div className="py-2 w-full">
                        {report_ready === "true" ? (
                            <>
                                <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] hover:text-white" endIcon={<ArrowForwardIcon />} onClick={() => { viewReport(report_data) }} style={{ color: "#886cc0" }} > View Report</Button>
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


    ReportCards.propTypes = {
        id: PropTypes.number.isRequired,
        role: PropTypes.string.isRequired,
        level: PropTypes.bool.isRequired,
        report_ready: PropTypes.bool.isRequired,
        report_data: PropTypes.bool.isRequired,
        skill_type: PropTypes.string.isRequired,
        skills_list:PropTypes.string.isRequired
    }
    return (
        <>
            {lessonsList?.length == 0 ? (<>
                <NoDataPage />
            </>) : (
                <div className="w-full h-full overflow-y-auto px-4 ">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <CircularProgress style={{ color: "#886cc0" }} />
                        </div>
                    ) : (
                        <div
                            className=" p-5 gap-8 pt-5"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                            }}
                        >
                            {lessonsList?.map((o, index) => (
                                <ReportCards id={o?.id} role={o?.specifications?.role} skill_type={o?.report_json?.report_type} report_data={o?.report_json == null ? {} : o?.report_json} report_ready={o?.report_json == null ? "false" : "true"} skills_list={o?.report_json?.hard_and_soft_skill_dic} level={o?.level} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );

}
