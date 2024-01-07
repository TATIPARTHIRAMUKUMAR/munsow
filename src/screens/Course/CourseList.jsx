import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loadcourses } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import courseImg from "../../assets/course-bg.webp";

const CourseCard = ({ course, onClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 });
  }, [controls]);

  const handleCardClick = async () => {
    await controls.start({ opacity: 0.9, scale: 0.95 });
    onClick(course.course_id);
  };

  return (
    <motion.div
      className="w-full h-auto mx-auto rounded-lg overflow-hidden cursor-pointer shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileHover={{ scale: 1.03 }}
    >
      <img src={courseImg} alt="Course" className="w-full h-44 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{course?.course_name}</h2>
        <p className="text-gray-600 text-sm mb-4">{course?.description}</p>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#886CC0] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Explore More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses } = useSelector((state) => state?.data);

  useEffect(() => {
    dispatch(loadcourses());
  }, [dispatch]);

  const handleCardClick = (courseId) => {
    const path = `/courseList/view/${courseId}`;
    navigate(path);
  };
  
  

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <button
          onClick={() => navigate("/courseList/create")}
          className="bg-[#886CC0] text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
