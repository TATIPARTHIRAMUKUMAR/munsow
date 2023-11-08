import React, { useEffect } from "react";
import image from "../../assets/testPng.png"
import image2 from "../../assets/dashboard_std.png"
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { loadUserStats } from "../../redux/action";
import { useDispatch } from "react-redux";


export default function StudentDashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadUserStats());
    },[])

    return (<div>
        <div className="grid grid-cols-2 gap-7 px-6 py-6" style={{ "grid-template-columns": "64% 34%" }} >
            <div className="col-span-1 ">
                <div style={{background:"linear-gradient(180.43deg, #886CC0 19.43%, #c3b5df 87.63%)" }} className=" p-10 flex justify-between rounded-lg">
                    <div className="text-white">
                        <div className="text-3xl font-bold color-">Hello {GLOBAL_CONSTANTS?.user_cred?.first_name} {GLOBAL_CONSTANTS?.user_cred?.last_name} !!!</div>
                        {/* <p className="text-3xl font-bold pt-1">Apritha!!!</p> */}
                        <p className="text-lg py-3">Are you ready for your next interview?</p>
                        <div className="flex space-x-4 pt-5">
                            <button className="bg-white hover:bg-gray-100 text-[#886CC0] font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow" onClick={()=>{navigate("/practice")}}>
                                Practice Now
                            </button>
                            <button className=" text-white font-semibold py-2 px-4 border rounded-lg shadow" onClick={()=>{navigate("/report")}}>
                                View My Interview Reports
                            </button>
                        </div>
                    </div>
                    <div>
                        <img className="h-40 w-40 bg-transparent" src={image2} />
                    </div>

                </div>
            </div>
            <div className="col-span-1" >
                <div>
                    <SecondRow />
                </div>
            </div>
            <div className="col-span-1">
                <div className="bg-white rounded-lg">
                    <BarChartLines />
                </div>
            </div>
            <div className="col-span-1">
                {/* <p className="text-gray-500 text-md pb-2">Hard Skill vs Soft Skill Trend</p> */}
                <div className="bg-white  rounded-lg">
                    <Carousel />
                </div>
            </div>
        </div>
    </div>);
}
