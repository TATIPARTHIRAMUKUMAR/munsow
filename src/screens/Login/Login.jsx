import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import interview from "../../assets/admin_ui.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { institution_login } from "../../redux/action";
import ForgotPassword from "./ForgotPassword";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: "30px",
});

const StyledFormControlLabel = styled(FormControlLabel)({
  fontSize: "50px",
  "& .MuiSvgIcon-root": {
    color: "#4A90E2",
  },
  "& .MuiTypography-root": {
    color: "#333",
    fontSize: "20px",
    paddingRight: "30px",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("institution");

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
    dispatch(
      institution_login(payload, () => {
        localStorage.setItem("branch", "All Branches");
        localStorage.setItem("course", "All Courses");
        localStorage.setItem("department", "All Departments");
        localStorage.setItem("user", "All Users");
        window.location.href = "./adminDashboard";
      })
    );
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    if (type == "student") {
      navigate("/studentLogin");
    }
  };

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setLoginType(selectedType);
    if (selectedType === "student") {
      navigate("/studentLogin");
    } else if (selectedType === "teacher") {
      navigate("/teacherLogin");
    }
    // Add more conditions for other types if necessary
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/6 p-5 md:p-20">
          <div className="bg-white rounded-lg p-6">
            <FormControl component="fieldset">
              {/* <FormLabel component="legend" style={{ textAlign: 'center', marginBottom: '10px' }}>Login Type</FormLabel> */}
              <StyledRadioGroup
                row
                value={loginType}
                onChange={handleRadioChange}
              >
                <StyledFormControlLabel
                  value="institution"
                  control={<Radio />}
                  label="Institution"
                />
                <StyledFormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <StyledFormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="Teacher"
                />
              </StyledRadioGroup>
            </FormControl>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold  mb-4">
                  Institution Login
                </h2>
                {/* <p className="text-base text-gray-600 mb-7">
                Get access to our expert insights about your students across departments, branches, and cities today!
              </p> */}
              </div>
              <div className="space-y-4">
                <div className="mb-2">
                  <label
                    htmlFor="universityId"
                    className="text-sm font-medium text-gray-600"
                  >
                    University ID
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
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-600"
                  >
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
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Login
                </button>
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

            <div className="student-login-section bg-gradient-to-r from-blue-100 to-teal-100 p-5 rounded-lg shadow-md mt-5">
              <div className="flex items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-700 mr-4">
                  Welcome !
                </h2>
                <Link
                  to={"/registration"}
                  className="text-white font-bold py-1 px-3 rounded-full transition duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl"
                >
                  Join Us Today!
                </Link>
              </div>
            </div>
            <div className="mt-10 text-center text-gray-600">
              <span>By continuing, you agree to our</span>
              <a
                href="https://www.munsow.com/terms-and-conditions"
                target="_blank"
                className="font-semibold text-blue-500 ml-1"
              >
                Terms of Service
              </a>
              <span> and </span>
              <a
                href="https://www.munsow.com/privacy-policy"
                target="_blank"
                className="font-semibold text-blue-500"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:inline w-3/6">
          <img src={interview} className="w-full p-5 md:p-20" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
