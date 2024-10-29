
import React, { useState } from "react";
import "./FlashcardSelection.css";
import { useDarkMode } from "./../../Dark";
import { useSelector } from 'react-redux';
import noData from '../../assets/NoData.jpeg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const FlashcardSelection = ({ selectedSubtopicName, flashcards }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { colorTheme } = useSelector((state) => state?.data);
  const { isDarkMode } = useDarkMode();
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [openFlashcard, setOpenFlashcard] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 8,
    p: 5,
    borderRadius: 4,
    width: '50%',
  };

  const handleCardSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleStart = () => {
    if (selectedLevel) {
      const selectedFlashcards = flashcards.filter(
        (card) => card.category === selectedLevel
      );
      setFilteredFlashcards(selectedFlashcards);
      setOpenFlashcard(true);
      setCurrentCard(0);
      setIsFlipped(false);
      console.log("Filtered Flashcards:", selectedFlashcards);
    } else {
      alert("Please select a level before starting.");
    }
  };

    const handleCloseFlashcard = () => {
        setOpenFlashcard(false); 
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleCardChange = (index) => {
        setCurrentCard(index);
        setIsFlipped(false);
    };

    const handleNextCard = () => {
        if (currentCard < filteredFlashcards.length - 1) {
            handleCardChange(currentCard + 1);
        }
    };

    const handlePrevCard = () => {
        if (currentCard > 0) {
            handleCardChange(currentCard - 1);
        }
    };

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;

  const textColor = isDarkMode
    ? colorTheme.dark.background
    : colorTheme.light.background;

  const categoryCounts = flashcards.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    { title: "Knowledge", gradient: "linear-gradient(to right, #ff9a9e, #fad0c4)", cardCount: `${categoryCounts["Knowledge"] || 0} cards`, border: '#e87998' },
    { title: "Understanding", gradient: "linear-gradient(to right, #a1c4fd, #c2e9fb)", cardCount: `${categoryCounts["Understanding"] || 0} cards`, border: '#6d9ced' },
    { title: "Examples and Applications", gradient: "linear-gradient(to right, #d4fc79, #96e6a1)", cardCount: `${categoryCounts["Examples and Applications"] || 0} cards`, border: '#abdb6b' },
    { title: "Case Studies", gradient: "linear-gradient(to right, #84fab0, #8fd3f4)", cardCount: `${categoryCounts["Case Studies"] || 0} cards`, border: '#19d19a' },
  ];

  console.log("Flashcards : ", flashcards)
  return (
    <div className="flex flex-col text-center justify-center">
      <h1 className="flashcard-title mt-5">{selectedSubtopicName} - Flashcards</h1>
      <h2 className="flashcard-subtitle">Choose your level and start learning</h2>
      <div className="flashcard-box h-[500px]">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flashcard ${selectedLevel === card.title ? "selected" : ""}`}
            style={{ 
                background: card.gradient,
                borderColor: selectedLevel === card.title ? card.border : "none"
            }}
            onClick={() => handleCardSelect(card.title)}
          >
            <div className="flashcard-details">
              <div className="card-info">
                <div className="card-count float-left" style={{ borderColor : card.border }}>{card.cardCount}</div>
                <h3 className="card-title">{card.title}</h3>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name="level"
                  checked={selectedLevel === card.title}
                />
                {selectedLevel === card.title && (
                  <div className="checkmark" style={{
                      color : 'white',
                      backgroundColor : card.border
                  }}>&#10003;</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="p-1 py-2 text-md font-bold w-[100px] rounded-md mt-[30px]" onClick={handleStart}
        style={{
            color: textColor,
            background: linearGradientBackground,
            marginLeft: '45%'
        }}
      >
        Start
      </button>
      <Modal
        open={openFlashcard}
        onClose={handleCloseFlashcard}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {filteredFlashcards && filteredFlashcards?.length > 0 ? (
            <>
                <div className="card-counters-container mb-5">
                    <div className="card-counters mb-2">
                        {filteredFlashcards?.map((_, index) => (
                            <div
                                key={index}
                                className={`counter-outer ${currentCard === index ? 'active' : ''}`}
                                onClick={() => handleCardChange(index)}
                            >
                            <span className="counter-inner">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="gallery-container mb-5">
                    <div className="gallery-track">
                        <div
                            className={`slide-card ${isFlipped ? "flipped" : ""}`}
                            onClick={handleFlip}
                        >
                            <div className="flip-card-inner">
                                <div className="flip-card-front text-xl md:text-3xl font-bold">
                                    {filteredFlashcards?.[currentCard]?.question}
                                </div>
                                <div className="flip-card-back text-xl font-bold">
                                    {filteredFlashcards?.[currentCard]?.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center gap-3 mb-5'>
                    <Button
                        variant="contained"
                        style={{backgroundColor: "#D5D5D5", color: textColor, borderRadius: '24px', textTransform: 'none', fontWeight: "bold", padding: "12px 28px" }}
                    >
                    I learned now
                    </Button>
                    <div className="navigation-buttons">
                        <button onClick={handlePrevCard} className="button-prev" disabled={currentCard === 0}>
                            chevron_left
                        </button>
                        <button onClick={handleNextCard} className="button-next" disabled={currentCard === cards?.length - 1}>
                            chevron_right
                        </button>
                    </div>
                    <Button
                        variant="contained"
                        style={{backgroundColor: "#D5D5D5", color: textColor, borderRadius: '24px', textTransform: 'none', fontWeight: "bold", padding: "12px 28px" }}
                    >
                    I knew this
                    </Button>
                </div>
                <h1 className='text-center'>Click on the card to flip it</h1>
            </>
            ) : (
                <div className='flex flex-col items-center'>
                    <img src={noData} alt='noData-img' style={{height:"300px"}}/>
                    <h2 className="text-center text-2xl font-bold text-red mt-5">"No flashcards found for the specified course."</h2>
                </div>
            )}
        </Box>
      </Modal>
    </div>
  );
};

export default FlashcardSelection;
