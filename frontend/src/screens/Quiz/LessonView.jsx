import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { loadLessonView } from "../../redux/action";
import { Box, Button } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useParams } from "react-router-dom";
import QuizPage from "./QuizPage";
export default function LessonView() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const { lessonView } = useSelector((state) => state?.data);
  const [value, setValue] = React.useState("1");
  const [is_quiz_active,set_is_quiz_active] = useState(false)

  const handleChange = (event, newValue) => {
    // if(!is_quiz_active)
      // setValue(newValue);
  };

  const [frameHeight , setFrameHeight] = useState()

  useEffect(() => {
   const frame = document?.getElementById('myFrame');
   console.log("height" , frame?.contentWindow?.document?.body?.scrollHeight + "px")
          
   setTimeout(() => {
     setFrameHeight(frame?.contentWindow?.document?.body?.scrollHeight + "px")
    },100)
  
   },[lessonView])

  useEffect(() => {
    dispatch(loadLessonView(id));
  }, []);

  useEffect(() => {
    console.info(lessonView, "lessonView");
  }, [lessonView]);



  return (
    <div className="w-full h-full">
      <TabContext value={value}>
    
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="px-4 flex" >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab  label="Lesson" value="1" />
            <Tab label="Quiz" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="h-full w-full p-0 pb-4 overflow-y-scroll" >
        <div className="grid" >
        <iframe srcDoc={ lessonView?.lesson }
            id="myFrame"
            width="100%" 
            height={frameHeight}
            // frameBorder="0"
            scrolling="no"
            className="mb-12"
            >
            </iframe>
            <div className="mb-5 w-full flex justify-end " >
                <Button variant="contained" startIcon={<DoneAllIcon /> } style={{background:"linear-gradient(-45deg,#1c85ce , #5271ff)"}} onClick={()=>{setValue("2")}} >Mark completed</Button>
            </div>
        </div>
        </TabPanel>
        <TabPanel value="2" className="h-full w-full p-0 pb-4 overflow-y-scroll" ><QuizPage id={1}  setValue={setValue} /></TabPanel>
      </TabContext>
    </div>
  );
}
