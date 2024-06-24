import { useEffect } from "react";

const GLOBAL_CONSTANTS = {
  // backend_url: import.meta.env.VITE_BACKEND_API_URL,
  backend_url: "https://munsow-66843b41624e.herokuapp.com/",

  loggedIn:JSON.parse(localStorage?.getItem("user_data")) ? true : false,
  user_cred:JSON.parse(localStorage?.getItem("user_data"))?.data,
  token:JSON.parse(localStorage?.getItem("user_data"))?.access_token,
};

export default GLOBAL_CONSTANTS;