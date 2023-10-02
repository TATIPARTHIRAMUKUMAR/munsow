import PropTypes from "prop-types";
import { Check } from "@mui/icons-material";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function QuizResults({ questions ,pass ,total_score,total_marks}) {
    
    const navigate = useNavigate()

    const handleChangeClose = () => {
        navigate("/lessons")
      }

  return (
    <div className="grid gap-2 mb-4">
     <div className="text-purple-800 text-2xl font-semibold flex items-center justify-between gap-4 " >
     Quiz Results 
     <span className={`  border-2  border-dashed py-1 text-xl px-2 min-w-[100px] text-center rounded-3xl ${ pass ? "border-green-500 text-green-500 ": "border-red-500 text-red-500 "}`} >
    {total_score}/{total_marks} { pass ? " Pass " : " Fail " }
     </span>
     </div>
    <div className="grid gap-2 ">
      {questions?.map((o,index) => {
        return (
            <>
          <div className="p-2  rounded text-xl text-gray-500 grid gap-1 bg-purple-200" key={o?.id}>
            <div className={`${o?.selected_option?.length &&
                o?.selected_option[0] === o?.correct_option[0] ? "text-green-500" : "text-red-500" } flex items-center gap-2 font-semibold text-gray-600`}>
                {index+1}{"."} {o?.question}
              <span>
                {o?.selected_option?.length &&
                o?.selected_option[0] === o?.correct_option[0] ? (
                  <CheckCircleOutlineOutlinedIcon className="text-green-500" />
                ) : (
                  <ReportGmailerrorredOutlinedIcon color="error" />
                )}
              </span>
            </div>
            <div className="grid md:grid-cols-2 items-center ">
              {o?.options?.map((x, ind) => {
                return (
                  <div key={ind} className="col-span-1">
                    {o?.correct_option[0] === ind + 1 ? (
                      <div className="text-green-500 flex items-center gap-2">
                        <CircleIcon
                          fontSize="small"
                          style={{ fontSize: "small" }}
                        />
                        {x} <Check />
                      </div>
                    ) : (o?.selected_option?.length && o?.selected_option[0] !== o?.correct_option[0] && o?.selected_option[0] === ind+1 )  ? (
                      <div className="text-red-600 flex items-center gap-2">
                        <CircleIcon
                          fontSize="small"
                          style={{ fontSize: "small" }}
                        />
                        {x} <ClearOutlinedIcon fontSize="small" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CircleIcon
                          style={{ color: "gray", fontSize: "small" }}
                        />
                        {x}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          </>
        );
      })}
      
    </div>
      <Button color="secondary" className="justify-self-center w-[50vw] my-10 " style={{fontWeight:"semi-bold",fontSize:"16px"}} variant="contained" onClick={()=>{
        handleChangeClose()
      }} >
                Close
          </Button>
  </div>
  );
}
QuizResults.propTypes = {
  questions: PropTypes.object.isRequired,
  pass : PropTypes.bool.isRequired
};
