import React from "react";
import { useDispatch } from "react-redux";
import { userStatUpdate } from "../../../redux/action";
import { Switch } from "@mui/material";
const ActionButtonCellRenderer = (props) => {

  // const { deleteHandler = ()=>{} } = props;
  const row = props?.data;

  const dispatch = useDispatch()

  const [checked, setChecked] = React.useState(row?.is_active);

  const handleChange = (event) => {
    console.info(event,"---")
    console.log(row?.id)
    setChecked(event);
    dispatch(userStatUpdate( row?.id , event ? "activate" : "deactivate",()=>{
      window.location.reload();
      
    }))
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
