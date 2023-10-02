import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLessonList } from "../../redux/action";
import {Button,Divider} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Lesson from "../../assets/lesson.jpeg";
import { Image } from "@chakra-ui/image";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function LessonIndex() {
  const { lessonsList } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLessonList());
  }, [dispatch]);

  const LessonCards = ({id, title, access }) => {
    return (
      <div className="max-h-[320px]">
        {access ? (
          <div className="shadow-lg flex flex-col h-full bg-gray-200 min-h-[250px] rounded-lg overflow-hidden outline outline-purple-300">
            <div className="grid gap-2" >
            <Image src={Lesson} alt="Title" className="w-full h-[120px]" />
            <div className="p-2 flex flex-col gap-y-2 ">
              <div className="font-bold ">{title}</div>
              <div className="font-light text-sm">
                In the following section, we will work on how do we style the
                components using CSS modules and how to create a nice
                user-friendly mobile responsive website.
              </div>
            </div>
            </div>
            <div>

              <Divider />
            <div className="py-2 item-self-end w-full">
              <Button className="font-bold w-full  py-2"   endIcon={<ArrowForwardIcon />} onClick={()=>{navigate(`/lesson/${id}`)}} style={{color:"#9f7aea"}} > Complete Lesson </Button>
            </div>
            </div>
          </div>
        ) : (
          <div className="shadow-lg flex flex-col  h-full  bg-gray-200  rounded-lg overflow-hidden outline outline-purple-300">
            <div className="grid gap-2" >
            <Image src={Lesson} alt="Title" className="w-full h-[120px]" />
            <div className="p-2 flex flex-col gap-y-2 ">
              <div className="font-bold ">{title}</div>
              <div className="font-light text-sm">
                In the following section, we will work on how do we style the
                components using CSS modules and how to create a nice
                user-friendly mobile responsive website.
              </div>
            </div>
            </div>

            <div>

              <Divider />
            <div className="grid justify-center items-center">
              <Button endIcon={<HttpsOutlinedIcon style={{fontSize:"40px"}} className="text-purple-400"  />} disabled>  </Button>
            </div>
            </div>
            
          </div>
        )}
      </div>
    );
  };

  LessonCards.propTypes = {
    id: PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    access:PropTypes.bool.isRequired
  }
  return (
    <div className="w-full h-full overflow-y-auto px-4 ">
    <div className="text-3xl font-bold text-purple-800">
      Lessons
    </div>
    <Divider color="secondary" style={{margin:"10px 0px"}}  />
      <div
        className=" p-0 gap-5"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
        }}
      >
        {lessonsList?.map((o, index) => (
          <LessonCards id={o?.id} title={o?.title} access={!o?.locked} key={index} />
        ))}
      </div>
    </div>
  );
}
