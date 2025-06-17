// import React, { useState, useEffect } from 'react';

// // Background Grid Component
// const BackgroundGrid = () => (
//   <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1">
//     {Array.from({ length: 96 }).map((_, i) => (
//       <div
//         key={i}
//         className="bg-[#1E2431] rounded-lg transition-colors duration-300 hover:bg-[#40E0D0]"
//       />
//     ))}
//   </div>
// );

// // Animated Stars Component
// const AnimatedStars = () => (
//   <div className="inline-flex items-center ml-3">
//     <svg width="35" height="35" viewBox="0 0 200 200" className="animate-spin">
//       <defs>
//         <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="#40E0D0" />
//           <stop offset="50%" stopColor="#7FFF00" />
//           <stop offset="100%" stopColor="#FFFF00" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//     <svg width="18" height="18" viewBox="0 0 200 200" className="animate-spin-reverse ml-1">
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//   </div>
// );

// const LoadingOverlay = ({ show = false, message = "Your Interview is Loading" }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black opacity-90" />

//       {/* Content container */}
//       <div className="relative z-10 flex flex-col items-center space-y-8 bg-[#1A1F29] p-12 rounded-2xl">
//         <BackgroundGrid />

//         <div className="relative flex items-center justify-center">
//           <h2 className="text-[#00F5D4] text-3xl font-medium tracking-wide">
//             {message}
//           </h2>
//           <AnimatedStars />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingOverlay;

// import React from 'react';

// // Background Grid Component
// const BackgroundGrid = () => (
//   <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1">
//     {Array.from({ length: 96 }).map((_, i) => (
//       <div
//         key={i}
//         className="bg-[#1E2431] rounded-lg transition-colors duration-300 hover:bg-[#40E0D0]"
//       />
//     ))}
//   </div>
// );

// // Animated Stars Component
// const AnimatedStars = () => (
//   <div className="inline-flex items-center ml-3">
//     <svg width="35" height="35" viewBox="0 0 200 200" className="animate-spin">
//       <defs>
//         <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="#40E0D0" />
//           <stop offset="50%" stopColor="#7FFF00" />
//           <stop offset="100%" stopColor="#FFFF00" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//     <svg width="18" height="18" viewBox="0 0 200 200" className="animate-spin-reverse ml-1">
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//   </div>
// );

// const LoadingOverlay = ({ show = false, message = "Your Interview is Loading" }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//       {/* Dark overlay with higher z-index */}
//       <div className="absolute inset-0 bg-black opacity-90" />

//       {/* Content container with responsive margins and max-width */}
//       <div className="relative z-10 flex flex-col items-center space-y-8 bg-[#1A1F29] p-8 md:p-12 rounded-2xl mx-4 md:mx-auto max-w-3xl w-full">
//         <BackgroundGrid />

//         <div className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left">
//           <h2 className="text-[#00F5D4] text-xl md:text-3xl font-medium tracking-wide">
//             {message}
//           </h2>
//           <AnimatedStars />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingOverlay;

//new1

// import React, { useState, useEffect, useCallback, useRef } from 'react';

// const TRAIL_LENGTH = 5;
// const TRAIL_FADE_DURATION = 500;

// // Custom cursor trail effect
// const CursorTrail = ({ mousePosition, containerRef }) => {
//   const [trail, setTrail] = useState([]);

//   useEffect(() => {
//     if (mousePosition.x && mousePosition.y && containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       const relativePosition = {
//         x: mousePosition.x - rect.left,
//         y: mousePosition.y - rect.top
//       };

//       setTrail(prevTrail => {
//         const newTrail = [...prevTrail, relativePosition];
//         if (newTrail.length > TRAIL_LENGTH) {
//           return newTrail.slice(1);
//         }
//         return newTrail;
//       });
//     }
//   }, [mousePosition, containerRef]);

//   return (
//     <>
//       {trail.map((position, index) => (
//         <div
//           key={index}
//           className="pointer-events-none absolute w-4 h-4 rounded-full mix-blend-screen"
//           style={{
//             left: position.x - 8,
//             top: position.y - 8,
//             backgroundColor: `rgba(64, 224, 208, ${0.2 + (index / trail.length) * 0.8})`,
//             transform: `scale(${0.5 + (index / trail.length) * 0.5})`,
//             transition: 'all 0.1s ease-out',
//             boxShadow: '0 0 10px rgba(64, 224, 208, 0.5)',
//           }}
//         />
//       ))}
//     </>
//   );
// };

// // Enhanced Background Grid Component
// const BackgroundGrid = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [hoveredCells, setHoveredCells] = useState(new Set());
//   const gridRef = useRef(null);

//   const handleMouseMove = useCallback((e) => {
//     if (!gridRef.current) return;
//     setMousePosition({
//       x: e.clientX,
//       y: e.clientY
//     });
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setMousePosition({ x: 0, y: 0 });
//     setHoveredCells(new Set());
//   }, []);

//   const handleCellHover = useCallback((index) => {
//     setHoveredCells(prev => {
//       const newSet = new Set(prev);
//       newSet.add(index);
      
//       setTimeout(() => {
//         setHoveredCells(current => {
//           const updated = new Set(current);
//           updated.delete(index);
//           return updated;
//         });
//       }, TRAIL_FADE_DURATION);
      
//       return newSet;
//     });
//   }, []);

//   return (
//     <div 
//       ref={gridRef}
//       className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1 p-4 cursor-none overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <CursorTrail mousePosition={mousePosition} containerRef={gridRef} />
      
//       {Array.from({ length: 96 }).map((_, i) => (
//         <div
//           key={i}
//           className="relative bg-[#1E2431] rounded-lg transition-all duration-300"
//           onMouseEnter={() => handleCellHover(i)}
//           style={{
//             backgroundColor: hoveredCells.has(i) ? '#40E0D0' : '#1E2431',
//             boxShadow: hoveredCells.has(i) 
//               ? '0 0 15px 2px rgba(64,224,208,0.5), inset 0 0 8px rgba(64,224,208,0.5)' 
//               : 'none',
//             transition: 'all 0.3s ease-out'
//           }}
//         >
//           <div className="absolute inset-0 rounded-lg opacity-50 shadow-[inset_0_0_2px_rgba(64,224,208,0.3)]" />
//         </div>
//       ))}
//     </div>
//   );
// };

// // Animated Stars Component
// const AnimatedStars = () => (
//   <div className="inline-flex items-center ml-3">
//     <svg width="35" height="35" viewBox="0 0 200 200" className="animate-spin">
//       <defs>
//         <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="#40E0D0" />
//           <stop offset="50%" stopColor="#7FFF00" />
//           <stop offset="100%" stopColor="#FFFF00" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//     <svg width="18" height="18" viewBox="0 0 200 200" className="animate-spin-reverse ml-1">
//       <path
//         d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
//         fill="url(#starGradient)"
//       />
//     </svg>
//   </div>
// );

// const LoadingOverlay = ({ show = false, message = "Your Interview is Loading" }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//       <div className="absolute inset-0 bg-black opacity-90" />

//       <div className="relative z-10 flex flex-col bg-[#1A1F29] p-8 md:p-12 rounded-2xl mx-4 md:mx-auto w-full" style={{
//         maxWidth: '80vw',
//         height: '70vh',
//         minHeight: '500px',
//         maxHeight: '800px'
//       }}>
//         <BackgroundGrid />

//         {/* Centered content container */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8">
//             <h2 className="text-[#00F5D4] text-2xl md:text-4xl font-medium tracking-wide z-20">
//               {message}
//             </h2>
//             <AnimatedStars />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingOverlay;
//new2
import React, { useState, useEffect, useCallback, useRef } from 'react';

const TRAIL_LENGTH = 5;
const TRAIL_FADE_DURATION = 500;

// Custom cursor trail effect
const CursorTrail = ({ mousePosition, containerRef }) => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (mousePosition.x && mousePosition.y && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativePosition = {
        x: mousePosition.x - rect.left,
        y: mousePosition.y - rect.top
      };

      setTrail(prevTrail => {
        const newTrail = [...prevTrail, relativePosition];
        if (newTrail.length > TRAIL_LENGTH) {
          return newTrail.slice(1);
        }
        return newTrail;
      });
    }
  }, [mousePosition, containerRef]);

  return (
    <>
      {trail.map((position, index) => (
        <div
          key={index}
          className="pointer-events-none absolute w-4 h-4 rounded-full mix-blend-screen"
          style={{
            left: position.x - 8,
            top: position.y - 8,
            backgroundColor: `rgba(64, 224, 208, ${0.2 + (index / trail.length) * 0.8})`,
            transform: `scale(${0.5 + (index / trail.length) * 0.5})`,
            transition: 'all 0.1s ease-out',
            boxShadow: '0 0 10px rgba(64, 224, 208, 0.5)',
          }}
        />
      ))}
    </>
  );
};

// Enhanced Background Grid Component
const BackgroundGrid = ({ mousePosition }) => {
  const [hoveredCells, setHoveredCells] = useState(new Set());
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  // Update local mouse position from parent or from local events
  useEffect(() => {
    if (mousePosition && mousePosition.x && mousePosition.y) {
      setLocalMousePosition(mousePosition);
    }
  }, [mousePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;
    setLocalMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setLocalMousePosition({ x: 0, y: 0 });
    setHoveredCells(new Set());
  }, []);

  const handleCellHover = useCallback((index) => {
    setHoveredCells(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      
      setTimeout(() => {
        setHoveredCells(current => {
          const updated = new Set(current);
          updated.delete(index);
          return updated;
        });
      }, TRAIL_FADE_DURATION);
      
      return newSet;
    });
  }, []);

  // Find the closest cell to the cursor position
  useEffect(() => {
    if (localMousePosition.x && localMousePosition.y && gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const x = localMousePosition.x - rect.left;
      const y = localMousePosition.y - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Calculate which cell the cursor is over
        const cellWidth = rect.width / 12;
        const cellHeight = rect.height / 8;
        
        const col = Math.floor(x / cellWidth);
        const row = Math.floor(y / cellHeight);
        
        // Calculate index (0-95) from row and column
        const index = row * 12 + col;
        if (index >= 0 && index < 96) {
          handleCellHover(index);
        }
      }
    }
  }, [localMousePosition, handleCellHover]);

  return (
    <div 
      ref={gridRef}
      className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1 p-4 cursor-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CursorTrail mousePosition={localMousePosition} containerRef={gridRef} />
      
      {Array.from({ length: 96 }).map((_, i) => (
        <div
          key={i}
          className="relative bg-[#1E2431] rounded-lg transition-all duration-300"
          onMouseEnter={() => handleCellHover(i)}
          style={{
            backgroundColor: hoveredCells.has(i) ? '#40E0D0' : '#1E2431',
            boxShadow: hoveredCells.has(i) 
              ? '0 0 15px 2px rgba(64,224,208,0.5), inset 0 0 8px rgba(64,224,208,0.5)' 
              : 'none',
            transition: 'all 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 rounded-lg opacity-50 shadow-[inset_0_0_2px_rgba(64,224,208,0.3)]" />
        </div>
      ))}
    </div>
  );
};

// Animated Stars Component
const AnimatedStars = () => (
  <div className="inline-flex items-center ml-3">
    <svg width="35" height="35" viewBox="0 0 200 200" className="animate-spin">
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#40E0D0" />
          <stop offset="50%" stopColor="#7FFF00" />
          <stop offset="100%" stopColor="#FFFF00" />
        </linearGradient>
      </defs>
      <path
        d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
        fill="url(#starGradient)"
      />
    </svg>
    <svg width="18" height="18" viewBox="0 0 200 200" className="animate-spin-reverse ml-1">
      <path
        d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z"
        fill="url(#starGradient)"
      />
    </svg>
  </div>
);

const LoadingOverlay = ({ show = false, message = "Your Interview is Loading" }) => {
  if (!show) return null;
  
  // Split the message into individual words
  const words = message.split(' ');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-black opacity-90" />

      <div className="relative z-10 flex flex-col bg-[#1A1F29] p-8 md:p-12 rounded-2xl mx-4 md:mx-auto w-full" style={{
        maxWidth: '80vw',
        height: '70vh',
        minHeight: '500px',
        maxHeight: '800px'
      }}>
        <BackgroundGrid mousePosition={mousePosition} />

        {/* Centered content container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8">
            <h2 className="text-2xl md:text-4xl font-medium tracking-wide z-20 flex flex-wrap justify-center md:justify-start">
              {words.map((word, index) => (
                <span 
                  key={index} 
                  className="text-[#00F5D4] hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                  {word}
                  {index < words.length - 1 && <span className="mx-1">&nbsp;</span>}
                </span>
              ))}
            </h2>
            <AnimatedStars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;