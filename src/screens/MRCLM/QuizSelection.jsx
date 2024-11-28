import { React, useState } from "react";
import "./FlashcardSelection.css";
import "./QuizSelection.css";
import { useDarkMode } from "./../../Dark";
import { useSelector } from 'react-redux';

const QuizSelection = ({selectedSubtopicName}) => {
  const { colorTheme } = useSelector((state) => state?.data);
  const { isDarkMode } = useDarkMode();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;

  const textColor = isDarkMode
    ? colorTheme.dark.background
    : colorTheme.light.background;

    const levels = [
        {
          name: "Easy",
          totalCards: 60,
          border: "#f7ca02", 
          gradient: "linear-gradient(to top, #b59205, #f5d349)"
        },
        {
          name: "Medium",
          totalCards: 60,
          border: "#f77002", 
          gradient: "radial-gradient(circle at center, #f53f02, #f0a890)"
        },
        {
          name: "Hard",
          totalCards: 60,
          border: "#f70251", 
          gradient: "linear-gradient(to bottom, #f75e8f, #913351)"
        },
      ];

    const handleCardSelect = (level) => {
        setSelectedLevel(level);
    };

  return (
    <div className="flex flex-col text-center justify-center">
      <h1 className="flashcard-title mt-5">{selectedSubtopicName} - Quiz</h1>
      <h2 className="flashcard-subtitle">Choose your level and start learning</h2>
      <div className="quiz-box">
        {levels.map((level, index) => (
            <div
            key={index}
            className={`quiz ${selectedLevel === level.name ? "selected" : ""}`}
            style={{
                background: level.gradient,
                borderColor: selectedLevel === level.name ? level.border : "transparent",
            }}
            onClick={() => handleCardSelect(level.name)}
            >
            <div className="quiz-details">
                <div className="card-info">
                <div
                    className="card-count float-left"
                    style={{ borderColor: level.border }}
                >
                    0/{level.totalCards} Cards
                </div>
                <h3 className="card-title">{level.name}</h3>
                </div>
                <div className="radio-button">
                <input
                    type="radio"
                    name="level"
                    checked={selectedLevel === level.name}
                />
                {selectedLevel === level.name && (
                    <div
                    className="checkmark"
                    style={{
                        color: "white",
                        backgroundColor: level.border,
                    }}
                    >
                    &#10003;
                    </div>
                )}
                </div>
            </div>
            </div>
        ))}
      </div>

      <button className="p-1 py-2 text-md font-bold w-[100px] rounded-md mt-[30px]" 
        style={{
            color: textColor,
            background: linearGradientBackground,
            marginLeft: '45%'
        }}
      >
        Start
      </button>
    </div>
  );
};

export default QuizSelection;
