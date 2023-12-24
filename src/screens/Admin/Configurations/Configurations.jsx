import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import UploadImage from '../../../assets/file-upload.png';
import GLOBAL_CONSTANTS from '../../../../GlobalConstants';
import { uploadConfigurations } from '../../../redux/action';

const Configurations = () => {
  const dispatch = useDispatch();
  const inputRefs = {
    soft_skill: useRef(null),
    hard_skill: useRef(null),
    company: useRef(null),
    institution: useRef(null)
  };

  const handleSelectFiles = (e, key) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        let base64Data = event.target.result.split(",")[1];
  
        const mimeRegex = /^data:.+;base64,/;
        if (mimeRegex.test(base64Data)) {
          base64Data = base64Data.replace(mimeRegex, '');
        }
        while (base64Data.length % 4 !== 0) {
          base64Data += '=';
        }
  
        const payload = {
          mode: key,
          base64: base64Data
        }
        dispatch(uploadConfigurations(payload))
      };

    reader.readAsDataURL(file);
  };

  const configurationOptions = [
    { label: 'Soft Skills', key: 'soft_skill' },
    { label: 'Hard Skills', key: 'hard_skill' },
    { label: 'Company', key: 'company' },
    { label: 'Institution', key: 'institution' },
  ];

  return (
    <div className="p-4">
      {configurationOptions.map(option => (
        <div key={option.key} className="mb-8 bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">{option.label}</span>
            <a href={`${GLOBAL_CONSTANTS.backend_url}institution/download_configurations?mode=${option.key}`}>
              <Button
                endIcon={<CloudDownloadOutlinedIcon />}
                variant="outlined"
                size="small"
              >
                Download Template
              </Button>
            </a>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg p-4 cursor-pointer"
                 onClick={() => inputRefs[option.key].current.click()}>
              <input
                ref={inputRefs[option.key]}
                type="file"
                className="hidden"
                accept=".csv, .xlsx"
                onChange={(e) => handleSelectFiles(e, option.key)}
                onClick={(e) => { e.target.value = null; }}
              />
              <div className="text-center">
                <img
                  src={UploadImage}
                  className="w-[100px] mx-auto"
                  alt="Upload Icon"
                />
                <p className="pt-3 text-gray-600">Upload {option.label} File</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Configurations;
