import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import _mockChartData from "./EmotionSensing/_mockChartData.json";
import FilterCommon from "../../../Components/FilterCommon";
import { branchesList } from "./mockbranchesdata";
import {
  loadPracticalThinkingAnalysis,
  loadBrachList,
  getCourseList,
  getDepartmentList, 
  loadCourseList, 
  loadDepartmentList, 
  loadUsersList
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
import CustomDateRangePicker from "../../../Components/DateRange.jsx";
import { SentimentDissatisfied } from '@mui/icons-material';
import format from 'date-fns/format';

const PracticalThinking = () => {
  window.onbeforeunload = ()=>{
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  // const barPlotData = [
  //   {
  //     "Not Solved": 24,
  //     Solved: 40,
  //     name: "Finance",
  //   },
  //   {
  //     "Not Solved": 30,
  //     Solved: 30,
  //     name: "Marketing",
  //   },
  //   {
  //     "Not Solved": 5,
  //     Solved: 20,
  //     name: "Operations",
  //   },
  //   {
  //     "Not Solved": 20,
  //     Solved: 10,
  //     name: "Hr",
  //   },
  // ];
  const dispatch = useDispatch();
  // const [barPlot, setBarPlot] = useState(barPlotData);
  const [branchesData, setBranchesData] = useState(branchesList);
  const [active, setActive] = React.useState("All Branches");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {practicalThinkingAnalysis, practicalThinkingFilters, branchList, departmentList, courseList} = useSelector((state)=>state?.data);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadPracticalThinkingAnalysis());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, []);

  const legendFormatter = (value, entry) => {
    return (
      <div className={"flex items-center"}>
        <div
          className={"h-4 w-4 mr-2"}
          style={{ backgroundColor: entry.color }}
        />
        <div>{value}</div>
      </div>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    if (value == "All Branches") {
      dispatch(loadPracticalThinkingAnalysis());
    } else {
      // use api to filter the data using id
      const problemSolvingRate = ["Solved", "Not Solved"];
      const filteredBarplot = barPlot.map((data) => {
        for (const problem of problemSolvingRate) {
          const randomValue = Math.floor(Math.random() * 100) + 1;
          data[problem] = randomValue;
        }
        return data;
      });
      setBarPlot(filteredBarplot);
    }
    setActive(value);
    handleClose();
  };

  useEffect(()=>{
    if (practicalThinkingFilters?.branch != undefined && practicalThinkingFilters?.branch != null) {
      localStorage.setItem("branch", practicalThinkingFilters?.branch);
      localStorage.setItem("course", practicalThinkingFilters?.course);
      localStorage.setItem("department", practicalThinkingFilters?.department);
      localStorage.setItem("user", practicalThinkingFilters?.user_name);

      setEndDate(practicalThinkingFilters?.end_date)
      setStartDate(practicalThinkingFilters?.start_date)

      dispatch(loadCourseList(`branch_id=${practicalThinkingFilters?.branch_id}`));
      dispatch(loadDepartmentList(`course_id=${practicalThinkingFilters?.course_id}`));
      dispatch(loadUsersList(`department_id=${practicalThinkingFilters?.department_id}`));

    }

  },[practicalThinkingAnalysis])

  const onDateSelect = (value) => {
    console.log("api calls",value)
    // const formattedStartDate = format(value.startDate, 'yyyy-MM-dd');
    // const formattedEndDate = format(value.endDate, 'yyyy-MM-dd');
    let params = {
      branch: localStorage.getItem("branch"),
      // branch:'All Branches',
      // course
      course: localStorage.getItem("course"),
      department: localStorage.getItem("department"),
      student_id: localStorage.getItem("user_id"),
      // start_date: formattedStartDate,
      // end_date: formattedEndDate
    };
    // if (startDate && endDate) {


      // route == "AdminDashboard" ? dispatch(loadInstitutionStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
      dispatch(loadPracticalThinkingAnalysis(params))
      // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
    // }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('/// : ', practicalThinkingAnalysis)
    Highcharts.chart('hardskills', {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      xAxis: {
        categories: practicalThinkingAnalysis.map(data => data.name),
        title: {
          text: 'Department'
        }
      },
      yAxis: {
        
        title: {
          text: 'Problem Solving %'
        },
        labels: {
          align: 'center'
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemDistance: 10
      },
      plotOptions: {
        column: {
          pointWidth: 100, // Adjust the width of the column bars here
          borderRadius: 5
        },
        series: {
          stacking: 'normal',
          borderRadius: 5
        }
      },
      series: [{
        name: 'Solved',
        data: practicalThinkingAnalysis.map(data => data.Solved),
        color: '#3D3B8E'
      }, {
        name: 'Not Solved',
        data: practicalThinkingAnalysis.map(data => data['Not Solved']),
        color: '#6883BA'
      }]
    });
  }, [practicalThinkingAnalysis]);
  
  return (
    <div className="flex-grow p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white mb-3 p-5 rounded-xl">
              <div
                className="bg-white mb-10"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <span className="text-2xl font-normal text-gray-900">
                  Practical Thinking
                </span> */}
                <div>
                <div className="flex justify-end mr-10 mb-3">
                  <div className="" onClick={onDateSelect}>
                    <PopUpFilter route="PracticalThinking" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate}/>
                  </div>
                  <div className="" onClick={onDateSelect}>
                    <PopUpFilter route="PracticalThinking" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate}/>
                  </div>
                  <div className="" onClick={onDateSelect}>
                    <PopUpFilter route="PracticalThinking" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate}/>
                  </div>
                  {/* {startDate != "" && (
                  <div className="">
                      <CustomDateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} onDateSelect={onDateSelect}/>
                    </div>
                  )} */}
                </div>
                </div>
              </div>
              <div className="mt-5 pt-3">
              <div id="hardskills"></div>
              {/* {practicalThinkingAnalysis?.length > 0 ? (
                <ResponsiveContainer width="100%" height={480}>
                  <BarChart data={practicalThinkingAnalysis} width={"1000px"}>
                    <CartesianGrid vertical={false} strokeDasharray="0 0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      dy={10}
                      dx={0}
                    >
                      <Label value="Department" position="bottom" dy={20} />
                    </XAxis>
                    <YAxis axisLine={false} tickLine={false} dx={-5}>
                      <Label
                        value="Problem Solving %"
                        position="middle"
                        angle={-90}
                        dx={-25}
                      />
                    </YAxis>
                    <Tooltip />
                    <Legend
                      formatter={(value, entry) =>
                        legendFormatter(value, entry)
                      }
                      layout="horizontal"
                      iconSize={0}
                      wrapperStyle={{
                        width: "95%",
                        left: "50px",
                        marginBottom: "20px",
                        top: "-50px",
                      }}
                    />
                    <Bar
                      dataKey="Solved"
                      stackId={"a"}
                      fill="#3D3B8E"
                      barSize={60}
                    />
                    <Bar
                      dataKey="Not Solved"
                      stackId={"a"}
                      fill="#6883BA"
                      barSize={60}
                      radius={[15, 15, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className='font-bold' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
                    <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
                    <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
                      There's no data to show here yet.
                    </div>
                  </div>
              )} */}
                {/* <ResponsiveContainer width="100%" height={480}>
                                    <BarChart
                                        data={_mockChartData}
                                        margin={{
                                            top: 20,
                                            right: 50,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} strokeDasharray="0 0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            interval={0}
                                            dy={10}
                                            dx={20}
                                        >
                                            <Label
                                                value="TIME"
                                                position="bottom"
                                                dy={20}
                                            />
                                        </XAxis>
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            dx={-5}
                                        >
                                            <Label
                                                value="EMOTIONS"
                                                position="middle"
                                                angle={-90}
                                                dx={-25}
                                            />
                                        </YAxis>
                                        <Tooltip />
                                        <Legend
                                            formatter={(value, entry) =>
                                                legendFormatter(value, entry)
                                            }
                                            layout="horizontal"
                                            iconSize={0}
                                            wrapperStyle={{
                                                width: "95%",
                                                left: '50px',
                                                marginBottom: '20px',
                                                top: '-50px'
                                            }}
                                        />
                                        <Bar
                                            dataKey="surprise"
                                            fill="#AFDFEF"
                                        />
                                        <Bar
                                            dataKey="disgust"
                                            fill="#E1885E"
                                        />
                                        <Bar
                                            dataKey="contempt"
                                            fill="#6B2F6B"
                                        />
                                        <Bar
                                            dataKey="happiness"
                                            fill="#9F9A8F"
                                        />
                                        <Bar
                                            dataKey="sadnesss"
                                            fill="#669548"
                                        />
                                        <Bar
                                            dataKey="anger"
                                            fill="#596EF2"
                                        />
                                        <Bar
                                            dataKey="fear"
                                            fill="#000000"
                                        />
                                    </BarChart>
                                </ResponsiveContainer> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalThinking;
