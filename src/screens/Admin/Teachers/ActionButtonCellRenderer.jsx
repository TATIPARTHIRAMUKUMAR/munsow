import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadTeachersList, userStatUpdate } from "../../../redux/action";
import { Switch } from "@mui/material";
const ActionButtonCellRenderer = (props) => {

  const { deleteHandler = ()=>{} } = props;
  const row = props?.node?.data;

  const dispatch = useDispatch()

  const [checked, setChecked] = React.useState(row?.is_active);

  const [params, setParams] = useState({
    //   order_by:"",
    //   ASC:"",
    //   page_number:"",
    //   created_date:"",
    limit:10,
    mode: "Teacher"
  })

  const handleChange = (event) => {
    console.info(event,"--")
    setChecked(event);
    dispatch(userStatUpdate( row?.id , event ? "activate" : "deactivate"  ,() => {
      // console.log("test",test);
      dispatch(loadTeachersList(params));
    } ))
  };

  return (
    <div>

      <Switch
      checked={checked}
      color="primary"
      onChange={(event)=> handleChange(event?.target?.checked) }
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </div>
  );
};

export default ActionButtonCellRenderer;
