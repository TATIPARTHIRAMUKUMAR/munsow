import React, { useEffect, useRef, useState } from "react";
import UploadImage from "../../../assets/file-upload.png";

import {
  loadBrachList,
  loadCourseList,
  loadDepartmentList,
  loadInstitutionList,
  uploadUser,
  user_create,
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Autocomplete, Box, Button, Tab, TextField } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants";
import { toast } from "react-toastify";
const AddTeachers = () => {
  const dispatch = useDispatch();
  const { institutionList, departmentList, branchList, courseList } =
    useSelector((state) => state.data);
  const [fileData, setFileData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const formData = new FormData();
  formData.append("mode", "Teacher");
  // ref
  const input = useRef(null);

  // utils
  // const handleSelectFiles = (e) => {
  //   formData.append('file', e.currentTarget.files[0]);
  //   dispatch(uploadUser(formData))
  // };

  const handleSelectFiles = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      let base64Data = event.target.result.split(",")[1]; // Get the base64 data part

      const mimeRegex = /^data:.+;base64,/;
      if (mimeRegex.test(base64Data)) {
        base64Data = base64Data.replace(mimeRegex, "");
      }
      // Ensure the base64 data length is a multiple of 4
      while (base64Data.length % 4 !== 0) {
        base64Data += "=";
      }

      // console.log("base64Data", base64Data)
      const payload = {
        mode: "teacher",
        base64: base64Data,
      };
      dispatch(uploadUser(payload));
      // setFileData(base64Data); // Store the base64 data in state
    };

    reader.readAsDataURL(file);

    // console.log("base64", fileData, file)
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [mainData, setMainData] = useState({});
  const userFeilds = [
    {
      label: "First Name",
      key: "first_name",
      value: mainData?.first_name ?? "",
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      key: "last_name",
      value: mainData?.last_name ?? "",
      type: "text",
      required: true,
    },
    {
      label: "Email",
      key: "email",
      value: mainData?.email ?? "",
      type: "text",
      required: true,
    },
    {
      key: "mobile_number",
      label: "Mobile Number",
      value: mainData?.mobile_number ?? "",
      type: "text",
      required: true,
    },
    {
      label: "Address",
      key: "address",
      value: mainData?.address ?? "",
      type: "text",
      required: true,
    },
    {
      label: "Password",
      key: "password",
      value: mainData?.password ?? "",
      type: "text",
      required: true,
    },
    {
      label: "Branch",
      key: "branch",
      value: mainData?.branch ?? null,
      options:
        branchList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ?? [],
      type: "select",
      required: true,
    },
    {
      label: "Course",
      key: "course",
      value: mainData?.course ?? null,
      type: "select",
      options:
        courseList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ?? [],
      required: true,
    },
    {
      label: "Department",
      key: "department",
      value: mainData?.department ?? null,
      options:
        departmentList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ??
        [],
      type: "select",
      required: true,
    },
  ];

  const handleInputChange = (key, value) => {
    let temp = { ...mainData };
    temp[key] = value;
    if (key == "branch") {
      dispatch(loadCourseList(`branch_id=${value?.value}`));
    } else if (key == "course") {
      dispatch(loadDepartmentList(`course_id=${value?.value}`));
    }
    setMainData(() => ({ ...temp }));
  };

  const handleSelectionError = (key, value) => {
    if (key == "course" && !mainData.branch) {
      toast.error("Branch not selected", {
        autoClose: 2000,
      });
    } else if (key == "department" && !mainData.course) {
      toast.error("Course not selected", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") &&
      requiredFields.every((field) => mainData[field.key] !== undefined);
    setIsFormValid(isValid);
  }, [mainData]);

  useEffect(() => {
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
    // dispatch(loadBrachList());
    // dispatch(loadInstitutionList());
    // dispatch(loadDepartmentList())
  }, [dispatch]);

  useEffect(() => {
    console?.info(mainData, "--mainData");
  }, [mainData]);

  const onHandleCreate = () => {
    const payload = {
      first_name: mainData?.first_name,
      last_name: mainData?.last_name,
      email: mainData?.email,
      phone_number: mainData?.mobile_number,
      branch_id: mainData?.branch?.value,
      department_id: mainData?.department?.value,
      address: mainData?.address,
      course_id: mainData?.course?.value,
      // "institution_id": mainData?.institution?.value,
      password: mainData?.password,
    };
    dispatch(
      user_create(payload, { mode: "teacher" }, () => {
        setMainData({});
      })
    );
  };

  return (
    <div className="p-4">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            style={{ backgroundColor: "white", borderRadius: "8px" }}
          >
            <Tab label="Bulk Create" value="1" />
            <Tab label="Manual Create" value="2" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          style={{
            background: "white",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <div className="">
            <div className="flex justify-between">
              <div className="flex justify-between items-center text-blue-500 text-2xl  font-semibold">
                Import Teachers
              </div>
              <div className="flex justify-between items-center gap-2 text-lg font-semibold text-blue-500 cursor-pointer">
                <a href={`${GLOBAL_CONSTANTS?.backend_url}user/download`}>
                  <Button
                    endIcon={<CloudDownloadOutlinedIcon />}
                    style={{
                      color: "#252525",
                      borderColor: "#2BE2D0",
                      backgroundColor: "#2BE2D0",
                      fontWeight: "600",
                    }}
                    variant="outlined"
                    size="small"
                    onClick={() => {}}
                  >
                    {" "}
                    Download Sample File{" "}
                  </Button>
                </a>
              </div>
            </div>

            <div className="col-lg-12 mt-12">
              <div className="flex justify-start items-start">
                <span className="text-4xl font-semibold">
                  Upload Teacher Information
                </span>
              </div>
            </div>
            <div className="col-lg-12 mt-2">
              <div className="flex justify-start items-start">
                <span className="text-base font-normal">
                  Download the excel file template from above and fill in the
                  details, and our tool will automatically pick them up on
                  import
                </span>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <div className="flex justify-between items-start">
                <div className="FileUploadContent-root">
                  <div className="FileUploadGrid-item">
                    <div
                      className="FileUpload-upload FileUpload-upload-drag"
                      onClick={() => input && input.current.click()}
                    >
                      <input
                        ref={input}
                        type="file"
                        className="hidden"
                        accept=".csv, .xlsx"
                        onChange={(e) => handleSelectFiles(e)}
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                      />
                      <span className="FileUpload-upload FileUpload-upload-btn">
                        <div className="">
                          <div>
                            <div className="FileUpload-upload-drag-icon w-full flex justify-center">
                              <img
                                src={UploadImage}
                                className="w-[200px] rounded "
                                style={{ saturation: "blur(30px)" }}
                                alt="Upload Icon"
                              />
                            </div>
                            <p className="pt-5">
                              Select a CSV or Excel file to import
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel
          value="2"
          style={{
            background: "white",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <div className="grid grid-cols-2 gap-4 bg-white p-4">
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
                          label={
                            <div>
                              {o?.label}
                              {o?.required && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </div>
                          }
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
                    label={
                      <div>
                        {o?.label}
                        {o?.required && <span style={{ color: "red" }}>*</span>}
                      </div>
                    }
                    value={o?.value}
                    size="small"
                    onChange={(e) => {
                      handleInputChange(o?.key, e.target.value);
                    }}
                  />
                )}
              </>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setMainData(() => ({ branch: null }));
              }}
            >
              Clear Data
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onHandleCreate();
              }}
              disabled={!isFormValid}
              style={{
                color: isFormValid ? "#252525" : "#979c9b",
                borderColor: isFormValid ? "#2BE2D0" : "#CCCCCC",
                backgroundColor: isFormValid ? "#2BE2D0" : "#CCCCCC",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: isFormValid ? "#22b3a4" : "#CCCCCC",
                  borderColor: isFormValid ? "#22b3a4" : "#CCCCCC",
                },
              }}
            >
              Create Teacher
            </Button>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AddTeachers;
