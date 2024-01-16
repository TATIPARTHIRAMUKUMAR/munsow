import React from "react";

function SkillSuggestions({ data }) {
    return (
        <div className="mt-5" id="page7">
            <div className="bg-white p-5">
                <div className="md:flex justify-between items-center">
                    <div className="md:mt-5 md:ms-4 md:mb-4">
                        <span className="md:text-3xl md:font-semibold text" style={{ fontSize: "25px" }}>
                            Skill Suggestions
                        </span>
                    </div>
                    <div className="md:mt-5 md:me-4 md:mb-4 report3-btn-container">
                        <span className="md:text-2xl md:font-normal report3-btn">Part Two</span>
                    </div>
                </div>
                {Object.entries(data).map(([skill, suggestions]) => (
                    <>
                        <div className="md:flex">
                            <div className="md:w-3/12 md:flex justify-center items-center md:mb-4 bg-[#7a5fa7]">
                                <div className="">
                                    <span className="md:text-lg font-semibold text-white">
                                        {skill}
                                    </span>
                                </div>
                            </div>
                            <div className="md:w-9/12">
                                <div className="mt-4 md:ms-4 md:mb-5">

                                    <div key={skill} className="mb-4">
                                        {/* <h3 className="text-lg font-semibold">{skill}</h3> */}
                                        <ul className="list-decimal list-inside text-lg font-medium text-purple-800 list-none">
                                            {suggestions.map((suggestion, index) => (
                                                <li className="before:content-[''] list-none" key={index}>{suggestion}</li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default SkillSuggestions;
