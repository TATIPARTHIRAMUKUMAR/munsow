import React, { useState } from "react";
import { Link } from "react-router-dom";
import interview from "../../assets/student.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { user_login } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDarkMode } from "./../../Dark";
import "./Login.css";
import MunsowLogo from "./../../assets/Munsow-Logo-Transparent.svg";
import StudentLoginHero from "./../../assets/student-login-hero-img.png";

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '30px',
});

const StyledFormControlLabel = styled(FormControlLabel)({
  fontSize: "50px",
  '& .MuiSvgIcon-root': {
    color: '#4A90E2',
  },
  '& .MuiTypography-root': {
    color: '#333',
    fontSize: "20px",
    paddingRight: "30px"
  }
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "0.4rem",
  // boxShadow: 24,
  p: 4,
};

const StudentLogin = () => {
  const dispatch = useDispatch()
  const [loginType, setLoginType] = useState("student");


  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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
      role: "student"

    }
    dispatch(user_login(payload, (resp) => {
      if(resp?.data?.role_id==5){
        window.location.href = "./studentDashboardScreening";
      }else{
        window.location.href = "./studentDashboard";
      }
    }))
  };

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setLoginType(selectedType);
    if (selectedType === 'institution') {
      navigate("/institutionLogin");
    } else if (selectedType === 'teacher') {
      navigate("/teacherLogin");
    }
    // Add more conditions for other types if necessary
  };

  // Click handler for the span
  const handleInstitutionClick = () => {
    navigate('/institutionLogin');
  };

  return (
    <div className="bg-[#F1F8F8] h-screen overflow-auto">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/6 p-5 lg:p-20 rounded-none md:rounded-r-[84px] login-bg-gradient h-screen overflow-visible">
          <div className="rounded-lg p-6">

            {/* <FormControl component="fieldset">
              <StyledRadioGroup row value={loginType} onChange={handleRadioChange}>
                <StyledFormControlLabel value="institution" control={<Radio />} label="Institution" />
                <StyledFormControlLabel value="student" control={<Radio />} label="Student" />
                <StyledFormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              </StyledRadioGroup>
            </FormControl> */}

            <div className="mb-4">
              <img src={MunsowLogo} height="54px" width="54px"/>
            </div>
            <h2 className="text-3xl font-semibold mb-2 text-white">Student Login</h2>
            <p className="mb-8 text-white">Enter Your Details Below To Login Into Your Account</p>
            {/* <p className="text-base text-gray-600 mb-4">
              Get personalized insights on your interview skills, strengths, and areas for improvement.
            </p> */}
            <form onSubmit={handleSubmit}>
              <div>
                <div className="space-y-4">
                  <div className="mb-2">
                    <label htmlFor="universityId" className="text-sm font-bold text-white">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3"
                      id="universityId"
                      name="universityId"
                      placeholder="Enter Email Address"
                      value={universityId}
                      onChange={loginInputHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="text-sm font-bold text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
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
              </div></form>
            {/* <div className="mt-3 text-center">
              <span className="text-blue-600 hover:underline cursor-pointer" onClick={handleClickOpen}>
                Forget Password?
              </span>
            </div> */}
            <div>
              {open ? <ForgotPassword open={open} setOpen={setOpen} /> : <></>}
              {/* <Modal
                open={open}
                onClose={handleClickOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Forget Password?
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Enter Your Email-Id
                  </Typography>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={loginInputHandler}
                  />
                  <div className="mt-4 space-x-2">
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                  </div>
                </Box>
              </Modal> */}
            </div>
            {/* <div className="mt-4 text-center">
              <span className="text-gray-600">
                New to Munsow? {" "}
              </span>
              <span className="text-blue-600 hover:underline">
                <Link to={"/studentRegister"}>Sign Up!</Link>
              </span>
            </div> */}

            {/* <div className="student-login-section bg-gradient-to-r from-blue-100 to-teal-100 p-5 rounded-lg shadow-md mt-5">
              <div className="flex items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-700 mr-4">New to Munsow? {" "}</h2>
                <Link to={"/studentRegister"} className="text-white font-bold py-1 px-3 rounded-full transition duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl">
                Sign Up
                </Link>
              </div>
            </div> */}

            {/* <div className="mt-5 text-center">
              <span className="text-gray-600">
                Institution login here!
              </span>
              <span className="text-blue-600 font-semibold cursor-pointer">
                {" "}
                <Link to={"/"}>Login here!</Link>
              </span>
            </div> */}
            {/* <div className="mt-10 text-center">
              <span className="text-gray-600">
                Having issues logging in?
              </span>
              <span className="text-blue-600 font-semibold cursor-pointer" onClick={handleClickOpen}>
                {" "}
                forget Password
              </span>
            </div> */}
            <div className="mt-5 text-white">
              <span>
                Not Registered?&nbsp;
              </span>
              <a href="https://www.munsow.com/contact" target="_blank"><span className="underline" style={{ color: BackgroundColor }}>Contact Us</span></a>              
            </div>
            <div className="mt-16 text-center text-white">
              <span>
                Not a Job Seeker?&nbsp;Organisation Login&nbsp;
              </span>
              <span className="underline cursor-pointer" style={{ color: BackgroundColor }} onClick={handleInstitutionClick}>Here</span>            
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center w-3/6">
          <img
            src={StudentLoginHero}
            className="object-cover w-full"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
