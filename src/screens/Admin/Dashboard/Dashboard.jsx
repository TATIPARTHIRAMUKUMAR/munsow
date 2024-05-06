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

import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";


const AdminDashboard = () => {
  
  const navigate = useNavigate();

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
    {
      cardContent: "No. of JD Interviews Conducted",
      cardValue: 23,
      icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
    },
    {
      cardContent: "No. of Cultural Fit Interviews Conducted",
      cardValue: 32,
      icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
    },
  ]);

  const [barPlot, setbarPlot] = useState([]);
  const [plot, setplot] = useState([]);
  const [pie, setPie] = useState([]);

  const dispatch = useDispatch();
  const { institutionStats, institutionFilters, branchList, departmentList, courseList } = useSelector((state) => state?.data)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadInstitutionStats());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch])

  useEffect(() => {
    console.log(institutionStats, "institutionStats")
    let defaultCards = [
      {
        cardContent: "No. of JD Interviews Conducted",
        cardValue: 23,
        icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
      },
      {
        cardContent: "No. of Cultural Fit Interviews Conducted",
        cardValue: 32,
        icon: <NorthEastIcon style={{ color: "white", fontSize: 40 }} />,
      },
    ]
    let cards = institutionStats?.cards?.map(o => ({
      cardContent: o?.name,
      cardValue: o?.value,
      icon: <PersonIcon style={{ color: "white", fontSize: 40 }} />,
      subValues: o?.sub_values
    }));
    
    console.log('//', cards);
    
    if (institutionStats?.cards?.length) {
      setCardsList(cards.concat(defaultCards))
    }
    if (institutionStats?.graphs) {

      institutionStats?.graphs?.map((o) => {
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

  }, [institutionStats])

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


      // route == "AdminDashboard" ? dispatch(loadInstitutionStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
      dispatch(loadInstitutionStats(params))
      // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
    }
  }

  let placementData = [
    {
      department :  "Computer Science and Engineering",
      students_placed : 40, // Value is in percentage
      students_not_placed : 50, // Value is in percentage
      students_disqualified : 10, // Value is in percentage
      no_of_companies : 10,
      offer_type : {
        general : 80, // Value is in percentage
        dream : 19, // Value is in percentage
        super_dream : 1 // Value is in percentage
      }
    },
    {
      department :  "Electrical and Electronics Engineering ",
      students_placed : 73,
      students_not_placed : 22,
      students_disqualified : 5,
      no_of_companies : 12,
      offer_type : {
        general : 90,
        dream : 9,
        super_dream : 1
      }
    },
    {
      department :  "Mechanical Engineering",
      students_placed : 60,
      students_not_placed : 40,
      students_disqualified : 0,
      no_of_companies : 7,
      offer_type : {
        general : 95,
        dream : 5,
        super_dream : 0
      }
    },
    {
      department :  "Civil Engineering",
      students_placed : 50,
      students_not_placed : 41,
      students_disqualified : 9,
      no_of_companies : 9,
      offer_type : {
        general : 78,
        dream : 20,
        super_dream : 2
      }
    },
    {
      department :  "Electronics and Communication Engineering",
      students_placed : 57,
      students_not_placed : 35,
      students_disqualified : 8,
      no_of_companies : 13,
      offer_type : {
        general : 70,
        dream : 27,
        super_dream : 3
      }
    },
    {
      department :  "Chemical Engineering",
      students_placed : 22,
      students_not_placed : 73,
      students_disqualified : 5,
      no_of_companies : 14,
      offer_type : {
        general : 80,
        dream : 20,
        super_dream : 0
      }
    },
    {
      department :  "Aerospace Engineering",
      students_placed : 56,
      students_not_placed : 43,
      students_disqualified : 1,
      no_of_companies : 5,
      offer_type : {
        general : 66,
        dream : 34,
        super_dream : 0
      }
    },
    {
      department :  "Biotechnology Engineering",
      students_placed : 64,
      students_not_placed : 24,
      students_disqualified : 12,
      no_of_companies : 9,
      offer_type : {
        general : 59,
        dream : 40,
        super_dream : 1
      }
    },
    {
      department :  "Information Technology",
      students_placed : 52,
      students_not_placed : 44,
      students_disqualified : 4,
      no_of_companies : 10,
      offer_type : {
        general : 90,
        dream : 7,
        super_dream : 3
      }
    },
    {
      department :  "Environmental Engineering",
      students_placed : 70,
      students_not_placed : 24,
      students_disqualified : 6,
      no_of_companies : 4,
      offer_type : {
        general : 100,
        dream : 0,
        super_dream : 0
      }
    },
  ]

  let totalStudents = 0;
  let percentagePlaced = 0;
  let percentageNotPlaced = 0;
  let totalCompanies = 0;

  let generalPercentage = 0;
  let dreamPercentage = 0;
  let superDreamPercentage = 0;
  let totalStudentsPlaced = 0;

  placementData.forEach(department => {
    const departmentStudentsPlaced = department.students_placed;
    totalStudentsPlaced += departmentStudentsPlaced;
    generalPercentage += (department.offer_type.general / 100) * departmentStudentsPlaced;
    dreamPercentage += (department.offer_type.dream / 100) * departmentStudentsPlaced;
    superDreamPercentage += (department.offer_type.super_dream / 100) * departmentStudentsPlaced;
  });

  // Calculate percentages
  generalPercentage = (generalPercentage / totalStudentsPlaced) * 100;
  dreamPercentage = (dreamPercentage / totalStudentsPlaced) * 100;
  superDreamPercentage = (superDreamPercentage / totalStudentsPlaced) * 100;

  console.log('General Percentage:', generalPercentage.toFixed(2), '%');
  console.log('Dream Percentage:', dreamPercentage.toFixed(2), '%');
  console.log('Super Dream Percentage:', superDreamPercentage.toFixed(2), '%');


  placementData.forEach(department => {
    totalStudents = department.students_placed + department.students_not_placed;
    percentagePlaced = (department.students_placed / totalStudents) * 100;
    percentageNotPlaced = (department.students_not_placed / totalStudents) * 100;
    totalCompanies += department.no_of_companies;
  });

  const categories = placementData.map(department => department.department);
  const placedData = placementData.map(department => department.students_placed);
  const notPlacedData = placementData.map(department => department.students_not_placed);
  const disqualifiedData = placementData.map(department => department.students_disqualified);

  useEffect (() => {
    Highcharts.chart('placementStats', {
    chart: {
      type: "bar"
    },
    title: {
      text: null
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: "Percentage of Students"
      },
      max: 100
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: [
      {
        name: "Disqualified",
        data: disqualifiedData,
        color: '#F7A3A3',
        tooltip: {
          pointFormat: '<span>{series.name}: <b>{point.y}</b>%</span><br/>'
        }
      },
      {
        name: "Not Placed",
        data: notPlacedData,
        color: '#92C4FF',
        tooltip: {
          pointFormat: '<span>{series.name}: <b>{point.y}</b>%</span><br/>'
        }
      },
      {
        name: "Placed",
        data: placedData,
        color: '#B6F9CE',
        tooltip: {
          pointFormat: '<span>{series.name}: <b>{point.y}</b>%</span><br/>'
        }
      }
    ]
    })
  }, [categories, disqualifiedData, notPlacedData, placedData]);

  useEffect(() => {
    Highcharts.chart('placementDonut', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Offer Type',
        style: {
          fontSize: '15px'
        }
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Offer Type',
        colorByPoint: true,
        data: [
          {
            name: 'General',
            y: generalPercentage,
            color: '#189AB4',
            sliced: true,
            selected: true
          },
          {
            name: 'Dream',
            y: dreamPercentage,
            color: '#76E6DA'
          },
          {
            name: 'Super Dream',
            y: superDreamPercentage,
            color: '#04445F'
          }
        ]
      }]
    });
  }, [generalPercentage, dreamPercentage, superDreamPercentage]);


  console.log(cardLists, "cardslist")//to check cards on dashboard
  return (
    <div className=" h-[100vh] p-4 pb-16 overflow-y-scroll " style={{background: "#E7EFEE"}}>
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
          
          {/* <div className=" grid grid-cols-3 gap-2 ">
            {cardLists.length ? (
              <CardContainer cardLists={cardLists} />
            ) : null}
          </div> */}

          <div>   
            <NewCard cardLists={cardLists} />
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4">
          
          <div className="shadow-lg col-span-3 mt-5 flex flex-wrap pt-5 bg-white rounded-xl">
            <div className="mb-6 ml-4 justify-between">
                <span className="text-lg font-normal h-[50px] w-[100px]">
                  Placements Statistics
                </span>
                <div className=" mt-[20px] p-0 border-0 ">
                  {/* <div className="flex flex-row g-0 text-center mb-5">
                    <div className="">
                      <div className="p-3 w-[250px] border border-dashed border-start-0 bg-green-100">
                        <h5 className="mb-1 text-17 font-semibold">
                          <span className="text-green-600">
                            {percentagePlaced.toFixed(2)}%
                          </span>
                        </h5>
                        <p className="text-muted mb-0">Students Placed</p>
                      </div>
                    </div>

                    <div className="col-6 col-sm-3">
                      <div className="p-3 w-[250px] border border-dashed border-start-0 bg-blue-100">
                        <h5 className="mb-1 text-17 font-semibold">
                          <span className="text-blue-600">{percentageNotPlaced.toFixed(2)}%</span>
                        </h5>
                        <p className="text-muted mb-0">Students Not Placed</p>
                      </div>
                    </div>

                    <div className="col-6 col-sm-3">
                      <div className="p-3 w-[250px] border border-dashed border-start-0 bg-gray-50">
                        <h5 className="mb-1 text-17 font-semibold">
                          <span className="counter-value">{totalCompanies}</span>
                        </h5>
                        <p className="text-muted mb-0">No. of Companies</p>
                      </div>
                    </div>
                  </div> */}

                  <div className="flex flex-row g-0 text-center mb-5">
                    <div className="mx-[100px]">
                      <div className="p-3 w-[200px] shadow-lg rounded-xl bg-green-100">
                        <h5 className="mb-1 font-bold">
                          <span className="text-green-600 text-xl">
                            {percentagePlaced.toFixed(2)}%
                          </span>
                        </h5>
                        <p className="text-muted mb-0">Students Placed</p>
                      </div>
                    </div>

                    <div className="mx-10">
                      <div className="p-3 w-[200px] shadow-lg rounded-xl bg-blue-100">
                        <h5 className="mb-1 font-bold">
                          <span className="text-blue-600 text-xl">{percentageNotPlaced.toFixed(2)}%</span>
                        </h5>
                        <p className="text-muted mb-0">Students Not Placed</p>
                      </div>
                    </div>

                    <div className="mx-[100px]">
                      <div className="p-3 shadow-lg rounded-xl w-[200px] bg-[#F3F4F6]">
                        <h5 className="mb-1 font-bold">
                          <span className="counter-value text-xl">{totalCompanies}</span>
                        </h5>
                        <p className="text-muted mb-0">No. of Companies</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row g-0 text-center mb-5 mt-10">
                  <div id="placementStats" className="ml-[10px] mr-[20px]"></div>
                  <div id="placementDonut" className="ml-[10px] w-[500px] mr-[20px] "></div>
                </div>
            </div>
          </div>
        </div>

        <div className="shadow-lg mt-5 flex flex-wrap pt-5 bg-white rounded-xl">
            
            <div className="lg:w-11/12 pr-4 ">
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
                <div className="h-80 mt-[50px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barPlot.slice(0, 1)} width={"500px"}>
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
            {/* <div className="lg:w-4/12 pr-4">
              <div className={classNames(
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
                          dy={10} 
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
                          angle={-90} 
                          dx={-30} 
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
            </div> */}
            {/* <div className="lg:w-4/12">
              <div className={classNames(
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
                      </div> */}
          </div>

        <div className="mt-5 flex flex-wrap pt-5 bg-white rounded-xl">
          <div className="mb-6 ml-4 flex justify-between">
              <span className="text-lg font-normal">
                Department wise Analysis
              </span>
          </div>
          {/* mb-6 ml-4  */}



          <div className="mt-4 p-7">
            <div className="flex flex-wrap justify-between">
              {/* First row */}
              <div className="w-[280px] mb-4 ml-7 p-5 text-center bg-[#DEF3FF] cursor-pointer rounded-xl" 
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> Computer Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>360</span>
                  <CircularProgress variant="determinate" value={360} style={{ color: '#89CFF0', width: '80px' }} />
                </div>
                
                {/* <BorderLinearProgress variant="determinate" value={90} style={{ color: '#40826D', width: '120px' }} /> */}
              </div>
              <div className="w-[280px] mb-4 p-5 text-center bg-[#F5E8FF] cursor-pointer rounded-xl "
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> Electrical Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>65</span>
                  <CircularProgress variant="determinate" value={65} style={{ color: '#9F2B68', width: '80px' }} />
                </div>
              </div>
              <div className="w-[280px] mb-4 p-5 mr-7 text-center bg-[#DEFAE8] cursor-pointer rounded-xl "
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> IT Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>250</span>
                  <CircularProgress variant="determinate" value={250} style={{ color: '#40B5AD', width: '80px' }} />
                </div>
              </div>

              {/* Second row */}
              <div className="w-[280px] mb-4 ml-7 p-5 text-center bg-[#FCF5DC] cursor-pointer rounded-xl "
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> Mechanical Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>40</span>
                  <CircularProgress variant="determinate" value={40} style={{ color: '#FFDB58', width: '80px' }} />
                </div>
              </div>
              <div className="w-[280px] mb-4 p-5 text-center bg-[#FDE1E6] cursor-pointer rounded-xl"
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> Electronics & Communication Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>350</span>
                  <CircularProgress variant="determinate" value={350} style={{ color: '#E05234', width: '80px' }} />
                </div>
              </div>
              <div className="w-[280px] mb-4 p-5 text-center mr-7 bg-[#C8EBFF] cursor-pointer rounded-xl"
              onClick={() => {navigate('/adminDepartmentStudentList')}}>
                <span className="text-md font-normal"> Environmental Engineering </span>
                <br /><br /><br />
                <div style={{position: 'relative', left:'-20px'}}>
                  <span style={{position: 'absolute', top: '10px', left: '130px'}}>75</span>
                  <CircularProgress variant="determinate" value={75} style={{ color: '#4169e1', width: '80px' }} />
                </div>
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

export default AdminDashboard;
