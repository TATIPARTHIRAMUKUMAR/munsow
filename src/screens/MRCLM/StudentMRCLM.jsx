
import React, { useState } from 'react';
import { useDarkMode } from "./../../Dark";
import { useSelector } from 'react-redux';

const options = [
  { value: 'images', label: 'Images', color: 'border-red-500', hash: '#EF4444' },
  { value: 'urls', label: 'URLs', color: 'border-blue-500', hash: '#3B82F6' },
  { value: 'documents', label: 'PDFs, PPT, Doc', color: 'border-green-500', hash: '#10B981' },
  { value: 'search', label: 'Search', color: 'border-purple-500', hash: '#8B5CF6' },
];

const StudentMRCLM = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorTheme } = useSelector((state) => state?.data);
  const { isDarkMode } = useDarkMode();

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const handleGenerateClick = () => {
    if (selectedOption === 'search') {
      setIsModalOpen(true);
    }
    // Add more logic here if needed for other options
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;

  const textColor = isDarkMode
    ? colorTheme.dark.background
    : colorTheme.light.background;

  return (
    <div className="bg-gradient-to-b from-[#E0F7FA] to-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-[60px] mt-[20px]">
        Please Upload Study Material
      </h1>

      {/* Radio Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        {options.map((option) => (
          <label key={option.value} className={`flex items-center ${option.color} rounded-full border pl-4 p-2 bg-white border-2 cursor-pointer transition-all`}>
            <span className="px-[50px]">{option.label}</span>
            <input
              type="radio"
              name="uploadOption"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleRadioChange(option.value)}
              className={`w-4 h-4`}
              style={{
                color: option.hash
              }}
            />
          </label>
        ))}
      </div>

      {/* Generate button */}
      <div className="flex justify-center mb-10">
        <button 
          onClick={handleGenerateClick}
          className="px-8 py-2 rounded-lg shadow-md hover:bg-teal-500 transition-all"
          style={{
            background: linearGradientBackground,
            color: textColor
          }}
        >
          Generate
        </button>
      </div>

      {/* Modal for "Search" option */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="fixed inset-x-[430px] top-[100px] bg-gradient-to-b from-purple-50 to-white border border-2 border-purple-500 rounded-xl p-8 w-[400px] md:w-[80%] lg:w-[53%]">
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-3xl float-right">
              &times;
            </button>
            <div className='my-[10px] px-[50px] mt-[30px]'>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Enter Your Concept Title</h2>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-center mt-10">
                <button 
                  onClick={closeModal}
                  className="px-20 py-2 rounded-md shadow-lg hover:bg-teal-600 text-bold transition-all"
                  style={{
                    background: linearGradientBackground,
                    color: textColor
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Continue Learning Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continue Learning...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-bold">Title of Topic</h3>
              <p className="text-gray-500">Sub-topic covered</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full">
                  &lt;File Type&gt;
                </span>
                <button className="bg-teal-400 p-2 rounded-full text-white hover:bg-teal-500 transition-all">
                  ▶
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMRCLM;
