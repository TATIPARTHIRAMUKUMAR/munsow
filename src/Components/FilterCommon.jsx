import React, {useState, useEffect} from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
const FilterCommon = (props) => {
    return (
        <div>
        <Button
          id="demo-customized-button"
          aria-controls={props.open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={props.open ? "true" : undefined}
          // variant="contained"
          disableElevation
          onClick={props.handleClick}
          startIcon={<FilterAltRoundedIcon />}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            marginRight: "2rem",
            fontWeight: 600,
          }}
        >
          {props.active}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={props.anchorEl}
          open={props.open}
          onClose={props.handleClose}
        >
          <MenuItem
            onClick={() => {
              props.handleMenuItemClick(props.defaultValue);
            }}
            disableRipple
          >
            {props.defaultValue}
          </MenuItem>
          {props.data?.map((item) => (
            <MenuItem
              key={item?.name}
              onClick={() => {
                props.handleMenuItemClick(item?.name);
              }}
              disableRipple
            >
              {item?.name}
            </MenuItem>
          ))}
        </StyledMenu>
      </div>
    )
}

export default FilterCommon