// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Divider,
//   Toolbar,
//   Typography,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import { useDarkMode } from "../../Dark";
// import { useLocation } from "react-router-dom";

// const AppHeader = ({ open, role1 }) => {
//   const location = useLocation();
//   // console.log(location);

//   // Replace the names array with:
// const names = [
//   { label: "Dashboard", url: "/studentDashboard" },
//   { 
//     label: (
//       <div className="flex items-center gap-2">
//         Mock Interview
//         <svg viewBox="0 0 200 200" className="w-5 h-5">
//           <defs>
//             <linearGradient id="headerStarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" style={{ stopColor: "#00f5f5" }} />
//               <stop offset="50%" style={{ stopColor: "#7fff00" }} />
//               <stop offset="100%" style={{ stopColor: "#ffff00" }} />
//             </linearGradient>
//           </defs>
//           <path
//             d="M100,10 L135,80 L190,80 L145,125 L160,190 L100,155 L40,190 L55,125 L10,80 L65,80 Z"
//             fill="url(#headerStarGradient)"
//           />
//         </svg>
//       </div>
//     ),
//     url: "/practice" 
//   },
//   { label: "My Interview Reports", url: "/report" },
//   { label: "My Courses", url: "/studentCourseList" },
//   { label: "My Profile", url: "/profile" },
//   { label: "Settings", url: "/settings" },
//   { label: "Help & Support", url: "/help" },
//   { label: "Reports View", url: "/reportView" },
// ];

//   const { isDarkMode, toggleDarkMode, color, colorTheme } = useDarkMode();

//   const backgroundColor = isDarkMode
//     ? colorTheme.dark.background
//     : colorTheme.light.background;
//   const textColor = isDarkMode
//     ? colorTheme.dark.textColor
//     : colorTheme.light.textColor;

//   const roleBackgroundColor =
//     role1?.role_id === 1 ? "#242D36" : backgroundColor;
//   const roleTextColor = role1?.role_id === 1 ? "#eceef0" : textColor;

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         width: `calc(100%)`,
//         boxShadow: "unset",

//         backgroundColor: roleBackgroundColor,
//         color: roleTextColor,
//         height: "60px",
//       }}
//     >
//       <Toolbar>
//         <Typography
//           variant="h6"
//           sx={{
//             paddingLeft: open ? "270px" : "60px",
//             fontWeight: "bold",
//           }}
//         >
//           {names.map((item, index) => {
//             // console.log(location.pathname.toLowerCase());
//             // console.log(item.url.toLowerCase());

//             return (
//               location.pathname.toLowerCase() === item.url.toLowerCase() && (
//                 <span key={index}>{item.label}</span>
//               )
//             );
//           })}
//           {role1?.role_id === 1 ? `${role1?.institution_name}` : ""}
//         </Typography>
//         <div className="flex-grow" />
//         {/* <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
//           <IconButton
//             color="inherit"
//             onClick={toggleDarkMode}
//             sx={{ marginLeft: "12px" }}
//           >
//             {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Tooltip> */}
//       </Toolbar>
//       <Divider style={{ color: "gray", opacity: "0.4" }} />
//     </AppBar>
//   );
// };

// export default AppHeader;


//new
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDarkMode } from "../../Dark";
import { useLocation, useNavigate } from "react-router-dom";

const AppHeader = ({ open, role1 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on any analysis page
  const isReportView = location.pathname === '/reportView';
  const isVideoAnalysis = location.pathname === '/video-analysis';
  const isSpeechAnalysis = location.pathname === '/speech-analysis';
  
  // Show analysis buttons on any analysis page
  const showAnalysisButtons = isReportView || isVideoAnalysis || isSpeechAnalysis;

  // Replace the names array with:
  const names = [
    { label: "Dashboard", url: "/studentDashboard" },
    { 
      label: (
        <div className="flex items-center gap-2">
          Mock Interview
          <svg viewBox="0 0 200 200" className="w-5 h-5">
            <defs>
              <linearGradient id="headerStarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#00f5f5" }} />
                <stop offset="50%" style={{ stopColor: "#7fff00" }} />
                <stop offset="100%" style={{ stopColor: "#ffff00" }} />
              </linearGradient>
            </defs>
            <path
              d="M100,10 L135,80 L190,80 L145,125 L160,190 L100,155 L40,190 L55,125 L10,80 L65,80 Z"
              fill="url(#headerStarGradient)"
            />
          </svg>
        </div>
      ),
      url: "/practice" 
    },
    { label: "My Interview Reports", url: "/report" },
    { label: "My Courses", url: "/studentCourseList" },
    { label: "My Profile", url: "/profile" },
    { label: "Settings", url: "/settings" },
    { label: "Help & Support", url: "/help" },
    { label: "Reports View", url: "/reportView" },
    { label: "Video Analysis", url: "/video-analysis" },
    { label: "Speech Analysis", url: "/speech-analysis" },
  ];

  const { isDarkMode, toggleDarkMode, color, colorTheme } = useDarkMode();

  const backgroundColor = isDarkMode
    ? colorTheme.dark.background
    : colorTheme.light.background;
  const textColor = isDarkMode
    ? colorTheme.dark.textColor
    : colorTheme.light.textColor;

  const roleBackgroundColor =
    role1?.role_id === 1 ? "#242D36" : backgroundColor;
  const roleTextColor = role1?.role_id === 1 ? "#eceef0" : textColor;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100%)`,
        boxShadow: "unset",
        backgroundColor: roleBackgroundColor,
        color: roleTextColor,
        height: "60px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            paddingLeft: open ? "270px" : "60px",
            fontWeight: "bold",
          }}
        >
          {names.map((item, index) => {
            return (
              location.pathname.toLowerCase() === item.url.toLowerCase() && (
                <span key={index}>{item.label}</span>
              )
            );
          })}
          {role1?.role_id === 1 ? `${role1?.institution_name}` : ""}
        </Typography>
        
        <div className="flex-grow" />
        
        {/* Analysis buttons - show on any analysis page */}
        {showAnalysisButtons && (
          <div className="flex items-center gap-2 mr-4">
            <button
              className={`flex items-center gap-1 ${isReportView ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-3 rounded-full text-sm transition-colors`}
              onClick={() => navigate('/reportView')}
            >
              <DescriptionIcon sx={{ fontSize: 16 }} />
              <span>Answer</span>
            </button>
            
            <button
              className={`flex items-center gap-1 ${isVideoAnalysis ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white py-1 px-3 rounded-full text-sm transition-colors`}
              onClick={() => navigate('/video-analysis')}
            >
              <VideocamIcon sx={{ fontSize: 16 }} />
              <span>Video</span>
            </button>
            
            <button
              className={`flex items-center gap-1 ${isSpeechAnalysis ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white py-1 px-3 rounded-full text-sm transition-colors`}
              onClick={() => navigate('/speech-analysis')}
            >
              <MicIcon sx={{ fontSize: 16 }} />
              <span>Speech</span>
            </button>
          </div>
        )}
      </Toolbar>
      <Divider style={{ color: "gray", opacity: "0.4" }} />
    </AppBar>
  );
};

export default AppHeader;