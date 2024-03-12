import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MutiSelect(props) {
  const { options, label, selectedItems, onSelectionChange } = props;

  // Filter out the selected items from options
  const availableOptions = options.filter(
    (option) => !selectedItems?.find((selected) => selected.label === option.label)
  );

  return (
    <Autocomplete
      size="small"
      multiple
      id="checkboxes-tags-demo"
      options={availableOptions}
      disableCloseOnSelect
      value={selectedItems ? selectedItems : []}
      onChange={(event, newValue) => onSelectionChange(newValue)}
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
      style={{ width: '20rem' }}
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
  );
}
