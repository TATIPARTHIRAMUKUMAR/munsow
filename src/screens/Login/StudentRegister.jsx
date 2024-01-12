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
  user_signup,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseList, departmentList, branchList, institutionList } =
    useSelector((state) => state.data);

  const [mainData, setMainData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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
    {
      label: "Institution",
      key: "institution",
      value: mainData?.institution ?? null,
      type: "select",
      required:true,
      options:
        institutionList?.map((o) => ({
          label: o?.institution_name ?? "-",
          value: o?.id,
        })) ?? [],
    },
    {
      label: "Branch",
      key: "branch",
      value: mainData?.branch ?? null,
      options: branchList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
      type: "select",
      required:true
    },
    {
      label: "Course",
      key: "course",
      value: mainData?.course ?? null,
      type: "select",
      required:true,
      options: courseList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
    },
    {
      label: "Department",
      key: "department",
      value: mainData?.department ?? null,
      options:
        departmentList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
      type: "select",
      required:true
    },
  ];

  const handleInputChange = (key, value) => {
    let temp = { ...mainData };
  
    // When an institution is selected
    if (key === "institution") {
      // Update the institution, reset branch, course, and department
      temp = {
        ...temp,
        institution: value,
        branch: null,
        course: null,
        department: null,
      };
      dispatch(loadBrachList(`institution_id=${value?.value}`));
      // Also dispatch for empty course and department lists
    } else if (key === "branch") {
      // Update the branch, reset course and department
      temp = {
        ...temp,
        branch: value,
        course: null,
        department: null,
      };
      dispatch(loadCourseList(`branch_id=${value?.value}`));
    } else if (key === "course") {
      // Update the course, reset department
      temp = {
        ...temp,
        course: value,
        department: null,
      };
      dispatch(loadDepartmentList(`course_id=${value?.value}`));
    } else {
      // For all other fields, just update the value
      temp[key] = value;
    }
  
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
  }, [dispatch]);

  const onHandleCreate = () => {
    const payload = {
      first_name: mainData?.first_name,
      last_name: mainData?.last_name,
      email: mainData?.email,
      phone_number: mainData?.mobile_number,
      branch_id: mainData?.branch?.value,
      department_id: mainData?.department?.value,
      address: mainData?.address,
      institution_id: mainData?.institution?.value,
      password: mainData?.password,
      course_id: mainData?.course?.value,
    };
    dispatch(user_signup(payload, (test) => {
      setMainData({});
      console.log("test", test);
      navigate("../studentLogin", { replace: true });
    }));

  };

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") && requiredFields.every((field) => mainData[field.key]!==undefined) 
    setIsFormValid(isValid);
  }, [mainData]);

  return (
    <div
      className="p-4 bg-[#f5f5f5] h-[100vh] flex flex-col justify-center  items-center"
      style={{ backdropFilter: "" }}
    >
      <div className="bg-white  flex flex-col justify-center p-4 rounded-xl shadow-2xl min-w-[70%] max-w-[80%]">
        <div className="p-4 font-medium text-2xl">
          {" "}
          Student Registration Form{" "}
        </div>
        <div className="grid grid-cols-2 gap-8 bg-white p-4">
          {userFeilds?.map((o) => (
            <>
              {o?.type === "select" ? (
                <>
                  <Autocomplete
                    size="small"
                    fullWidth
                    disablePortal
                    value={o?.value || null}  
                    // value={o?.value}
                    defaultValue={o?.value}
                    id="combo-box-demo"
                    options={o?.options ?? []}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={(
                          <div>
                            {o?.label}
                            {o?.required && (
                              <span style={{ color: 'red' }}>*</span>
                            )}
                          </div>
                        )}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            borderRadius: "0.4rem",
                          },
                        }}
                      />
                    )}
                    onChange={(e, value) => {
                      handleInputChange(o?.key, value);
                    }}
                    onClickCapture={(e, value) => {
                      handleSelectionError(o?.key, value);
                    }}
                  />
                </>
              ) : (
                <TextField
                  key={o?.key}
                  type={o?.type}
                  label={(
                    <div>
                      {o?.label}
                      {o?.required && (
                        <span style={{ color: 'red' }}>*</span>
                      )}
                    </div>
                  )}
                  value={o?.value}
                  size="small"
                  onChange={(e) => {
                    handleInputChange(o?.key, e.target.value);
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "0.4rem",
                    },
                  }}

                />
              )}
            </>
          ))}
        </div>
        <div className="flex justify-end gap-6 p-4">
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1)
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onHandleCreate();
            }}
            disabled={!isFormValid}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
