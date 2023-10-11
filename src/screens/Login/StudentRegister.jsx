import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadBrachList,
  loadCourseList,
  loadDepartmentList,
  loadInstitutionList,
  user_signup,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseList, departmentList, branchList, institutionList } =
    useSelector((state) => state.data);

  const [mainData, setMainData] = useState({});
  const userFeilds = [
    {
      label: "First Name",
      key: "first_name",
      value: mainData?.first_name ?? "",
      type: "text",
    },
    {
      label: "Last Name",
      key: "last_name",
      value: mainData?.last_name ?? "",
      type: "text",
    },
    {
      label: "Email",
      key: "email",
      value: mainData?.email ?? "",
      type: "text",
    },
    {
      key: "mobile_number",
      label: "Mobile Number",
      value: mainData?.mobile_number ?? "",
      type: "text",
    },
    {
      label: "Address",
      key: "address",
      value: mainData?.address ?? "",
      type: "text",
    },
    {
      label: "Password",
      key: "password",
      value: mainData?.password ?? "",
      type: "text",
    },
    {
      label: "Institution",
      key: "institution",
      value: mainData?.institution ?? null,
      type: "select",
      options:
        institutionList?.map((o) => ({
          label: o?.institution_name ?? "-",
          value: o?.id,
        })) ?? [],
    },
    {
      label: "Course",
      key: "course",
      value: mainData?.course ?? null,
      type: "select",
      options: courseList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
    },
    {
      label: "Department",
      key: "department",
      value: mainData?.department ?? null,
      options:
        departmentList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
      type: "select",
    },
    {
      label: "Branch",
      key: "branch",
      value: mainData?.branch ?? null,
      options: branchList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
      type: "select",
    },
  ];

  const handleInputChange = (key, value) => {
    let temp = { ...mainData };
    temp[key] = value;
    setMainData(() => ({ ...temp }));
  };
  useEffect(() => {
    dispatch(loadBrachList());
    dispatch(loadCourseList());
    dispatch(loadDepartmentList());
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
      course: mainData?.course?.label,
    };
    dispatch(user_signup(payload, (test) => {
      setMainData({});
      console.log("test",test);
      navigate("../studentLogin", {replace: true});
    }));
    
  };

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
                    value={o?.value}
                    defaultValue={o?.value}
                    id="combo-box-demo"
                    options={o?.options ?? []}
                    renderInput={(params) => (
                      <TextField 
                      {...params} 
                      label={o?.label} 
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
                  />
                </>
              ) : (
                <TextField
                  key={o?.key}
                  type={o?.type}
                  label={o?.label}
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
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
