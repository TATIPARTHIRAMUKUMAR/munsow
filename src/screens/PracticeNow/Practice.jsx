import { Autocomplete, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import Stepper from "react-stepper-horizontal";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckboxesTags from "../../Components/MatSelect";
import {
  loadCompaniesList,
  loadHardSkillsList,
  loadInterviewRolesList,
  loadQuestions,
  loadSoftSkillsList,
  prepare_interview,
} from "../../redux/action";
import "./Practice.css"; // Make sure to import your stylesheet

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Audio_Video from "../../Components/Audio_Video";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import MutiSelect from "../../Components/Multiselect";
import { useDarkMode } from "./../../Dark";
import interview from "../../assets/interview.jpeg";

const QontoConnector = styled(StepConnector)(({ theme , linearGradientBackground}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
    left: "calc(-50% + 1.5rem)",
    right: "calc(50% + 1.5rem)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: linearGradientBackground,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: linearGradientBackground,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const StepperComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [steps] = useState([
        { title: "Skill Specific" },
        // { title: "Role Specific" },
        { title: "Level" },
        { title: "Summary" },
    ]);
    const [stepsModal] = useState(3);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentStepModal, setCurrentStepModal] = useState(0);
    const [hardSkills, setHardSkills] = useState(false);
    const [softSkills, setSoftSkills] = useState(false);
    const [chosenRole, setChosenRole] = useState(false);
    const [chosenCompany, setChosenCompany] = useState(false);
    const [level, setLevel] = useState(0);
    const [experienceLevel, setExperienceLevel] = useState("low");
    const [selectedCategory, setSelectedCategory] = useState('skills');

    const [selectedSoftskill, setSelectedSoftskill] = useState(null);
    const [selectedHardskill, setSelectedHardskill] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showAcknowledgement, setShowAcknowledgement] = useState(false);

    const payload = {
        level: "",
        specifications: {
            role: "",
            company: "",
            hard_skill: "",
            soft_skill: ""
        }
    }

  useEffect(() => {
    setSelectedRole(null);
    console.log("selectedCompany", selectedCompany);
  }, [selectedCompany]);

  const [audioValidated, setAudioValidated] = useState(false);
  const [videoValidated, setVideoValidated] = useState(false);

  const handleSelection = () => {
    if (selectedCategory == "skills") {
      if (selectedSoftskill != null || selectedHardskill != null) {
        return false;
      } else {
        return true;
      }
    }
    if (selectedCategory == "role") {
      if (selectedRole != null && selectedCompany != null) {
        return false;
      } else {
        return true;
      }
    }
  };

  const {
    hardSkillsList,
    softSkillsList,
    interviewRolesList,
    companiesList,
    questionsList,
    colorTheme,
  } = useSelector((state) => state?.data);

    const handleNext = () => {
        payload.level = experienceLevel ? experienceLevel : "";
        payload.specifications.role = selectedRole ? selectedRole?.label : "";
        payload.specifications.company = selectedCompany ? selectedCompany?.label : "";
        payload.specifications.hard_skill = selectedHardskill ? selectedHardskill.map(skill => skill.label) : [];
        payload.specifications.soft_skill = selectedSoftskill ? selectedSoftskill.map(skill => skill.label) : [];
        console.log("currentStep", payload)
        if (currentStep == 1) {
          console.log('currentStep == 1 : ', questionsList)
          dispatch(loadQuestions(payload))
      }
      else if (currentStep == 2) {
          console.log('currentStep == 2 : ', questionsList)
          setShowAcknowledgement(true);
          
          // let toastId = toast("Wait .. redirecting to Interview Section", { autoClose: false });
          // toast.update(toastId, { render: "Wait .. redirecting to Interview Section", type: "success", autoClose: true })
          // if (questionsList?.questions?.length > 0) {
          //     setTimeout(() => {
          //         navigate("/interview")
          //     }, 3000);
          // }
      }
      else if ((showAcknowledgement) && (currentStepModal === 0)) {
        console.log('currentStepModal == 0 : ', questionsList)
          setCurrentStepModal(currentStepModal + 1);
      }
      else if (currentStepModal === 1) {
        console.log('currentStepModal == 1 : ', questionsList)
          setCurrentStepModal(currentStepModal + 1);
      } 
      else if (currentStepModal === 2)
      {
          console.log('currentStepModal == 2 : ', questionsList)
          let toastId = toast("Wait .. redirecting to Interview Section", { autoClose: false });
          toast.update(toastId, { render: "Wait .. redirecting to Interview Section", type: "success", autoClose: true })
          if (questionsList?.questions?.length > 0) {
              setTimeout(() => {
                  navigate("/interview")
              }, 3000);
          }
      } 
      setCurrentStep(currentStep + 1);
  };
    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handlePrevModal = () => {
      setCurrentStepModal(currentStepModal - 1);
  };

    const { isDarkMode } = useDarkMode();

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;
  //button
  const textColors = isDarkMode
    ? colorTheme.dark.textColor2
    : colorTheme.light.textColor2;   

    const blackColors = isDarkMode
    ? colorTheme.dark. blackColor4
    : colorTheme.light.blackColor;  

    const grayColors=isDarkMode 
    ? colorTheme.dark.   grayColor3
    : colorTheme.light.  grayColor;  

    const previousButton=isDarkMode
    ?colorTheme.dark.backgrounds 
    :colorTheme.light.backgrounds;

  useEffect(() => {
    console.log("selectedSoftskill", selectedSoftskill);
  }, [selectedSoftskill]);

    useEffect(() => {
        dispatch(loadHardSkillsList());
        dispatch(loadSoftSkillsList());
        dispatch(loadInterviewRolesList());
        dispatch(loadCompaniesList());
    }, [dispatch])

    const handleStartInterview = () => {
      // Start the interview when the user confirms readiness
      setShowAcknowledgement(false); // Hide the acknowledgment pop-up
      let toastId = toast("Wait .. redirecting to Interview Section", { autoClose: false });
      toast.update(toastId, { render: "Wait .. redirecting to Interview Section", type: "success", autoClose: true })
      if (questionsList?.questions?.length > 0) {
          setTimeout(() => {
              navigate("/interview")
          }, 3000);
      }
  };

  return (
    <div className="p-5 lg:p-10 ">
      <div className="w-full mx-auto rounded-xl">
        <p className="p-5 text-xl font-semibold">Practice</p>
        <Divider />
        {/* <Stepper 
                    steps={steps} 
                    activeStep={currentStep} 
                    activeColor={"#886CC0"} 
                    completeColor={"#886CC0"} 
                    completeBorderColor={"#886CC0"} 
                    completeTitleColor={"#886CC0"} 
                    size={40}
                /> */}
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={<QontoConnector  linearGradientBackground={linearGradientBackground}/>}
          style={{ marginTop: "1rem" }}
        >
          {steps.map((label, index) => (
            <Step key={label?.title}>
              <StepLabel
                completed={index < currentStep}
                style={{
                  backgroundColor: index <= currentStep ? "white" : "",
                  color: index <= currentStep ? textColors : "inherit",
                }}
                StepIconProps={{
                  style: {
                    color: index <= currentStep ? linearGradientBackground : "",
                    fontSize: "2.5rem",
                  },
                }}
              >
                {label?.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider style={{ marginTop: "1rem" }} />
        <div className="flex mt-4 p-4 items-center justify-center relative overflow-auto flex-col md:flex-row max-w-full h-auto">
          {currentStep === 0 && (
            <>
              {/* <div > */}
              <div
                className={`bg-${
                  selectedCategory === "skills" ? "gray-100" : ""
                } p-7 rounded-xl relative overflow-auto max-w-full h-auto`}
                onClick={() => {
                  setSelectedCategory("skills");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                }}
              >
                <div className="flex relative overflow-auto ">
                  {/* <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div> */}

                  <input
                    type="radio"
                    name="selectionCategory"
                    value="skills"
                    checked={selectedCategory === "skills"}
                    onChange={() => setSelectedCategory("skills")}
                    className="p-1 m-2 relative overflow-auto"
                    style={{
                      color: linearGradientBackground,
                      outlineColor: linearGradientBackground
                    }}
                  />
                  <h2
                    className="relative overflow-auto"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color:grayColors , // Set the desired text color
                    }}
                  >
                    Skill Specific
                  </h2>
                </div>
                <div
                  className={
                    selectedCategory !== "skills"
                      ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
            
                  }
                >
                  <label className="flex items-center space-x-2 my-3 relative overflow-auto">
                    {/* <input
                                            type="checkbox"
                                            name="hardSkills"
                                            checked={hardSkills}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setHardSkills(!hardSkills)}
                                        /> */}
                    <span className="font-bold pr-2 relative overflow-auto">Hard Skills</span>
                  </label>
                  <MutiSelect
                    options={hardSkillsList?.map((o) => {
                      return {
                        label: o.name,
                        id: o.id,
                      };
                    })}
                    label="Hard Skills"
                    selectedItems={selectedHardskill}
                    onSelectionChange={setSelectedHardskill}
                  />
                  <div>
                    <label className="flex items-center space-x-2 my-3">
                      {/* <input
                                            type="checkbox"
                                            name="softSkills"
                                            checked={softSkills}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setSoftSkills(!softSkills)}
                                        /> */}
                      <span className="font-bold pr-2">Soft Skills</span>
                    </label>
                    <MutiSelect
                      options={(softSkillsList || []).map((o) => ({
                        label: o.name,
                        id: o.id,
                      }))}
                      // onSelectionChange={(e) => testselection(e)}
                      selectedItems={selectedSoftskill}
                      onSelectionChange={setSelectedSoftskill}
                      label="Soft Skills"
                    />
                  </div>
                </div>
              </div>
              <div className="p-10"></div>

              <div
                className={`bg-${
                  selectedCategory === "role" ? "gray-100" : ""
                } p-7 rounded-xl relative overflow-auto max-w-full h-auto`}
                onClick={() => {
                  setSelectedCategory("role");
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);
                }}
                style={{ color: textColors }}
              >
                <div className="flex ">
                  {/* <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div> */}
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="role"
                    checked={selectedCategory === "role"}
                    onChange={() => setSelectedCategory("role")}
                    className="p-1 m-2 "
                    style={{
                      color: linearGradientBackground,
                      outlineColor: linearGradientBackground
                    }}
                  />

                  <h2
                    style={{
                      fontSize: "1.5rem",

                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color:  grayColors, // Set the desired text color
                    }}
                  >
                    Role Specific
                  </h2>
                </div>

                <div
                  className={
                    selectedCategory !== "role"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                >
                  <label className="flex items-center space-x-2 my-3">
                    {/* <input
                                            type="checkbox"
                                            name="chosenCompany"
                                            checked={chosenCompany}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setChosenCompany(!chosenCompany)}
                                        /> */}

                    <span className="font-bold pr-2"  style={{color:grayColors}}
                    >
                      Choose Company{" "}
                      <span className="font-bold text-red-500 text-2xl">
                        {" "}
                        {selectedCategory == "role" ? "*" : ""}
                      </span>
                    </span>
                  </label>
                  <CheckboxesTags
                    options={companiesList?.map((o) => {
                      return {
                        label: o.name,
                        id: o.id,
                        role_ids: o.role_ids,
                      };
                    })}
                    selectedItems={selectedCompany}
                    onSelectionChange={setSelectedCompany}
                    label="Companies"
                  />
                </div>

                {selectedCompany != null && (
                  <div
                    className={
                      selectedCategory !== "role"
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  >
                    <label className="flex items-center space-x-2 my-3">
                      {/* <input
                                            type="checkbox"
                                            name="chosenRole"
                                            checked={chosenRole}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setChosenRole(!chosenRole)}
                                        /> */}

                      <span className="font-bold pr-2 ">
                        Choose Role{" "}
                        <span className="font-bold text-red-500 text-2xl">
                          {selectedCategory == "role" ? "*" : ""}
                        </span>
                      </span>
                    </label>
                    <CheckboxesTags
                      options={selectedCompany?.role_ids?.map((o) => {
                        return {
                          label: o.name,
                          id: o.id,
                        };
                      })}
                      selectedItems={selectedRole}
                      onSelectionChange={setSelectedRole}
                      label="Interview Roles"
                    />
                  </div>
                )}
              </div>

              {/* </div> */}
            </>
          )}

          {currentStep === 1 && (
            <div  className="relative overflow-auto max-w-full h-auto">
              <h2
              className="relative overflow-auto max-w-full h-auto"
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "2px",
                  color: textColors,
                }}
              >
                Level
              </h2>
              <div
              className="w-[14rem] lg:w-[35rem] md:w-[27rem] relative overflow-auto sm:w-[20rem] h-auto"
                style={{
                  border: "4px solid #0fe1d2",
                  borderRadius: "20px",
                  padding: "2rem 2.5rem",
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={level}
                  // onChange={(e) => setLevel(e.target.value)}
                  className="w-full mb-4 appearance-none h-2 rounded-lg"
                  style={{ backgroundColor: linearGradientBackground }}
                />

                <div className="flex flex-col sm:flex-row justify-evenly text-md relative overflow-auto max-w-full h-auto">
                  <button
                    onClick={() => {
                      setLevel(0);
                      setExperienceLevel("low");
                    }}
                    className="text-white mb-2 sm:mb-0 sm:w-[30%] lg:w-[7rem] rounded-md relative overflow-auto max-w-full h-auto"
                    style={{
                      backgroundColor: linearGradientBackground,
                    
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      color:grayColors
                    }}
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => {
                      setLevel(50);
                      setExperienceLevel("medium");
                    }}
                    className="text-white py-1 px-3 mb-2 sm:mb-0 sm:w-[30%] lg:w-[7rem] rounded-md relative overflow-auto max-w-full h-auto"
                    style={{ backgroundColor: linearGradientBackground,color:grayColors }}
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => {
                      setLevel(100);
                      setExperienceLevel("high");
                    }}
                    className="text-white py-1 px-3 rounded-md relative overflow-auto max-w-full h-auto"
                    style={{ backgroundColor: linearGradientBackground , color :grayColors }}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              {/* <div className="text-center font-semibold">Or</div>
                            <h2 className="text-center text-sm font-semibold mb-2 text-purple-600">Choose your Experience level</h2>
                            <div className="flex justify-between items-center"> */}
              {/* <div>
                                    <select
                                        className="border rounded p-1"
                                        value={experienceLevel}
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div> */}

              {/* <Autocomplete
                                    size="small"
                                    fullWidth
                                    disablePortal
                                    value={experienceLevel}
                                    defaultValue={experienceLevel}
                                    id="combo-box-demo"
                                    options={[
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Advanced", value: "Advanced" },
                                    ]}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // label={o?.label} 
                                            InputProps={{
                                                ...params.InputProps,
                                                style: {
                                                    borderRadius: "0.4rem",
                                                },
                                            }}
                                        />
                                    )}
                                    onChange={(e, value) => { setExperienceLevel(value) }}
                                />
                            </div> */}
                        </div>
                    )}
                    {currentStep == 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center " >
                            <div className="grid justify-center ">
                                <div className="text-center font-semibold text-gray-500 mb-4">
                                    <ComputerRoundedIcon sx={{ fontSize: "5rem" }} />
                                </div>
                                <h2
                                  style={{
                                    textAlign: "center",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    marginBottom: "2px",
                                    color: textColors,
                                  }}
                                >
                                  Level
                                </h2>
                                <div className="text-sm max-w-xs text-center font-semibold text-gray-500 mb-4">
                                  Please complete this quick walk through to confirm your 
                                  device/system is ready for a Validity test.
                                </div>
                                <label className="max-w-xs flex space-x-3 my-3">
                                    <input
                                        type="checkbox"
                                        name="chosenCompany"
                                        checked={chosenCompany}
                                        className="mt-0.5 h-5 w-5 "
                                        onChange={() => setChosenCompany(!chosenCompany)}
                                        style={{
                                          border: chosenCompany
                                            ? `2px solid ${linearGradientBackground}`
                                            : "2px solid grey",
                                        outlineColor: chosenCompany ? linearGradientBackground : "none",
                                          backgroundColor: chosenCompany
                                            ? "#0fe1d2"
                                            : "transparent",
                                        }}
                                    />

                                    <span className="ml-3 text-sm">
                                      I&apos;m completing this check on this device and Wi-Fi 
                                      network where I will participate
                                    </span>
                                </label>
                            </div>

                            <div className="bg-gray-200 rounded w-full" >
                                <Audio_Video 
                                  audioValidated={audioValidated} 
                                  setAudioValidated={setAudioValidated} 
                                  videoValidated={videoValidated} 
                                  setVideoValidated={setVideoValidated} 
                                  linearGradientBackground={linearGradientBackground}
                                />
                            </div>


                        </div>

                    )}
                </div>
                <div className="mt-4 p-6 flex justify-end">
                    {currentStep > 0 && (
                        <button
                            onClick={handlePrev}
                            style={{
                              margin: "0 0.5rem",
                              backgroundColor: previousButton,
              
                              color: grayColors,
                              padding: "0.5rem 1rem",
                              borderRadius: "0.375rem",
                              cursor: "pointer",
                            }}
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleNext}
                            disabled={handleSelection()} // Use the isRoleSelected state variable here
                            className="bg-[#886cc0] mx-2 hover:bg-[#886cc0] text-white py-2 px-4 rounded-md"
                            style={{
                              backgroundColor: linearGradientBackground,
                              color: grayColors,
                              padding: "0.5rem 1rem",
                              borderRadius: "0.375rem",
                              cursor: "pointer",
                            }}
                        >
                            Next
                        </button>
                    )}


          {/* {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 mx-2 hover:bg-[#886cc0] text-white py-2 px-4 rounded-md"
                        >
                            Next
                        </button>
                    )} */}
                    {currentStep === steps.length - 1 && (
                        <span>
                            {(chosenCompany && audioValidated && videoValidated) ? (
                                <button
                                    onClick={handleNext}
                                    className=" mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                                    style={{ backgroundColor: linearGradientBackground,color:grayColors }}
                                >
                                    Submit
                                </button>
                            ) : (
                                <Tooltip title="Please finish system checks before submitting">
                                    <button
                                        onClick={handleNext}
                                        disabled={!chosenCompany}
                                        className="bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                                        style={{ backgroundColor: linearGradientBackground,color:grayColors }}
                                    >
                                        Submit
                                    </button>
                                </Tooltip>
                            )}
                        </span>
                    )}
                </div>
            </div>
            {showAcknowledgement && (
  <div className="modal">
    <div className="modal-content">
      {currentStepModal === 0 && (
        <div className="modalContent">

          <h1 className="text-2xl font-bold text-[#777b7e] mb-4">
            Prepare for your interview!
          </h1>
          {/* <br /> */}

          <div className="flex justify-center">
            <img src={interview} alt="Interview" className="w-[200px] h-[200px] rounded-2xl" />
          </div><br/> 

          <p className="text-gray-500 font-semibold mb-4">
            Before you start the interview, please review these tips:
          </p>

          <ul className="list-disc font-semibold pl-5 text-gray-500 mb-4">
            <li className="mb-2">Find a quiet and well-lit place.</li>
            <li className="mb-2">Ensure a stable internet connection.</li>
            <li className="mb-2">Test your audio and video beforehand.</li>
            <li className="mb-2">Have a notepad, pen, and water bottle ready (optional).</li>
          </ul>
          <br />

          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              {[...Array(stepsModal)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStepModal ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStepModal === 1 && (
        <div className="modalContent">
          <p className="text-2xl font-bold text-[#777b7e] mb-4">
            Feeling confident and ready? Let's begin!
          </p>

          <div className="flex justify-center">
            <img src={interview} alt="Interview" className="w-[200px] h-[200px] rounded-2xl" />
          </div><br/>

          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum lectus eget
            justo pretium, vel fermentum orci ultricies. Integer eu tellus vitae massa posuere
            mollis. Nulla aliquam massa ac eros malesuada posuere. 
          </p>

          <p className="text-gray-700 mb-9">
            Fusce id orci ac libero
            bibendum pharetra non nec ipsum. Sed ac justo quis libero feugiat sagittis nec eu
            turpis. Phasellus sagittis eros nec augue tristique eleifend.
          </p>

          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              {[...Array(stepsModal)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStepModal ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStepModal === 2 && (
        <div className="modalContent">
          <p className="text-2xl font-bold text-[#777b7e] mb-4">Start your interview now!</p>
          <br />

          <p className="text-gray-500 mb-4 font-bold">
            Remember, make eye contact, smile, and speak clearly and confidently.
          </p>

          <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum lectus eget
          justo pretium, vel fermentum orci ultricies. Integer eu tellus vitae massa posuere
      mollis. Nulla aliquam massa ac eros malesuada posuere.
          </p>

          <div className="flex justify-center">
            <img src={interview} alt="Interview" className="w-[200px] h-[200px] rounded-2xl" />
          </div><br/> 

          <div className="flex items-center justify-center">
            <div className="flex space-x-2">
              {[...Array(stepsModal)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStepModal ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <br />
        </div>
      )}

      <div className="flex justify-end">
        {(currentStepModal > 0) && (
          <button
            onClick={handlePrevModal}
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mx-2 py-2 px-4 rounded-md"
            >
            Previous
          </button>
        )}
        {(currentStepModal < stepsModal - 1) && (
          <button
          onClick={handleNext}
          className={`bg-blue-500 mx-2 text-white py-2 px-4 rounded-md 
                      hover:bg-blue-700 `}
        >
          Next
        </button>
        )}
        {(currentStepModal === stepsModal - 1) && (
          <span>
            <button
              onClick={handleNext}
              className="bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              I am ready - start my interview now
            </button>
          </span>
        )}
      </div>
    </div>
  </div>
            )}

        </div>
    );
};

export default StepperComponent;