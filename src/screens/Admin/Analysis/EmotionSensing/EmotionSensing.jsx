import PositiveEmotionsChart from "./PositiveEmotionsChart";
import NeutralEmotionsChart from "./NeutralEmotionsChart";
import NegativeEmotionsChart from "./NegativeEmotionsChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadEmotionStats } from "../../../../redux/action";


const EmotionSensing = () => {
  const dispatch = useDispatch();

  const { emotionStats } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadEmotionStats());
  }, [])

  return (
    <div>
      <div className="bg-white p-10">
        <div className="pb-5">
          <span className="text-2xl ">Emotion Sensing - </span>
          <span className="text-lg">Time wise emotions</span>
        </div>
        <div className="flex">
          <div className="w-[32rem] mx-6">
            <PositiveEmotionsChart data={emotionStats?.graph_1?.data} name={emotionStats?.graph_1?.name}/>
          </div>
          <div className="w-[32rem] mx-6">
            <NeutralEmotionsChart data={emotionStats?.graph_2?.data} name={emotionStats?.graph_2?.name}/>
          </div>
        </div>
          <div className="max-w-lg mx-80">
            <NegativeEmotionsChart data={emotionStats?.graph_3?.data} name={emotionStats?.graph_3?.name}/>
          </div>
      </div>
    </div>
  );
};

export default EmotionSensing;
