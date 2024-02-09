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
import { useDarkMode } from "../../Dark";
import { useLocation } from "react-router-dom";

const AppHeader = ({ open, role1 }) => {
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
            console.log(location.pathname.toLowerCase());
            console.log(item.url.toLowerCase());

            return (
              location.pathname.toLowerCase() === item.url.toLowerCase() && (
                <span key={index}>{item.label}</span>
              )
            );
          })}
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
      <Divider style={{ color: "gray", opacity: "0.4" }} />
    </AppBar>
  );
};

export default AppHeader;
