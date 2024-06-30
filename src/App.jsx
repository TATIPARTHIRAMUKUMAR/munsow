// import { Provider } from "react-redux";
// import store from "./redux/store";
// import Url_Routes from "./Url_Routes";

// // toast
// import { Slide, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import Loader from "./Components/Loader";


// export default function App() {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const requestInterceptor = axios.interceptors.request.use((config) => {
//       // Show loader when a request is made
//       setIsLoading(true);
//       return config;
//     });

//     const responseInterceptor = axios.interceptors.response.use(
//       (response) => {
//         // Hide loader when a response is received
//         setIsLoading(false);
//         return response;
//       },
//       (error) => {
//         // Hide loader on error as well
//         setIsLoading(false);
//         return Promise.reject(error);
//       }
//     );

//     // Clean up interceptors when the component unmounts
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

//   return (<>
//     {isLoading && (
//       <Loader />
//     )}
//       <Url_Routes />
//       <ToastContainer
//         transition={Slide}
//         autoClose={2000}
//         position="top-right"
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//   </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Url_Routes from './Url_Routes';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import axios from 'axios';
import Loader from './Components/Loader';
import { LoaderProvider } from './Components/LoaderContext';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      // Show loader when a request is made
      setIsLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Hide loader when a response is received
        setIsLoading(false);
        return response;
      },
      (error) => {
        // Hide loader on error as well
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <LoaderProvider>
      {isLoading && <Loader />}
      <Url_Routes />
      <ToastContainer
        transition={Slide}
        autoClose={2000}
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </LoaderProvider>
  );
}

export default App;
