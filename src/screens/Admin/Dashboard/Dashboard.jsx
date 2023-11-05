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
// import cardLists from "./Mockcard";
// import _mockChartData from "./_mockChartData.json";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useDispatch, useSelector } from "react-redux";
import { loadDepartmentList, loadInstitutionStats,loadBrachList,loadCourseList, getCourseList, getDepartmentList } from "../../../redux/action";
import { classNames, legendFormatter } from "../../../utils/generalUtils";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";



const AdminDashboard = () => {
  window.onbeforeunload = ()=>{
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  

  const [cardLists,setCardsList] = useState([
    {
      cardContent: "Number of students enrolled",
      cardValue: 0,
      icon: <PersonIcon style={{ color: "white",fontSize: 40  }}/>, 
    },
    {
      cardContent: "Interview Conducted",
      cardValue: 0,
      icon: <GroupsIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Improvement areas Identified",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Average Interview Score",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Skill Gap rate",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
  ]);

  const [barPlot,setbarPlot] = useState([]);
  const [plot,setplot] = useState([]);
  const [pie,setPie] = useState([]);

  const dispatch = useDispatch();
  const {institutionStats, branchList, departmentList, courseList} = useSelector((state)=>state?.data)



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(()=>{
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadInstitutionStats());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  },[dispatch])

  useEffect(()=>{
    console.log(institutionStats,"institutionStats")
    if(institutionStats?.cards?.length)
    {
      setCardsList(()=>institutionStats?.cards?.map(o=>({
        cardContent: o?.name,
        cardValue: o?.value,
        icon: <PersonIcon style={{ color: "white",fontSize: 40  }}/>, 
        subValues:o?.sub_values
      })))
    }
    if(institutionStats?.graphs)
    {

      institutionStats?.graphs?.map((o)=>{
        switch(o?.name)
        {
          case "Departments wise participation": {
            setbarPlot(()=>o?.data)
            break
          }
          case "Departments wise improvement rate" : {
            setplot(()=>o?.data)
            break
          }
          case "Critical Improvement Areas" : {
            setPie(()=>o?.data)
            break
          }

          default : break
        }

      })

    }

    // console.log("graph",barPlot,plot,pie)

  },[institutionStats])



  return (
    <div className=" h-[100vh] p-4 pb-16 overflow-y-scroll ">
      <div className="container ">
          {/* Card section */}
          <div className="">
            <div className="flex justify-end mr-10 mb-3">
              <div className="">
                <PopUpFilter route="AdminDashboard" list="Branches" dependencyList={branchList}/>
              </div>
              <div className="">
                <PopUpFilter route="AdminDashboard" list="Courses" dependencyList={courseList}/>
              </div>
              <div className="">
                <PopUpFilter route="AdminDashboard" list="Departments" dependencyList={departmentList}/>
              </div>
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
              // "bg-white shadow-md",
              "p-4 mb-4"
            )}>
              <div className="mb-6">
                <span className="text-lg font-normal">
                  Department wise Participation
                </span>
              </div>
              <div className="h-80">
                {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barPlot}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Participated" fill="#82ca9d" />
                    <Bar dataKey="Not yet Participated" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer> */}

                <ResponsiveContainer width="100%" height="100%">
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
                {/* <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plot}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="basic" dataKey="Marketing" stroke="green" />
                    <Line type="basic" dataKey="Finance" stroke="blue" />
                    <Line type="basic" dataKey="Operations" stroke="purple" />
                    <Line type="basic" dataKey="Hr" stroke="red" />
                  </LineChart>
                </ResponsiveContainer> */}

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
              <div className="mb-6">
                <span className="text-lg font-normal ">
                  Critical Improvement Areas
                </span>
              </div>
              <div className="h-80">
                {/* <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                    <Pie
                      dataKey="value"
                      data={pie}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pie.map((entry, index) => (<>
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      </>
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer> */}


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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
