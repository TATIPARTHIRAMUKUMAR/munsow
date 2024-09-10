import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import interview from "../../assets/admin_ui.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { institution_login } from "../../redux/action";
import ForgotPassword from "./ForgotPassword";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDarkMode } from "./../../Dark";
import TeacherIcon from "./../../assets/icons/teacher.png";
import AdminIcon from "./../../assets/icons/admin-login-icon.svg";
import AdminLoginHero from "./../../assets/admin-login-hero-img.png";

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: 'row',
  marginBottom: '30px',
});

const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }) => ({
  border: '2px solid',
  borderRadius: '20px',
  padding: '10px 15px 10px 0px',
  margin: '0 0px',
  width: '250px',
  transition: 'border-color 0.3s, background-color 0.3s',
  borderColor: checked ? '#2BE2D0' : '#ddd',
  backgroundColor: checked ? '#F0FCFF' : '#fff',
  '& .MuiSvgIcon-root': {
    display: 'block', 
    color: '#2BE2D0',
  },
  '& .custom-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    
    color: checked ? '#fff' : '#ddd',
  },
  '& .MuiTypography-root': {
    fontWeight: checked ? 'bold' : 'normal',
    color: checked ? '#333' : '#333',
    fontSize: '16px',
  },
  '&:hover': {
    cursor: 'pointer',
    borderColor: '#2BE2D0',
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("institution");

  const { isDarkMode, colorTheme } = useDarkMode();

  const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
  const BackgroundColor = isDarkMode
    ? reduxColorTheme.dark.selectBackground
    : reduxColorTheme.light.selectBackground;

  const loginInputHandler = (e) => {
    const { name = "", value = "" } = e.target;
    if (name === "universityId") {
      setUniversityId(value);
    } else {
      setPassword(value);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: universityId,
      password: password,
    };
    dispatch(institution_login(payload, () => {
      localStorage.setItem("branch", "All Branches");
      localStorage.setItem("course", "All Courses");
      localStorage.setItem("department", "All Departments");
      localStorage.setItem("user", "All Users");
      window.location.href = "./adminDashboard";
    }));
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    if (type == 'student') {
      navigate("/studentLogin")
    }
  };

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setLoginType(selectedType);
    if (selectedType === 'student') {
      navigate("/");
    } else if (selectedType === 'teacher') {
      navigate("/teacherLogin");
    }
    // Add more conditions for other types if necessary
  };

  // Click handler for the span
  const handleStudentClick = () => {
    navigate('/');
  };
  return (
    <div className="bg-[#F1F8F8] h-screen overflow-auto">

      <div className="flex flex-col md:flex-row items-center">
        <div className="hidden md:flex justify-center items-center w-3/6 ">
          <img
            src={AdminLoginHero}
            className=""
            alt="Login"
          />
        </div>
        <div className="w-full md:w-3/6 p-5 lg:p-20 ">
          <div className="rounded-lg p-6">

            <div className="mb-4">
              <h2 className="text-3xl font-semibold  mb-4">Institution Login</h2>
              <FormControl component="fieldset">
              <StyledRadioGroup row value={loginType} onChange={handleRadioChange} className="flex justify-start gap-3">
              <StyledFormControlLabel
                value="institution"
                className="justify-center"
                label={
                  <div className="flex flex-col justify-center items-center">
                    <span className="custom-icon"><img src={AdminIcon}  alt="Login"/></span>
                    Organisation Admin
                  </div>
                }
                control={<Radio />}
                checked={loginType === 'institution'}
              />
              <StyledFormControlLabel
                value="teacher"
                className="justify-center"
                label={
                  <div className="flex flex-col justify-center items-center">
                    <span className="custom-icon"><img src={TeacherIcon}  alt="Login"/></span>
                    Department’s Professor 
                  </div>
                }
                control={<Radio />}
                checked={loginType === 'teacher'}
              />
              </StyledRadioGroup>
              </FormControl>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="space-y-4">
                  <div className="mb-2">
                    <label htmlFor="universityId" className="text-sm font-bold text-black">
                      University ID
                    </label>
                    <input
                      type="text"
                      className="mt-2 w-full border border-gray-400 bg-[#EDEDED] rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                      id="universityId"
                      name="universityId"
                      placeholder="Enter Your University ID"
                      value={universityId}
                      onChange={loginInputHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="text-sm font-bold text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-2 w-full border border-gray-400 bg-[#EDEDED] rounded-lg py-2 px-3 focus:outline-none focus:border-stone-300"
                      id="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={loginInputHandler}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full text-black rounded-lg py-2 px-4"
                    style={{ background: BackgroundColor }}
                  >
                    Login
                  </button>

                  {/* <button
                    type="button"
                    className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Login
                  </button> */}
                </div>
              </div>
            </form>
            {/* <div className="mt-7 text-center">
              <span className="text-gray-600">
                Not a member with us yet? {" "}
              </span>
              <span className="text-blue-600 hover:underline">
                <Link to={"/registration"}>Join Us Today!</Link>
              </span>
            </div> */}

            {/* <div className="student-login-section bg-gradient-to-r from-blue-100 to-teal-100 p-5 rounded-lg shadow-md mt-5">
              <div className="flex items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-700 mr-4">Welcome !</h2>
                <Link to={"/registration"} className="text-white font-bold py-1 px-3 rounded-full transition duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl">
                  Join Us Today!
                </Link>
              </div>
            </div> */}
            <div className="mt-5 text-black">
              <span>
                Not Registered?&nbsp;
              </span>
              <a href="https://www.munsow.com/contact" target="_blank"><span className="underline text-[#81007F]" >Contact Us</span></a>              
            </div>
            <div className="mt-16 text-center text-black">
              <span>
                Not an Organisation?&nbsp;Jobseeker Login&nbsp;
              </span>
              <span className="underline cursor-pointer text-[#81007F]" onClick={handleStudentClick}>Here</span>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;