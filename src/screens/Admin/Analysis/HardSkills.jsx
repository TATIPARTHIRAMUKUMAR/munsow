import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList, getDepartmentList, loadKSAnalysis, loadBrachList } from "../../../redux/action";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";

const transformData = (data) => {
  const departments = [...new Set(data?.flatMap(skill => skill.data.map(entry => entry.x)))];
  const skills = data?.map(skill => skill.id);

  const departmentDataMap = departments.reduce((acc, department) => {
    acc[department] = data.reduce((deptAcc, skill) => {
      const value = skill.data.find(item => item.x === department)?.y;
      deptAcc[skill.id] = value;
      return deptAcc;
    }, {});
    return acc;
  }, {});

  return { departments, skills, departmentDataMap };
};

const getColorCode = (value) => {
  if (value > 75) return "bg-green-300";
  if (value > 50) return "bg-yellow-300";
  if (value > 25) return "bg-orange-300";
  return "bg-red-300";
};

const renderTable = (data, title) => {
  const { departments, skills, departmentDataMap } = transformData(data);

  return (
    <div className="">
      <span className="text-2xl font-normal text-gray-900">{title}</span>
      <TableContainer component={Paper} sx={{ maxHeight: 750 }} className="mt-5 max-w-full overflow-x-auto">
        <Table className="min-w-full" stickyHeader aria-label="sticky table">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="sticky left-0 bg-gray-200">Department</TableCell>
              {skills?.map(skill => (
                <TableCell key={skill} className="border-r">{skill}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {departments?.map(department => (
              <TableRow key={department}>
                <TableCell className="sticky left-0 bg-white">{department}</TableCell>
                {data.map(skill => {
                  const value = skill?.data?.find(item => item.x === department)?.y || '-';
                  const colorClass = typeof value === "number" ? getColorCode(value) : "bg-white";
                  return (
                    <TableCell key={skill} className={`border-r ${colorClass}`}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const HardSkills = () => {
  const [hardSkillData, setHardSkillsData] = useState([]);
  const [softSkillData, setSoftSkillsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  const { ksAnalysis, ksFilters, courseList, branchList } = useSelector((state) => state?.data);

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadKSAnalysis());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);

  useEffect(() => {
    setHardSkillsData(ksAnalysis?.graph_1?.data);
    setSoftSkillsData(ksAnalysis?.graph_2?.date);
    if (ksFilters) {
      setEndDate(ksFilters?.end_date || "");
      setStartDate(ksFilters?.start_date || "");
    }
  }, [ksAnalysis, ksFilters]);

  return (
    <div className="flex-grow p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white mb-3 p-5 rounded-xl">
              <div className="bg-white mb-3 flex justify-between">
                <div>
                  <div className="flex justify-end mr-10 mb-3">
                    <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate} />
                    <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate} />
                  </div>
                </div>
              </div>
              {renderTable(hardSkillData, "Hard Skills")}
              {/* {renderTable(softSkillData, "Soft Skills")} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardSkills;
