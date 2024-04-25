import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import MunsowLogo from '../../assets/MunsowLogo.png'
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
    { label: "Monday", value: "Mon", checked: false, backgroundColor: "" },
    { label: "Tuesday", value: "Tue", checked: false, backgroundColor: "" },
    { label: "Wednesday", value: "Wed", checked: false, backgroundColor: "" },
    { label: "Thursday", value: "Thur", checked: false, backgroundColor: "" },
    { label: "Friday", value: "Fri", checked: false, backgroundColor: "" },
    { label: "Saturday", value: "Sat", checked: false, backgroundColor: "" },
    { label: "Sunday", value: "Sun", checked: false, backgroundColor: "" },
  ]);

  const onDaySelect = (index, value) => {
    let temp = [...days];
    temp[index].checked = value;

    if (value) {
      switch (temp[index].value) {
        case "Mon":
          temp[index].backgroundColor = "#2BE2D0"; // Gold color for Monday
          break;
        case "Tue":
          temp[index].backgroundColor = "#2BE2D0"; // Orange color for Tuesday
          break;
        default:
          temp[index].backgroundColor = "#2BE2D0"; // Default selected color for other days
      }
    } else {
      temp[index].backgroundColor = ""; // Remove background color when not selected
    }

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
    <div className="fe"
      
    ><img src={MunsowLogo} alt="logo" className="w-20 h-20 mt-1 munsowImg "  />
    <div className="px-4 py-2  journey "  >
          <h2 className="text-2xl font-medium">Join Us Form</h2>
          <p className="registration-sub-header py-2">
            Kick start your journey to get access to our expert insights about
            your students across departments, branches, and cities today!
          </p>
        </div>
 
   
      <div
        className="rounded-xl overflow-hidden bg-white vd"
       
      >
        

        <div className="grid grid-cols-2 gap-6 p-6">
        {userFeilds?.map((o) => (
  <div key={o.key}> {/* Add a wrapping div with a key */}
    <div className="flex flex-col"> {/* Add a wrapping div for the label and input field */}
      <p className="mb-1 text-gray-400 text-sm">{o.label} {o.required && <span style={{ color: 'red' }}>*</span>}</p>
      {o.type === "select" ? (
        <Autocomplete
          size="small"
          fullWidth
          multiple={o.multiple ?? false}
          options={o.options ?? []}
          getOptionLabel={(option) => option?.label}
          defaultValue={o.value}
          filterSelectedOptions={true}
          value={o.value}
          renderInput={(params) => (
            <TextField {...params} label={o.label} variant="outlined" />
          )}
          onChange={(e, value) => {
            handleInputChange(o.key, value);
          }}
        />
      ) : (
        <TextField
          key={o.key}
          type={o.type}
          value={o.value}
          size="small"
          variant="outlined"
          style={{ borderRadius: "15px" }}
          onChange={(e) => {
            handleInputChange(o.key, e.target.value);
          }}
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
      )}
    </div>
  </div>
))}


        </div>

        <div className="p-4 grid gap-4 ">
          <div className="font-medium"> Prefered Days For Contact  <span className="text-red-500">*</span> </div>
         

          <div className="flex gap-4 flex-wrap">
  {days.map((day, index) => (
    <Chip
      key={day.value}
      label={day.label}
      onClick={() => onDaySelect(index, !day.checked)}
      style={{
        backgroundColor: day.checked ? day.backgroundColor : "transparent",
        color: day.checked ? "white" : "black",
        border: day.checked ? "none" : "1px solid #ccc",
        cursor: "pointer",
      }}
    />
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
            }}    style={{ color:"red",textDecoration:"underline",textTransform:"capitalize" }} 
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
  style={{ backgroundColor: "#2BE2D0",color:"black" ,textTransform:"capitalize"}}
>
  Register Institute
</Button>


        </div>
      </div>
     
    </div>
 
 
  );
};
export default Register;