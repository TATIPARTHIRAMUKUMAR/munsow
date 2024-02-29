import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="w-16 h-16 border-t-4 border-b-4  rounded-full animate-spin" style={{borderColor:"#2BE2D0"}}></div>
    </div>
  );
};

export default Loader;