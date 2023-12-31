import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import _mockChartData from "./EmotionSensing/_mockChartData.json";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDepartmentList,
  loadInstitutionStats,
  loadBrachList,
  loadCourseList,
  loadBehaviourAnalysis,
  setReduxState,
  getCourseList,
  getDepartmentList
} from "../../../redux/action";
import FilterCommon from "../../../Components/FilterCommon";
import { branchesList } from "./mockbranchesdata";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
import CustomDateRangePicker from "../../../Components/DateRange.jsx";

const BehaviourAnalysis = () => {
  window.onbeforeunload = ()=>{
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  const { behaviourAnalysis } = useSelector(
    (state) => state?.data
  );
  const dispatch = useDispatch();
  const [active, setActive] = React.useState("All Branches");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [branchesData, setBranchesData] = useState(branchesList);
  const open = Boolean(anchorEl);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {institutionStats, branchList, departmentList, courseList} = useSelector((state)=>state?.data)

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadBehaviourAnalysis());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);

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

  const handleMenuItemClick = (item) => {
    if (item == "All Branches") {
      dispatch(loadBehaviourAnalysis());
    } else {
      //  write filter code
      const emotions = ["Anger", "Contempt", "Disgust", "Fear", "Happiness", "Sadness", "Surprise"];
      const filteredBehaviourAnalysis = behaviourAnalysis.map((data) => {
        for (const emotion of emotions) {
          const randomValue = Math.floor(Math.random() * 100) + 1;
          data[emotion] = randomValue;
        }
        return data;
      });

      //here name is the name of the state which you want to set in reducer and value is the value which you want to set
      dispatch(setReduxState({name: 'behaviourAnalysis', value: filteredBehaviourAnalysis}))
    }
    setActive(item);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const stroke = [
    "#1F77B4",
    "#FF7F0E",
    "#2CA02C",
    "#D62728",
    "#9467BD",
    "#8C564B",
  ];
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
                  Behavioural Analysis
                </span> */}
                <span className="text-xs uppercase text-gray-600"></span>
                <span>
                <div className="flex justify-end mr-10 mb-3">
                  <div className="">
                    <PopUpFilter route="BehaviourAnanlysis" list="Branches" dependencyList={branchList}/>
                  </div>
                  <div className="">
                    <PopUpFilter route="BehaviourAnanlysis" list="Courses" dependencyList={courseList}/>
                  </div>
                  <div className="">
                    <PopUpFilter route="BehaviourAnanlysis" list="Departments" dependencyList={departmentList}/>
                  </div>
                  <div className="">
                      <CustomDateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate}/>
                    </div>
                </div>
                {/* <FilterCommon
                    handleClose={handleClose}
                    handleMenuItemClick={handleMenuItemClick}
                    handleClick={handleClick}
                    active={active}
                    anchorEl={anchorEl}
                    open={open}
                    defaultValue={"All Branches"}
                    data={branchesData}
                  /> */}
                </span>
              </div>
              <div className="mt-5 pt-3">
                <ResponsiveContainer width="100%" height={480}>
                  <LineChart
                    data={behaviourAnalysis}
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
                      <Label value="TIME" position="bottom" dy={20} />
                    </XAxis>
                    <YAxis axisLine={false} tickLine={false} dx={-5}>
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
                        left: "50px",
                        marginBottom: "20px",
                        top: "-50px",
                      }}
                    />

                    {behaviourAnalysis?.map((analysis, index) => {
                      const keys = Object.keys(analysis);
                      return (
                        <>
                          <Line
                            type={"basic"}
                            dataKey={keys[index].toString()}
                            stroke={stroke[index]}
                            strokeWidth={4}
                          />
                        </>
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviourAnalysis;
