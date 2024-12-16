import React, { useState, useEffect } from 'react';
import { useDarkMode } from "./../../Dark";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create_mrclm_course, loadTrees } from '../../redux/action';
import axios from 'axios';
import { toast } from 'react-toastify';

const options = [
  { value: 'images', label: 'Images', color: 'border-red-500', hash: '#EF4444' },
  { value: 'urls', label: 'URLs', color: 'border-blue-500', hash: '#3B82F6' },
  { value: 'documents', label: 'PDFs, PPT, Doc', color: 'border-green-500', hash: '#10B981' },
  { value: 'search', label: 'Search', color: 'border-purple-500', hash: '#8B5CF6' },
];

const StudentMRCLM = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colorTheme } = useSelector((state) => state?.data);
  const trees = useSelector((state) => state?.data?.treeList?.courses);
  const quizzes = useSelector((state) => state?.data?.treeList?.quizzes || []);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadTrees());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isAddClicked) {
  //     // dispatch(loadTrees());
  //     window.location.reload();
  //   }
  // }, [dispatch, isAddClicked]);

  // // useEffect(() => {
  // //   if (trees?.length > 0 && isAddClicked) {
  // //     const latestCourseId = trees[trees.length - 1]?.course_id;
  // //     if (latestCourseId) {
  // //       navigate(`/studentMRCLM/view/${latestCourseId}`);
  // //       setIsAddClicked(false); 
  // //     }
  // //   }
  // // }, [trees, isAddClicked, navigate]);

  // const handleAddClick = async () => {
  //   try {
  //     const response = await dispatch(create_mrclm_course({ name: searchText, description: descriptionText }));
  //     const courseId = response?.data?.course_id;
  //     if (courseId) {
  //       navigate(`/studentMRCLM/view/${courseId}`);
  //     }
  //   } catch (error) {
  //     console.warn("Ignoring API response error:", error);
  //   } finally {
  //     closeModal();
  //     setIsAddClicked(true);
  //   }
  // };
  

  useEffect(() => {
    if (isAddClicked) {
      dispatch(loadTrees());
    }
  }, [dispatch, isAddClicked]);
  
  useEffect(() => {
    if (trees?.length > 0 && isAddClicked) {
      const latestCourse = trees.find(
        (course) => course.course_name === searchText // Match based on name
      );
      if (latestCourse) {
        navigate(`/studentMRCLM/view/${latestCourse.course_id}`);
        setIsAddClicked(false);
        setIsLoading(false);
      }
    }
  }, [trees, isAddClicked, navigate, searchText]);
  
  const handleAddClick = async () => {
    try {
      setIsLoading(true);
      const response = await dispatch(create_mrclm_course({ name: searchText, description: descriptionText }));
      if (response) {
        setIsAddClicked(true);
      }
    } catch (error) {
      console.warn("Ignoring API response error:", error);
      setIsLoading(false);
    } finally {
      closeModal();
    }
  };
  
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDescriptionChange = (event) => { 
    setDescriptionText(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchText(''); 
    setDescriptionText('');
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleGenerateClick = () => {
    if (selectedOption === 'search') {
      setIsModalOpen(true);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/studentMRCLM/view/${courseId}`);
  };

  const handleQuizClick = (quizId) => {
    navigate(`/studentMRCLM/quiz_view/${quizId}`);
  };

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;

  const textColor = isDarkMode
    ? colorTheme.dark.background
    : colorTheme.light.background;

  return (
    <div className="bg-gradient-to-b from-[#E0F7FA] to-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-[60px] mt-[20px]">
        Please Upload Study Material
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        {options?.map((option) => (
          <label key={option?.value} className={`flex items-center ${option?.color} rounded-full border pl-4 p-2 bg-white border-2 cursor-pointer transition-all`}>
            <span className="px-[50px]">{option?.label}</span>
            <input
              type="radio"
              name="uploadOption"
              value={option?.value}
              checked={selectedOption === option?.value}
              onChange={() => handleRadioChange(option?.value)}
              className={`w-4 h-4 mr-4`}
              style={{
                color: option?.hash
              }}
            />
          </label>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <button 
          onClick={handleGenerateClick}
          className="px-8 py-2 rounded-lg shadow-md hover:bg-teal-500 transition-all"
          style={{
            background: linearGradientBackground,
            color: textColor
          }}
        >
          Generate
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="fixed inset-x-[430px] top-[100px] bg-gradient-to-b from-purple-50 to-white border border-2 border-purple-500 rounded-xl p-8 w-[400px] md:w-[80%] lg:w-[53%]">
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl float-right">
              &times;
            </button>
            <div className='my-[10px] px-[50px] mt-[30px]'>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Enter Your Concept Title</h2>
              </div>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                value={searchText}
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                value={descriptionText}
                onChange={handleDescriptionChange}
              />
              <div className="flex justify-center mt-10">
                <button 
                  onClick={handleAddClick}
                  className="px-20 py-2 rounded-md shadow-lg hover:bg-teal-600 text-bold transition-all"
                  style={{
                    background: linearGradientBackground,
                    color: textColor
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {trees?.length > 0 && (
        // <div className="mb-8">
        //   <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continue Learning...</h2>
        //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //     {trees.map((course) => (
        //       <div
        //         key={course.course_id}
        //         onClick={() => handleCardClick(course.course_id)}
        //         className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
        //       >
        //         <h3 className="text-xl font-bold">{course.course_name}</h3>
        //         <button
        //             onClick={(e) => {
        //               e.stopPropagation(); // Prevents card click from triggering
        //               handleCardClick(course.course_id);
        //             }}
        //             className="bg-teal-400 p-2 w-[40px] rounded-full text-white hover:bg-teal-500 transition-all"
        //           >
        //             ▶
        //           </button>
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continue Learning...</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trees.map((course) => (
              <div
                key={course.course_id}
                onClick={() => handleCardClick(course.course_id)}
                className="bg-white shadow-md rounded-md p-4 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <h3 className="text-xl font-bold text-gray-700 mb-2">{course.course_name}</h3>
                {isLoading && course.course_name === searchText ? (
                  <p className="text-sm text-teal-600">Generating course content...</p>
                ) : (
                  <button
                    onClick={(e) => {
                      handleCardClick(course.course_id);
                    }}
                    className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-all"
                  >
                    ▶
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {quizzes?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Take a Quiz...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-md p-4 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-gray-700">{quiz.course_name}</h3>
                <p className="text-gray-600 text-sm">Level: {quiz.level}</p>
                <p className="text-gray-600 text-sm">{quiz.subtopic_name}</p>
                <button
                  onClick={() => handleQuizClick(quiz.quiz_id)}
                  className="bg-teal-500 text-white py-1 px-4 rounded mt-2 hover:bg-teal-600 transition-all"
                >
                  Take Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMRCLM;
