import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList } from "../../redux/action";

export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);


    useEffect(() => {
        dispatch(loadReportsList())
    }, [])

    useEffect(() => {
        setLessonsList(userReportList);
    }, [userReportList])

    const navigate = useNavigate();


    const ReportCards = ({ id, role,level,report_ready }) => {
        return (
            <div className="max-h-[320px]">
                <div className="flex flex-col h-full bg-[#886cc010] min-h-[150px] rounded-lg overflow-hidden outline outline-[#886cc050]">
                    <div className="grid gap-4" >
                        <div className="p-2 flex flex-col gap-y-2 ">
                            <div className=" text-xl">Role : {role}</div>
                            <div className="font-semibold ">
                                Level : {level}
                            </div>
                        </div>
                    </div>
                    <div>

                        <Divider className="py-5" />
                        <div className="py-2 item-self-end w-full">
                            {report_ready=="true"?<>
                                <Button className="font-bold w-full  py-2" endIcon={<ArrowForwardIcon />} onClick={() => { navigate(`/reportView`) }} style={{ color: "#886cc0" }} > View Report </Button>
                            </>:<>
                            <p className=" flex items-center justify-center">Your report is being generated</p>
                            </>}
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    ReportCards.propTypes = {
        id: PropTypes.number.isRequired,
        role: PropTypes.string.isRequired,
        level: PropTypes.bool.isRequired,
        report_ready:PropTypes.bool.isRequired
    }
    return (
        <div className="w-full h-full overflow-y-auto px-4 ">
            <div
                className=" p-5 gap-8 pt-5"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                }}
            >
                {lessonsList?.map((o, index) => (
                    <ReportCards id={o?.id} role={o?.specifications?.role} report_ready={o?.report_json==null?"false":"true"} level={o?.level} key={index} />
                ))}
            </div>
        </div>
    );
}
