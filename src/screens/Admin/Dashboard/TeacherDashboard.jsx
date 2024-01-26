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
  LabelList,
} from "recharts";

import "./Dashboard.css";
import CardContainer from "./CardContainer";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useDispatch, useSelector } from "react-redux";
import { loadDepartmentList, loadBrachList, loadCourseList, getCourseList, getDepartmentList, loadTeacherStats } from "../../../redux/action";
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

const TeacherDashboard = () => {
  window.onbeforeunload = () => {
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }

  const [barChartFullScreen, setBarChartFullScreen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // ... other code

  const handleViewMoreClick = () => {
    setBarChartFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setBarChartFullScreen(false);
  };

  const [pieChartFullScreen, setPieChartFullScreen] = useState(false);

  const handleViewPieChartClick = () => {
    setPieChartFullScreen(true);
  };

  const handleClosePieChartFullScreen = () => {
    setPieChartFullScreen(false);
  };

  const [cardLists, setCardsList] = useState([
    {
      cardContent: "Number of students enrolled",
      cardValue: 0,
      icon: <PersonIcon style={{ color: "white", fontSize: 40 }} />,
    },
    {
      cardContent: "Interview Conducted",
      cardValue: 0,
      icon: <GroupsIcon style={{ color: "white", fontSize: 40 }} />,
    },
    {
      cardContent: "Improvement areas Identified",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
    },
    {
      cardContent: "Average Interview Score",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
    },
    {
      cardContent: "Skill Gap rate",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
    },
  ]);

  const [barPlot, setbarPlot] = useState([]);
  const [plot, setplot] = useState([]);
  const [pie, setPie] = useState([]);

  const dispatch = useDispatch();
  const { teacherStats, institutionFilters, branchList, departmentList, courseList } = useSelector((state) => state?.data)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    // dispatch(loadteacherStats());
    dispatch(loadTeacherStats());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch])

  useEffect(() => {
    console.log(teacherStats, "teacherStats")
    if (teacherStats?.cards?.length) {
      setCardsList(() => teacherStats?.cards?.map(o => ({
        cardContent: o?.name,
        cardValue: o?.value,
        icon: <PersonIcon style={{ color: "white", fontSize: 40 }} />,
        subValues: o?.sub_values
      })))
    }
    if (teacherStats?.graphs) {

      teacherStats?.graphs?.map((o) => {
        switch (o?.name) {
          case "Departments wise participation": {
            setbarPlot(() => o?.data)
            break
          }
          case "Departments wise improvement rate": {
            setplot(() => o?.data)
            break
          }
          case "Critical Improvement Areas": {
            setPie(() => o?.data)
            break
          }

          default: break
        }

      })

    }

    if (institutionFilters?.branch != undefined && institutionFilters?.branch != null) {
      localStorage.setItem("branch", institutionFilters?.branch);
      localStorage.setItem("course", institutionFilters?.course);
      localStorage.setItem("department", institutionFilters?.department);

      setEndDate(institutionFilters?.end_date)
      setStartDate(institutionFilters?.start_date)

      dispatch(loadCourseList(`branch_id=${institutionFilters?.branch_id}`));
      dispatch(loadDepartmentList(`course_id=${institutionFilters?.course_id}`));
      // dispatch(loadUsersList(`department_id=${institutionFilters?.department_id}`));


    }

  }, [teacherStats])

  const onDateSelect = (value) => {
    console.log("api calls", value)
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
    if (startDate && endDate) {


      // route == "AdminDashboard" ? dispatch(loadteacherStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
      dispatch(loadteacherStats(params))
      // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
    }
  }

  return (
    <div className=" h-[100vh] p-4 pb-16 overflow-y-scroll ">
      <div className="container ">
        {/* Card section */}
        <div className="">
          <div className="flex justify-start mr-10 mb-3">
            <div className="">
              <PopUpFilter route="AdminDashboard" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate}/>
            </div>
            <div className="">
              <PopUpFilter route="AdminDashboard" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate} />
            </div>
            {/* <div className="">
              <PopUpFilter route="AdminDashboard" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate}/>
            </div> */}
            {/* {startDate != "" && (
            <div className="">
              <CustomDateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} onDateSelect={onDateSelect} />
            </div>)} */}
          </div>
          
          <div className=" grid grid-cols-3 gap-2 ">
            {cardLists.length ? (
              <CardContainer cardLists={cardLists} />
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap pt-5">
          {/* Chart section */}
          <div className="lg:w-4/12 pr-4">
            {/* Department wise Participation */}
            <div className={classNames(
              "p-4 mb-4"
            )}>
              <div className="mb-6  flex justify-between">
                <span className="text-lg font-normal">
                  Department wise Participation
                </span>
                <span>
                  {barPlot.length > 5 && !barChartFullScreen && (
                    <div
                      className="text-center font-bold cursor-pointer text-blue-500"
                      onClick={handleViewMoreClick}
                    >
                      View More
                    </div>
                  )}
                </span>
              </div>
              <div className="h-80">


                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barPlot.slice(0, 1)} width={"200px"}>
                    <CartesianGrid vertical={false} strokeDasharray="0 0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      className="text axis-data"
                      interval={0}
                    >
                      <Label
                        className="text"
                        value="DEPARTMENT"
                        position="bottom"
                        dy={10} // Adjust the distance from the X-axis
                      />
                    </XAxis>
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text axis-data"
                      interval={0}
                    >
                      <Label
                        className="text"
                        value="PARTICIPATION RATE"
                        position="middle"
                        angle={-90} // Rotate the label for vertical orientation
                        dx={-25} // Adjust the distance from the Y-axis
                      />
                    </YAxis>
                    <Tooltip />
                    <Legend
                      formatter={(value, entry) =>
                        legendFormatter(value, entry, "line")
                      }
                      layout="horizontal"
                      iconSize={0}
                      wrapperStyle={{
                        paddingTop: "1rem"
                      }}
                    />
                    <Bar
                      dataKey="Participated"
                      stackId={"a"}
                      fill="#6CE5E8"
                      barSize={60}
                    />
                    <Bar
                      dataKey="Not yet Participated"
                      stackId={"a"}
                      fill="#5271FF"
                      barSize={60}
                      radius={[15, 15, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>
            </div>
          </div>
          <div className="lg:w-4/12 pr-4">
            {/* Department wise Improvement Rate */}
            <div className={classNames(
              // "bg-white shadow-md",
              "p-4 mb-4"
            )}>
              <div className="mb-6">
                <span className="text-lg font-normal">
                  Department wise Improvement Rate
                </span>
              </div>
              <div className="h-80">


                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plot}>
                    <CartesianGrid
                      vertical={false}
                      horizontal={false}
                      strokeDasharray="0 0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      className="text axis-data"
                      interval={0}
                      dy={10}
                      dx={10}
                    >
                      <Label
                        className="text"
                        value="WEEK"
                        position="bottom"
                        dy={10} // Adjust the distance from the X-axis
                      />
                    </XAxis>
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text axis-data"
                      dx={-5}
                    >
                      <Label
                        className="text"
                        value="INTERVIEW SCORE"
                        position="middle"
                        angle={-90} // Rotate the label for vertical orientation
                        dx={-30} // Adjust the distance from the Y-axis
                      />
                    </YAxis>
                    <Tooltip />
                    <Legend
                      formatter={(value, entry) =>
                        legendFormatter(value, entry, "line")
                      }
                      layout="horizontal"
                      iconSize={0}
                      wrapperStyle={{
                        paddingTop: "1rem"
                      }}
                    />
                    <Line
                      type="basic"
                      dataKey="Marketing"
                      stroke="#6CE5E8"
                      strokeWidth={4}
                    />
                    <Line
                      type="basic"
                      dataKey="Finance"
                      stroke="#5271FF"
                      strokeWidth={4}
                    />
                    <Line
                      type="basic"
                      dataKey="Operations"
                      stroke="green"
                      strokeWidth={4}
                    />
                    <Line
                      type="basic"
                      dataKey="Hr"
                      stroke="purple"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12">
            {/* Critical Improvement Areas */}
            <div className={classNames(
              // "bg-white shadow-md",
              "p-4 mb-4"
            )}>
              <div className="mb-6 flex justify-between">
                <span className="text-lg font-normal ">
                  Critical Improvement Areas
                </span>
                <span>
                  {pie.length > 2 && !pieChartFullScreen && (
                    <div
                      className="text-center font-bold cursor-pointer text-blue-500"
                      onClick={handleViewPieChartClick}
                    >
                      View More
                    </div>
                  )}
                </span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Place the legend horizontally at the bottom */}
                    <Legend
                      formatter={(value, entry) =>
                        legendFormatter(value, entry, "pie")
                      }
                      layout="horizontal"
                      iconSize={0}
                      wrapperStyle={{
                        paddingTop: "1rem"
                      }}
                    />
                    <Pie
                      dataKey="value"
                      data={pie.slice(0, 1)}
                      cx="50%"
                      cy="60%"
                      innerRadius={50}
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {pie.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>



              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        fullScreen
        open={barChartFullScreen}
        onClose={handleCloseFullScreen}
        className="p-5"
      >
        <DialogTitle>Department wise Participation</DialogTitle>
        <DialogContent>
          <div className="h-screen">
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={barPlot} width={"200px"}>
                <CartesianGrid vertical={false} strokeDasharray="0 0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  className="text axis-data"
                  interval={0}
                >
                  <Label
                    className="text"
                    value="DEPARTMENT"
                    position="bottom"
                    dy={10} // Adjust the distance from the X-axis
                  />
                </XAxis>
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text axis-data"
                  interval={0}
                >
                  <Label
                    className="text"
                    value="PARTICIPATION RATE"
                    position="middle"
                    angle={-90} // Rotate the label for vertical orientation
                    dx={-25} // Adjust the distance from the Y-axis
                  />
                </YAxis>
                <Tooltip />
                <Legend
                  formatter={(value, entry) =>
                    legendFormatter(value, entry, "line")
                  }
                  layout="horizontal"
                  iconSize={0}
                  wrapperStyle={{
                    paddingTop: "1rem"
                  }}
                />
                <Bar
                  dataKey="Participated"
                  stackId={"a"}
                  fill="#6CE5E8"
                  barSize={60}
                />
                <Bar
                  dataKey="Not yet Participated"
                  stackId={"a"}
                  fill="#5271FF"
                  barSize={60}
                  radius={[15, 15, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFullScreen} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        fullScreen
        open={pieChartFullScreen}
        onClose={handleClosePieChartFullScreen}
        className="p-5"
      >
        <DialogTitle>Critical Improvement Areas</DialogTitle>
        <DialogContent>
          <div className="h-screen">
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Legend
                  formatter={(value, entry) =>
                    legendFormatter(value, entry, "pie")
                  }
                  layout="horizontal"
                  iconSize={0}
                  wrapperStyle={{
                    paddingTop: "1rem"
                  }}
                />
                <Pie
                  dataKey="value"
                  data={pie}
                  cx="50%"
                  cy="60%"
                  innerRadius={50}
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {pie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePieChartFullScreen} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default TeacherDashboard;
