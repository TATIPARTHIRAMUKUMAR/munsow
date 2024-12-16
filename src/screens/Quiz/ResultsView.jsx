import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadResultAssignment } from "../../redux/action";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function QuizResultView({ setValue = () => {} }) {
  const { id } = useParams();
  const { resultAssignment } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadResultAssignment(id));
    setValue?.("Quiz Results");
  }, [dispatch, id, setValue]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={handleBack}
          >
            Back
          </Button>
          <h2 className="text-2xl font-semibold">{`Quiz Result - Assignment ID: ${resultAssignment?.assignment_id}`}</h2>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Quiz Details</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Status:</strong> {resultAssignment?.status}</p>
            <p><strong>Marks Obtained:</strong> {resultAssignment?.marks}</p>
            <p><strong>Qualified:</strong> {resultAssignment?.is_qualified ? "Yes" : "No"}</p>
            <p><strong>Attempt Number:</strong> {resultAssignment?.attempt_number}</p>
            <p><strong>Submitted Date:</strong> {new Date(resultAssignment?.created_date).toLocaleString()}</p>
            <p><strong>Updated Date:</strong> {new Date(resultAssignment?.updated_date).toLocaleString()}</p>
          </div>
          <div className={`mt-4 py-2 px-4 border-2 rounded-full text-center ${resultAssignment?.is_qualified ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>
            <strong>Overall Score:</strong> {resultAssignment?.marks} {resultAssignment?.is_qualified ? "(Qualified)" : "(Not Qualified)"}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quiz Questions and Answers</h3>
          <div className="space-y-4">
            {resultAssignment?.evaluation_data?.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                <div className={`flex items-center gap-2 font-semibold ${question.is_correct ? "text-green-500" : "text-red-500"}`}>
                  {index + 1}. Question ID: {question.question_id}
                  <span>
                    {question.is_correct ? (
                      <CheckCircleIcon className="text-green-500" />
                    ) : (
                      <CancelIcon className="text-red-500" />
                    )}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 mt-2">
                  {question.all_options.map((option, idx) => {
                    const isCorrect = question.correct_answers.includes(option);
                    const isSelected = question.selected_options.includes(idx + 1);
                    return (
                      <div key={idx} className={`flex items-center gap-2 p-2 rounded-md ${isSelected ? (isCorrect ? "bg-green-100" : "bg-red-100") : ""}`}>
                        <span className={`flex items-center ${isCorrect ? "text-green-500" : isSelected ? "text-red-500" : "text-gray-700"}`}>
                          {String.fromCharCode(65 + idx)}. {option}
                          {isCorrect && <CheckCircleIcon className="ml-2" fontSize="small" />}
                          {isSelected && !isCorrect && <CancelIcon className="ml-2" fontSize="small" />}
                        </span>
                      </div>
                    );
                  })}
                  {!question.selected_options.some(option => question.correct_answers.includes(question.all_options[option - 1])) && (
                    <p className="text-sm text-gray-600 mt-2">Correct Answer: {question.correct_answers.join(', ')}</p>
                  )}
                </div>
                <p className="text-sm mt-2"><strong>Marks:</strong> {question.marks}</p>
                <p className="text-sm mt-2"><strong>Is Correct:</strong> {question.is_correct ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
}

QuizResultView.propTypes = {
  setValue: PropTypes.func,
};

QuizResultView.defaultProps = {
  setValue: () => {},
};
