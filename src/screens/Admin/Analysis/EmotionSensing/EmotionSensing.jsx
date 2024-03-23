import PositiveEmotionsChart from "./PositiveEmotionsChart";
import NeutralEmotionsChart from "./NeutralEmotionsChart";
import NegativeEmotionsChart from "./NegativeEmotionsChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadEmotionStats, setReduxState, loadBrachList, getDepartmentList, getCourseList, loadCourseList, loadDepartmentList, loadUsersList } from "../../../../redux/action";
import FilterCommon from "../../../../Components/FilterCommon";
import { branchesList } from "../mockbranchesdata";
import PopUpFilter from "../../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../../GlobalConstants.js";
import CustomDateRangePicker from "../../../../Components/DateRange.jsx";
import format from 'date-fns/format';

const EmotionSensing = () => {
  window.onbeforeunload = () => {
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  const [branchesData, setBranchesData] = useState(branchesList);
  const [active, setActive] = useState("All Branches");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { emotionStats, emotionFilters, branchList, courseList, departmentList, userListByDepartment } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadEmotionStats());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    if (value == "All Branches") {
      dispatch(loadEmotionStats());
    } else {
      // use api to filter the data using id
      const copyEmotionstats = { ...emotionStats };
      copyEmotionstats.graph_1 = {
        ...copyEmotionstats.graph_1,
        data: copyEmotionstats.graph_1.data.map((data) => {
          return {
            ...data,
            Happiness: Math.floor(Math.random() * 100),
          };
        })
      }
      copyEmotionstats.graph_2 = {
        ...copyEmotionstats.graph_2,
        data: copyEmotionstats.graph_2.data.map((data) => {
          return {
            ...data,
            Happiness: Math.floor(Math.random() * 100),
          };
        })
      }
      const emotions = ["Anger", "Contempt", "Disgust", "Fear", "Happiness", "Sadness", "Surprise"];
      copyEmotionstats.graph_3 = {
        ...copyEmotionstats.graph_3,
        data: copyEmotionstats.graph_3.data.map((data) => {
          for (const emotion of emotions) {
            const randomValue = Math.floor(Math.random() * 100) + 1;
            data[emotion] = randomValue;
          }
          return data
        })
      }
      dispatch(setReduxState({ name: 'emotionStats', value: copyEmotionstats }))
    }
    setActive(value);
    handleClose();
  };

  useEffect(()=>{
    if (emotionFilters?.branch != undefined && emotionFilters?.branch != null) {
      localStorage.setItem("branch", emotionFilters?.branch);
      localStorage.setItem("course", emotionFilters?.course);
      localStorage.setItem("department", emotionFilters?.department);
      localStorage.setItem("user", emotionFilters?.user_name);

      setEndDate(emotionFilters?.end_date)
      setStartDate(emotionFilters?.start_date)

      dispatch(loadCourseList(`branch_id=${emotionFilters?.branch_id}`));
      dispatch(loadDepartmentList(`course_id=${emotionFilters?.course_id}`));
      dispatch(loadUsersList(`department_id=${emotionFilters?.department_id}`));


    }

  },[emotionStats])

  const onDateSelect = (value) => {
    console.log("api calls",value)
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
      dispatch(loadEmotionStats(params))
      // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const PositiveEmotions = [
    { 'name': 'Point 1', 'Happiness': 3 },
    { 'name': 'Point 2', 'Happiness': 4 },
    { 'name': 'Point 3', 'Happiness': 6 },
    { 'name': 'Point 4', 'Happiness': 2 },
    { 'name': 'Point 5', 'Happiness': 5 }
  ];
  const NeutralEmotions = [
    { 'name': 'Point 1', 'Suprise': 3 },
    { 'name': 'Point 2', 'Suprise': 5 },
    { 'name': 'Point 3', 'Suprise': 6 },
    { 'name': 'Point 4', 'Suprise': 2 },
    { 'name': 'Point 5', 'Suprise': 1 }
  ];
  const NegativeEmotions = [
    { 'name': 'Point 1', 'Disgust': 2, 'Contempt': 3, 'Sadnesss': 4, 'Anger': 5, 'Fear': 2 },
    { 'name': 'Point 2', 'Disgust': 3, 'Contempt': 2, 'Sadnesss': 5, 'Anger': 4, 'Fear': 3 },
    { 'name': 'Point 3', 'Disgust': 4, 'Contempt': 5, 'Sadnesss': 3, 'Anger': 3, 'Fear': 4 },
    { 'name': 'Point 4', 'Disgust': 3, 'Contempt': 4, 'Sadnesss': 2, 'Anger': 2, 'Fear': 5 },
    { 'name': 'Point 5', 'Disgust': 5, 'Contempt': 3, 'Sadnesss': 4, 'Anger': 4, 'Fear': 3 }
  ];

  return (
    <div>
      <div className="bg-white p-10">
        <div
          className="pb-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <div>
            <span className="text-2xl ">Emotion Sensing  </span>
          </div> */}
          <div>
            <div className="flex justify-end mr-10 mb-3">
              <div className="">
                <PopUpFilter route="EmotionSensing" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate}/>
              </div>
              <div className="">
                <PopUpFilter route="EmotionSensing" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate}/>
              </div>
              <div className="">
                <PopUpFilter route="EmotionSensing" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate}/>
              </div>
              <div className="">
                <PopUpFilter route="EmotionSensing" list="user" dependencyList={userListByDepartment} startDate={startDate} endDate={endDate}/>
              </div>
              {startDate != "" && (
              <div className="">
                <CustomDateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} onDateSelect={onDateSelect}/>
              </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[32rem] mx-6">
            <PositiveEmotionsChart
              // data={emotionStats?.graph_1?.data}
              data={PositiveEmotions}
              name={emotionStats?.graph_1?.name}
            />
          </div>
          <div className="w-[32rem] mx-6">
            <NeutralEmotionsChart
              // data={emotionStats?.graph_2?.data}
              data={NeutralEmotions}
              name={emotionStats?.graph_2?.name}
            />
          </div>
        </div>
        <div className="max-w-lg mx-80">
          <NegativeEmotionsChart
            // data={emotionStats?.graph_3?.data}
            data={NegativeEmotions}
            name={emotionStats?.graph_3?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default EmotionSensing;
