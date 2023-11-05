import PositiveEmotionsChart from "./PositiveEmotionsChart";
import NeutralEmotionsChart from "./NeutralEmotionsChart";
import NegativeEmotionsChart from "./NegativeEmotionsChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadEmotionStats, setReduxState,loadBrachList, getDepartmentList, getCourseList } from "../../../../redux/action";
import FilterCommon from "../../../../Components/FilterCommon";
import { branchesList } from "../mockbranchesdata";
import PopUpFilter from "../../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../../GlobalConstants.js";

const EmotionSensing = () => {
  window.onbeforeunload = ()=>{
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

  const { emotionStats, branchList, courseList, departmentList, userListByDepartment } = useSelector((state) => state.data);

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
      })}
      const emotions = ["Anger", "Contempt", "Disgust", "Fear", "Happiness", "Sadness", "Surprise"];
      copyEmotionstats.graph_3 = {
        ...copyEmotionstats.graph_3,
        data: copyEmotionstats.graph_3.data.map((data) => {
          for (const emotion of emotions) {
              const randomValue = Math.floor(Math.random() * 100) + 1;
              data[emotion] = randomValue;
            }
        return data
      })}
      dispatch(setReduxState({name: 'emotionStats', value: copyEmotionstats}))
    }
    setActive(value);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="bg-white p-10">
        <div
          className="pb-5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <span className="text-2xl ">Emotion Sensing  </span>
            {/* <span className="text-lg">Time wise emotions</span> */}
          </div>
          <div>
          <div className="flex justify-end mr-10 mb-3">
            <div className="">
              <PopUpFilter route="EmotionSensing" list="Branches" dependencyList={branchList}/>
            </div>
            <div className="">
              <PopUpFilter route="EmotionSensing" list="Courses" dependencyList={courseList}/>
            </div>
            <div className="">
              <PopUpFilter route="EmotionSensing" list="Departments" dependencyList={departmentList}/>
            </div>
            <div className="">
              <PopUpFilter route="EmotionSensing" list="user" dependencyList={userListByDepartment}/>
            </div>
          </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[32rem] mx-6">
            <PositiveEmotionsChart
              data={emotionStats?.graph_1?.data}
              name={emotionStats?.graph_1?.name}
            />
          </div>
          <div className="w-[32rem] mx-6">
            <NeutralEmotionsChart
              data={emotionStats?.graph_2?.data}
              name={emotionStats?.graph_2?.name}
            />
          </div>
        </div>
        <div className="max-w-lg mx-80">
          <NegativeEmotionsChart
            data={emotionStats?.graph_3?.data}
            name={emotionStats?.graph_3?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default EmotionSensing;
