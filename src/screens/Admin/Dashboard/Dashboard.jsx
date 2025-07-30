import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import "./Dashboard.css";
import CardContainer from "./CardContainer";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useDispatch, useSelector } from "react-redux";
import { loadDepartmentList, loadInstitutionStats, loadBrachList, loadCourseList, getCourseList, getDepartmentList } from "../../../redux/action";
import { classNames, legendFormatter } from "../../../utils/generalUtils";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CustomDateRangePicker from "../../../Components/DateRange.jsx";
import format from 'date-fns/format';
import NewCard from "./NewCard.jsx";
import CulturalInterviews from "../../Student Dashboard/CulturalInterviews.jsx";
import JDInterviews from "../../Student Dashboard/JDInterviews.jsx";

const AdminDashboard = () => {
  window.onbeforeunload = () => {
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");
  }

  const [barChartFullScreen, setBarChartFullScreen] = useState(false);
  const [pieChartFullScreen, setPieChartFullScreen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cardLists, setCardsList] = useState([]);
  const [barPlot, setBarPlot] = useState([]);
  const [plot, setPlot] = useState([]);
  const [pie, setPie] = useState([]);

  const dispatch = useDispatch();
  const { institutionStats, institutionFilters, branchList, departmentList, courseList } = useSelector((state) => state?.data);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadInstitutionStats());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);

  useEffect(() => {
    if (institutionStats?.cards?.length) {
      setCardsList(institutionStats?.cards?.map(o => ({
        cardContent: o?.name,
        cardValue: o?.value,
        icon: <PersonIcon style={{ color: "white", fontSize: 40 }} />,
        subValues: o?.sub_values
      })));
    }

    if (institutionStats?.graphs) {
      institutionStats?.graphs?.forEach((o) => {
        switch (o?.name) {
          case "Departments wise participation":
            setBarPlot(o?.data || []);
            break;
          case "Departments wise improvement rate":
            setPlot(o?.data || []);
            break;
          case "Critical Improvement Areas":
            setPie(o?.data || []);
            break;
          default:
            break;
        }
      });
    }

    if (institutionFilters?.branch) {
      localStorage.setItem("branch", institutionFilters?.branch);
      localStorage.setItem("course", institutionFilters?.course);
      localStorage.setItem("department", institutionFilters?.department);

      setEndDate(institutionFilters?.end_date);
      setStartDate(institutionFilters?.start_date);

      dispatch(loadCourseList(`branch_id=${institutionFilters?.branch_id}`));
      dispatch(loadDepartmentList(`course_id=${institutionFilters?.course_id}`));
    }
  }, [institutionStats, institutionFilters, dispatch]);

  const handleViewMoreClick = () => setBarChartFullScreen(true);
  const handleCloseFullScreen = () => setBarChartFullScreen(false);
  const handleViewPieChartClick = () => setPieChartFullScreen(true);
  const handleClosePieChartFullScreen = () => setPieChartFullScreen(false);

  const onDateSelect = (value) => {
    const formattedStartDate = format(value.startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(value.endDate, 'yyyy-MM-dd');
    let params = {
      branch: localStorage.getItem("branch"),
      course: localStorage.getItem("course"),
      department: localStorage.getItem("department"),
      student_id: localStorage.getItem("user_id"),
      start_date: formattedStartDate,
      end_date: formattedEndDate
    };

    if (formattedStartDate && formattedEndDate) {
      dispatch(loadInstitutionStats(params));
    }
  };

  return (
    <div className="h-[100vh] p-4 pb-16 overflow-y-scroll" style={{ background: "#E7EFEE" }}>
      <div className="container">
        <div className="flex justify-start mr-10 mb-3">
          <PopUpFilter route="AdminDashboard" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate} />
          <PopUpFilter route="AdminDashboard" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate} />
        </div>

        <div className="p-7">
          <NewCard cardLists={cardLists} />
        </div>

        <div className="flex flex-col sm:flex-row justify-evenly w-[100%] gap-4 relative overflow-auto max-w-full">
          <div className="w-[100%] sm:w-[50%] relative bg-white overflow-auto max-w-full rounded-lg">
            <CulturalInterviews interviewData={institutionStats?.graphs?.[3]?.data || []} type={"admin"} />
          </div>
          <div className="w-[100%] sm:w-[50%] relative bg-white overflow-auto max-w-full rounded-lg">
            <JDInterviews interviewData={institutionStats?.graphs?.[4]?.data || []} type={"admin"} />
          </div>
        </div>

        <div className="flex flex-wrap pt-5">
          <div className="lg:w-11/12 pr-4">
            <div className={classNames("p-4 mb-4")}>
              <div className="mb-6 flex justify-between">
                <span className="text-lg font-normal">Department wise Participation</span>
                <span>
                  {barPlot.length > 5 && !barChartFullScreen && (
                    <div className="text-center font-bold cursor-pointer text-blue-500" onClick={handleViewMoreClick}>
                      View More
                    </div>
                  )}
                </span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barPlot}>
                    <CartesianGrid vertical={false} strokeDasharray="0 0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} className="text axis-data">
                      <Label className="text" value="DEPARTMENT" position="bottom" dy={10} />
                    </XAxis>
                    <YAxis axisLine={false} tickLine={false} className="text axis-data">
                      <Label className="text" value="PARTICIPATION RATE" position="middle" angle={-90} dx={-25} />
                    </YAxis>
                    <Tooltip />
                    <Legend formatter={(value, entry) => legendFormatter(value, entry, "line")} layout="horizontal" iconSize={0} wrapperStyle={{ paddingTop: "1rem" }} />
                    <Bar dataKey="Participated" stackId={"a"} fill="#6CE5E8" barSize={60} />
                    <Bar dataKey="Not yet Participated" stackId={"a"} fill="#5271FF" barSize={60} radius={[15, 15, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Temporary commented charts, not to be removed */}
          {/* <div className="lg:w-4/12 pr-4">
            <div className={classNames("p-4 mb-4")}>
              <div className="mb-6">
                <span className="text-lg font-normal">Department wise Improvement Rate</span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plot}>
                    <CartesianGrid vertical={false} horizontal={false} strokeDasharray="0 0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} className="text axis-data" dy={10} dx={10}>
                      <Label className="text" value="WEEK" position="bottom" dy={10} />
                    </XAxis>
                    <YAxis axisLine={false} tickLine={false} className="text axis-data" dx={-5}>
                      <Label className="text" value="INTERVIEW COUNT" position="middle" angle={-90} dx={-30} />
                    </YAxis>
                    <Tooltip />
                    <Legend formatter={(value, entry) => legendFormatter(value, entry, "line")} layout="horizontal" iconSize={0} wrapperStyle={{ paddingTop: "1rem" }} />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}

          {/* <div className="lg:w-4/12 pr-4">
            <div className={classNames("p-4 mb-4")}>
              <div className="mb-6">
                <span className="text-lg font-normal">Critical Improvement Areas</span>
                <span>
                  {pie.length > 5 && !pieChartFullScreen && (
                    <div className="text-center font-bold cursor-pointer text-blue-500" onClick={handleViewPieChartClick}>
                      View More
                    </div>
                  )}
                </span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      label
                    >
                      {pie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div> */}

        </div>

        <Dialog open={barChartFullScreen} onClose={handleCloseFullScreen} fullScreen>
          <DialogTitle>Department wise Participation</DialogTitle>
          <DialogContent>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barPlot}>
                <CartesianGrid vertical={false} strokeDasharray="0 0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text axis-data">
                  <Label className="text" value="DEPARTMENT" position="bottom" dy={10} />
                </XAxis>
                <YAxis axisLine={false} tickLine={false} className="text axis-data">
                  <Label className="text" value="PARTICIPATION RATE" position="middle" angle={-90} dx={-25} />
                </YAxis>
                <Tooltip />
                <Legend formatter={(value, entry) => legendFormatter(value, entry, "line")} layout="horizontal" iconSize={0} wrapperStyle={{ paddingTop: "1rem" }} />
                <Bar dataKey="Participated" stackId={"a"} fill="#6CE5E8" barSize={60} />
                <Bar dataKey="Not yet Participated" stackId={"a"} fill="#5271FF" barSize={60} radius={[15, 15, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFullScreen}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={pieChartFullScreen} onClose={handleClosePieChartFullScreen} fullScreen>
          <DialogTitle>Critical Improvement Areas</DialogTitle>
          <DialogContent>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  {pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePieChartFullScreen}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
