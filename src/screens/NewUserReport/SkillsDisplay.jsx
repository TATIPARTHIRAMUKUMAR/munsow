import React, { useEffect, useRef } from 'react';
import './UserReport.css'; // Import the CSS file

// Function to convert numeric value to star rating
// Function to convert numeric value to star rating
const getStarRating = (value) => {
    const maxRating = 5;
    const starRating = Math.min(Math.max(0, parseFloat(value)), maxRating);
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars >= 0.5;
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // Full star
    }
  
    if (halfStar) {
      stars.push(<span key={fullStars} className="text-yellow-500">&#9733;</span>); // Half star
    } else if (starRating > fullStars) {
      stars.push(<span key={fullStars} className="text-yellow-500">&#9734;</span>); // Empty star
    }
  
    const remainingStars = maxRating - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={fullStars + i} className="text-yellow-500">&#9734;</span>); // Empty star
    }
  
    return stars;
  };
  

const SkillsDisplay = ({ skills }) => {
  const skillsRef = useRef(null);

  useEffect(() => {
    if (skillsRef.current) {
      skillsRef.current.classList.add('fade-in');
    }
  }, []);

  return (
    <div ref={skillsRef} className="bg-[#7a5fa7] h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl text-white mb-8 font-semibold">Interview Skills in Decreasing Order of Performance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4">
        {skills.hard_skill && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hard Skills</h2>
            <ul className="list-disc list-inside">
              {Object.keys(skills.hard_skill).map((skill, index) => (
                <li key={index} className="mb-2">
                  {skill}: {getStarRating(skills.hard_skill[skill])}
                </li>
              ))}
            </ul>
          </div>
        )}
        {skills.soft_skill && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Soft Skills</h2>
            <ul className="list-disc list-inside">
              {Object.keys(skills.soft_skill).map((skill, index) => (
                <li key={index} className="mb-2">
                  {skill}: {getStarRating(skills.soft_skill[skill])}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsDisplay;
