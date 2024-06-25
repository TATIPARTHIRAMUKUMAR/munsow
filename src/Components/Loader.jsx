
import React, { useState, useEffect } from 'react';
import SplashModal from './SplashModal';
import splashScreen from '../assets/splashScreen.svg';


const Loader = ({ type, questionsList, hideLoader }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const intervalDuration = 1200;
  const interval = 1200;

  let intervalId;

  const handleNext = (increment = 1) => {
    setStep((prevStep) => (prevStep + increment <= totalSteps ? prevStep + increment : prevStep));
  };

  useEffect(() => {
    if (type === 'splash') {
      intervalId = setInterval(() => {
        setStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : 1));
      }, intervalDuration);

      return () => clearInterval(intervalId);
    }
  }, [type, intervalDuration]);

  useEffect(() => {
    if (questionsList?.questions?.length > 0) {
      clearInterval(intervalId);
      setTimeout(() => {
        hideLoader();
      }, 6000);
    }
  }, [questionsList, hideLoader]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {type === 'splash' ? (
        <div>
          <SplashModal
            step={step}
            totalSteps={totalSteps}
            onNext={handleNext}
            interval={interval}
          >
            {step === 1 && (
              <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
                <img
                  src={splashScreen}
                  alt="step-1"
                  className="object-cover mt-8 mb-4 mx-auto"
                />
                <p className="text-gray-700 mb-6 font-bold">
                  Before you start the interview, please review these tips:
                </p>
                <ul className='list-disc list-inside'>
                  <li>Test your audio and video beforehand.</li>
                  <li>Have a notepad, pen and water bottle ready.</li>
                </ul>
              </div>
            )}
            {step === 2 && (
              <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
                <img
                  src={splashScreen}
                  alt="step-2"
                  className="object-cover mb-4 mx-auto"
                />
                <p className="text-gray-700 mb-6 font-bold">
                  Before you start the interview, please review these tips:
                </p>
                <ul className='list-disc list-inside'>
                  <li>Find a quiet and well-lit place.</li>
                  <li>Ensure a stable internet connection.</li>
                </ul>
              </div>
            )}
            {step === 3 && (
              <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
                <img
                  src={splashScreen}
                  alt="step-3"
                  className="object-cover mb-4 mx-auto"
                />
                <p className="text-gray-700 mb-6 font-bold">
                  Remember, make eye contact, smile, and speak clearly and confidently.
                </p>
              </div>
            )}
            {step === 4 && (
              <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
                <img
                  src={splashScreen}
                  alt="step-4"
                  className="object-cover mb-4 mx-auto"
                />
                <p className="text-gray-700 font-bold mb-2">
                  Feeling confident and ready? Let's begin!
                </p>
                <p className="text-gray-700 font-bold mb-6">
                  Start your interview now!
                </p>
              </div>
            )}
          </SplashModal>
        </div>
      ) : (
        <div className="default-loader">
          <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "#2BE2D0" }}></div>
        </div>
      )}
    </div>
  );
};

export default Loader;
