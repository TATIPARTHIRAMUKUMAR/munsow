// import LoadingOverlay from '../../Components/LoadingOverlay';
// import { Autocomplete, Divider, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
// import { Step, StepLabel, Stepper } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import CheckboxesTags from "../../Components/MatSelect";
// import {
//   loadCompaniesList,
//   loadHardSkillsList,
//   loadInterviewRolesList,
//   loadQuestions,
//   loadSoftSkillsList,
//   prepare_interview,
// } from "../../redux/action";

// import StepConnector, {
//   stepConnectorClasses,
// } from "@mui/material/StepConnector";
// import { styled } from "@mui/material/styles";
// import { useNavigate, useLocation } from "react-router-dom";
// import Audio_Video from "../../Components/Audio_Video";
// import { toast } from "react-toastify";
// import Tooltip from "@mui/material/Tooltip";
// import MutiSelect from "../../Components/Multiselect";
// import { useDarkMode } from "./../../Dark";
// import interview from "../../assets/interview.jpeg";
// import JobDescriptionForm from "./JobDescription";
// import { useLoader } from '../../Components/LoaderContext';

// // Import the new LoadingPopup component
// import LoadingPopup from '../../Components/LoadingPopup';

// const QontoConnector = styled(StepConnector)(({ theme, linearGradientBackground }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 17,
//     left: "calc(-50% + 1.5rem)",
//     right: "calc(50% + 1.5rem)",
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: linearGradientBackground,
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: linearGradientBackground,
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor:
//       theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// }));

// const StepperComponent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { entity_type } = location.state || {};

//   // Add loading state for popup
//   const [isLoading, setIsLoading] = useState(false);

//   const [steps] = useState([
//     { title: "Step 1" },
//     { title: "Step 2" },
//     { title: "Step 3" },
//   ]);
//   const [stepsModal] = useState(3);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [currentStepModal, setCurrentStepModal] = useState(0);
//   const [hardSkills, setHardSkills] = useState(false);
//   const [softSkills, setSoftSkills] = useState(false);
//   const [chosenRole, setChosenRole] = useState(false);
//   const [chosenCompany, setChosenCompany] = useState(false);
//   const [showLoading, setShowLoading] = useState(false);
//   const [level, setLevel] = useState(0);
//   const [experienceLevel, setExperienceLevel] = useState("low");
//   const [selectedCategory, setSelectedCategory] = useState("skills");
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const [selectedSoftskill, setSelectedSoftskill] = useState(null);
//   const [selectedHardskill, setSelectedHardskill] = useState(null);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [showAcknowledgement, setShowAcknowledgement] = useState(false);

//   const [jdcompany, setJdcompany] = useState('');
//   const [jdrole, setJdrole] = useState('');
//   const [cultcompany, setCultcompany] = useState('');
//   const [cultrole, setCultrole] = useState('');

//   const { showLoader, hideLoader, setQuestions } = useLoader();

//   const [audioValidated, setAudioValidated] = useState(false);
//   const [videoValidated, setVideoValidated] = useState(false);

//   const payload = {
//     specifications: {
//       role: "",
//       company: "",
//       hard_skill: "",
//       soft_skill: "",
//       level: "",
//     }
//   }

//   useEffect(() => {
//     setSelectedRole(null);
//   }, [selectedCompany]);

//   const handleSelection = () => {
//     if (selectedCategory == "skills") {
//       if (selectedSoftskill != null || selectedHardskill != null) {
//         return false;
//       } else {
//         return true;
//       }
//     }
//     if (selectedCategory == "role") {
//       if (selectedRole != null && selectedCompany != null) {
//         return false;
//       } else {
//         return true;
//       }
//     }
//     if ((selectedCategory == "jd"||selectedCategory == "cult")&&currentStep==1) {
//       if (Object.keys(selectedOptions).length>=1) {
//         return false;
//       } else {
//         return true;
//       }
//     }
//   };

//   const {
//     hardSkillsList,
//     softSkillsList,
//     interviewRolesList,
//     companiesList,
//     questionsList,
//     colorTheme,
//   } = useSelector((state) => state?.data);

//   useEffect(() => {
//     if (questionsList?.questions?.length > 0) {
//       setQuestions(questionsList);
//       setIsLoading(false); // Hide loading when questions are loaded
//     }
//   }, [questionsList, setQuestions, hideLoader]);

//  // Replace just the handleNext function with this updated version
// const handleNext = async () => {
//   if (currentStep === 1) {
//     // Your existing code for step 1
//     const payload = {
//       specifications: {
//         level: experienceLevel || "",
//         role: selectedRole?.label || "",
//         company: selectedCompany?.label || "",
//         hard_skill: selectedHardskill?.map(skill => skill.label) || [],
//         soft_skill: selectedSoftskill?.map(skill => skill.label) || []
//       },
//       interview_type: selectedCategory === "jd" ? "jd_interview" 
//         : selectedCategory === "cult" ? "cultural_interview" 
//         : selectedCategory === "skills" ? "skill_interview" 
//         : "company_role_interview"
//     };

//     // Handle JD specific case
//     if (selectedCategory === "jd") {
//       payload.specifications.jd_skill = selectedOptions;
//       payload.specifications.company = jdcompany;
//       payload.specifications.role = jdrole;
//       delete payload.specifications.hard_skill;
//       delete payload.specifications.soft_skill;
//       delete payload.specifications.level;
//     }

//     // Handle cultural specific case
//     if (selectedCategory === "cult") {
//       payload.specifications.cultural_skill = selectedOptions;
//       payload.specifications.company = cultcompany;
//       payload.specifications.role = cultrole;
//       delete payload.specifications.hard_skill;
//       delete payload.specifications.soft_skill;
//       delete payload.specifications.level;
//     }

//     setShowLoading(true);
//     try {
//       await dispatch(loadQuestions(payload));
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setCurrentStep(currentStep + 1);
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to load questions. Please try again.');
//     } finally {
//       setShowLoading(false);
//     }
//   }
//   else if (currentStep === 2) {
//     // Only proceed if all validations pass
//     if (chosenCompany && audioValidated && videoValidated) {
//       if (questionsList?.questions?.length > 0) {
//         setShowLoading(true);
//         let toastId = toast("Preparing your interview...", { 
//           autoClose: false 
//         });

//         try {
//           await dispatch(prepare_interview()); // Add this if needed

//           setTimeout(() => {
//             toast.update(toastId, {
//               render: "Ready for your interview!",
//               type: "success",
//               autoClose: 2000
//             });
            
//             setTimeout(() => {
//               setShowLoading(false);
//               navigate("/interview");
//             }, 1000);
//           }, 2000);
//         } catch (error) {
//           toast.error("Failed to start interview. Please try again.");
//           setShowLoading(false);
//         }
//       } else {
//         toast.error("No questions available. Please try again.");
//       }
//     } else {
//       toast.warning("Please complete all system checks before proceeding.");
//     }
//   } else {
//     setCurrentStep(currentStep + 1);
//   }
// };
//   const handlePrev = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const { isDarkMode } = useDarkMode();

//   const linearGradientBackground = isDarkMode
//     ? colorTheme.dark.selectBackground
//     : colorTheme.light.selectBackground;

//   const textColors = isDarkMode
//     ? colorTheme.dark.textColor2
//     : colorTheme.light.textColor2;

//   const textColor = isDarkMode
//     ? colorTheme.dark.textColor3
//     : colorTheme.light.textColor3;

//   const grayColors = isDarkMode
//     ? colorTheme.dark.grayColor3
//     : colorTheme.light.grayColor;

//   useEffect(() => {
//     dispatch(loadHardSkillsList());
//     dispatch(loadSoftSkillsList());
//     dispatch(loadInterviewRolesList());
//     dispatch(loadCompaniesList());
//   }, [dispatch]);

//   return (
//     <div className="">
//       <div className="w-full mx-auto rounded-xl">
//         <Stepper
//           activeStep={currentStep}
//           alternativeLabel
//           connector={<QontoConnector linearGradientBackground={linearGradientBackground} />}
//           style={{ marginTop: "1rem" }}
//         >
//           {steps.map((label, index) => (
//             <Step key={label?.title}>
//               <StepLabel
//                 completed={index < currentStep}
//                 style={{
//                   backgroundColor: index <= currentStep ? "white" : "",
//                   color: index <= currentStep ? textColors : "inherit",
//                 }}
//                 StepIconProps={{
//                   style: {
//                     color: index <= currentStep ? linearGradientBackground : "",
//                     fontSize: "2.5rem",
//                   },
//                 }}
//               >
//                 {label?.title}
//               </StepLabel>
//             </Step>
//           ))}
//         </Stepper>
        
//         <Divider style={{ marginTop: "1rem" }} />
        
//         {/* Main content sections */}
//         <div className="flex  p-4 items-center justify-center relative overflow-auto flex-col md:flex-row max-w-full h-auto">
          
//           {currentStep === 0 && (
//             <>

//             {/* Render based on the entity_type */}
//             {entity_type === "institution" ? (
//               <div>
//                 <div
//                 className={`bg-${selectedCategory === "skills" ? "gray-200" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("skills");
//                   setSelectedRole(null);
//                   setSelectedCompany(null);
//                   setJdcompany("");
//                   setJdrole("");
//                   setCultcompany("");
//                   setCultrole("");
//                 }}
//               >
//                 <div className="flex relative overflow-auto ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="skills"
//                     checked={selectedCategory === "skills"}
//                     onChange={() => setSelectedCategory("skills")}
//                     className="p-1 m-2 relative overflow-auto"
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />
//                   <h2
//                     className="relative overflow-auto"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     Skill Specific
//                   </h2>
//                 </div>
//                 <div
//                   className={
//                     selectedCategory !== "skills"
//                       ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'

//                   }
//                 >
//                   <label className="flex items-center space-x-2 my-3 relative overflow-auto">

//                     <span className="font-bold pr-2 relative overflow-auto">Hard Skills</span>
//                   </label>
//                   <MutiSelect
//                     options={hardSkillsList?.map((o) => {
//                       return {
//                         label: o.name,
//                         id: o.id,
//                       };
//                     })}
//                     label="Hard Skills"
//                     selectedItems={selectedHardskill}
//                     onSelectionChange={setSelectedHardskill}
//                   />
//                   <div>
//                     <label className="flex items-center space-x-2 my-3">
//                       <span className="font-bold pr-2">Soft Skills</span>
//                     </label>
//                     <MutiSelect
//                       options={(softSkillsList || []).map((o) => ({
//                         label: o.name,
//                         id: o.id,
//                       }))}
//                       // onSelectionChange={(e) => testselection(e)}
//                       selectedItems={selectedSoftskill}
//                       onSelectionChange={setSelectedSoftskill}
//                       label="Soft Skills"
//                     />
//                   </div>
//                 </div>
//                 </div>
//               </div>
//             ) : entity_type === "corporate" ? (
//               <div>
//                 <div
//                 className={`bg-${selectedCategory === "jd" ? "gray-200" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("jd");
//                   setSelectedRole(null);
//                   setSelectedCompany(null);
//                   setSelectedSoftskill(null);
//                   setSelectedHardskill(null);

//                   setCultcompany("");
//                   setCultrole("");
//                 }}
//               >
//                 <div className="flex relative overflow-auto ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="jd"
//                     checked={selectedCategory === "jd"}
//                     onChange={() => setSelectedCategory("jd")}
//                     className="p-1 m-2 relative overflow-auto"
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />
//                   <h2
//                     className="relative overflow-auto"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     Technical Mock 
//                   </h2>
//                 </div>
//                 <div
//                   className={
//                     selectedCategory !== "jd"
//                       ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
//                   }
//                 >
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Company Name:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter company name"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setJdcompany(e.target.value)}
//                       value={jdcompany}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Role:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter role"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setJdrole(e.target.value)}
//                       value={jdrole}
//                     />
//                   </div>
//                 </div>
//                 </div>
//               </div>
//             ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto p-2 md:p-8">

//               <div
//                 className={`bg-${selectedCategory === "skills" ? "gray-200" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("skills");
//                   setSelectedRole(null);
//                   setSelectedCompany(null);
//                   setJdcompany("");
//                   setJdrole("");
//                   setCultcompany("");
//                   setCultrole("");
//                 }}
//               >
//                 <div className="flex relative overflow-auto ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="skills"
//                     checked={selectedCategory === "skills"}
//                     onChange={() => setSelectedCategory("skills")}
//                     className="p-1 m-2 relative overflow-auto"
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />
//                   <h2
//                     className="relative overflow-auto"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     Skill Specific
//                   </h2>
//                 </div>
//                 <div
//                   className={
//                     selectedCategory !== "skills"
//                       ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'

//                   }
//                 >
//                   <label className="flex items-center space-x-2 my-3 relative overflow-auto">

//                     <span className="font-bold pr-2 relative overflow-auto">Hard Skills</span>
//                   </label>
//                   <MutiSelect
//                     options={hardSkillsList?.map((o) => {
//                       return {
//                         label: o.name,
//                         id: o.id,
//                       };
//                     })}
//                     label="Hard Skills"
//                     selectedItems={selectedHardskill}
//                     onSelectionChange={setSelectedHardskill}
//                   />
//                   <div>
//                     <label className="flex items-center space-x-2 my-3">
//                       <span className="font-bold pr-2">Soft Skills</span>
//                     </label>
//                     <MutiSelect
//                       options={(softSkillsList || []).map((o) => ({
//                         label: o.name,
//                         id: o.id,
//                       }))}
//                       // onSelectionChange={(e) => testselection(e)}
//                       selectedItems={selectedSoftskill}
//                       onSelectionChange={setSelectedSoftskill}
//                       label="Soft Skills"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`bg-${selectedCategory === "role" ? "gray-300" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto mr-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("role");
//                   setSelectedSoftskill(null);
//                   setSelectedHardskill(null);
//                   setJdcompany("");
//                   setJdrole("");
//                   setCultcompany("");
//                   setCultrole("");
//                 }}
//                 style={{ color: textColors }}
//               >
//                 <div className="flex ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="role"
//                     checked={selectedCategory === "role"}
//                     onChange={() => setSelectedCategory("role")}
//                     className="p-1 m-2 "
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />

//                   <h2
//                     style={{
//                       fontSize: "1.5rem",

//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     Role Specific
//                   </h2>
//                 </div>

//                 <div
//                   className={
//                     selectedCategory !== "role"
//                       ? "opacity-50 pointer-events-none"
//                       : ""
//                   }
//                 >
//                   <label className="flex items-center space-x-2 my-3">


//                     <span className="font-bold pr-2" style={{ color: grayColors }}
//                     >
//                       Choose Company{" "}
//                       <span className="font-bold text-red-500 text-2xl">
//                         {" "}
//                         {selectedCategory == "role" ? "*" : ""}
//                       </span>
//                     </span>
//                   </label>
//                   <CheckboxesTags
//                     options={companiesList?.map((o) => {
//                       return {
//                         label: o.name,
//                         id: o.id,
//                         role_ids: o.role_ids,
//                       };
//                     })}
//                     selectedItems={selectedCompany}
//                     onSelectionChange={setSelectedCompany}
//                     label="Companies"
//                   />
//                 </div>

//                 {selectedCompany != null && (
//                   <div
//                     className={
//                       selectedCategory !== "role"
//                         ? "opacity-50 pointer-events-none"
//                         : ""
//                     }
//                   >
//                     <label className="flex items-center space-x-2 my-3">


//                       <span className="font-bold pr-2 ">
//                         Choose Role{" "}
//                         <span className="font-bold text-red-500 text-2xl">
//                           {selectedCategory == "role" ? "*" : ""}
//                         </span>
//                       </span>
//                     </label>
//                     <CheckboxesTags
//                       options={selectedCompany?.role_ids?.map((o) => {
//                         return {
//                           label: o.name,
//                           id: o.id,
//                         };
//                       })}
//                       selectedItems={selectedRole}
//                       onSelectionChange={setSelectedRole}
//                       label="Interview Roles"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div
//                 className={`bg-${selectedCategory === "jd" ? "gray-200" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("jd");
//                   setSelectedRole(null);
//                   setSelectedCompany(null);
//                   setSelectedSoftskill(null);
//                   setSelectedHardskill(null);

//                   setCultcompany("");
//                   setCultrole("");
//                 }}
//               >
//                 <div className="flex relative overflow-auto ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="jd"
//                     checked={selectedCategory === "jd"}
//                     onChange={() => setSelectedCategory("jd")}
//                     className="p-1 m-2 relative overflow-auto"
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />
//                   <h2
//                     className="relative overflow-auto"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     Technical Mock 
//                   </h2>
//                 </div>
//                 <div
//                   className={
//                     selectedCategory !== "jd"
//                       ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
//                   }
//                 >
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Company Name:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter company name"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setJdcompany(e.target.value)}
//                       value={jdcompany}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Role:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter role"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setJdrole(e.target.value)}
//                       value={jdrole}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`bg-${selectedCategory === "cult" ? "gray-200" : "gray-100"
//                   } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto mr-auto w-full`}
//                 onClick={() => {
//                   setSelectedCategory("cult");
//                   setSelectedRole(null);
//                   setSelectedCompany(null);
//                   setSelectedSoftskill(null);
//                   setSelectedHardskill(null);
//                   setJdcompany("");
//                   setJdrole("");

//                 }}
//               >
//                 <div className="flex relative overflow-auto ">
//                   <input
//                     type="radio"
//                     name="selectionCategory"
//                     value="cult"
//                     checked={selectedCategory === "cult"}
//                     onChange={() => setSelectedCategory("cult")}
//                     className="p-1 m-2 relative overflow-auto"
//                     style={{
//                       color: linearGradientBackground,
//                       outlineColor: linearGradientBackground
//                     }}
//                   />
//                   <h2
//                     className="relative overflow-auto"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "600",
//                       marginBottom: "0.5rem",
//                       color: grayColors,
//                     }}
//                   >
//                     HR / Behavioural Mock 
//                   </h2>
//                 </div>
//                 <div
//                   className={
//                     selectedCategory !== "cult"
//                       ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
//                   }
//                 >
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Company Name:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter company name"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setCultcompany(e.target.value)}
//                       value={cultcompany}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label className="font-bold block mb-2">
//                       Role:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter role"
//                       className="w-full p-2 border border-gray-300 rounded"
//                       onChange={e => setCultrole(e.target.value)}
//                       value={cultrole}
//                     />
//                   </div>
//                 </div>
//               </div>

//             </div>
//             )}
//             </>
//           )}

//           {currentStep === 1 && (

//             <div>
//                 {(selectedCategory == "jd" || selectedCategory == "cult") && (
//               <JobDescriptionForm selectedCategory={selectedCategory} jdcompany={jdcompany} jdrole={jdrole} cultcompany={cultcompany} cultrole={cultrole} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>)}

//               {(selectedCategory == "skills" || selectedCategory == "role") && (
//                 <div className="relative max-w-full h-auto p-4">
//                   <h2
//                     className="text-center text-2xl font-bold mb-4"
//                     style={{ color: grayColors }}
//                   >
//                     Level
//                   </h2>
//                   <div
//                     className="relative mx-auto p-4"
//                     style={{
//                       maxWidth: "35rem",
//                       border: `3.5px solid ${textColors}`,
//                       borderRadius: "20px",
//                     }}
//                   >
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={level}
//                       onChange={(e) => setLevel(e.target.value)}
//                       className="w-full mb-4 appearance-none h-2 rounded-lg"
//                       style={{ background: `linear-gradient(to right, #0fe1d2 ${level}%, #dedcdc ${level}%)` }}
//                     />
//                     <div className="flex flex-col sm:flex-row justify-evenly items-center space-y-2 sm:space-y-0 sm:space-x-2">
//                       <button
//                         onClick={() => {
//                           setLevel(0);
//                           setExperienceLevel("low");
//                         }}
//                         className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
//                       >
//                         Beginner
//                       </button>
//                       <button
//                         onClick={() => {
//                           setLevel(50);
//                           setExperienceLevel("medium");
//                         }}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
//                       >
//                         Intermediate
//                       </button>
//                       <button
//                         onClick={() => {
//                           setLevel(100);
//                           setExperienceLevel("high");
//                         }}
//                         className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
//                       >
//                         Advanced
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {currentStep == 2 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center ">
//               <div className="grid justify-center ">
//                 <div className="text-center font-semibold text-gray-500 mb-4">
//                   <ComputerRoundedIcon sx={{ fontSize: "5rem" }} />
//                 </div>
//                 <h2
//                   style={{
//                     textAlign: "center",
//                     fontSize: "1.5rem",
//                     fontWeight: "bold",
//                     marginBottom: "2px",
//                     color: textColors,
//                   }}
//                 >
//                   System Check
//                 </h2>
//                 <div className="text-sm max-w-xs text-center font-semibold text-gray-500 mb-4">
//                   Please complete this quick walk through to confirm your
//                   device/system is ready for a Validity test.
//                 </div>
//                 <label className="max-w-xs flex space-x-3 my-3">
//                   <input
//                     type="checkbox"
//                     name="chosenCompany"
//                     checked={chosenCompany}
//                     className="mt-0.5 h-5 w-5 "
//                     onChange={() => setChosenCompany(!chosenCompany)}
//                     style={{
//                       border: chosenCompany
//                         ? `2px solid ${linearGradientBackground}`
//                         : "2px solid grey",
//                       outlineColor: chosenCompany ? linearGradientBackground : "none",
//                       backgroundColor: chosenCompany
//                         ? "#0fe1d2"
//                         : "transparent",
//                     }}
//                   />

//                   <span className="ml-3 text-sm">
//                     I&apos;m completing this check on this device and Wi-Fi
//                     network where I will participate
//                   </span>
//                 </label>
//               </div>

//               <div className="bg-gray-200 rounded w-full">
//                 <Audio_Video
//                   audioValidated={audioValidated}
//                   setAudioValidated={setAudioValidated}
//                   videoValidated={videoValidated}
//                   setVideoValidated={setVideoValidated}
//                   linearGradientBackground={linearGradientBackground}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Navigation buttons */}
//         <div className="mt-4 p-6 flex justify-end items-center">
//           {currentStep > 0 && (
//             <button
//               onClick={handlePrev}
//               disabled={handleSelection()}
//               className="shadow-md"
//               style={{
//                 margin: "0 0.5rem",
//                 borderColor: linearGradientBackground,
//                 border: `2px solid ${linearGradientBackground}`,
//                 color: grayColors,
//                 padding: "0.5rem 1rem",
//                 borderRadius: "0.375rem",
//                 cursor: "pointer",
//               }}
//               onMouseEnter={(e) => { e.target.style.background = linearGradientBackground }}
//               onMouseLeave={(e) => { e.target.style.background = "none" }}
//             >
//               Previous
//             </button>
//           )}
          
//           {currentStep < steps.length - 1 && (
//             <button
//               onClick={handleNext}
//               disabled={handleSelection()}
//               className={`shadow-md mx-2 px-4 rounded-md ${handleSelection() ? 'opacity-50 cursor-not-allowed' : ''}`}
//               style={{
//                 backgroundColor: linearGradientBackground,
//                 color: textColor,
//                 padding: "0.5rem 1rem",
//                 borderRadius: "0.375rem",
//                 cursor: "pointer",
//               }}
//             >
//               Next
//             </button>
//           )}

//           {currentStep === steps.length - 1 && (
//             <span>
//               {chosenCompany && audioValidated && videoValidated ? (
//                 <button
//                   onClick={handleNext}
//                   className="shadow-md mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md"
//                   style={{
//                     backgroundColor: linearGradientBackground,
//                     color: textColor,
//                   }}
//                 >
//                   Submit
//                 </button>
//               ) : (
//                 <Tooltip title="Please finish system checks before submitting">
//                   <button
//                     disabled={true}
//                     className="shadow-md bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
//                     style={{
//                       backgroundColor: linearGradientBackground,
//                       color: textColor,
//                     }}
//                   >
//                     Submit
//                   </button>
//                 </Tooltip>
//               )}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Loading Popup */}
// <LoadingOverlay 
//   show={showLoading}
//   message={
//     currentStep === 1 
//       ? "Preparing your interview questions..." 
//       : "Setting up your interview environment..."
//   }
// />
//     </div>
//   );
// };

// export default StepperComponent;

//new2
import LoadingOverlay from '../../Components/LoadingOverlay';
import { Autocomplete, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Audio_Video from "../../Components/Audio_Video";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import MutiSelect from "../../Components/Multiselect";
import { useDarkMode } from "./../../Dark";
import interview from "../../assets/interview.jpeg";
import JobDescriptionForm from "./JobDescription";
import { useLoader } from '../../Components/LoaderContext';

// Import the new LoadingPopup component
import LoadingPopup from '../../Components/LoadingPopup';

const QontoConnector = styled(StepConnector)(({ theme, linearGradientBackground }) => ({
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
  const location = useLocation();
  const { entity_type } = location.state || {};

  // Add loading state for popup
  const [isLoading, setIsLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const [steps] = useState([
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
  ]);
  const [stepsModal] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepModal, setCurrentStepModal] = useState(0);
  const [hardSkills, setHardSkills] = useState(false);
  const [softSkills, setSoftSkills] = useState(false);
  const [chosenRole, setChosenRole] = useState(false);
  const [chosenCompany, setChosenCompany] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [level, setLevel] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState("low");
  const [selectedCategory, setSelectedCategory] = useState("skills");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedSoftskill, setSelectedSoftskill] = useState(null);
  const [selectedHardskill, setSelectedHardskill] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  const [jdcompany, setJdcompany] = useState('');
  const [jdrole, setJdrole] = useState('');
  const [cultcompany, setCultcompany] = useState('');
  const [cultrole, setCultrole] = useState('');

  const { showLoader, hideLoader, setQuestions } = useLoader();

  const [audioValidated, setAudioValidated] = useState(false);
  const [videoValidated, setVideoValidated] = useState(false);

  const payload = {
    specifications: {
      role: "",
      company: "",
      hard_skill: "",
      soft_skill: "",
      level: "",
    }
  }

  useEffect(() => {
    setSelectedRole(null);
  }, [selectedCompany]);

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
    if ((selectedCategory == "jd"||selectedCategory == "cult")&&currentStep==1) {
      if (Object.keys(selectedOptions).length>=1) {
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

  // Monitor for questions being loaded and automatically navigate when they're available
  useEffect(() => {
    if (questionsList?.questions?.length > 0) {
      console.log("Questions loaded successfully:", questionsList.questions.length);
      setQuestions(questionsList);
      setIsLoading(false); // Hide loading when questions are loaded
      
      // If questions are loaded after step 1, proceed to step 2
      if (currentStep === 1 && questionsLoading) {
        setCurrentStep(2);
        setQuestionsLoading(false);
        setShowLoading(false);
      }
    }
  }, [questionsList, setQuestions, hideLoader, currentStep, questionsLoading]);

  const handleNext = async () => {
    if (currentStep === 0) {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
    else if (currentStep === 1) {
      // Show loading overlay
      setShowLoading(true);
      setQuestionsLoading(true);
      
      let toastId = toast("Preparing your interview questions...", { 
        autoClose: false 
      });
      
      const payload = {
        specifications: {
          level: experienceLevel || "",
          role: selectedRole?.label || "",
          company: selectedCompany?.label || "",
          hard_skill: selectedHardskill?.map(skill => skill.label) || [],
          soft_skill: selectedSoftskill?.map(skill => skill.label) || []
        },
        interview_type: selectedCategory === "jd" ? "jd_interview" 
          : selectedCategory === "cult" ? "cultural_interview" 
          : selectedCategory === "skills" ? "skill_interview" 
          : "company_role_interview"
      };
  
      // Handle JD specific case
      if (selectedCategory === "jd") {
        payload.specifications.jd_skill = selectedOptions;
        payload.specifications.company = jdcompany;
        payload.specifications.role = jdrole;
        delete payload.specifications.hard_skill;
        delete payload.specifications.soft_skill;
        delete payload.specifications.level;
      }
  
      // Handle cultural specific case
      if (selectedCategory === "cult") {
        payload.specifications.cultural_skill = selectedOptions;
        payload.specifications.company = cultcompany;
        payload.specifications.role = cultrole;
        delete payload.specifications.hard_skill;
        delete payload.specifications.soft_skill;
        delete payload.specifications.level;
      }
      
      try {
        await dispatch(loadQuestions(payload));
        
        // Check if questions loaded immediately
        if (questionsList?.questions?.length > 0) {
          toast.update(toastId, {
            render: "Questions loaded successfully!",
            type: "success",
            autoClose: 2000
          });
          
          setCurrentStep(2);
          setQuestionsLoading(false);
        } else {
          // Keep showing loading until questions are loaded
          toast.update(toastId, {
            render: "Still preparing your questions...",
            type: "info",
            autoClose: false
          });
          
          // Start a timer to check for questions
          const checkQuestionsInterval = setInterval(() => {
            if (questionsList?.questions?.length > 0) {
              clearInterval(checkQuestionsInterval);
              
              toast.update(toastId, {
                render: "Questions loaded successfully!",
                type: "success",
                autoClose: 2000
              });
              
              // Let the useEffect handle the navigation
            }
          }, 2000); // Check every 2 seconds
          
          // Set timeout to prevent infinite loading
          setTimeout(() => {
            clearInterval(checkQuestionsInterval);
            if (!questionsList?.questions?.length > 0) {
              setShowLoading(false);
              setQuestionsLoading(false);
              
              toast.update(toastId, {
                render: "Failed to load questions. Please try again.",
                type: "error",
                autoClose: 5000
              });
            }
          }, 60000); // 1 minute timeout
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        toast.update(toastId, {
          render: "Failed to load questions. Please try again.",
          type: "error",
          autoClose: 5000
        });
        
        setShowLoading(false);
        setQuestionsLoading(false);
      }
    }
    else if (currentStep === 2) {
      // Only proceed if all validations pass
      if (chosenCompany && audioValidated && videoValidated) {
        // Show toast and loading overlay
        let toastId = toast("Preparing your interview...", { 
          autoClose: 5000 
        });
        
        // Show the loading overlay
        setShowLoading(true);
        
        try {
          // First prepare the interview
          await dispatch(prepare_interview());
          
          // Check if questions are available
          if (questionsList?.questions?.length > 0) {
            // If questions are available, proceed to interview
            toast.update(toastId, {
              render: "Ready for your interview!",
              type: "success",
              autoClose: 2000
            });
            
            // Navigate with a flag to start the interview
            setShowLoading(false);
            navigate("/interview", { 
              state: { 
                startInterview: true // Add this flag to indicate user explicitly started the interview
              } 
            });
          } else {
            // If questions are not available yet, retry loading
            toast.update(toastId, {
              render: "Still preparing your questions...",
              type: "info",
              autoClose: 5000
            });
            
            // Try to load questions again and automatically redirect when they're ready
            const checkQuestionsInterval = setInterval(() => {
              if (questionsList?.questions?.length > 0) {
                // Once questions are available, navigate with start flag
                clearInterval(checkQuestionsInterval);
                
                toast.update(toastId, {
                  render: "Ready for your interview!",
                  type: "success",
                  autoClose: 2000
                });
                
                setShowLoading(false);
                navigate("/interview", { 
                  state: { 
                    startInterview: true // Add this flag to indicate user explicitly started the interview
                  } 
                });
              }
            }, 1000); // Check every 1 second
            
            // Set a timeout to stop checking after 100 seconds
            setTimeout(() => {
              clearInterval(checkQuestionsInterval);
              if (!questionsList?.questions?.length > 0) {
                toast.update(toastId, {
                  render: "Unable to load interview questions. Please try again.",
                  type: "error",
                  autoClose: 5000
                });
                setShowLoading(false);
              }
            }, 100000);
          }
        } catch (error) {
          toast.update(toastId, {
            render: "Something went wrong. Please try again.",
            type: "error",
            autoClose: 5000
          });
          setShowLoading(false);
        }
      } else {
        toast.warning("Please complete all system checks before proceeding.");
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const { isDarkMode } = useDarkMode();

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;

  const textColors = isDarkMode
    ? colorTheme.dark.textColor2
    : colorTheme.light.textColor2;

  const textColor = isDarkMode
    ? colorTheme.dark.textColor3
    : colorTheme.light.textColor3;

  const grayColors = isDarkMode
    ? colorTheme.dark.grayColor3
    : colorTheme.light.grayColor;

  useEffect(() => {
    dispatch(loadHardSkillsList());
    dispatch(loadSoftSkillsList());
    dispatch(loadInterviewRolesList());
    dispatch(loadCompaniesList());
  }, [dispatch]);

  return (
    <div className="">
      <div className="w-full mx-auto rounded-xl">
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={<QontoConnector linearGradientBackground={linearGradientBackground} />}
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
        
        {/* Main content sections */}
        <div className="flex  p-4 items-center justify-center relative overflow-auto flex-col md:flex-row max-w-full h-auto">
          
          {currentStep === 0 && (
            <>

            {/* Render based on the entity_type */}
            {entity_type === "institution" ? (
              <div>
                <div
                className={`bg-${selectedCategory === "skills" ? "gray-200" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
                onClick={() => {
                  setSelectedCategory("skills");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                  setJdcompany("");
                  setJdrole("");
                  setCultcompany("");
                  setCultrole("");
                }}
              >
                <div className="flex relative overflow-auto ">
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
                      color: grayColors,
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
              </div>
            ) : entity_type === "corporate" ? (
              <div>
                <div
                className={`bg-${selectedCategory === "jd" ? "gray-200" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
                onClick={() => {
                  setSelectedCategory("jd");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);

                  setCultcompany("");
                  setCultrole("");
                }}
              >
                <div className="flex relative overflow-auto ">
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="jd"
                    checked={selectedCategory === "jd"}
                    onChange={() => setSelectedCategory("jd")}
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
                      color: grayColors,
                    }}
                  >
                    Technical Mock 
                  </h2>
                </div>
                <div
                  className={
                    selectedCategory !== "jd"
                      ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
                  }
                >
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Company Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setJdcompany(e.target.value)}
                      value={jdcompany}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Role:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter role"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setJdrole(e.target.value)}
                      value={jdrole}
                    />
                  </div>
                </div>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto p-2 md:p-8">

              <div
                className={`bg-${selectedCategory === "skills" ? "gray-200" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
                onClick={() => {
                  setSelectedCategory("skills");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                  setJdcompany("");
                  setJdrole("");
                  setCultcompany("");
                  setCultrole("");
                }}
              >
                <div className="flex relative overflow-auto ">
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
                      color: grayColors,
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

              <div
                className={`bg-${selectedCategory === "role" ? "gray-300" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto mr-auto w-full`}
                onClick={() => {
                  setSelectedCategory("role");
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);
                  setJdcompany("");
                  setJdrole("");
                  setCultcompany("");
                  setCultrole("");
                }}
                style={{ color: textColors }}
              >
                <div className="flex ">
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
                      color: grayColors,
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


                    <span className="font-bold pr-2" style={{ color: grayColors }}
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

              <div
                className={`bg-${selectedCategory === "jd" ? "gray-200" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto ml-auto w-full`}
                onClick={() => {
                  setSelectedCategory("jd");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);

                  setCultcompany("");
                  setCultrole("");
                }}
              >
                <div className="flex relative overflow-auto ">
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="jd"
                    checked={selectedCategory === "jd"}
                    onChange={() => setSelectedCategory("jd")}
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
                      color: grayColors,
                    }}
                  >
                    Technical Mock 
                  </h2>
                </div>
                <div
                  className={
                    selectedCategory !== "jd"
                      ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
                  }
                >
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Company Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setJdcompany(e.target.value)}
                      value={jdcompany}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Role:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter role"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setJdrole(e.target.value)}
                      value={jdrole}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`bg-${selectedCategory === "cult" ? "gray-200" : "gray-100"
                  } p-5 md:p-7 rounded-xl relative overflow-auto max-w-full h-auto mr-auto w-full`}
                onClick={() => {
                  setSelectedCategory("cult");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);
                  setJdcompany("");
                  setJdrole("");

                }}
              >
                <div className="flex relative overflow-auto ">
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="cult"
                    checked={selectedCategory === "cult"}
                    onChange={() => setSelectedCategory("cult")}
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
                      color: grayColors,
                    }}
                  >
                    HR / Behavioural Mock 
                  </h2>
                </div>
                <div
                  className={
                    selectedCategory !== "cult"
                      ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
                  }
                >
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Company Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setCultcompany(e.target.value)}
                      value={cultcompany}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-bold block mb-2">
                      Role:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter role"
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={e => setCultrole(e.target.value)}
                      value={cultrole}
                    />
                  </div>
                </div>
              </div>

            </div>
            )}
            </>
          )}

          {currentStep === 1 && (

            <div>
                {(selectedCategory == "jd" || selectedCategory == "cult") && (
              <JobDescriptionForm selectedCategory={selectedCategory} jdcompany={jdcompany} jdrole={jdrole} cultcompany={cultcompany} cultrole={cultrole} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>)}

              {(selectedCategory == "skills" || selectedCategory == "role") && (
                <div className="relative max-w-full h-auto p-4">
                  <h2
                    className="text-center text-2xl font-bold mb-4"
                    style={{ color: grayColors }}
                  >
                    Level
                  </h2>
                  <div
                    className="relative mx-auto p-4"
                    style={{
                      maxWidth: "35rem",
                      border: `3.5px solid ${textColors}`,
                      borderRadius: "20px",
                    }}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full mb-4 appearance-none h-2 rounded-lg"
                      style={{ background: `linear-gradient(to right, #0fe1d2 ${level}%, #dedcdc ${level}%)` }}
                    />
                    <div className="flex flex-col sm:flex-row justify-evenly items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => {
                          setLevel(0);
                          setExperienceLevel("low");
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
                      >
                        Beginner
                      </button>
                      <button
                        onClick={() => {
                          setLevel(50);
                          setExperienceLevel("medium");
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
                      >
                        Intermediate
                      </button>
                      <button
                        onClick={() => {
                          setLevel(100);
                          setExperienceLevel("high");
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
                      >
                        Advanced
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep == 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center ">
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
                  System Check
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

              <div className="bg-gray-200 rounded w-full">
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

        {/* Navigation buttons */}
        <div className="mt-4 p-6 flex justify-end items-center">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              disabled={handleSelection() || questionsLoading}
              className={`shadow-md ${questionsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                margin: "0 0.5rem",
                borderColor: linearGradientBackground,
                border: `2px solid ${linearGradientBackground}`,
                color: grayColors,
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: questionsLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => { 
                if (!questionsLoading) {
                  e.target.style.background = linearGradientBackground 
                }
              }}
              onMouseLeave={(e) => { e.target.style.background = "none" }}
            >
              Previous
            </button>
          )}
          
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              disabled={handleSelection() || questionsLoading}
              className={`shadow-md mx-2 px-4 rounded-md ${handleSelection() || questionsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: linearGradientBackground,
                color: textColor,
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: handleSelection() || questionsLoading ? "not-allowed" : "pointer",
              }}
            >
              {questionsLoading ? "Loading..." : "Next"}
            </button>
          )}

          {currentStep === steps.length - 1 && (
            <span>
              {chosenCompany && audioValidated && videoValidated ? (
                <button
                  onClick={handleNext}
                  className="shadow-md mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                  style={{
                    backgroundColor: linearGradientBackground,
                    color: textColor,
                  }}
                >
                  Submit
                </button>
              ) : (
                <Tooltip title="Please finish system checks before submitting">
                  <button
                    disabled={true}
                    className="shadow-md bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                    style={{
                      backgroundColor: linearGradientBackground,
                      color: textColor,
                    }}
                  >
                    Submit
                  </button>
                </Tooltip>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay 
        show={showLoading}
        message={
          questionsLoading
            ? "Preparing your interview questions..." 
            : currentStep === 2
              ? "Setting up your interview environment..."
              : "Loading..."
        }
      />
    </div>
  );
};

export default StepperComponent;