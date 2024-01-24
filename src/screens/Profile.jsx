import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PasswordIcon from "@mui/icons-material/Password";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { useDispatch } from "react-redux";
import { user_update } from "../redux/action";
import { useDarkMode } from "./../Dark";

export default function Profile() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onLogingChange = (key, value) => {
    console.log(key, value);
    let temp = { ...loginData };
    temp[key] = value;
    setLoginData(() => ({ ...temp }));
  };

  const onUpdate = () => {
    const payload = {
      username: loginData?.user_name,
      password: loginData?.password,
      email: loginData?.email,
      user_id: GLOBAL_CONSTANTS?.user_cred?.user_id,
    };
    dispatch(
      user_update(payload, () => {
        let temp_data = JSON.parse(localStorage?.getItem("user_data"));
        temp_data.data = {
          ...temp_data.data,
          email: loginData?.email,
          user_name: loginData?.user_name,
        };
        console.info(temp_data, "temp_data");
        localStorage.setItem("user_data", JSON.stringify(temp_data));
        // window.location.reload()
      })
    );
  };

  useEffect(() => {
    setLoginData({
      user_name: JSON.parse(localStorage?.getItem("user_data"))?.data
        ?.user_name,
      email: JSON.parse(localStorage?.getItem("user_data"))?.data?.email,
    });
  }, []);
  useEffect(() => {
    console.info(loginData, "__--loginData");
  }, [loginData]);

  const { isDarkMode, colorTheme } = useDarkMode();
  const { colorTheme: reduxColorTheme } = useDarkMode();
  console.log(colorTheme, "colorTheme");

  const linearGradientBackground = isDarkMode
    ? reduxColorTheme.dark.selectBackground
    : reduxColorTheme.light.selectBackground;
  //button
  const textColors = isDarkMode
    ? reduxColorTheme.dark.textColor2
    : reduxColorTheme.light.textColor2;

  return (
    <div
      // style={{ background: "linear-gradient(1deg,#1c85ce 30%, #5271ff)" }}
      className="text-lg flex items-center justify-center gap-10 h-full w-full "
    >
      <div
        className="rounded-xl overflow-hidden py-6 px-5 shadow-xl grid items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.5)",
          transform: "rotateZ(5deg)",
          backdropfilter: "blur(90px)",
          border: "2px solid #886cc040",
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-10 m-2 p-4 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(80px)",
            transform: "rotateZ(-5deg)",
            border: "2px solid #886cc040",
          }}
        >
          <div className="text-5xl font-semibold ">Account Details</div>
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
              onChange={(event) => onLogingChange("email", event.target.value)}
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
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon
                        color="secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setShowPassword(() => false);
                        }}
                      />
                    ) : (
                      <RemoveRedEyeOutlinedIcon
                        color="secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />

            <div className="flex justify-end gap-x-4">
              <Button
                size="small"
                style={{
                  background: linearGradientBackground,
                  cursor: "pointer",
                  padding: "5px 10px",
                  color: "white",
                }}
                onClick={() => {
                  onUpdate();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
