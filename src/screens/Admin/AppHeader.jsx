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
import { useSelector } from "react-redux";
import { useDarkMode } from "../../Dark";
import { useLocation } from "react-router-dom";

const AppHeader = ({ open, role1, userData }) => {
  const location = useLocation();
  console.log(location);

  const names = [
    { label: " Dashboard", url: "/studentDashboard" },
    { label: "Practice Now", url: "/practice" },
    { label: "My Interview Reports", url: "/report" },
    { label: "My Courses", url: "/studentCourseList" },
    { label: "My Profile", url: "/profile" },
    { label: "Settings", url: "/settings" },
    { label: "Help & Support", url: "/help" },
    { label: "Reports View", url: "/reportView" },
  ];

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
  const headerBgColor = isDarkMode
    ? reduxColorTheme.dark.background
    : reduxColorTheme.light.background;

  const headerTextColor = isDarkMode
    ? reduxColorTheme.dark.textColor
    : reduxColorTheme.light.textColor;
  const backgroundColor = isDarkMode
    ? reduxColorTheme.dark.foreground
    : reduxColorTheme.light.foreground;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100%)`,
          boxShadow: "unset",
          backgroundColor: backgroundColor,
          height: "60px",
          paddingLeft: (theme) => (open ? theme.spacing(32) : theme.spacing(5)),
          transition: "padding-left 0.3s ease",
        }}
      >
        <div
          className="flex justify-between text-2xl font-bold px-8 py-8 relative overflow-auto max-w-full h-auto"
          style={{
            background: headerBgColor,
            color: headerTextColor,
            paddingBottom: "50px",
          }}
        >
          <div>
            {names.map((item, index) => {
              console.log(location.pathname.toLowerCase());
              console.log(item.url.toLowerCase());

              return (
                location.pathname.toLowerCase() === item.url.toLowerCase() && (
                  <span key={index}>{item.label}</span>
                )
              );
            })}
          </div>{" "}
          <div>
            <span className="text-2xl font-semibold ">
              {userData?.user_name}
            </span>
          </div>
        </div>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              paddingLeft: open ? "270px" : "60px",
              fontWeight: "bold",
            }}
          >
            {role1?.role_id === 1 ? `${role1?.institution_name}` : ""}
          </Typography>
          <div className="flex-grow" />
          {/* <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            sx={{ marginLeft: "12px" }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip> */}
        </Toolbar>
        {/* <Divider style={{ color: "gray", opacity: "0.4" }} /> */}
      </AppBar>
    </>
  );
};

export default AppHeader;
