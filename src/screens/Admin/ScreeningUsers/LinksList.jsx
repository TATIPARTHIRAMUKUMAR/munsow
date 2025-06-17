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
import GLOBAL_CONSTANTS from '../../../../GlobalConstants';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(10);

  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0); 
  };


  const history = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [screeningUsers, setScreeningUsers] = useState(null);
  const { linksList } = useSelector((state) => state?.data)

  const navigate = useNavigate();


  const handleClickOpen = async (item) => {
    setSelectedItem(item);

    const apiUrl = `${GLOBAL_CONSTANTS.backend_url}institution/screening_user_list?screening_code=${item.unique_code}`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GLOBAL_CONSTANTS?.token}`
    };
    const fetchOptions = {
      method: 'GET',
      headers: headers
    };
    try {
      const response = await fetch(apiUrl, fetchOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("d", data)
      setScreeningUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
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

  const handleCopyToClipboard = (text, rowId, uniqueCode) => {
    navigator.clipboard.writeText(text);
    setCopiedRows(prevState => ({ ...prevState, [rowId]: true }));
    setTimeout(() => {
      setCopiedRows(prevState => ({ ...prevState, [rowId]: false }));
    }, 10000);
  };

  // console.log(linksList, "listt")
  const LinksCount = linksList ? linksList.length : 0;

  const exportToExcel = () => {
    // Extracting data from the linksList array
    const data = linksList?.map(row => [
      row.name,
      row.description,
      row.max_capacity,
      new Date(row.activation_date).toLocaleDateString(),
      new Date(row.expiry_date).toLocaleDateString(),
      row.is_active ? "Active" : "Inactive",
      `https://munsow.vercel.app/studentRegistration/${row.unique_code}`,
    ]);

    // Adding headers to the data
    const headers = ['Name', 'Description', 'Max Capacity', 'Activation Date', 'Expiry Date', 'Status', 'Link'];
    data.unshift(headers);

    // Convert the data to Excel sheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LinksList');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'LinksList.xlsx');
  };

  const exportDetailsToExcel = () => {
    const data = screeningUsers?.data?.map(row => [
      row.name,
      row.email,
      row.phone_number,
      row.address,
      row.branch_name,
      row.course_name,
      row.department_name,
      row.avg_score,
    ]);

    const headers = ['Name', 'Email', 'Phone Number', 'Address', 'Branch Name', 'Course Name', 'Department Name', 'Average Score'];
    data.unshift(headers);
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LinkUsersDetails');
    XLSX.writeFile(workbook, 'LinkUsersDetails.xlsx');
  };


  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 mt-3 mb-8">
        <span className="text-2xl font-semibold">Generated Links List</span>
        {/* <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
          Export as Excel
        </button> */}
        <div className='flex flex-col md:flex-row gap-3 md:gap-6'>
          <Button
            variant="contained"
            color="primary"
            style={{ background: '#2BE2D0', color: "#252525" }}
            onClick={exportToExcel}
            className="top-0 right-0"
          >
            Export as Excel

            <DownloadForOfflineIcon fontSize="medium" style={{ marginLeft: "4px" }} />

          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ background: '#2BE2D0', color: "#252525" }}
            onClick={handleCreateLink}
            className="top-0 right-0"
          >
            Create Link
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="customized table" id="links-list-table">
          <TableHead
            style={{ backgroundColor: "#F0F0F0" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Max Capacity</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Activation Date</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Expiry Date</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Get Link</TableCell>
              <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {linksList?.length > 0 ? (
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
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.name}</TableCell>
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.description}</TableCell>
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.max_capacity}</TableCell>
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.activation_date).toLocaleDateString()}</TableCell>
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.expiry_date).toLocaleDateString()}</TableCell>
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
                        <IconButton onClick={() => handleCopyToClipboard(`https://munsow.vercel.app/studentRegistration/${row.unique_code}`, row.id, row.unique_code)}>
                          {copiedRows[row.id] ? <FileCopyIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                        {/* <IconButton onClick={() => navigate(`/studentRegistration/${row.unique_code}`, row.id)}>
                          {copiedRows[row.id] ? <FileCopyIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton> */}
                      </Tooltip>
                    </TableCell>
                    <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>
                      <IconButton >
                          {open ? <VisibilityOffIcon sx={{ fontSize: 30 }} /> : <VisibilityIcon sx={{ fontSize: 30 }} />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
      <Dialog open={open} onClose={handleClose} maxWidth="xl"
            BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }} 

      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold">Link : <span style={{ color: "#2BE2D0" }}>{selectedItem?.name}</span> Users</h2>       
          </div>
          <div className='flex items-center gap-10'>
            <Button
              variant="contained"
              color="primary"
              style={{ background: '#2BE2D0', color: "#252525" }}
              onClick={exportDetailsToExcel}
              className="top-0 right-0 my-0"
            >
              Export as Excel
              <DownloadForOfflineIcon fontSize="medium" style={{ marginLeft: "4px" }} />
            </Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          
        </div>
        <div className="p-4">
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead
                style={{ backgroundColor: "#F0F0F0" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Phone Number</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Address</TableCell>
                  {/* Conditionally render Branch, Course, and Department fields based on entityType */}
                  {selectedItem?.entity_type === 'institution' && (
                    <>
                      <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Branch Name</TableCell>
                      <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Course Name</TableCell>
                      <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Department Name</TableCell>
                    </>
                  )}                 
                  <TableCell style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}>Average Score</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
              {screeningUsers?.data?.slice(page * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell >
                      {row.name}
                    </TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone_number}</TableCell>
                    <TableCell >{row.address}</TableCell>
                    {/* Conditionally render Branch, Course, and Department data based on entityType */}
                    {selectedItem?.entity_type === 'institution' && (
                      <>
                        <TableCell >{row.branch_name}</TableCell>
                        <TableCell >{row.course_name}</TableCell>
                        <TableCell >{row.department_name}</TableCell>
                      </>
                    )}
                    <TableCell >{row.avg_score}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              <TablePagination
                component="div"
                count={screeningUsers?.meta?.total_records || 0}
                page={page1}
                onPageChange={handleChangePage1}
                rowsPerPage={rowsPerPage1}
                onRowsPerPageChange={handleChangeRowsPerPage1}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
              />
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

export default LinksList;