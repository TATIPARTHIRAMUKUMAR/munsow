import React from 'react';
// import { useDarkMode } from '../Dark';
// const { isDarkMode } = useDarkMode();

  

const Loader = () => {
  // const linearGradientBackground = isDarkMode
  //   ? colorTheme.dark.selectBackground
  //   : colorTheme.light.selectBackground;
  // //button
  // const textColors = isDarkMode
  //   ? colorTheme.dark.textColor2
  //   : colorTheme.light.textColor2;   
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="w-16 h-16 border-t-4 border-b-4  rounded-full animate-spin" style={{borderColor:"#42f5ef"}}></div>
    </div>
  );
};

export default Loader;
