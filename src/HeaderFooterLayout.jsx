import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect } from "react";
import PropTypes from "prop-types";
import GLOBAL_CONSTANTS from "../GlobalConstants";
import { Collapse } from "@mui/material";
import AppHeader from "./screens/Admin/AppHeader";
import { IoMdSettings } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

import {
  FaThLarge,
  FaClone,
  FaChartLine,
  FaUser,
  FaUserCog,
  FaCog,
  FaQuestionCircle,
  FaLightbulb,
  FaFileAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCode,
  FaUserSecret,
} from 'react-icons/fa';

import {
  FaHeartPulse, FaSection,
} from 'react-icons/fa6';

import {
  BiSolidReport
} from 'react-icons/bi';
import { classNames } from "./utils/generalUtils";
import { useDarkMode } from "./Dark";

const drawerWidth = 270;

const openedMixin = (theme, role1) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: role1 === 1 ? "white" : "white",
  color: "#FFFFFF",
});

const closedMixin = (theme, role1) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: role1 === 1 ? "white" : "white",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  position: "fixed",
  bottom: 0,
  color: "#FFFFFF",
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, role1 }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, role1),
    "& .MuiDrawer-paper": openedMixin(theme, role1),
  }),
  ...(!open && {
    ...closedMixin(theme, role1),
    "& .MuiDrawer-paper": closedMixin(theme, role1),
  }),
}));

export default function HeaderFooterLayout({ Component }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [menuData, setMenuData] = useState([]);

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);


  const { isDarkMode } = useDarkMode();
  const backgroundColorClass = isDarkMode ? "bg-dark-primary" : "bg-primary";

  useEffect(() => {
    if (GLOBAL_CONSTANTS?.user_cred?.role_id === 1) {
      setMenuData([
        {
          label: "Home",
          icon: <RiDashboardFill size={20} className="" />,
          route: "/adminDashboard",
          subItems: [],
        },
        {
          label: "Deep Analysis",
          icon: <BiSolidReport size={20} className="" />,
          route: "/dashboard",
          subItems: [
            // {
            //   label: "Behavioral Analysis",
            //   icon: <FaBrain size={20} className="" />,
            //   route: "/behaviourAnalysis",
            // },
            {
              label: "KS Analysis",
              icon: <FaChartLine size={20} className="" />,
              route: "/ksanalysis",
            },
            {
              label: "Practical thinking A",
              icon: <FaLightbulb size={20} className="" />,
              route: "/practicalThinking",
            },
            {
              label: "Emotion Sensing",
              icon: <FaHeartPulse size={20} className="" />,
              route: "/emotionSensing",
            },
            // {
            //   label: "Hard Skill vs Soft skills",
            //   icon: <FaBalanceScale size={20} className="" />,
            //   route: "/skills",
            // },
          ],
        },
        {
          label: "User Management",
          icon: <FaUserCog size={20} className="" />,
          route: "/summary",
          subItems: [
            {
              label: "Summary",
              icon: <FaFileAlt size={20} className="" />,
              route: "/summary",
            },
            {
              label: "Students",
              icon: <FaUserGraduate size={20} className="" />,
              route: "/studentList",
            },
            {
              label: "Teachers",
              icon: <FaChalkboardTeacher size={20} className="" />,
              route: "/teachersList",
            },
          ],
        },
        {
          label: "Configurations",
          icon: <FaCode size={20} className="" />,
          route: "/configurations",
          subItems: [],
        },
        {
          label: "Help & Support",
          icon: <FaQuestionCircle size={20} className="" />,
          route: "/adminHelp",
          subItems: [],
        },
        {
          label: "Settings",
          icon: <IoMdSettings size={20} className="" />,
          route: "/adminSettings",
          subItems: [],
        },
      ]);
    } else if(GLOBAL_CONSTANTS?.user_cred?.role_id===2){
      setMenuData([
        {
          label: "Dashboard",
          icon: <FaThLarge size={20} className="" />,
          route: "/adminDashboard",
          subItems: [],
        },
        {
          label: "Courses",
          icon: <FaClone size={20} className="" />,
          route: "/courseList",
          subItems: [],
        },
        {
          label: "Question Bank",
          icon: <FaChartLine size={20} className="" />,
          route: "/questionBank",
          subItems: [],
        },
        {
          label: "Assignments",
          icon: <FaUser size={20} className="" />,
          route: "/comingSoon",
          subItems: [],
        },
        // {
        //   label: "Settings",
        //   icon: <FaCog size={20} className="" />,
        //   route: "/settings",
        //   subItems: [],
        // },
        // {
        //   label: "Help & Support",
        //   icon: <FaQuestionCircle size={20} className="" />,
        //   route: "/help",
        //   subItems: [],
        // },
      ]);
    }
    else{
      setMenuData([
        {
          label: "Dashboard",
          icon: <FaThLarge size={20} className="" />,
          route: "/studentDashboard",
          subItems: [],
        },
        {
          label: "Practice Now",
          icon: <FaClone size={20} className="" />,
          route: "/practice",
          subItems: [],
        },
        {
          label: "My Interview Reports",
          icon: <FaChartLine size={20} className="" />,
          route: "/report",
          subItems: [],
        },
        {
          label: "My Courses",
          icon: <FaChartLine size={20} className="" />,
          route: "/studentCourseList",
          subItems: [],
        },
        // {
        //   label: "Notifications",
        //   icon: <FaBell size={20} className="" />,
        //   route: "/notifications",
        //   subItems: [],
        // },
        {
          label: "My Profile",
          icon: <FaUser size={20} className="" />,
          route: "/profile",
          subItems: [],
        },
        {
          label: "Settings",
          icon: <FaCog size={20} className="" />,
          route: "/settings",
          subItems: [],
        },
        {
          label: "Help & Support",
          icon: <FaQuestionCircle size={20} className="" />,
          route: "/help",
          subItems: [],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (menuData?.length > 0) {
      let route = location.pathname;

      let meunItem = menuData?.find((m) => m?.route == route || m?.subItems?.find((s) => s.route == route));
      let index = menuData?.findIndex((m) => m?.route == meunItem?.route);
      setSelectedItem(index);
    }
  }, [menuData])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index, route) => {
    if(route=="/adminDashboard" || route=="/behaviourAnalysis" || route=="/ksanalysis" || route=="/practicalThinking" || route=="/emotionSensing"){
      localStorage.setItem("branch", "All Branches");
      localStorage.setItem("course", "All Courses");
      localStorage.setItem("department", "All Departments");
      localStorage.setItem("user", "All Users");

    }
    setSelectedItem(index);
    navigate(route);
    handleDrawerOpen();
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <CustomDrawer variant="permanent" open={open} role1={GLOBAL_CONSTANTS?.user_cred?.role_id ? GLOBAL_CONSTANTS?.user_cred?.role_id : 1}>
        <DrawerHeader style={{ background: `${backgroundColorClass}` }}>
          <div className="font-bold  text-[#4e3f6b] text-2xl pr-10">MUNSOW</div>
          {!open ? (
            <IconButton onClick={handleDrawerOpen}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon style={{ color: "black" }} />
              ) : (
                <ChevronRightIcon style={{ color: "black" }} />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "black" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "black" }} />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider style={{ opacity: "0.2" }} />
        <List>
          {menuData.map((mainItem, mainIndex) => (
            <div
              key={mainIndex}
              className={classNames(
                GLOBAL_CONSTANTS?.user_cred?.role_id !== 1 && (mainIndex == 3 || mainIndex == 5) ? "mb-16" : "mb-2",
                ""
              )}
            >
              <ListItem
                disablePadding
                onClick={() => {
                  if (mainItem.subItems.length > 0) {
                    setOpenSubMenu(openSubMenu === mainIndex ? null : mainIndex);
                  } else {
                    handleListItemClick(mainIndex, mainItem.route);
                  }
                }}
                selected={selectedItem === mainIndex}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                }}
              >

                <ListItemButton
                  sx={{
                    minHeight: 50,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: selectedItem === mainIndex ? "#f3f0f9" : "transparent",
                    borderLeft: selectedItem === mainIndex ? "5px solid purple" : "5px solid transparent",
                    borderBottomRightRadius: open && "40px",
                    // color:selectedItem === mainIndex ? "purple" : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: selectedItem === mainIndex ? "#a590cf" : "rgb(107 114 128)",
                    }}
                  // className={classNames(selectedItem === mainIndex ? "text-[#a590cf]" : "text-gray-400",)}
                  >
                    {mainItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    // style={{ color: selectedItem === mainIndex ? "#a590cf" : "rgb(107 114 128)", fontSize: "15px" }}
                    className={classNames(
                      selectedItem === mainIndex ? "text-[#a590cf] font-bold" : "text-gray-500 font-medium",
                      "text-base"
                    )}
                    primary={mainItem.label}
                    sx={{ opacity: open ? 1 : 0 }} />
                  {mainItem.subItems.length > 0 && (
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                    >
                      {openSubMenu === mainIndex ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubMenu === mainIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {mainItem.subItems.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      disablePadding
                      sx={{ display: "block", pl: open ? 3 : 0 }}
                      onClick={() => {
                        let meunItem = menuData?.find((m) => m?.subItems?.find((s) => s.route == subItem.route));
                        let index = menuData?.findIndex((m) => m?.route == meunItem?.route);
                        handleListItemClick(index, subItem.route);
                        setSelectedSubItem(subIndex);
                      }}
                      selected={selectedSubItem === subIndex}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          // backgroundColor: selectedItem === mainIndex ? "#f3f0f9" : "transparent",
                          // borderBottomRightRadius:"40px"

                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                            color: selectedSubItem === subIndex ? "#a590cf" : "rgb(107 114 128)",
                          }}
                        // className={classNames(selectedItem === mainIndex ? "text-[#a590cf]" : "text-gray-400",)}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          // style={{ color: selectedSubItem === subIndex ? "#a590cf" : "rgb(107 114 128)", fontSize: "15px" }} 
                          className={classNames(
                            selectedSubItem === subIndex ? "text-[#a590cf] font-semibold" : "text-gray-500 font-medium",
                            "text-base"
                          )}
                          primary={subItem.label} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
        <DrawerFooter>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/");
              window.location.reload();
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutOutlinedIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText style={{ color: "black" }} primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </DrawerFooter>
      </CustomDrawer>

      <AppHeader open={open} role1={GLOBAL_CONSTANTS?.user_cred ? GLOBAL_CONSTANTS?.user_cred : {}} />

      <div className={`mt-[60px] overflow-y-scroll ${backgroundColorClass}`} style={{ flexGrow: 1 }}>
      {Component}
    </div>
    </Box>
  );
}

HeaderFooterLayout.propTypes = {
  Component: PropTypes.element.isRequired,
};
