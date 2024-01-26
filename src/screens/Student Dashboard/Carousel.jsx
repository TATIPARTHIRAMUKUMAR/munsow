import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Carousel.css'; // Import your custom CSS for styling
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);

  // const objects = [
  //   { title: 'Keep your calm 1', description: 'We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.' },
  //   { title: 'Keep your calm 2', description: 'We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.' },
  //   { title: 'Keep your calm 3', description: 'We noticed some signs of anxiety during your last mock interview. Remember, deep breaths can help.' },
  // ];
  const { userStats } = useSelector((state) => state.data);


  const objects = userStats?.suggestions?.map((tip, index) => {
    const [title, description] = tip.split(':');
    return {
      title: title.trim(),
      description: description.trim()
    };
  });


  const goToPrevious = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? objects.length - 1 : prevIndex - 1));
      setSlideDirection(null);
    }, 300); // Adjust the duration of the animation (in milliseconds)
  };

  const goToNext = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === objects.length - 1 ? 0 : prevIndex + 1));
      setSlideDirection(null);
    }, 300); // Adjust the duration of the animation (in milliseconds)
  };

  return (
    <div>
      <p className="text-[#886cc0] text-lg font-bold p-2">Emotional Insight</p>
      <Divider style={{opacity:"0.4"}}/>
      <div className="flex items-center justify-center carousel-container py-2 rounded-lg relative">


        <IconButton onClick={goToPrevious}>
          <ArrowBackIosIcon style={{ background: '#886cc0', borderRadius: "50%", color: 'white', padding: "4px" }} />
        </IconButton>
        <div className={`carousel-item p-2 transform transition-transform ${slideDirection === 'left' ? '-translate-x-full' : slideDirection === 'right' ? 'translate-x-full' : ''}`}>
          <div className="text-center"> {/* Center content */}
            <h3 className="text-xl font-semibold text-[#886cc0]">{objects && objects[currentIndex]?.title}</h3>
            <p className="mt-2 text-sm">{objects && objects[currentIndex]?.description}</p>
          </div>
        </div>
        <IconButton onClick={goToNext}>
          <ArrowForwardIosIcon style={{ background: '#886cc0', borderRadius: "50%", color: 'white', padding: "4px" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Carousel;
