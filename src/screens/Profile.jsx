import { Button, InputAdornment, TextField, Avatar, Modal, Box, Typography, Input, styled} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PasswordIcon from "@mui/icons-material/Password";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { useDispatch } from "react-redux";
import { user_update } from "../redux/action";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AvatarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledAvatar = styled(Avatar)({
  backgroundColor: "#ede9fe",
  color: "#5E7AFC",
  height: "8rem",
  width: "7rem",
  border: "2px solid white",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  fontSize: "3rem",
  cursor: "pointer",
  '& .css-1pqm26d-MuiAvatar-img': {
    // Override styles for the image
    objectFit: 'cover',
    width: '100%',
    height: 'auto !important', 
  },
});

const StyledInput = styled(Input)({
  display: 'none',
});

export default function Profile() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //avatar
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // Update the user's avatar in the backend here if needed
  }, [avatar]);


  const onLogingChange = (key, value) => {
    console.log(key, value);
    let temp = { ...loginData };
    temp[key] = value;
    setLoginData(() => ({ ...temp }));
  };

  const onUpdate = () => {
    const payload = {
      first_name: loginData?.first_name,
      last_name: loginData?.last_name,
      password: loginData?.password,
      email: loginData?.email,
      phone_number: loginData?.phone_number,
      user_id: GLOBAL_CONSTANTS?.user_cred?.user_id
    };
    
    dispatch(user_update(payload, () => {
      let temp_data = JSON.parse(localStorage?.getItem("user_data"))
      temp_data.data = {
        ...temp_data.data,
        first_name: loginData?.first_name,
        last_name: loginData?.last_name,
        email: loginData?.email,
        phone_number: loginData?.phone_number,
        password: loginData?.password,
      };
      console.info(temp_data, "temp_data")
      localStorage.setItem("user_data", JSON.stringify(temp_data));
      // window.location.reload()
    }));
  };


  useEffect(() => {
    setLoginData({
      first_name: JSON.parse(localStorage?.getItem("user_data"))?.data?.first_name,
      last_name: JSON.parse(localStorage?.getItem("user_data"))?.data?.last_name,
      email: JSON.parse(localStorage?.getItem("user_data"))?.data?.email,
      phone_number: JSON.parse(localStorage?.getItem("user_data"))?.data?.phone_number,
      password: JSON.parse(localStorage?.getItem("user_data"))?.data?.password,
    })
  }, [])
  useEffect(() => {
    console.info(loginData, "__--loginData")
  }, [loginData])

  console.log(JSON.parse(localStorage?.getItem("user_data"))?.data, "aaa") // use this data to show in reports

  return (
    <>
    <div>
      <div className="bg-white mt-0 p-2 border-b">
        <h3 className="font-semibold">Personal Information</h3>
        <p className="text-gray-400 text-sm">Update your personal information</p>
      </div>
      <div className="bg-white max-[525px]:px-6 px-12 md:px-24 py-12">
        <h3 className="mb-3 text-gray-500 font-semibold">Profile Info</h3>
        {/* <div>
          <p className="mb-1 text-gray-400 text-sm">Avatar</p>
          <Avatar sx={{ bgcolor: "#e3e6fa", color: "#5E7AFC", height: "6rem", width: "6rem",  border: "2px solid white",  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)", fontSize: "3rem"}} variant="square">
            H
          </Avatar>
        </div> */}
        <div>
        <AvatarContainer>
        <p className="mb-1 text-gray-400 text-sm">Avatar</p>
        <label htmlFor="avatar-input">
          <StyledAvatar src={avatar} variant="square">
            H
          </StyledAvatar>
        </label>
        <StyledInput
          id="avatar-input"
          type="file"
          onChange={handleAvatarChange}
        />
        {/* <Button variant="contained" component="span">
          Upload Avatar
        </Button> */}
      </AvatarContainer>
      </div>
        <div className="my-8">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-8">

            <div className="">
            <p className="mb-1 text-gray-400 text-sm">First Name <span className="text-red">*</span></p>
              <TextField 
              className="w-full"
              id="standard-basic" 
              // label="Standard" 
              // variant="outlined" 
              placeholder="Arpitha"
              value={loginData?.first_name} 
              onChange={(event) =>
                onLogingChange("first_name", event.target.value)
              }/>
            </div>
            <div>
            <p className="mb-1 text-gray-400 text-sm">Last Name <span className="text-red">*</span></p>
              <TextField 
              className="w-full"
              id="standard-basic" 
              // label="Standard" 
              // variant="outlined" 
              placeholder="Manda"
              value={loginData?.last_name} 
              onChange={(event) =>
                onLogingChange("last_name", event.target.value)
              }/>
            </div>

            <div className="">
            <p className="mb-1 text-gray-400 text-sm">Contact Number <span className="text-red">*</span></p>
              <TextField 
              className="w-full"
              id="standard-basic" 
              // label="Standard" 
              // variant="outlined" 
              placeholder="+91 79753-56816"
              value={loginData?.phone_number} 
              onChange={(event) =>
                onLogingChange("phone_number", event.target.value)
              }
              />
            </div>
            <div>
            <p className="mb-1 text-gray-400 text-sm">Email Address <span className="text-red">*</span></p>
              <TextField 
              className="w-full"
              id="standard-basic" 
              // label="Standard" 
              // variant="outlined" 
              placeholder="admin@munsow.com"
              value={loginData?.email} 
              onChange={(event) =>
                onLogingChange("email", event.target.value)
              }/>
            </div>
    
          </div>
  
        </div>
        <hr></hr>
        <div className="flex justify-end my-8">
          <button className="border rounded-lg max-[425px]:p-2 p-3 mr-5 text-blue-400">Cancel</button>
          <button onClick={() => { onUpdate() }} className="border rounded-lg max-[425px]:p-2 p-3 text-white bg-blue-400">Save changes</button>
        </div>
        <div>
          <h3 className="mb-5 text-gray-500 font-semibold">Password Settings</h3>
          <div className="">
            <p className="mb-1 text-gray-400 text-sm">Password</p>
              <TextField 
              className="w-full "
              id="standard-basic" 
              // defaultValue="xyz@123"
              type="password"
              // disabled="true"
              value={loginData?.password} 
              onChange={(event) =>
                onLogingChange("password", event.target.value)
              }
              />
            </div>
            <div className="flex justify-end my-8">
              <button onClick={() => { onUpdate() }} className="border rounded-lg max-[425px]:p-2 p-3 text-black-300">Reset Password</button>
              {/* <Button >Open modal</Button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Password Settings
              </Typography>
              <div className="my-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-8">

                <div className="">
                  <p className="mb-1 text-black-400 text-sm">Current Password</p>
                  <TextField 
                  className="w-full"
                  id="standard-basic"  
                  type="password"
                  placeholder="Enter Current Password"
                  value={loginData?.password} 
                  // onChange={(event) =>
                  //   onLogingChange("password", event.target.value)
                  // }
                  />
                </div>
                <div>
                  <p className="mb-1 text-black-400 text-sm">New Password</p>
                  <TextField 
                  className="w-full"
                  id="standard-basic" 
                  type="password"
                  placeholder="Enter New Password"
                  value={loginData?.password} 
                  // onChange={(event) =>
                  //   onLogingChange("password", event.target.value)
                  // }
                  />
                </div>

                <div>
                  <p className="mb-1 text-black-400 text-sm">Confirm Password</p>
                  <TextField 
                  className="w-full"
                  id="standard-basic" 
                  type="password"
                  placeholder="Re enter New Password"
                  value={loginData?.password} 
                  // onChange={(event) =>
                  //   onLogingChange("password", event.target.value)
                  // }
                  />
                </div>
    
              </div>
              <hr></hr>
              <div className="flex justify-end my-8">
                <button onClick={handleClose} className="border rounded-lg max-[425px]:p-2 p-3 mr-5 text-blue-400">Cancel</button>
                <button className="border rounded-lg max-[425px]:p-2 p-3 text-white bg-blue-400">Change Password</button>
              </div>
              </Box>
              </Modal>
            </div>
        </div>
      </div>
    </div>
    {/* <div
      // style={{ background: "linear-gradient(1deg,#1c85ce 30%, #5271ff)" }}
      className="text-lg flex items-center justify-center gap-10 h-full w-full " >
      <div
        className="rounded-xl overflow-hidden py-6 px-5 shadow-xl grid items-center justify-center"
        style={{ background: "rgba(255,255,255,0.5)", transform: "rotateZ(5deg)", backdropfilter: "blur(90px)", border: "2px solid #886cc040" }}
      >
        <div
          className="flex flex-col items-center justify-center gap-10 m-2 p-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(80px)", transform: "rotateZ(-5deg)", border: "2px solid #886cc040" }}
        >
          <div className="text-5xl font-semibold "  >Account Details...</div>
          <div className="grid gap-4 w-[40vw]">
            <TextField
              value={loginData?.user_name}
              id="standard-basic"
              label="User Name"
              // variant="standard"
              style={{ width: "100%" }}
              onChange={(event) =>
                onLogingChange("user_name", event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon color="#886cc0" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              value={loginData?.email}
              id="standard-basic"
              label="Email"
              // variant="standard"
              style={{ width: "100%" }}
              onChange={(event) =>
                onLogingChange("email", event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon color="#886cc0" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              value={loginData?.password}
              id="standard-basic"
              label="Password"
              // variant="standard"
              style={{ width: "100%" }}
              onChange={(event) =>
                onLogingChange("password", event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon color="secondary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    {
                      showPassword ? <VisibilityOffOutlinedIcon color="secondary" style={{ cursor: "pointer" }} onClick={() => { setShowPassword(() => false) }} /> : <RemoveRedEyeOutlinedIcon color="secondary" style={{ cursor: "pointer" }} onClick={() => setShowPassword(true)} />
                    }
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />

            <div className='flex justify-end gap-x-4'>
              <Button
                size="small"
                style={{ backgroundColor: '#886cc0', cursor: "pointer", padding: "5px 10px", color: "white" }}
                onClick={() => { onUpdate() }}
              >
                Update
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div> */}
    </>
  )
}
