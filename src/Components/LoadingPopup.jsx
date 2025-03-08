import React, { useState, useEffect } from 'react';

const GradientStar = () => (
  <div className="inline-flex items-center ml-3">
    <svg width="35" height="35" viewBox="0 0 200 200" className="animate-spin-slow">
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#40E0D0' }} />
          <stop offset="50%" style={{ stopColor: '#7FFF00' }} />
          <stop offset="100%" style={{ stopColor: '#FFFF00' }} />
        </linearGradient>
      </defs>
      <path
        d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
        fill="url(#starGradient)"
      />
    </svg>
    <svg width="18" height="18" viewBox="0 0 200 200" className="animate-spin-slow-reverse ml-1">
      <path
        d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
        fill="url(#starGradient)"
      />
    </svg>
  </div>
);

const InteractiveGrid = () => {
  const [gridCells, setGridCells] = useState(Array(25).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      const newGridCells = Array(25).fill(false).map(() => Math.random() > 0.7);
      setGridCells(newGridCells);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-1 w-64">
      {gridCells.map((active, i) => (
        <div
          key={i}
          className={`w-12 h-12 rounded-lg transition-colors duration-150 ${
            active ? 'bg-[#00F5D4]' : 'bg-[#1E2431]'
          }`}
        />
      ))}
    </div>
  );
};

const LoadingPopup = ({ isOpen, message = "Your Interview is Loading" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="absolute inset-0 bg-[#1A1F29] opacity-95"></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8 rounded-xl">
        <div className="flex items-center justify-center">
          <h2 className="text-[#00F5D4] text-3xl font-medium tracking-wide">
            {message}
          </h2>
          <GradientStar />
        </div>
        
        <InteractiveGrid />
      </div>
    </div>
  );
};

export default LoadingPopup;