import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadLessonList } from "../../redux/action";
import { Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// import Lesson from "../../assets/lesson.jpeg";
// import { Image } from "@chakra-ui/image";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList } from "../../redux/action";

export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);


    // let lessonsList = [
        // {
        //     id: "1",
        //     title: "interview Report1",
        // },
        // {
        //     id: "2",
        //     title: "interview Report2",
        // },
        // {
        //     id: "3",
        //     title: "interview Report3",
        // }
    // ];


    useEffect(() => {
        dispatch(loadReportsList())
    }, [])

    useEffect(() => {
        console.log("userReportList",userReportList)
        setLessonsList(userReportList);
    }, [userReportList])

    const navigate = useNavigate();
    //   const dispatch = useDispatch();
    //   useEffect(() => {
    //     dispatch(loadLessonList());
    //   }, [dispatch]);

   

    const ReportCards = ({ id, role,level }) => {
        return (
            <div className="max-h-[320px]">
                {/* {access ? ( */}
                <div className="shadow-lg flex flex-col h-full bg-[#886cc010] min-h-[150px] rounded-lg overflow-hidden outline outline-[#886cc060]">
                    <div className="grid gap-4" >
                        {/* <Image src={Lesson} alt="Title" className="w-full h-[120px]" /> */}
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
                            <Button className="font-bold w-full  py-2" endIcon={<ArrowForwardIcon />} onClick={() => { navigate(`/reportView`) }} style={{ color: "#886cc0" }} > View Report </Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    ReportCards.propTypes = {
        id: PropTypes.number.isRequired,
        role: PropTypes.string.isRequired,
        level: PropTypes.bool.isRequired
    }
    return (
        <div className="w-full h-full overflow-y-auto px-4 ">
            <div className="text-3xl font-bold text-[#886cc0] pt-10">
                My Reports
            </div>
            <Divider style={{ margin: "10px 0px", padding: "10px" }} />
            <div
                className=" p-5 gap-10 pt-5"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                }}
            >
                {lessonsList?.map((o, index) => (
                    <ReportCards id={o?.id} role={o?.specifications?.role} level={o?.level} key={index} />
                ))}
            </div>
        </div>
    );
}
