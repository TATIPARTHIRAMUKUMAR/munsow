import PropTypes from "prop-types";
import {
  CheckCircleOutlineOutlined as CorrectIcon,
  ReportGmailerrorredOutlined as IncorrectIcon,
  ClearOutlined as ClearIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuizResults({ questions, answers, pass, total_score, total_marks }) {
  const navigate = useNavigate();

  const handleChangeClose = () => {
    navigate("/studentQuizList");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto m-10">
      <div className="text-purple-800 text-2xl font-semibold flex items-center justify-between mb-4">
        Quiz Results
        <span
          className={`border-2 border-dashed py-1 text-xl px-2 min-w-[100px] text-center rounded-3xl ${
            pass ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
          }`}
        >
          {total_score}/{total_marks} {pass ? "Pass" : "Fail"}
        </span>
      </div>
      <div className="space-y-4">
        {questions?.map((question, index) => {
          const answer = answers.find(a => a.question_id === question.id);
          return (
            <div key={question.id} className="p-4 rounded-lg bg-white shadow-md">
              <div
                className={`flex items-center gap-2 font-semibold ${
                  answer?.is_correct ? "text-green-500" : "text-red-500"
                }`}
              >
                {index + 1}. {question.question}
                <span>
                  {answer?.is_correct ? (
                    <CorrectIcon className="text-green-500" />
                  ) : (
                    <IncorrectIcon color="error" />
                  )}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-2 mt-2">
                {question.options.map((option, ind) => {
                  const isCorrect = answer?.correct_answers.includes(option);
                  const isSelected = answer?.selected_options.includes(ind + 1);
                  return (
                    <div key={ind} className={`flex items-center gap-2 p-2 ${isSelected ? "bg-gray-200 rounded-lg" : ""}`}>
                      <CircleIcon
                        fontSize="small"
                        className={`${
                          isCorrect ? "text-green-500" : isSelected ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                      {option}
                      {isCorrect && <CorrectIcon className="text-green-500" fontSize="small" />}
                      {isSelected && !isCorrect && <ClearIcon className="text-red-500" fontSize="small" />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Button
        color="secondary"
        className="w-full mt-6 "
        style={{ fontWeight: "semi-bold", fontSize: "16px",marginTop:"20px" }}
        variant="contained"
        onClick={handleChangeClose}
      >
        Close
      </Button>
    </div>
  );
}

QuizResults.propTypes = {
  questions: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  pass: PropTypes.bool.isRequired,
  total_score: PropTypes.number.isRequired,
  total_marks: PropTypes.number.isRequired,
};
