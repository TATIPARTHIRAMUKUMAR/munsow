import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDetailedAssignment } from "../../redux/action";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function QuizAssignmentView({ setValue }) {
  const { id } = useParams();
  const { quizAssignmentView } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDetailedAssignment(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={handleBack}
        >
          Back
        </Button>
        <h2 className="text-xl font-semibold">{quizAssignmentView?.name}</h2>
       
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quiz Details</h3>
          <p><strong>Name:</strong> {quizAssignmentView?.name}</p>
          <p><strong>Description:</strong> {quizAssignmentView?.description}</p>
          <p><strong>Status:</strong> {quizAssignmentView?.status}</p>
          <p><strong>Max Time:</strong> {quizAssignmentView?.max_time_min} minutes</p>
          <p><strong>Number of Reattempts:</strong> {quizAssignmentView?.number_of_reattempt}</p>
          <p><strong>Auto Assignment Notification:</strong> {quizAssignmentView?.auto_assignment_notification ? "Yes" : "No"}</p>
          <p><strong>Auto Reminders:</strong> {quizAssignmentView?.auto_reminders ? "Yes" : "No"}</p>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quiz Questions and Answers</h3>
          <ul>
            {quizAssignmentView?.questions?.map((question, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold">Q{index + 1}: {question.question} <span className="font-normal text-sm">({question.marks} marks)</span></p>
                <ul className="mt-2">
                  {question.options.map((option, idx) => {
                    const isSelected = question?.selected_option?.includes(idx + 1);
                    const isCorrect = question?.correctAnswer.includes(option);
                    return (
                      <li key={idx} className={`py-1 px-2 rounded-md flex items-center gap-2 ${isSelected ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : ''}`}>
                        {String.fromCharCode(65 + idx)}. {option}
                        {isSelected && (
                          isCorrect ? <CheckCircleIcon className="text-green-700 ml-2" /> : <CancelIcon className="text-red-700 ml-2" />
                        )}
                        {isCorrect && !isSelected && (
                          <CheckCircleIcon className="text-green-700 ml-2" />
                        )}
                      </li>
                    );
                  })}
                  {!question?.selected_option?.some((option) => question.correctAnswer.includes(question.options[option - 1])) && (
                    <p className="text-sm text-gray-600 mt-2">Correct Answer: {question.correctAnswer.join(', ')}</p>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

QuizAssignmentView.propTypes = {
  setValue: PropTypes.func.isRequired,
};
