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
import { useDispatch } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    paddingRight:"30px"
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
  boxShadow: 24,
  p: 4,
};

const TeacherLogin = () => {
  const dispatch = useDispatch()
  const [loginType, setLoginType] = useState("teacher");


  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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


  const handleSubmit = async () => {
    const payload = {
      email: universityId,
      password: password,
      role:"teacher"
    }
    dispatch(user_login(payload, () => {
      window.location.href = "./teacherDashboard";
    }))
  };

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setLoginType(selectedType);
    if (selectedType === 'institution') {
      navigate("/");
    } else if (selectedType === 'student') {
      navigate("/studentLogin");
    }
    // Add more conditions for other types if necessary
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/6 p-5 md:p-20">
          <div className="bg-white   rounded-lg p-6">

          <FormControl component="fieldset">
              {/* <FormLabel component="legend" style={{ textAlign: 'center', marginBottom: '10px' }}>Login Type</FormLabel> */}
              <StyledRadioGroup row value={loginType} onChange={handleRadioChange}>
                <StyledFormControlLabel value="institution" control={<Radio />} label="Institution" />
                <StyledFormControlLabel value="student" control={<Radio />} label="Student" />
                <StyledFormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              </StyledRadioGroup>
            </FormControl>

            <h2 className="text-2xl font-semibold mb-4">Teacher Login</h2>
            {/* <p className="text-base text-gray-600 mb-4">
              Get personalized insights on your interview skills, strengths, and areas for improvement.
            </p> */}
            <div className="space-y-4">
              <div className="mb-2">
                <label htmlFor="universityId" className="text-sm font-medium text-gray-600">
                  Email ID
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  id="universityId"
                  name="universityId"
                  placeholder=""
                  value={universityId}
                  onChange={loginInputHandler}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  id="password"
                  name="password"
                  placeholder=""
                  value={password}
                  onChange={loginInputHandler}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
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

            
            <div className="mt-10 text-center text-gray-600">
              <span>
                By continuing, you agree to our
              </span>
              <a href=" https://www.munsow.com/terms-and-conditions" target="_blank"><span className="font-semibold text-blue-500">  Terms of Service  </span></a>

              {/* <span className="font-semibold"> Terms of Service </span> */}
              <span>and</span>
              <a href=" https://www.munsow.com/privacy-policy" target="_blank"><span className="font-semibold text-blue-500">  Privacy Policy  </span></a>

              {/* <span className="font-semibold"> Privacy Policy</span> */}
            </div>
          </div>
        </div>
        <div className="hidden md:inline w-3/6">
          <img
            src={interview}
            className="w-full p-5 md:p-20"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
