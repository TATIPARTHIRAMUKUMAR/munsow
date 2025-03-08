import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';
import LottieLoader from './LottieLoader';

const LoaderContext = createContext();

export const useLoader = () => {
  return useContext(LoaderContext);
};

export const LoaderProvider = ({ children }) => {
  const [loaderType, setLoaderType] = useState(null);
  const [questionsList, setQuestionsList] = useState(null);
  const location = useLocation();
  
  const showLoader = (type) => {
    setLoaderType(type);
  };
  
  const hideLoader = () => {
    setLoaderType(null);
  };
  
  const setQuestions = (questions) => {
    setQuestionsList(questions);
  };
  
  useEffect(() => {
    hideLoader();
  }, [location.pathname]);
  
  const isPracticePage = location.pathname === '/practice';
  
  return (
    <LoaderContext.Provider value={{ loaderType, showLoader, hideLoader, questionsList, setQuestions }}>
      {children}
      {loaderType && isPracticePage ? (
        <LottieLoader type={loaderType} hideLoader={hideLoader} questionsList={questionsList} />
      ) : (
        loaderType && <Loader type={loaderType} hideLoader={hideLoader} questionsList={questionsList} />
      )}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;