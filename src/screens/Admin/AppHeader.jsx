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

const AppHeader = ({ open, role1 }) => {

  const { isDarkMode, toggleDarkMode } = useDarkMode();


  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100%)`,
        boxShadow: "unset",
         backgroundColor: isDarkMode ? "#071437" : "#f3f0f9",
        color: isDarkMode ? "#f3f0f9" : "#071437",
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
