import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import SplashModal from './SplashModal';
import splashScreen from '../assets/splashScreen.svg';
// Import your Lottie animation JSON
import * as loaderAnimation from '../assets/loader-animation.json';

const LottieLoader = ({ type, questionsList, hideLoader = () => {} }) => {
  const [step, setStep] = useState(1);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const totalSteps = 4;

  let defaultOptions;
  try {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loaderAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  } catch (error) {
    console.error("Error loading Lottie animation:", error);
    setLottieError(true);
  }

  const handleNext = (increment = 1) => {
    setStep((prevStep) => {
      const newStep = prevStep + increment;
      if (newStep <= totalSteps) {
        return newStep;
      } else {
        hideLoader();
        return prevStep;
      }
    });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setDoNotShowAgain(checked);
    
    if (checked) {
      localStorage.setItem('doNotShowSplash', 'true');
      if (step === totalSteps) {
        hideLoader();
      }
    } else {
      localStorage.removeItem('doNotShowSplash');
    }
  };

  useEffect(() => {
    const savedPreference = localStorage.getItem('doNotShowSplash');
    if (savedPreference === 'true') {
      hideLoader();
    }
  }, [hideLoader]);

  useEffect(() => {
    if (step > totalSteps || (step === totalSteps && doNotShowAgain)) {
      hideLoader();
    }
  }, [step, totalSteps, doNotShowAgain, hideLoader]);

  // Reset step when loader is shown
  useEffect(() => {
    if (type) {
      setStep(1);
    }
  }, [type]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {type === 'splash' ? (
        <div>
          <SplashModal
            step={step}
            totalSteps={totalSteps}
            onNext={handleNext}
            questionsList={questionsList}
            hideLoader={hideLoader}
            setStep={setStep}
          >
            {step === 1 && (
              <div className="transition-opacity duration-700 ease-in-out opacity-100">
                <img
                  src={splashScreen}
                  alt="step-1"
                  className="object-cover mt-8 mb-4 mx-auto"
                />
                <p className="text-gray-700 mb-6 font-bold">
                  Before you start the practice interview, please review these tips:
                </p>
                <ul className='list-disc list-inside'>
                  <li>Test your audio and video beforehand.</li>
                  <li>Have a notepad, pen, and water bottle ready.</li>
                </ul>
              </div>
            )}
            {step === 2 && (
              <div className="transition-opacity duration-700 ease-in-out opacity-100">
                <img
                  src={splashScreen}
                  alt="step-2"
                  className="object-cover mb-4 mx-auto"
                />
                <p className="text-gray-700 mb-6 font-bold">
                  Before you start the practice interview, please review these tips:
                </p>
                <ul className='list-disc list-inside'>
                  <li>Find a quiet and well-lit place.</li>
                  <li>Ensure a stable internet connection.</li>
                </ul>
              </div>
            )}
            {step === 3 && (
              <div className="transition-opacity duration-700 ease-in-out opacity-100">
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
              <div className="transition-opacity duration-700 ease-in-out opacity-100">
                <img
                  src={splashScreen}
                  alt="step-4"
                  className="object-cover mb-4 mx-auto"
                />
                <p className="text-gray-700 font-bold mb-2">
                  Feeling confident and ready? Let's begin your practice!
                </p>
                <p className="text-gray-700 font-bold mb-6">
                  Start your practice interview now!
                </p>
              </div>
            )}
            <div className="text-left mt-4 ml-9 mb-[30px]">
              <label className="text-gray-700 flex items-center">
                <input
                  type="checkbox"
                  checked={doNotShowAgain}
                  onChange={handleCheckboxChange}
                  className={`mr-2 h-5 w-5 border-[#0fe1d2] checked:bg-[#0fe1d2] hover:checked:bg-[#0fe1d2] pointer-cursor rounded transition-transform duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-[#0fe1d2] ${
                    doNotShowAgain
                      ? 'shadow-md shadow-[#0fe1d2]'
                      : 'shadow-inner shadow-[#0fe1d2]'
                  }`}
                />
                <span className="ml-2 text-[14px]">Do Not Show Again</span>
              </label>
            </div>
          </SplashModal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {lottieError ? (
            <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "#0fe1d2" }}></div>
          ) : (
            <div style={{ width: 200, height: 200 }}>
              <Lottie 
                options={defaultOptions}
                width={200}
                height={200}
                isClickToPauseDisabled={true}
              />
            </div>
          )}
          <p className="text-xl text-[#0fe1d2] mt-4 font-medium animate-pulse">
            Loading your practice session...
          </p>
        </div>
      )}
    </div>
  );
};

export default LottieLoader;