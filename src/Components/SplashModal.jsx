// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { LinearProgress } from '@mui/material';
// import './SplashModal.css'

// const SplashModal = ({ step, totalSteps, children, onNext, interval }) => {
//   const progress = (step / totalSteps) * 100;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onNext(1);
//     }, interval);

//     return () => clearTimeout(timer);
//   }, [step, onNext, interval]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg p-6 w-[700px] h-[390px] text-center shadow-lg">
//         <div className="relative mb-4">
//           {/* <LinearProgress variant="determinate" value={progress} className="bg-teal-500 h-[20px]" /> */}
//           <div className="bg-teal-100 h-[20px] progress">
//             <div
//               className="bg-teal-500 h-[20px] progress-value"
//               // style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>
//         <div className="mb-4">{children}</div>
//         {/* <div className="flex justify-between">
//           <button
//             onClick={() => onNext(-1)}
//             disabled={step === 1}
//             className="bg-teal-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => onNext(1)}
//             className="bg-teal-500 text-white px-4 py-2 rounded"
//           >
//             Next
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// SplashModal.propTypes = {
//   step: PropTypes.number.isRequired,
//   totalSteps: PropTypes.number.isRequired,
//   children: PropTypes.node.isRequired,
//   onNext: PropTypes.func.isRequired,
//   interval: PropTypes.number.isRequired,
// };

// export default SplashModal;


import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SplashModal.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SplashModal = ({ step, totalSteps, children, onNext, questionsList, hideLoader, setStep }) => {
  const progress = (step / totalSteps) * 100;

  const handleNextClick = () => {
    if (step < totalSteps) {
      onNext(1);
    } else {
      onNext(-totalSteps + 1);
      setStep(1);
      if (questionsList?.questions?.length > 0) {
        hideLoader();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[700px] h-[470px] text-center shadow-lg relative">
        <div className="relative mb-4">
          <div className="bg-teal-100 h-[20px] progress">
            <div
              className="bg-[#0fe1d2] h-[20px] progress-value"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <TransitionGroup>
          <CSSTransition
            key={step}
            timeout={500}
            classNames="modal-content"
            unmountOnExit
          >
            <div className="mb-4">{children}</div>
          </CSSTransition>
        </TransitionGroup>
        <div className="absolute bottom-4 w-[95%] flex justify-between px-3">
          <button
            onClick={() => onNext(-1)}
            disabled={step === 1}
            className="bg-[#0fe1d2] text-[#242D36] px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextClick}
            className="bg-[#0fe1d2] text-[#242D36] px-4 py-2 rounded"
          >
            {step === 4 ? "Ready For The Interview" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

SplashModal.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default SplashModal;
