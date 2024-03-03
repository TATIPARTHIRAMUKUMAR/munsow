import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, IconButton, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadLinks, updateLinkStatus } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const LinksList = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const history = useNavigate();

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  const { linksList } = useSelector((state) => state?.data)


  useEffect(() => {
    dispatch(loadLinks());
  }, [dispatch])

  const handleToggleChange = (link) => {
    console.log("link", link)

    dispatch(updateLinkStatus(link.id, link.is_active ? "deactive" : "active", () => {
      dispatch(loadLinks());
    }))

  };

  const handleCreateLink = () => {
    history('/screeningUsers/createLink'); // Update with your path
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-semibold">Links List</span>
        <Button
          variant="contained"
          color="primary"
          style={{background: '#2BE2D0', color: "#252525"}}
          onClick={handleCreateLink}
          className="top-0 right-0 m-4"
        >
          Create Link
        </Button>


      </div>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>Activation Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Max Capacity</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {linksList?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.activation_date).toLocaleDateString()}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.description}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.expiry_date).toLocaleDateString()}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.max_capacity}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>
                  {row.name}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={row.is_active}
                    onChange={() => handleToggleChange(row)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{selectedItem?.name}</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="p-4">
          <p>Unique Code: {selectedItem?.unique_code}</p>
          {/* Add more content and styling as needed */}
        </div>
      </Dialog>
    </div>
  );
};

export default LinksList;
