import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseList,
  getDepartmentList,
  loadBrachList,
  loadCourseList,
  loadDepartmentList,
  loadInstitutionList,
  screeining_user_signup,
  user_signup,
  loadLinks,
} from "../../redux/action";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ScreeningUserRegister = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseList, departmentList, branchList, institutionList } =
    useSelector((state) => state.data);

  const [mainData, setMainData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [entityType, setEntityType] = useState(""); 
  const { linksList } = useSelector((state) => state?.data);

  const userFeilds = [
    {
      label: "First Name",
      key: "first_name",
      value: mainData?.first_name ?? "",
      type: "text",
      required:true
    },
    {
      label: "Last Name",
      key: "last_name",
      value: mainData?.last_name ?? "",
      type: "text",
      required:true
    },
    {
      label: "Email",
      key: "email",
      value: mainData?.email ?? "",
      type: "text",
      required:true
    },
    {
      key: "mobile_number",
      label: "Mobile Number",
      value: mainData?.mobile_number ?? "",
      type: "text",
      required:true
    },
    {
      label: "Address",
      key: "address",
      value: mainData?.address ?? "",
      type: "text",
      required:true
    },
    {
      label: "Password",
      key: "password",
      value: mainData?.password ?? "",
      type: "text",
      required:true
    },
    // {
    //   label: "Institution",
    //   key: "institution",
    //   value: mainData?.institution ?? "",
    //   type: "text",
    //   required:true,
    // },
    // {
    //   label: "Branch",
    //   key: "branch",
    //   value: mainData?.branch ?? "",
    //   type: "text",
    //   required:true
    // },
    // {
    //   label: "Course",
    //   key: "course",
    //   value: mainData?.course ?? "",
    //   type: "text",
    //   required:true,
    // },
    // {
    //   label: "Department",
    //   key: "department",
    //   value: mainData?.department ?? "",
    //   required:true,
    //   type: "text"
    // },
  ];

  // Fields for Institution users
  const institutionFields = [
    {
      label: "Branch",
      key: "branch",
      value: mainData?.branch ?? "",
      type: "text",
      required: entityType === "institution",
    },
    {
      label: "Course",
      key: "course",
      value: mainData?.course ?? "",
      type: "text",
      required: entityType === "institution",
    },
    {
      label: "Department",
      key: "department",
      value: mainData?.department ?? "",
      required: entityType === "institution",
      type: "text",
    },
  ];

  const handleInputChange = (key, value) => {
    let temp = { ...mainData };
  
    // // When an institution is selected
    // if (key === "institution") {
    //   // Update the institution, reset branch, course, and department
    //   temp = {
    //     ...temp,
    //     institution: value,
    //     branch: null,
    //     course: null,
    //     department: null,
    //   };
    //   dispatch(loadBrachList(`institution_id=${value?.value}`));
    //   // Also dispatch for empty course and department lists
    // } else if (key === "branch") {
    //   // Update the branch, reset course and department
    //   temp = {
    //     ...temp,
    //     branch: value,
    //     course: null,
    //     department: null,
    //   };
    //   dispatch(loadCourseList(`branch_id=${value?.value}`));
    // } else if (key === "course") {
    //   // Update the course, reset department
    //   temp = {
    //     ...temp,
    //     course: value,
    //     department: null,
    //   };
    //   dispatch(loadDepartmentList(`course_id=${value?.value}`));
    // } else {
    //   // For all other fields, just update the value
    //   temp[key] = value;
    // }
    
    temp[key] = value;
    setMainData(temp);
  };
  
  
  

  const handleSelectionError = (key, value) => {
    if (key == "branch" && !mainData.institution) {
      toast.error(
        "Institution not selected",
        {
          autoClose: 2000,
        }
      );
    } else if (key == "course" && !mainData.branch) {
      toast.error(
        "Branch not selected",
        {
          autoClose: 2000,
        }
      );
    } else if (key == "department" && !mainData.course) {
      toast.error(
        "Course not selected",
        {
          autoClose: 2000,
        }
      );
    }
  }
  useEffect(() => {
    // dispatch(loadBrachList());
    // dispatch(loadCourseList());
    // dispatch(loadDepartmentList());
    dispatch(loadInstitutionList());
    dispatch(loadLinks());
  }, [dispatch]);

  // Set entityType based on the link from linksList
  useEffect(() => {
    if (linksList && id) {
      const selectedLink = linksList.find((link) => link.unique_code === id);
      if (selectedLink) {
        setEntityType(selectedLink.entity_type); // Set entityType based on the selected link
      }
    }
  }, [linksList, id]);
  
  const onHandleCreate = () => {
    const payload = {
      first_name: mainData?.first_name,
      last_name: mainData?.last_name,
      email: mainData?.email,
      phone_number: mainData?.mobile_number,
      // branch_name: mainData?.branch,
      // department_name: mainData?.department,
      address: mainData?.address,
      unique_code: id,
      password: mainData?.password,
      // course_name: mainData?.course,
      // Pass null values for branch, department, and course if entityType is corporate
      branch_name: entityType === "corporate" ? "Not Required" : mainData?.branch,
      department_name: entityType === "corporate" ? "Not Required" : mainData?.department,
      course_name: entityType === "corporate" ? "Not Required" : mainData?.course,
    };

    dispatch(screeining_user_signup(payload, (test) => {
      setMainData({});
      console.log("test", test);
      navigate("../", { replace: true });
    }));

  };

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") && requiredFields.every((field) => mainData[field.key]!==undefined) 
    setIsFormValid(isValid);
  }, [mainData]);

   return (
    <div className="p-4 bg-[#f5f5f5] h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-white flex flex-col justify-center p-4 rounded-xl shadow-2xl min-w-[70%] max-w-[80%]">
        <div className="p-4 font-medium text-2xl">
          {" "}
          Screening User Registration Form{" "}
        </div>
        <div className="grid grid-cols-2 gap-8 bg-white p-4">
          {userFeilds?.map((o) => (
            <TextField
              key={o?.key}
              type={o?.type}
              label={o?.label}
              value={o?.value}
              size="small"
              onChange={(e) => handleInputChange(o?.key, e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "0.4rem",
                },
              }}
            />
          ))}

          {/* Conditionally render the fields for institution */}
          {entityType === "institution" &&
            institutionFields?.map((o) => (
              <TextField
                key={o?.key}
                type={o?.type}
                label={o?.label}
                value={o?.value}
                size="small"
                onChange={(e) => handleInputChange(o?.key, e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "0.4rem",
                  },
                }}
              />
            ))}
        </div>

        <div className="flex justify-end gap-6 p-4">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="contained" onClick={onHandleCreate} disabled={!isFormValid}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScreeningUserRegister;
