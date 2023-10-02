import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadQuizQuestions, quizSubmit } from "../../redux/action";
import Radio from "@mui/material/Radio";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  RadioGroup,
} from "@mui/material";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import Lottie from "react-lottie-player";
import PassAnimation from "../../assets/animation_pass.json";
import FailAnimation from "../../assets/animation_fail.json";
import LoadingAnimation from "../../assets/animation_loading.json";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import QuizResults from "./QuizResults";

export default function QuizPage({ id,setValue }) {
  const { quizView } = useSelector((state) => state.data);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const [results,setResults] = useState(null);
  const [totalScore,settotalScore]=useState(null);
  const [totalMarks,setTotalMarks]=useState(null);


  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [questions, setQuestions] = useState([]);

  const [viewresults,setViewResults] = useState(false)

  const dispatch = useDispatch();

  const handleChange = (index, selectedValue) => {
    // setSelectedValue(event.target.value);
    let temp = [...questions];
    temp = temp?.map((o, ind) => {
      if (ind == index) o.selected_option = [parseInt(selectedValue)+1];
      return o;
    });
    setQuestions(() => [...temp]);
    console.log(temp, "onChange");
  };

  
  const handleChangeClose = () => {
    setOpen(false);
    navigate("/lessons")
  }
  
  const onSubmit = () => {
    setOpen(true)
    const payload = {
      user_id: GLOBAL_CONSTANTS?.user_cred?.user_id,
      quiz_id: id,
      content: questions?.map((o) => ({
        question_id: o?.id,
        selected_options: o?.selected_option,
      })),
    };
    dispatch(quizSubmit(payload, (resp) => {
    console.info(resp,"results")
        setResults(()=>resp?.is_qualified);
        settotalScore(()=>resp?.score)
        setTotalMarks(()=>resp?.total_marks)
        // setTimeout(()=>{
        //     handleChangeClose();
        // },3000)
    }));
  };


  useEffect(() => {
    dispatch(loadQuizQuestions(id));
  }, []);
  useEffect(()=>{
    console.info(results,"results")
  },[results])

  useEffect(() => {
    if (quizView?.questions?.length) {
      let temp = quizView?.questions?.map((o) => ({
        id: o?.id,
        question: o?.content?.questions,
        options: o?.content?.options,
        is_mandatory: o?.content?.is_mandatory,
        marks: o?.content?.marks,
        correct_option: o?.content?.correct_option ?? [],
        selected_option: [],
      }));
      setQuestions(() => [...temp]);
    }
  }, [quizView]);

  useEffect(() => {
    if (questions?.length) {
      setActiveQuestion(questions[activeQuestionIndex]);
    }
  }, [activeQuestionIndex, questions]);


  return (
    viewresults? <>
    <QuizResults questions={questions} pass={results} total_score={totalScore} total_marks={totalMarks}/>
    </>:
    <>
      <div className=" w-full flex flex-col gap-4 ">
        <div className=" flex items-center justify-between font-custom_1 text-xl font-semibold">
          <div>{quizView?.title}</div>
          <div className="flex gap-4" >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setValue("1")
            }}
          >
            {" "}
            End Test{" "}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              onSubmit();
            }}
          >
            {" "}
            Submit{" "}
          </Button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col  md:grid md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 w-full h-full p-4 rounded bg-purple-200 md:col-span-2">
            <div className="text-lg font-medium">
              {activeQuestion?.question}
            </div>

            <div className="grid gap-y-4 w-full h-full  rounded bg-purple-200 md:col-span-2">
              {activeQuestion?.correct_option?.length === 1 ? (
                <FormControl style={{ width: "100%" }}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={
                      activeQuestion?.selected_option?.length
                        ? activeQuestion?.selected_option[0] - 1
                        : null
                    }
                    onChange={(e, val) =>
                      handleChange(activeQuestionIndex, val)
                    }
                    className="w-full"
                  >
                    <div className="grid  gap-y-4 items-center ">
                      {activeQuestion?.options?.map((o, ind) => {
                        return (
                          <div key={ind} className="col-span-1">
                            <FormControlLabel
                              value={ind}
                              control={<Radio />}
                              label={o}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </FormControl>
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                disabled={activeQuestionIndex === 0 ? true : false}
                onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
              >
                Prev
              </Button>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                disabled={
                  activeQuestionIndex === questions?.length - 1 ? true : false
                }
                onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>

          <div className=" w-full h-full p-4 rounded bg-purple-200 hidden md:block ">
            <div
              className="gap-2"
              style={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "repeat( auto-fill ,minmax(30px,1fr))",
              }}
            >
              {questions.map((o, index) => {
                return (
                  <div
                    className={`flex justify-center items-center text-center rounded p-2 cursor-pointer ${
                      index == activeQuestionIndex
                        ? "border border-purple-600 bg-gray-200 text-black"
                        : o?.selected_option?.length
                        ? " border border-green-600 bg-green-600 "
                        : "border border-purple-600 bg-purple-600 text-white"
                    }`}
                    key={index}
                    onClick={() => {
                      setActiveQuestionIndex(index);
                    }}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => {
            handleChangeClose();

          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              handleChangeClose();
            }}
          >
            <Box
              style={{
                position:"relative",
                // background: "white",
                borderRadius: "8px",
                padding: "10px",
                width: "calc(min(600px,100%))",
                minHeight:"60vh",
                height:"max-content",
                // maxHeight:"80vh",
                overflow:"hidden"

              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >

                {
                  results === null ?
                <Lottie
                  loop
                  animationData={LoadingAnimation}
                  play
                  // style={{ width: 150, height: 150 }}
                />
                :
                  results ?
                  <div className="flex flex-col gap-4 items-center justify-center" >
                <Lottie
                  loop
                  animationData={PassAnimation}
                  play
                  style={{ width: "80%" }}
                />
                  <div className="text-3xl font-bold text-white"> Your hard work and perseverance have paid off. Congratulations! </div>
                  <div className="flex justify-end gap-x-4">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleChangeClose();

                    }}
                  >
                    {" "}
                    Continue{" "}
                  </Button>
                </div>
                </div>
                :
                <div className="flex flex-col gap-4 items-center justify-center" >
                <Lottie
                  loop
                  animationData={FailAnimation}
                  play
                  style={{ width: "80%" }}
                />
                  <div className="text-3xl font-bold text-white"> Better Luck Next time </div>
                  <div className="flex justify-end gap-x-4">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setViewResults(()=>true)

                    }}
                  >
                    {" "}
                    View Results{" "}
                  </Button>
                </div>
                </div>
                }

                
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
QuizPage.propTypes = {
  id: PropTypes.number.isRequired,
  setValue : PropTypes.func.isRequired
}
  