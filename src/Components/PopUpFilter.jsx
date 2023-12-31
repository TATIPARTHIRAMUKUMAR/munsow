import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useDispatch } from "react-redux";
import { loadDepartmentList, loadInstitutionStats, loadCourseList, loadBehaviourAnalysis, loadKSAnalysis, loadEmotionStats, loadUserList, loadUsersList } from "../redux/action";
import { useEffect } from "react";


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function PopUpFilter(props) {

  const { route, list, dependencyList, startDate, endDate } = props;
  const dispatch = useDispatch();
  // const [branchActive, setBranchActive] = React.useState(`All Branches`);
  // const [courseActive, setCourseActive] = React.useState(`All Courses`);
  // const [departmentActive, setDepartmentActive] = React.useState(`All Departments`);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (item, id) => {
    console.log("ii", item, id,list)
    if (list == "user") {
      localStorage.setItem("user", item)
      localStorage.setItem("user_id", id)
    }
    else if(list == "Branches"){
      localStorage.setItem("branch", item);
      localStorage.setItem("course","All Courses")
      localStorage.setItem("department","All Departments")
      // list == "Branches" ? localStorage.setItem("branch", item) : (list == "Courses" ? localStorage.setItem("course", item) : localStorage.setItem("department", item));
    }
    else if(list == "Courses"){
      localStorage.setItem("course", item);
      localStorage.setItem("department","All Departments")
    }
    else if(list == "Departments"){
      localStorage.setItem("department", item);

    }



    list == "Branches" ? dispatch(loadCourseList(`branch_id=${id}`)) : (list == "Courses" ? dispatch(loadDepartmentList(`course_id=${id}`)) : list == "Departments" ? dispatch(loadUsersList(`department_id=${id}`)) : "");
    let params = {
      branch: localStorage.getItem("branch"),
      course: localStorage.getItem("course")=="All Courses"?null:localStorage.getItem("course"),
      department: localStorage.getItem("department")=="All Departments"?null:localStorage.getItem("department"),
      student_id: localStorage.getItem("user_id"),
      start_date: startDate,
      end_date: endDate
    };
    if (list == "user") {
      params.student_id = id
    }
    else {
      list == "Branches" ? params.branch = item : (list == "Courses" ? params.course = item : params.department = item);
    }
    route == "AdminDashboard" ? dispatch(loadInstitutionStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
      (route == "KSAnalysis" ? dispatch(loadKSAnalysis(params)) :
        (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: '1rem' }}>{list}</div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        // variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<FilterAltRoundedIcon />}
        sx={{
          textTransform: "none",
          fontSize: "1rem",
          marginRight: "1rem",
          fontWeight: 400,
        }}
      >

        {list == "Branches" ? localStorage.getItem("branch") : (list == "Courses" ? localStorage.getItem("course") : list == "user" ? localStorage.getItem("user") : localStorage.getItem("department"))}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem
          onClick={() => {
            handleMenuItemClick(`All ${list}`);
          }}
          disableRipple
        >
          All {list}
        </MenuItem> */}
        {dependencyList?.map((item) => (
          <MenuItem
            key={item?.name}
            onClick={() => {
              handleMenuItemClick(item?.name, item?.id);
            }}
            disableRipple
          >
            {item?.name}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
