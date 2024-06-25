
import React, { createContext, useContext, useState } from 'react';
import Loader from './Loader';

const LoaderContext = createContext();

export const useLoader = () => {
    return useContext(LoaderContext);
};

export const LoaderProvider = ({ children }) => {
    const [loaderType, setLoaderType] = useState(null);
    const [questionsList, setQuestionsList] = useState(null);

    const showLoader = (type) => {
        setLoaderType(type);
    };

    const hideLoader = () => {
        setLoaderType(null);
    };

    const setQuestions = (questions) => {
        setQuestionsList(questions);
    };

    return (
        <LoaderContext.Provider value={{ loaderType, showLoader, hideLoader, questionsList, setQuestions }}>
            {children}
            {loaderType && <Loader type={loaderType} hideLoader={hideLoader} questionsList={questionsList} />}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;
