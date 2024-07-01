import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadQuizQuestions, quizSubmit } from "../../redux/action";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import Lottie from "react-lottie-player";
import PassAnimation from "../../assets/animation_pass.json";
import FailAnimation from "../../assets/animation_fail.json";
import LoadingAnimation from "../../assets/animation_loading.json";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import QuizResults from "./QuizResults";
import "./QuizPage.css";
import { useDarkMode } from "../../Dark";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const linearGradientBackground = 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)';
const textColor = '#ffffff';


const dummyquestions=[
  {
      "id": 1,
      "question": "Who developed Java?",
      "options": [
          "Newton",
          "Matt Lab",
          "James Gosling",
          "Ada Lovelace"
      ],
      "marks": 1,
      "correct_option": [],
      "selected_option": [
          3
      ],
      "answerType": "single"
  },
  {
      "id": 2,
      "question": "What is it called when the child object also gets killed when the parent object is killed in the program?",
      "options": [
          "Encapsulation",
          "Association",
          "Aggregation",
          "Composition"
      ],
      "marks": 0,
      "correct_option": [],
      "selected_option": [
          4
      ],
      "answerType": "single"
  },
  {
      "id": 3,
      "question": "Which of these components are used in a Java program for compilation, debugging, and execution?",
      "options": [
          "JVM",
          "JDK",
          "JRE",
          "JIT"
      ],
      "marks": 1,
      "correct_option": [],
      "selected_option": [
          2
      ],
      "answerType": "single"
  }
]

const dummyanswers=[
  {
    "all_options": [
      "Newton",
      "Matt Lab",
      "James Gosling",
      "Ada Lovelace"
    ],
    "correct_answers": [
      "James Gosling"
    ],
    "is_correct": true,
    "marks": 1,
    "question_id": 1,
    "selected_options": [
      3
    ]
  },
  {
    "all_options": [
      "Encapsulation",
      "Association",
      "Aggregation",
      "Composition"
    ],
    "correct_answers": [
      "Composition"
    ],
    "is_correct": true,
    "marks": 0,
    "question_id": 2,
    "selected_options": [
      4
    ]
  }
]
export default function QuizPage({ setValue }) {
  const { id } = useParams();
  const { quizView } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [evaluatedQuestions, setEvaluatedQuestions] = useState([]);

  const [viewResults, setViewResults] = useState(false);
  const dispatch = useDispatch();


  const { colorTheme } = useSelector((state) => state?.data);
  const { isDarkMode } = useDarkMode();

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;


  const textColor = isDarkMode
    ? colorTheme.dark.textColor3
    : colorTheme.light.textColor3;

  const handleChange = (index, selectedValue) => {
    let temp = [...questions];
    temp = temp?.map((o, ind) => {
      if (ind === index) {
        if (o.answerType === "multi") {
          const optionIndex = o.selected_option.indexOf(parseInt(selectedValue) + 1);
          if (optionIndex === -1) {
            o.selected_option.push(parseInt(selectedValue) + 1);
          } else {
            o.selected_option.splice(optionIndex, 1);
          }
        } else {
          o.selected_option = [parseInt(selectedValue) + 1];
        }
      }
      return o;
    });
    setQuestions(() => [...temp]);
  };

  const handleChangeClose = () => {
    setOpen(false);
    navigate("/studentQuizList");
  };

  const onSubmit = () => {
    setOpen(true);
    const payload = {
      "is_late": false,
      assignment_id: parseInt(id),
      content: questions?.map((o, idx) => ({
        question_id: idx + 1,
        selected_options: o?.selected_option,
      })),
    };
    dispatch(
      quizSubmit(payload, (resp) => {
        console.log("heher",questions,evaluatedQuestions)
        setEvaluatedQuestions(() => resp?.data?.evaluated_answers);
        setResults(() => resp?.data?.is_qulified);
        setTotalScore(() => resp?.data?.marks);
        setTotalMarks(() => resp?.data?.total_marks);
      })
    );
  };

  useEffect(() => {
    dispatch(loadQuizQuestions(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (quizView?.questions?.length) {
      let temp = quizView?.questions?.map((o, idx) => ({
        id: idx + 1,
        question: o?.question,
        options: o?.options,
        is_mandatory: o?.is_mandatory,
        marks: o?.marks,
        correct_option: o?.correct_option ?? [],
        selected_option: [],
        answerType: o?.answerType,
      }));
      setQuestions(() => [...temp]);
    }
  }, [quizView]);

  useEffect(() => {
    if (questions?.length) {
      setActiveQuestion(questions[activeQuestionIndex]);
    }
  }, [activeQuestionIndex, questions]);

  return viewResults ? (
    <QuizResults
      answers={evaluatedQuestions}
      questions={questions}
      pass={results}
      total_score={totalScore}
      total_marks={totalMarks}
    />
  ) : (
    <div className="quiz-container"> <div className="quiz-header flex items-center justify-between p-4 shadow-lg bg-white rounded-lg">
    <Button
      variant="outlined"
      className="mr-4"
      startIcon={<ArrowBackIcon />}
      style={{
        backgroundColor: "#f5f5f5",
        color: "#333"
      }}
      onClick={() => window.history.back()} 
    >
      Back
    </Button>
    <h2 className="flex-grow text-center text-xl font-semibold">{quizView?.name}</h2>
    <div className="quiz-actions flex space-x-4">
      <Button
        variant="outlined"
        style={{
          backgroundColor: "red",
          color: "white"
        }}
        onClick={() => setValue("1")}
      >
        End Test
      </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: linearGradientBackground,
          color: textColor
        }}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
      <div className="quiz-content">
        <div className="quiz-question-section">
          <div className="question-text border-2 border-[#e0e7ff] p-4 rounded-xl">
          <h3 className="question-title">Question {activeQuestionIndex + 1}</h3>
            {activeQuestion?.question}
          </div>
          {activeQuestion?.answerType === "single" ? (
            <FormControl className="options-group">
              <RadioGroup
                value={
                  activeQuestion?.selected_option?.length
                    ? activeQuestion?.selected_option[0] - 1
                    : null
                }
                onChange={(e, val) => handleChange(activeQuestionIndex, val)}
              >
                {activeQuestion?.options?.map((o, ind) => (
                  <FormControlLabel  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '8px',
                    borderRadius: '12px',
                  }} key={ind} value={ind} control={<Radio />}   className="shadow-md p-2 rounded-xl"
                   label={o} />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <FormControl className="options-group">
              {activeQuestion?.options?.map((o, ind) => (
                <FormControlLabel
                className="shadow-md p-2 rounded-xl"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '8px',
                  borderRadius: '12px',
                }}
                  key={ind}
                  control={
                    <Checkbox
                      checked={activeQuestion?.selected_option.includes(ind + 1)}
                      onChange={() => handleChange(activeQuestionIndex, ind)}
                    />
                  }
                  label={o}
                />
              ))}
            </FormControl>
          )}
          <div className="question-navigation">
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: textColor
              }}
              size="small"
              disabled={activeQuestionIndex === 0}
              onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: textColor
              }}
              size="small"
              disabled={activeQuestionIndex === questions?.length - 1}
              onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
            >
              Next
            </Button>

          </div>
        </div>
        <div className="quiz-sidebar">
          <div className="question-list">
            {questions.map((o, index) => (
              <div
                key={index}
                className={`question-item ${index === activeQuestionIndex
                  ? "active"
                  : o?.selected_option?.length
                    ? "attempted"
                    : ""
                  }`}
                onClick={() => setActiveQuestionIndex(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="question-status">
            <div className="status attempted">Attempted</div>
            <div className="status not-attempted">Not Attempted</div>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={handleChangeClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box">
            {results === null ? (
              <Lottie loop animationData={LoadingAnimation} play />
            ) : results ? (
              <div className="modal-content pass">
                <Lottie loop animationData={PassAnimation} play />
                <div className="modal-text">Your hard work and perseverance have paid off. Congratulations!</div>
                {/* <Button variant="contained" color="secondary" onClick={handleChangeClose}>
                  Continue
                </Button> */}
                <Button variant="contained" color="secondary" onClick={() => setViewResults(true)}>
                  View Results
                </Button>
              </div>
            ) : (
              <div className="modal-content fail">
                <Lottie loop animationData={FailAnimation} play />
                <div className="modal-text">Better Luck Next time</div>
                <Button variant="contained" color="secondary" onClick={() => setViewResults(true)}>
                  View Results
                </Button>
              </div>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}

QuizPage.propTypes = {
  setValue: PropTypes.func.isRequired,
};
