

//new2
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
  const [showVoiceWidget, setShowVoiceWidget] = useState(false);

  const checkIfPracticePage = () => {
    return window.location.pathname.includes('/practice');
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      // Show loader when a request is made, except for practice page
      if (!checkIfPracticePage()) {
        setIsLoading(true);
      }
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

    // Check if we should show the voice widget on this page
    setShowVoiceWidget(checkIfPracticePage());

    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [window.location.pathname]); 

  return (
    <Provider store={store}>
      <LoaderProvider>
        {isLoading && !checkIfPracticePage() && <Loader />}
        <Url_Routes />
        {showVoiceWidget}
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
    </Provider>
  );
}

export default App;