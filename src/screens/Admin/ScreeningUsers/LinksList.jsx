import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadLinks } from '../../../redux/action';

const LinksList = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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


  const data= [
    {
        "activation_date": "Fri, 01 Jan 2021 00:00:00 GMT",
        "created_by": 48,
        "created_date": "2024-02-10 21:16:53.724076",
        "description": "xxxxxxxxxxxxxxxxxxxxxxxxx",
        "expiry_date": "Tue, 30 Dec 2025 00:00:00 GMT",
        "id": 1,
        "is_active": true,
        "max_capacity": 10,
        "name": "Test-1",
        "unique_code": "6a32fb7b-1c0d-4b09-a097-c2efcce30a30",
        "updated_by": 48,
        "updated_date": "2024-02-10 21:16:53.724076"
    },
    {
        "activation_date": "Fri, 01 Jan 2021 00:00:00 GMT",
        "created_by": 48,
        "created_date": "2024-02-10 21:38:21.256136",
        "description": "xxxxxxxxxxxxxxxxxxxxxxxxx",
        "expiry_date": "Tue, 30 Dec 2025 00:00:00 GMT",
        "id": 2,
        "is_active": true,
        "max_capacity": 10,
        "name": "Test-1",
        "unique_code": "71bb6ea2-f36f-45b1-a932-b07362500a8c",
        "updated_by": 48,
        "updated_date": "2024-02-10 21:38:21.256136"
    }
]


  return (
    <div className="p-4">
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>Activation Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Max Capacity</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50 transition duration-300">
                <TableCell>{new Date(row.activation_date).toLocaleDateString()}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{new Date(row.expiry_date).toLocaleDateString()}</TableCell>
                <TableCell>{row.max_capacity}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>
                  {row.name}
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
