import XLSX from 'xlsx/dist/xlsx.full.min.js';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, IconButton, Switch, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkUsers, loadLinks, updateLinkStatus } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy'; 
import TablePagination from '@mui/material/TablePagination';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const LinksList = () => {

  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  const history = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [screeningUsers, setScreeningUsers] = useState(null);
  const { linksList } = useSelector((state) => state?.data)

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    dispatch(getLinkUsers(selectedItem.unique_code, (resp) => {
      setScreeningUsers(resp?.data)
    }))
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadLinks());
  }, [dispatch])

  const handleToggleChange = (link) => {
    dispatch(updateLinkStatus(link.unique_code, link.is_active ? "deactive" : "active", () => {
      dispatch(loadLinks());
    }))
  };

  const handleCreateLink = () => {
    history('/screeningUsers/createLink'); 
  };

  const [copiedRows, setCopiedRows] = useState({});

  const handleCopyToClipboard = (text, rowId) => {
    navigator.clipboard.writeText(text);
    setCopiedRows(prevState => ({...prevState, [rowId]: true }));
    setTimeout(() => {
      setCopiedRows(prevState => ({...prevState, [rowId]: false }));
    }, 10000);
  };

  console.log(linksList,"listt")
  const LinksCount = linksList ? linksList.length : 0;
  console.log(LinksCount,'LinksCount')


  // const exportToExcel = () => {
  //   const table = document.getElementById('links-list-table');
  
  //   // Create a copy of the table data
  //   const copiedTableData = Array.from(table.rows).map(row =>
  //     Array.from(row.cells).map(cell => cell.textContent)
  //   );
  
  //   // Remove the last column from the copied table data
  //   const modifiedTableData = copiedTableData.map(row => row.slice(0, -1));
  
  //   // Convert the modified table data to Excel sheet
  //   const worksheet = XLSX.utils.aoa_to_sheet(modifiedTableData);
  
  //   // Create workbook and append the worksheet
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'LinksList');
  
  //   // Save the workbook as an Excel file
  //   XLSX.writeFile(workbook, 'LinksList.xlsx');
  // };

  const exportToExcel = () => {
    // Extracting data from the linksList array
    const data = linksList.map(row => [
      row.name,
      row.description,
      row.max_capacity,
      new Date(row.activation_date).toLocaleDateString(),
      new Date(row.expiry_date).toLocaleDateString(),
      row.is_active ? "Active" : "Inactive"
    ]);
  
    // Adding headers to the data
    const headers = ['Name', 'Description', 'Max Capacity', 'Activation Date', 'Expiry Date', 'Status'];
    data.unshift(headers);
  
    // Convert the data to Excel sheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
  
    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LinksList');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'LinksList.xlsx');
  };
  

  return (
    <div className="p-6">

      <div className="flex flex-row justify-between items-center mb-2">
        <span className="text-2xl font-semibold">Generated Links List</span>
        {/* <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
          Export as Excel
        </button> */}
        <div>
        <Button
          variant="contained"
          color="primary"
          style={{ background: '#2BE2D0', color: "#252525"}}
          onClick={exportToExcel}
          className="top-0 right-0 m-4"
        >
          Export as Excel
          
            <DownloadForOfflineIcon fontSize="medium" style={{marginLeft:"4px"}} /> 
          
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ background: '#2BE2D0', color: "#252525" }}
          onClick={handleCreateLink}
          className="top-0 right-0 m-4"
        >
          Create Link
        </Button>
        </div>
      </div>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="customized table" id="links-list-table">
          <TableHead 
            style={{ backgroundColor: "#F0F0F0"}}>
            <TableRow>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Name</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Description</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Max Capacity</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Activation Date</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Expiry Date</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Status</TableCell>
              <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Get Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {linksList.length > 0 ? (
                linksList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                // linksList.map((row, index) => (

                    <TableRow key={row.id}>
                    {/* <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" >
                      https://munsow-stg.vercel.app/studentRegistration/{row.name}
                      <Tooltip title={copiedRows[row.id] ? "Copied!" : "Copy to clipboard"}>
                      <IconButton onClick={() => handleCopyToClipboard(`https://munsow-stg.vercel.app/studentRegistration/${row.unique_code}`, row.id)}>
                        {copiedRows[row.id] ? <FileCopyIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                      </Tooltip>
                    </TableCell> */}
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.max_capacity}</TableCell>
                    <TableCell>{new Date(row.activation_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(row.expiry_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Switch
                        checked={row.is_active}
                        onChange={() => handleToggleChange(row)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      Copy
                      <Tooltip title={copiedRows[row.id] ? "Copied!" : "Copy to clipboard"}>
                      <IconButton onClick={() => handleCopyToClipboard(`https://munsow-stg.vercel.app/studentRegistration/${row.unique_code}`, row.id)}>
                        {copiedRows[row.id] ? <FileCopyIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                      </Tooltip>
                    </TableCell>
              </TableRow>
            ))
          ):(
            <TableRow>
              <TableCell colSpan={7} align="center">
                No data to show here yet.
              </TableCell>
            </TableRow>
          )
          }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={LinksCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </TableContainer>

      {/* this dialog box below is commented as of now beacuse it doesn't seemed like a complete functionality (it was opening on click of any tabel cell, have also removed that onclick function from each tabel data cell and style of blue color over hover) */}
      {/* <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Link : <span style={{ color: "#2BE2D0" }}>{selectedItem?.name}</span> Users</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="p-4">
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead 
                style={{ backgroundColor: "#F0F0F0" }}>
                <TableRow>
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Name</TableCell>
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Email</TableCell>
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Phone Number</TableCell>
                  {/* <TableCell>Address</TableCell> *
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Branch Name</TableCell>
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Course Name</TableCell>
                  <TableCell style={{fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Department Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {screeningUsers?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell >
                      {row.name}
                    </TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone_number}</TableCell>
                    {/* <TableCell >{row.address}</TableCell> *
                    <TableCell >{row.branch_name}</TableCell>
                    <TableCell >{row.course_name}</TableCell>
                    <TableCell >{row.department_name}</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog> */}
    </div>
  );
};

export default LinksList;
