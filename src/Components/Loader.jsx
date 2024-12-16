
// import React, { useState, useEffect } from 'react';
// import SplashModal from './SplashModal';
// import splashScreen from '../assets/splashScreen.svg';


// const Loader = ({ type, questionsList, hideLoader }) => {
//   const [step, setStep] = useState(1);
//   const totalSteps = 4;
//   const intervalDuration = 1200;
//   const interval = 1200;

//   let intervalId;

//   const handleNext = (increment = 1) => {
//     setStep((prevStep) => (prevStep + increment <= totalSteps ? prevStep + increment : prevStep));
//   };

//   useEffect(() => {
//     if (type === 'splash') {
//       intervalId = setInterval(() => {
//         setStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : 1));
//       }, intervalDuration);

//       return () => clearInterval(intervalId);
//     }
//   }, [type, intervalDuration]);

//   useEffect(() => {
//     if (questionsList?.questions?.length > 0) {
//       clearInterval(intervalId);
//       setTimeout(() => {
//         hideLoader();
//       }, 6000);
//     }
//   }, [questionsList, hideLoader]);

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       {type === 'splash' ? (
//         <div>
//           <SplashModal
//             step={step}
//             totalSteps={totalSteps}
//             onNext={handleNext}
//             interval={interval}
//           >
//             {step === 1 && (
//               <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
//                 <img
//                   src={splashScreen}
//                   alt="step-1"
//                   className="object-cover mt-8 mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Before you start the interview, please review these tips:
//                 </p>
//                 <ul className='list-disc list-inside'>
//                   <li>Test your audio and video beforehand.</li>
//                   <li>Have a notepad, pen and water bottle ready.</li>
//                 </ul>
//               </div>
//             )}
//             {step === 2 && (
//               <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
//                 <img
//                   src={splashScreen}
//                   alt="step-2"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Before you start the interview, please review these tips:
//                 </p>
//                 <ul className='list-disc list-inside'>
//                   <li>Find a quiet and well-lit place.</li>
//                   <li>Ensure a stable internet connection.</li>
//                 </ul>
//               </div>
//             )}
//             {step === 3 && (
//               <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
//                 <img
//                   src={splashScreen}
//                   alt="step-3"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Remember, make eye contact, smile, and speak clearly and confidently.
//                 </p>
//               </div>
//             )}
//             {step === 4 && (
//               <div className={"transition-opacity duration-700 ease-in-out opacity-100"}>
//                 <img
//                   src={splashScreen}
//                   alt="step-4"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 font-bold mb-2">
//                   Feeling confident and ready? Let's begin!
//                 </p>
//                 <p className="text-gray-700 font-bold mb-6">
//                   Start your interview now!
//                 </p>
//               </div>
//             )}
//           </SplashModal>
//         </div>
//       ) : (
//         <div className="default-loader">
//           <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "#2BE2D0" }}></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Loader;

// import React, { useState, useEffect } from 'react';
// import SplashModal from './SplashModal';
// import splashScreen from '../assets/splashScreen.svg';

// const Loader = ({ type, questionsList, hideLoader = () => {} }) => {
//   const [step, setStep] = useState(1);
//   const [doNotShowAgain, setDoNotShowAgain] = useState(false);
//   const totalSteps = 4;
//   const intervalDuration = 1200;

//   useEffect(() => {
//     const savedPreference = localStorage.getItem('doNotShowSplash');
//     if (savedPreference) {
//       hideLoader();
//     }
//   }, [hideLoader]);

//   const handleNext = (increment = 1) => {
//     setStep((prevStep) => (prevStep + increment <= totalSteps ? prevStep + increment : prevStep));
//   };

//   const handleCheckboxChange = (e) => {
//     setDoNotShowAgain(e.target.checked);
//     if (e.target.checked && step === totalSteps) {
//       localStorage.setItem('doNotShowSplash', 'true');
//       hideLoader();
//     } else {
//       localStorage.removeItem('doNotShowSplash');
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       {type === 'splash' ? (
//         <div>
//           <SplashModal
//             step={step}
//             totalSteps={totalSteps}
//             onNext={handleNext}
//             questionsList={questionsList}
//             hideLoader={hideLoader}
//             setStep={setStep}
//           >
//             {step === 1 && (
//               <div className="transition-opacity duration-700 ease-in-out opacity-100">
//                 <img
//                   src={splashScreen}
//                   alt="step-1"
//                   className="object-cover mt-8 mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Before you start the interview, please review these tips:
//                 </p>
//                 <ul className='list-disc list-inside'>
//                   <li>Test your audio and video beforehand.</li>
//                   <li>Have a notepad, pen, and water bottle ready.</li>
//                 </ul>
//               </div>
//             )}
//             {step === 2 && (
//               <div className="transition-opacity duration-700 ease-in-out opacity-100">
//                 <img
//                   src={splashScreen}
//                   alt="step-2"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Before you start the interview, please review these tips:
//                 </p>
//                 <ul className='list-disc list-inside'>
//                   <li>Find a quiet and well-lit place.</li>
//                   <li>Ensure a stable internet connection.</li>
//                 </ul>
//               </div>
//             )}
//             {step === 3 && (
//               <div className="transition-opacity duration-700 ease-in-out opacity-100">
//                 <img
//                   src={splashScreen}
//                   alt="step-3"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 mb-6 font-bold">
//                   Remember, make eye contact, smile, and speak clearly and confidently.
//                 </p>
//               </div>
//             )}
//             {step === 4 && (
//               <div className="transition-opacity duration-700 ease-in-out opacity-100">
//                 <img
//                   src={splashScreen}
//                   alt="step-4"
//                   className="object-cover mb-4 mx-auto"
//                 />
//                 <p className="text-gray-700 font-bold mb-2">
//                   Feeling confident and ready? Let's begin!
//                 </p>
//                 <p className="text-gray-700 font-bold mb-6">
//                   Start your interview now!
//                 </p>
//               </div>
//             )}
//             {/* <div className="text-left mt-4 ml-9 mb-[30px]">
//               <label className="text-gray-700 flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={doNotShowAgain}
//                   onChange={handleCheckboxChange}
//                   className={`mr-2 h-5 w-5 text-xs border-[#0fe1d2] checked:bg-[#0fe1d2] hover:checked:bg-[#0fe1d2] cursor-pointer rounded transition-transform duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-[#0fe1d2] ${
//                     doNotShowAgain
//                       ? 'shadow-md shadow-[#0fe1d2]'
//                       : 'shadow-inner shadow-[#0fe1d2]'
//                   }`}
//                 />
//                 <span className="ml-2 text-[14px]">Do Not Show Again</span>
//               </label>
//             </div> */}
//             <div className="text-center mt-4">
//               <label className="text-gray-700 font-bold flex items-center justify-center">
//                 <input
//                   type="checkbox"
//                   checked={doNotShowAgain}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 w-5 h-5"
//                 />
//                 Do Not Show Again
//               </label>
//             </div>
//           </SplashModal>
//         </div>
//       ) : (
//         <>
//         {doNotShowAgain ? (
//           <div className="">
//             <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "red" }}></div>
//           </div>
//         ) : (
//           <div className="default-loader">
//             <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "#2BE2D0" }}></div>
//           </div>
//         )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Loader;

import React, { useState, useEffect } from 'react';
import SplashModal from './SplashModal';
import splashScreen from '../assets/splashScreen.svg';

const Loader = ({ type, questionsList, hideLoader = () => {} }) => {
  const [step, setStep] = useState(1);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const totalSteps = 4;

  const handleNext = (increment = 1) => {
    setStep((prevStep) => (prevStep + increment <= totalSteps ? prevStep + increment : prevStep));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setDoNotShowAgain(checked);
    console.log("step : ", step);
    console.log("checked : ", checked);
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
                  Before you start the interview, please review these tips:
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
                  Before you start the interview, please review these tips:
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
                  Feeling confident and ready? Let's begin!
                </p>
                <p className="text-gray-700 font-bold mb-6">
                  Start your interview now!
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
        <>
        {doNotShowAgain ? (
          <div className="">
            <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "red" }}></div>
          </div>
        ) : (
          <div className="default-loader">
            <div className="w-16 h-16 border-t-4 border-b-4 rounded-full animate-spin" style={{ borderColor: "#2BE2D0" }}></div>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default Loader;
