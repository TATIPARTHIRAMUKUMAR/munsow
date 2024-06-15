// import React, { useEffect, useState } from "react";
// import { ResponsiveHeatMap } from "@nivo/heatmap";
// import _mockChartData from "./EmotionSensing/_mockChartData.json";
// import FilterCommon from "../../../Components/FilterCommon";
// import { useDispatch, useSelector } from "react-redux";
// import { branchesList } from "./mockbranchesdata";
// import PopUpFilter from "../../../Components/PopUpFilter";
// import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
// import format from 'date-fns/format';
// import {
//   loadKSAnalysis,
//   loadBrachList,
//   getCourseList,
//   getDepartmentList,
//   loadCourseList,
//   loadDepartmentList,
//   loadUsersList
// } from "../../../redux/action";
// import DateRangePicker from "../../../Components/DateRange.jsx";


// import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Checkbox from '@mui/material/Checkbox';


// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//   },
// }));


// const KSAnalysis = () => {
//   window.onbeforeunload = () => {
//     localStorage.setItem("branch", "All Branches");
//     localStorage.setItem("course", "All Courses");
//     localStorage.setItem("department", "All Departments");
//     localStorage.setItem("user", "All Users");

//   }
//   const hardSkills = [
//     {
//       id: "Languages",
//       data: [{
//         id: "Computer Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 50,
//             data: [
//               {x: "Basic Syntax", y: 20},
//               {x: "Data Structures", y: 50},
//               {x: "Functions and Modules", y: 30},
//               {x: "Web Scraping", y: 33},
//               {x: "File Handling", y: 70},
//               {x: "Object-Oriented Programming (OOP)", y: 65},
//               {x: "Exception Handling", y: 40},
//               {x: "Regular Expressions", y: 90},
//             ]
//           },
//           { 
//             x: "C++", 
//             y: 48,
//             data: [
//               {x: "Basic Syntax", y: 20},
//               {x: "Data Structures", y: 40}
//             ] 
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "JavaScript", 
//             y: 31,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "Go", 
//             y: 20,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//         ],
//       },
//       {
//         id: "Computer Science and Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 54},
//               {x: "Data Structures", y: 59},
//               {x: "Functions and Modules", y: 78},
//               {x: "Web Scraping", y: 56},
//               {x: "File Handling", y: 67},
//               {x: "Object-Oriented Programming (OOP)", y: 75},
//               {x: "Exception Handling", y: 40},
//               {x: "Regular Expressions", y: 90},
//             ] 
//           },
//           { 
//             x: "C++", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "JavaScript", 
//             y: 21,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "Go", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           } ,
//         ],
//       },
//       {
//         id: "IT Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 70,
//             data: [
//               {x: "Basic Syntax", y: 54},
//               {x: "Data Structures", y: 58},
//               {x: "Functions and Modules", y: 32},
//               {x: "Web Scraping", y: 21},
//               {x: "File Handling", y: 54},
//               {x: "Object-Oriented Programming (OOP)", y: 21},
//               {x: "Exception Handling", y: 87},
//               {x: "Regular Expressions", y: 56},
//             ]
//           },
//           { 
//             x: "C++", 
//             y: 55,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "JavaScript", 
//             y: 27,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Go", 
//             y: 60,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//         ],
//       },
//       {
//         id: "Electronic Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 20,
//             data: [
//               {x: "Basic Syntax", y: 25},
//               {x: "Data Structures", y: 65},
//               {x: "Functions and Modules", y: 56},
//               {x: "Web Scraping", y: 33},
//               {x: "File Handling", y: 83},
//               {x: "Object-Oriented Programming (OOP)", y: 56},
//               {x: "Exception Handling", y: 53},
//               {x: "Regular Expressions", y: 21},
//             ] 
//           },
//           { 
//             x: "C++", 
//             y: 60,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "JavaScript", 
//             y: 25,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Go", 
//             y: 11,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//         ],
//       },
//       {
//         id: "Electronic and Communication Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 30,
//             data: [
//               {x: "Basic Syntax", y: 54},
//               {x: "Data Structures", y: 76},
//               {x: "Functions and Modules", y: 98},
//               {x: "Web Scraping", y: 34},
//               {x: "File Handling", y: 100},
//               {x: "Object-Oriented Programming (OOP)", y: 54},
//               {x: "Exception Handling", y: 22},
//               {x: "Regular Expressions", y: 56},
//             ] 
//           },
//           {
//             x: "C++", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "JavaScript", 
//             y: 37,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Go", 
//             y: 30,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//         ],
//       },
//       {
//         id: "Mechanical Engineering",
//         data: [
//           { 
//             x: "Programming Language (Python)", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 64},
//               {x: "Data Structures", y: 89},
//               {x: "Functions and Modules", y: 74},
//               {x: "Web Scraping", y: 43},
//               {x: "File Handling", y: 12},
//               {x: "Object-Oriented Programming (OOP)", y: 32},
//               {x: "Exception Handling", y: 57},
//               {x: "Regular Expressions", y: 44},
//             ] 
//           },
//           { 
//             x: "C++", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "C Programming Language", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Java", 
//             y: 58,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ] 
//           },
//           {
//             x: "JavaScript", 
//             y: 21,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//           { 
//             x: "Go", 
//             y: 40,
//             data: [
//               {x: "Basic Syntax", y: 20}
//             ]  
//           },
//         ],
//       },
//     ]
//     },
//     {
//       id: "Data Analysis",
//       data: [
//       {
//         id: "C++",
//         data: [
//           { x: "Finance", y: 50 },
//           { x: "Marketing", y: 48 },
//           { x: "Operations", y: 31 },
//           { x: "HR", y: 35 },
//           // { x: "Knowledge", y: 30 },
//         ],
//       },
//       {
//         id: "C Programming Language",
//         data: [
//           { x: "Finance", y: 20 },
//           { x: "Marketing", y: 40 },
//           { x: "Operations", y: 33 },
//           { x: "HR", y: 53 },
//           // { x: "Knowledge", y: 50 },
//         ],
//       },
//       {
//         id: "Java",
//         data: [
//           { x: "Finance", y: 80 },
//           { x: "Marketing", y: 44 },
//           { x: "Operations", y: 71 },
//           { x: "HR", y: 33 },
//           // { x: "Knowledge", y: 11 },
//         ],
//       },
//       {
//         id: "JavaScript",
//         data: [
//           { x: "Finance", y: 11 },
//           { x: "Marketing", y: 22 },
//           { x: "Operations", y: 67 },
//           { x: "HR", y: 44 },
//           // { x: "Knowledge", y: 55 },
//         ],
//       },
//       {
//         id: "Go",
//         data: [
//           { x: "Finance", y: 55 },
//           { x: "Marketing", y: 11 },
//           { x: "Operations", y: 77 },
//           { x: "HR", y: 88 },
//           // { x: "Knowledge", y: 34 },
//         ],
//       },
//     ]
//     },
//     {
//       id: "Data Science ",
//       data: [
//         { x: "Finance", y: 56 },
//         { x: "Marketing", y: 97 },
//         { x: "Operations", y: 36 },
//         { x: "HR", y: 30 },
//         { x: "HR", y: 30 },
//       ],
//     },
//     {
//       id: "DevOps (Docker)",
//       data: [
//         { x: "Finance", y: 71 },
//         { x: "Marketing", y: 90 },
//         { x: "Operations", y: 14 },
//         { x: "HR", y: 13 },
//       ],
//     },
//   ];

//   const softSkills = [
//     {
//       id: "Communication",
//       data: [
//         { x: "Finance", y: 50 },
//         { x: "Marketing", y: 48 },
//         { x: "Operations", y: 31 },
//         { x: "HR", y: 20 },
//       ],
//     },
//     {
//       id: "Adaptability",
//       data: [
//         { x: "Finance", y: 49 },
//         { x: "Marketing", y: 84 },
//         { x: "Operations", y: 73 },
//         { x: "HR", y: 93 },
//       ],
//     },
//     {
//       id: "Creativity",
//       data: [
//         { x: "Finance", y: 56 },
//         { x: "Marketing", y: 37 },
//         { x: "Operations", y: 36 },
//         { x: "HR", y: 30 },
//       ],
//     },
//     {
//       id: "Empathy",
//       data: [
//         { x: "Finance", y: 73 },
//         { x: "Marketing", y: 90 },
//         { x: "Operations", y: 12 },
//         { x: "HR", y: 13 },
//       ],
//     },
//   ];
//   const [hardSkillData, setHardSkillsData] = useState([]);
//   const [softSkillData, setSoftSkillsData] = useState([]);
//   const [branchesData, setBranchesData] = useState(branchesList);
//   const [active, setActive] = React.useState("All Branches");
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const dispatch = useDispatch();

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");


//   const { departmentList, ksAnalysis, ksFilters, courseList, branchList, userListByDepartment } = useSelector((state) => state?.data);
//   const open = Boolean(anchorEl);
//   useEffect(() => {
//     dispatch(getDepartmentList());
//     dispatch(getCourseList());
//     //dispatch get branches Api
//     dispatch(loadKSAnalysis());
//     dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
//   }, [dispatch]);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   useEffect(() => {
//     setHardSkillsData(ksAnalysis?.graph_1?.data)
//     setSoftSkillsData(ksAnalysis?.graph_2?.date)
//     console.log("ksAnalysis", hardSkillData, softSkillData)
//     if (ksFilters?.branch != undefined && ksFilters?.branch != null) {
//       localStorage.setItem("branch", ksFilters?.branch);
//       localStorage.setItem("course", ksFilters?.course);
//       localStorage.setItem("department", ksFilters?.department);
//       localStorage.setItem("user", ksFilters?.user_name);


//       setEndDate(ksFilters?.end_date)
//       setStartDate(ksFilters?.start_date)

//       dispatch(loadCourseList(`branch_id=${ksFilters?.branch_id}`));
//       dispatch(loadDepartmentList(`course_id=${ksFilters?.course_id}`));
//       dispatch(loadUsersList(`department_id=${ksFilters?.department_id}`));


//     }

//   }, [ksAnalysis])

//   const handleMenuItemClick = (value) => {
//     if (value == "All Branches") {
//       dispatch(loadKSAnalysis());
//       setHardSkillsData(hardSkills);
//       setSoftSkillsData(softSkills);
//     } else {
//       // use api to filter the data using id
//       const filteredHardSkillData = hardSkills.map((data) => {
//         return {
//           ...data,
//           data: data.data.map((item) => {
//             return {
//               ...item,
//               y: Math.floor(Math.random() * 100),
//             };
//           }),
//         };
//       });
//       const filteredSoftSkillData = softSkills.map((data) => {
//         return {
//           ...data,
//           data: data.data.map((item) => {
//             return {
//               ...item,
//               y: Math.floor(Math.random() * 100),
//             };
//           }),
//         };
//       });

//       setHardSkillsData(filteredHardSkillData);
//       setSoftSkillsData(filteredSoftSkillData);
//     }
//     setActive(value);
//     handleClose();
//   };  

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const onDateSelect = (value) => {
//     console.log("api calls",value)
//     const formattedStartDate = format(value.startDate, 'yyyy-MM-dd');
//     const formattedEndDate = format(value.endDate, 'yyyy-MM-dd');
//     let params = {
//       branch: localStorage.getItem("branch"),
//       course: localStorage.getItem("course"),
//       department: localStorage.getItem("department"),
//       student_id: localStorage.getItem("user_id"),
//       start_date: formattedStartDate,
//       end_date: formattedEndDate
//     };
//     if (startDate && endDate) {


//       // route == "AdminDashboard" ? dispatch(loadInstitutionStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
//       dispatch(loadKSAnalysis(params))
//       // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
//     }
//   }

//   const [yAxisId, setyAxisId] = useState("");

//   useEffect(() => {

//     let y_axes=[]
//     let x_axes=[]

//     x_axes['departments'] = hardSkillData?.map(skill => skill.id)
//     y_axes['courses'] = hardSkillData[0]?.data?.map(dept => dept.x)
//     y_axes[yAxisId] = hardSkillData[0]?.data?.flatMap(skill => skill?.data?.map(subskill => subskill.x))

//     const drilldownSeries = hardSkillData.flatMap((skill, x) => {

//       if (!yAxisId && skill.data && skill.data.length > 0) {
//         setyAxisId(`${skill.id}-${skill.data[0].x}`);
//       }

//       return skill?.data?.map((dept) => ({
//           name: dept.x,
//           id: `${skill.id}-${dept.x}`,
//           data: dept?.data?.map((subSkill, y) => {
//               return {
//                 'title': subSkill.x, 
//                 'x': x,
//                 'y': y,
//                 'value': subSkill.y
//               };
//           }),
//           dataLabels: {
//             enabled: true
//           }
//       }));
//     });

//     const transformedData = hardSkillData.flatMap((skill, x) => {
//       return skill?.data.map((dept, y) => ({
//           x: x,
//           y: y,
//           value: dept.y,
//           drilldown: `${skill.id}-${dept.x}`,
//           dataLabels: {
//             enabled: true
//           }
//       }));
//     });
  
//     Highcharts.chart('hardskills', {
//         chart: {
//             type: 'heatmap',
//             events:{
//               drilldown: function() {
//                 var chart = this;
//                 chart.yAxis[0].update({
//                         type: 'category',
//                         categories: y_axes[yAxisId]
//                                 });
//               },
//               drillup: function() {
//                 var chart = this;
//                 chart.yAxis[0].update({
//                         type: 'category',
//                         categories: y_axes['courses']
//                                 });
//                 chart.xAxis[0].update({
//                         type: 'category',
//                         categories: x_axes['departments']
//                                 });
//               }
//             }
//         },
//         title: {
//             text: null
//         },
//         xAxis: {
//             categories: x_axes['departments']
//         },
//         yAxis: [{
//             categories: y_axes['courses']
//         }],
//         plotOptions: {
//           heatmap: {
//             enableMouseTracking: true
//           }
//         },
//         accessibility: {
//             point: {
//                 descriptionFormat: '{(add index 1)}. ' +
//                     '{series.xAxis.categories.(x)} skill level ' +
//                     '{series.yAxis.categories.(y)}, {value}.'
//             },
//             announceNewData: {
//               enabled: true
//             }
//         },
//         colorAxis: {
//             min: 0,
//             minColor: '#FFFFFF'
//         },
//         legend: {
//             align: 'right',
//             layout: 'vertical',
//             margin: 0,
//             verticalAlign: 'top',
//             y: 25,
//             symbolHeight: 280
//         },
//         tooltip: {
//             formatter: function () {
//                 return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> has a skill level of <b>' +
//                     this.point.value + '</b> on <b>' +
//                     this.series.yAxis.categories[this.point.y] + '</b>';
//             }
//         },
//         series: [{
//             name: 'Skill Levels per Department',
//             borderWidth: 1,
//             data: transformedData,
//             dataLabels: {
//                 enabled: true,
//                 color: '#000000'
//             }
//         }],
//         drilldown: {
//           breadcrumbs: {
//               position: {
//                   align: 'right'
//               }
//           },
//           series: drilldownSeries 
//         },
//         responsive: {
//             rules: [{
//                 condition: {
//                     maxWidth: 500
//                 },
//                 chartOptions: {
//                     yAxis: {
//                         labels: {
//                             format: '{substr value 0 1}'
//                         }
//                     }
//                 }
//             }]
//         }
//     });
// }, [hardSkillData]);

// useEffect(() => {
//   Highcharts.chart('softskills', {
//       chart: {
//           type: 'heatmap'
//       },
//       title: {
//           text: null
//       },
//       xAxis: {
//           categories: softSkillData?.map(skill => skill.id)
//       },
//       yAxis: {
//           categories: softSkillData[0]?.data.map(dept => dept.x),
//           title: null
//       },
//       accessibility: {
//           point: {
//               descriptionFormat: '{(add index 1)}. ' +
//                   '{series.xAxis.categories.(x)} skill level ' +
//                   '{series.yAxis.categories.(y)}, {value}.'
//           }
//       },
//       colorAxis: {
//           min: 0,
//           minColor: '#FFFFFF'
//       },
//       legend: {
//           align: 'right',
//           layout: 'vertical',
//           margin: 0,
//           verticalAlign: 'top',
//           y: 25,
//           symbolHeight: 280
//       },
//       tooltip: {
//           formatter: function () {
//               return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> has a skill level of <b>' +
//                   this.point.value + '</b> on <b>' +
//                   this.series.yAxis.categories[this.point.y] + '</b>';
//           }
//       },
//       series: [{
//           name: 'Skill Levels per Department',
//           borderWidth: 1,
//           data: softSkillData.flatMap((skill, x) => skill.data.map((dept, y) => [x, y, dept.y])),
//           dataLabels: {
//               enabled: true,
//               color: '#000000'
//           }
//       }],
//       responsive: {
//           rules: [{
//               condition: {
//                   maxWidth: 500
//               },
//               chartOptions: {
//                   yAxis: {
//                       labels: {
//                           format: '{substr value 0 1}'
//                       }
//                   }
//               }
//           }]
//       }
//   });
// }, [softSkillData]);

// const [anchorEl1, setAnchorEl1] = useState(null);
// const [selectedSkills, setSelectedSkills] = useState([]);
// const [selectedSkillData, setSelectedSkillData] = useState('');

// const open1 = Boolean(anchorEl1);
// const handleClick1 = (event) => {
//   setAnchorEl1(event.currentTarget);
// };
// const handleClose1 = (selectedOption) => {
//   setAnchorEl1(null);
//   const selectedSkillData = hardSkills.find(skillGroup => skillGroup.id === selectedOption);
//   setSelectedSkillData(selectedSkillData);
//   setHardSkillsData(selectedSkillData?.data || []);
// };

// const handleSkillToggle = (skillId) => {
//   const selectedIndex = selectedSkills.indexOf(skillId);
//   let newSelectedSkills = [];

//   if (selectedIndex === -1) 
//   {
//     newSelectedSkills = [...selectedSkills, skillId];
//   } 
//   else if (selectedIndex === 0) 
//   {
//     newSelectedSkills = selectedSkills.slice(1);
//   } 
//   else if (selectedIndex === selectedSkills.length - 1) 
//   {
//     newSelectedSkills = selectedSkills.slice(0, -1);
//   } 
//   else if (selectedIndex > 0) 
//   {
//     newSelectedSkills = [
//       ...selectedSkills.slice(0, selectedIndex),
//       ...selectedSkills.slice(selectedIndex + 1),
//     ];
//   }

//   let newdata = hardSkillData?.filter((department) => newSelectedSkills.includes(department.id));
//   setHardSkillsData(newdata)
//   setSelectedSkills(newSelectedSkills);
// };



//   return (
//     <div className="flex-grow p-5">
//       <div className="container mx-auto">
//         <div className="flex flex-wrap">
//           <div className="w-full">
//             <div className="bg-white mb-3 p-5 rounded-xl">
//               <div
//                 className="bg-white mb-10"
//                 style={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 {/* <span className="text-2xl font-normal text-gray-900">
//                   Knowledge and Skill Analysis
//                 </span> */}
//                 <div>
//                   <div className="flex justify-end mr-10 mb-3">
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate}/>
//                     </div>
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate}/>
//                     </div>
                    
//                     {/* <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate} />
//                     </div>
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="user" dependencyList={userListByDepartment} startDate={startDate} endDate={endDate} />
//                     </div> */}
//                     {/* {startDate != "" && (
//                       <div className="">
//                         <DateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} onDateSelect={onDateSelect} />
//                       </div>)} */}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5 pt-3" style={{ height: 500 }}>
//                 <span className="text-2xl font-normal text-gray-900">
//                   Hard skills
//                 </span>
//                 <div className="mt-4 mr-6 float-right">
//                       <Button
//                         id="demo-customized-button"
//                         aria-controls={open1 ? 'demo-customized-menu' : undefined}
//                         aria-haspopup="true"
//                         aria-expanded={open1 ? 'true' : undefined}
//                         variant="contained"
//                         disableElevation
//                         onClick={handleClick1}
//                         endIcon={<KeyboardArrowDownIcon />}
//                       >
//                         Categories
//                       </Button>
//                       <StyledMenu
//                         id="demo-customized-menu"
//                         MenuListProps={{
//                           'aria-labelledby': 'demo-customized-button',
//                         }}
//                         anchorEl={anchorEl1}
//                         open={open1}
//                         onClose={handleClose1}
//                       >
//                         {hardSkills.map(skillGroup => (
//                           <div key={skillGroup.id}>
//                             <MenuItem onClick={() => handleClose1(skillGroup.id)} disableRipple>
//                               {skillGroup.id}
//                             </MenuItem>
//                           </div>
//                         ))}
//                       </StyledMenu>
//                 </div>
//                 <div className="mt-4 mr-6 float-right">
//                   <Button
//                     id="demo-customized-button"
//                     aria-controls={anchorEl ? 'demo-customized-menu' : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={anchorEl ? 'true' : undefined}
//                     variant="contained"
//                     disableElevation
//                     onClick={handleClick}
//                     endIcon={<KeyboardArrowDownIcon />}
//                   >
//                     Departments
//                   </Button>
//                   <Menu
//                     id="demo-customized-menu"
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     MenuListProps={{
//                       'aria-labelledby': 'demo-customized-button',
//                     }}
//                   >
//                     {selectedSkillData?.data?.map((skillGroup) => (
//                       <MenuItem key={skillGroup.id} disableRipple>
//                         <Checkbox
//                           checked={selectedSkills.indexOf(skillGroup.id) !== -1}
//                           onChange={() => handleSkillToggle(skillGroup.id)}
//                         />
//                         {skillGroup.id}
//                       </MenuItem>
//                     ))
//                   }
//                   </Menu>
//                 </div><br/><br/><br/><br/>
//                 <div id="hardskills"></div>
//                 {/* {hardSkillData?.length > 0 && (
//                   <ResponsiveHeatMap
//                     data={hardSkillData}
//                     margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
//                     valueFormat=">-.2s"
//                     axisTop={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: -90,
//                       legend: "",
//                       legendOffset: 46,
//                     }}
//                     axisLeft={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: 0,
//                       // legend: "Hard Skills",
//                       legendPosition: "middle",
//                       legendOffset: -80,
//                     }}
//                     colors={{
//                       type: "sequential",
//                       scheme: "purples",
//                       minValue: 0,
//                       maxValue: 100,
//                     }}
//                     emptyColor="#555555"
//                     legends={[
//                       {
//                         anchor: "bottom",
//                         translateX: 0,
//                         translateY: 30,
//                         length: 400,
//                         thickness: 8,
//                         direction: "row",
//                         tickPosition: "after",
//                         tickSize: 3,
//                         tickSpacing: 4,
//                         tickOverlap: false,
//                         tickFormat: ">-.2s",
//                         title: "Value →",
//                         titleAlign: "start",
//                         titleOffset: 4,
//                       },
//                     ]}
//                   />
//                 )} */}
//               </div>
//               <div className="mt-5 pt-3" style={{ height: 500 }}>
//                 <span className="text-2xl font-normal text-gray-900">
//                   Soft skills
//                 </span>
//                 <div id="softskills"></div>
//                 {/* {softSkillData?.length > 0 && (
//                   <ResponsiveHeatMap
//                     data={softSkillData}
//                     margin={{ top: 90, right: 90, bottom: 60, left: 90 }}
//                     valueFormat=">-.2s"
//                     axisTop={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: -90,
//                       legend: "",
//                       legendOffset: 50,
//                     }}
//                     axisLeft={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: 0,
//                       // legend: "Soft Skills",
//                       legendPosition: "middle",
//                       legendOffset: -85,
//                     }}
//                     colors={{
//                       type: "sequential",
//                       scheme: "greens",
//                       minValue: 0,
//                       maxValue: 100,
//                     }}
//                     emptyColor="#555555"
//                     legends={[
//                       {
//                         anchor: "bottom",
//                         translateX: 0,
//                         translateY: 30,
//                         length: 400,
//                         thickness: 8,
//                         direction: "row",
//                         tickPosition: "after",
//                         tickSize: 3,
//                         tickSpacing: 4,
//                         tickOverlap: false,
//                         tickFormat: ">-.2s",
//                         title: "Value →",
//                         titleAlign: "start",
//                         titleOffset: 4,
//                       },
//                     ]}
//                   />
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KSAnalysis;

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
    <div className="mt-5 pt-3">
      <span className="text-2xl font-normal text-gray-900">{title}</span>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }} className="mt-5 max-w-full overflow-x-auto">
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
            {departments.map(department => (
              <TableRow key={department}>
                <TableCell className="sticky left-0 bg-white">{department}</TableCell>
                {skills.map(skill => {
                  const value = departmentDataMap[department][skill];
                  const colorClass = typeof value === "number" ? getColorCode(value) : "bg-gray-100";
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

const KSAnalysis = () => {
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
              <div className="bg-white mb-10 flex justify-between">
                <div>
                  <div className="flex justify-end mr-10 mb-3">
                    <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate} />
                    <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate} />
                  </div>
                </div>
              </div>
              {renderTable(hardSkillData, "Hard Skills")}
              {renderTable(softSkillData, "Soft Skills")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KSAnalysis;