import * as React from 'react';
import { useEffect, useState }  from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function MutiSelect(props) {
  const { options, label, selectedItems, onSelectionChange } = props;

  // Filter out the selected items from options
  const availableOptions = options.filter(
    (option) => !selectedItems?.find((selected) => selected.label === option.label)
  );

  const [open, setOpen] = useState(false);
  const [hardSkillsLength, setHardSkillsLength] = useState(false);
  // const [softSkillsLength, setSoftSkillsLength] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectionChange = (newValue) => {
    if (newValue.length > 3) {
      setHardSkillsLength(true);
      setOpen(true);
    } else {
      onSelectionChange(newValue);
    }
  };

  return (
    <>
      { (hardSkillsLength) && (
        <>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Slide in alert dialog
            </Button> */}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle>{"Limit Exceeded: Maximum 3 Skills Allowed!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You have exceeded the maximum limit of selected skills. 
                Please ensure that you select a maximum of three skills, whether they are hard skills or soft skills.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    <Autocomplete
      size="small"
      multiple
      id="checkboxes-tags-demo"
      options={availableOptions}
      disableCloseOnSelect
      value={selectedItems ? selectedItems : []}
      onChange={(event, newValue) => handleSelectionChange(newValue)}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {/* <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            /> */}
          {option.label}
        </li>
      )}
      style={{ width: '20rem', backgroundColor: 'white' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          InputProps={{
            ...params.InputProps,
            style: {
              borderRadius: '0.4rem',
            },
          }}
        />
      )}
    />
    </>
  );
}
