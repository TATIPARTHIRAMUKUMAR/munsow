import { Divider } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Summary = () => {
    // navigation
    const navigate = useNavigate();

    const buttonStyle = 'bg-[#886CC0] text-white rounded-md py-2 px-4 hover:bg-[#886CA0] focus:outline-none '

    return (
        <div className="body flex-grow-1">
            <div className="container-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-3">
                    <div className="bg-white border rounded-lg p-4 m-4">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold">
                                <span className="font-bold">Students</span>
                            </div>
                            <div>
                                <Link to="/studentList" className={buttonStyle}>
                                    View All
                                </Link>
                            </div>
                        </div>
                        <Divider sx={{ padding: "10px" }} />
                        <div className="pb-0 mt-4">
                            <div className="flex justify-between items-start">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Students</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">360</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mt-2">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Departments</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">4</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mt-2">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Branches</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">3</span>
                                </div>
                            </div>
                            <Divider sx={{ padding: "10px" }} />
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className={buttonStyle}
                                    onClick={() => navigate("/addStudent")}
                                >
                                    Add Students
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4 m-4">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold">
                                <span className="font-bold">Teachers</span>
                            </div>
                            <div>
                                <Link to="/teachersList" className={buttonStyle}>
                                    View All
                                </Link>
                            </div>
                        </div>
                        <Divider sx={{ padding: "10px" }} />
                        <div className="pb-0 mt-4">
                            <div className="flex justify-between items-start">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Teachers</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">3</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mt-2">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Departments</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">4</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mt-2">
                                <div className="text-lg font-normal">
                                    <span className="font-normal">Number of Branches</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    <span className="font-normal">3</span>
                                </div>
                            </div>
                            <Divider sx={{ padding: "10px" }} />
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className={buttonStyle}
                                    onClick={() => navigate("/addTeacher")}
                                >
                                    Add Teachers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
