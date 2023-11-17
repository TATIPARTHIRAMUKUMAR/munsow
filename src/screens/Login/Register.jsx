import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { loadCountryList, registerInstitute } from "../../redux/action";
import { TimePicker } from "antd";
import "./Register.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const { countryList } = useSelector((state) => state?.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCountryList());
  }, []);

  const [mainData, setMainData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const handleSubmit = () => {
    console.info(
      mainData?.time?.map((o) => dayjs(o)?.format("hh A")).join(" to ")
    );
    const payload = {
      institution_name: mainData?.institution_name,
      contact_name: mainData?.contact_name,
      email: mainData?.email,
      phone_number: mainData?.mobile_number,
      country_id: Number(mainData?.country?.value),
      city: mainData?.city,
      desiganation: mainData?.desiganation,
      number_of_students: Number(mainData?.number_of_students),
      number_of_departments: Number(mainData?.number_of_departments),
      domains: mainData?.domains,
      preference_days: days
        ?.filter((o) => o?.checked)
        ?.map((o) => o?.value)
        ?.join(", "),
      preference_time: "10 AM to 6 PM",
      password: mainData.password,
      registration_number: mainData.registration_number
    };

    dispatch(registerInstitute(payload));
    navigate("/");
  };

  const userFeilds = [
    {
      label: "Institution Name",
      key: "institution_name",
      value: mainData?.institution_name ?? "",
      type: "text",
      required: true
    },
    {
      label: "Contact Name",
      key: "contact_name",
      value: mainData?.contact_name ?? "",
      type: "text",
      required: true
    },
    {
      label: "Email",
      key: "email",
      value: mainData?.email ?? "",
      type: "email",
      required: true
    },
    {
      key: "mobile_number",
      label: "Mobile Number",
      value: mainData?.mobile_number ?? "",
      type: "tel",
      required: true
    },
    {
      label: "Domains",
      key: "domains",
      value: mainData?.domains ?? "",
      type: "text",
      required: true
    },
    {
      label: "Desiganation",
      key: "desiganation",
      value: mainData?.desiganation ?? "",
      type: "text",
      required: true
    },
    {
      label: "Number of Students",
      key: "number_of_students",
      value: mainData?.number_of_students ?? "",
      type: "number",
      required: true
    },
    {
      label: "Number of Departments",
      key: "number_of_departments",
      value: mainData?.number_of_departments ?? "",
      type: "number",
      required:true
    },
    {
      label: "Password",
      key: "password",
      value: mainData?.password ?? "",
      type: "text",
      required: true
    },
    {
      label: "City",
      key: "city",
      value: mainData?.city ?? "",
      type: "text",
      required: true
    },
    {
      label: "Country",
      key: "country",
      value: mainData?.country ?? null,
      type: "select",
      required:true,
      options:
        countryList?.map((o) => ({ label: o?.name ?? "--", value: o?.id })) ??
        [],
    },
    {
      label: "Registration Number",
      key: "registration_number",
      value: mainData?.registration_number ?? "",
      type: "text",
      required: true
    },

  ]

  const [days, setDays] = useState([
    { label: "Monday", value: "Mon", checked: false },
    { label: "Tuesday", value: "Tue", checked: false },
    { label: "Wednesday", value: "Wed", checked: false },
    { label: "Thursday", value: "Thur", checked: false },
    { label: "Friday", value: "Fri", checked: false },
    { label: "Saturday", value: "Sat", checked: false },
    { label: "Sunday", value: "Sun", checked: false },
  ]);

  const onDaySelect = (index, value) => {
    let temp = [...days];
    temp[index].checked = value;
    setDays(temp);
  };

  const handleInputChange = (key, value) => {
    let temp = { ...mainData };
    temp[key] = value;
    setMainData(() => ({ ...temp }));
  };

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") && requiredFields.every((field) => mainData[field.key]!==undefined) &&
      days.some((day) => day.checked);
    setIsFormValid(isValid);
  }, [mainData, days]);

  return (
    <div
      className="bg-gray-100 p-5 min-h-[100vh]"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="rounded-xl overflow-hidden bg-white "
        style={{ width: "60%", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '20px' }}
      >
        <div className="px-4 py-2 border-b-2">
          <h2 className="text-2xl font-medium">Join Us Form</h2>
          <p className="registration-sub-header py-2">
            Kick start your journey to get access to our expert insights about
            your students across departments, branches, and cities today!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 p-6">
          {userFeilds?.map((o) => (
            <>
              {o?.type === "select" ? (
                <>
                  <Autocomplete
                    size="small"
                    fullWidth
                    multiple={o?.multiple ?? false}
                    options={o?.options ?? []}
                    getOptionLabel={(option) => option?.label}
                    defaultValue={o?.value}
                    filterSelectedOptions={true}
                    value={o?.value}
                    renderInput={(params) => (
                      <TextField {...params} label={(
                        <div>
                          {o?.label}
                          {o?.required && (
                            <span style={{ color: 'red' }}>*</span>
                          )}
                        </div>
                      )} />
                    )}
                    onChange={(e, value) => {
                      handleInputChange(o?.key, value);
                    }}
                  />
                </>
              ) : (
                <>
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
                    style={{ borderRadius: "15px" }}
                    onChange={(e) => {
                      handleInputChange(o?.key, e.target.value);
                    }}
                    // required={o?.required}
                    InputLabelProps={{
                      style: { color: "black" }, // Set the label text color
                    }}
                  />

                  {/* {o?.required && (
                    <span
                      className="text-red absolute top-1/2 right-2 transform -translate-y-1/2 "
                      style={{ fontSize: "0.75rem" }}
                    >
                      *
                    </span>
                  )} */}
                </>

              )}
            </>
          ))}
        </div>

        <div className="p-4 grid gap-4 ">
          <div className="font-medium"> Prefered Days For Contact  <span className="text-red-500">*</span> </div>
          <div className="flex gap-4 flex-wrap">
            {days?.map((o, i) => (
              <div
                key={o?.value}
                className={`p-2 px-4 border rounded-full text-center cursor-pointer ${o?.checked
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border border-gray-500"
                  }`}
                onClick={() => {
                  onDaySelect(i, !o?.checked);
                }}
              >
                {" "}
                {o?.label}{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 grid gap-4 w-full ">
          <div className="font-medium"> Prefered Time For Contact </div>
          <div className="grid grid-cols-2">
            <TimePicker.RangePicker
              size="large"
              use12Hours
              showTime={{ format: "hh A", hourStep: 1, minuteStep: 5 }}
              format="hh A"
              value={mainData?.time}
              onChange={(value) => {
                handleInputChange("time", value);
              }}
              popupClassName="timepicker-background"
              className="col-span-1"
            />
          </div>
        </div>

        <div className="flex justify-end p-6 gap-6">
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
            disabled={!isFormValid}
          >
            Register Institute
          </Button>


        </div>
      </div>
    </div>
  );
};
export default Register;
