import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';
import './SplashModal.css'

const SplashModal = ({ step, totalSteps, children, onNext, interval }) => {
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext(1);
    }, interval);

    return () => clearTimeout(timer);
  }, [step, onNext, interval]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[700px] h-[390px] text-center shadow-lg">
        <div className="relative mb-4">
          {/* <LinearProgress variant="determinate" value={progress} className="bg-teal-500 h-[20px]" /> */}
          <div className="bg-teal-100 h-[20px] progress">
            <div
              className="bg-teal-500 h-[20px] progress-value"
              // style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-4">{children}</div>
        {/* <div className="flex justify-between">
          <button
            onClick={() => onNext(-1)}
            disabled={step === 1}
            className="bg-teal-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => onNext(1)}
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

SplashModal.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  onNext: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
};

export default SplashModal;
