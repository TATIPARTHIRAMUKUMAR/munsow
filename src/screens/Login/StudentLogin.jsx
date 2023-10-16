import React, { useState } from "react";
import { Link } from "react-router-dom";
import interview from "../../assets/interview.jpeg";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { user_login } from "../../redux/action";
import { useDispatch } from "react-redux";
import ForgotPassword from "./ForgotPassword";

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

const StudentLogin = () => {
  const dispatch = useDispatch()

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
      email:universityId,
      password:password
    }
    dispatch(user_login(payload,()=>{
      window.location.href="./studentDashboard";
    }))
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/6 p-5 md:p-20">
          <div className="bg-white   rounded-lg p-6">
            <h2 className="text-4xl font-semibold mb-4">Interviewee Login</h2>
            <p className="text-base text-gray-600 mb-4">
            Get personalized insights on your interview skills, strengths, and areas for improvement.
            </p>
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
              {open ? <ForgotPassword open={open} setOpen={setOpen}/>:<></>}
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
            <div className="mt-4 text-center">
              <span className="text-gray-600">
              New to Munsow? {" "}
              </span>
              <span className="text-blue-600 hover:underline">
                <Link to={"/studentRegister"}>Sign Up!</Link>
              </span>
            </div>
            <div className="mt-5 text-center">
              <span className="text-gray-600">
                 Institution login here!
              </span>
              <span className="text-blue-600 font-semibold cursor-pointer">
                {" "}
                <Link to={"/"}>Login here!</Link>
              </span>
            </div>
            <div className="mt-10 text-center">
              <span className="text-gray-600">
                Having issues logging in?
              </span>
              <span className="text-blue-600 font-semibold cursor-pointer" onClick={handleClickOpen}>
                {" "}
                forget Password
              </span>
            </div>
            <div className="mt-10 text-center text-gray-600">
              <span>
                By continuing, you agree to our
              </span>
              <span className="font-semibold"> Terms of Service </span>
              <span>and</span>
              <span className="font-semibold"> Privacy Policy</span>
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

export default StudentLogin;
