
import XLSX from 'xlsx/dist/xlsx.full.min.js';
// // import { AgGridReact } from "ag-grid-react";

// // import "ag-grid-community/styles/ag-grid.css";
// // import "ag-grid-community/styles/ag-theme-alpine.css";
// import { useMemo, useCallback, useEffect, useState } from "react";
// import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
// import { useDispatch, useSelector } from "react-redux";
// import { loadBrachList, loadDepartmentList, loadStudentList, user_delete } from "../../../redux/action";
// import Pagination from "../../../Components/Pagination";
// import { Autocomplete, TextField } from "@mui/material";

// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Stack from '@mui/material/Stack';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import TableSortLabel from '@mui/material/TableSortLabel';

// import EditStudentsModal from "./EditStudentsModal";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   // width: '70%',
//   borderRadius: 4,
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const columns = [
//   { 
//     id: 'name', 
//     label: 'Name', 
//     align: 'start',
//     // minWidth: 170 
//     numeric: false,
//   },
//   { 
//     id: 'branch',
//     label: 'Branch',
//     align: 'start',
//     // minWidth: 100 
//     numeric: false,
//   },
//   {
//     id: 'course',
//     label: 'Course',
//     // minWidth: 170,
//     align: 'start',
//     numeric: false,
//   },
//   {
//     id: 'department',
//     label: 'Department',
//     // minWidth: 170,
//     align: 'start',
//     numeric: false,
//   },
//   {
//     id: 'interviews',
//     label: 'No of Interviews',
//     // minWidth: 170,
//     align: 'start',
//     numeric: true,
//   },
//   {
//     id: 'avgscore',
//     label: 'Average Score',
//     // minWidth: 170,
//     align: 'start',
//     numeric: true,
//   },
//   {
//     id: 'action',
//     label: 'Actions',
//     // minWidth: 170,
//     align: 'start',
//     numeric: false,
//   },
// ];

// const Students = () => {

//   //table
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [orderBy, setOrderBy] = useState('name');
//   const [order, setOrder] = useState('asc');

//   const handleSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     console.log('?? ', isAsc)
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   //delete modal
//   const [openDeleteIndex, setOpenDeleteIndex] = useState(null);
//   const handleOpenDelete = (index) => {
//     setOpenDeleteIndex(index);
//   };
  
//   const handleCloseDelete = () => {
//     setOpenDeleteIndex(null);
//   };
  

//   const dispatch = useDispatch();
//   const { studentsList, departmentList, branchList } = useSelector(state => state?.data);
//   const [params, setParams] = useState({
//     //   order_by:"",
//     //   ASC:"",
//     //   page_number:"",
//     //   created_date:"",
//     limit: 10,
//     mode: "Student",
//     // column_name: orderBy,
//     // order_by: order
//   })
//   useEffect(() => {
//     if (orderBy && order) {
//       setParams(prevParams => ({
//         ...prevParams,
//         column_name: orderBy,
//         order_by: order
//       }));
//     }
//   }, [orderBy, order]);
//   console.log(studentsList,'studentsList')

//   const deleteHandler = (act) => {
//     const { data = {} } = act;
//     const { id } = data;
//     console.log("id :", id, act);
//     dispatch(user_delete({ user_id: id }, () => {
//       dispatch(loadStudentList(params))
//     }))
//     // NEED TO DO API CALL BASED ON ID AND UPDATE ROWDATA
//   };

//   const getRowHeight = useCallback(() => {
//     return 45;
//   }, []);

//   useEffect(() => {
//     dispatch(loadDepartmentList())
//     dispatch(loadBrachList())
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(loadStudentList(params))
//   }, [dispatch, params])


//   const onSortChanged = ({ api: { sortController } }) => {
//     const sortModel = sortController.getSortModel()
//     console.log(sortModel);
//     if (sortModel?.length)
//       setParams(prev => (
//         {
//           ...prev,
//           column_name: sortModel[0]?.colId === "name" ? "first_name" : sortModel[0].colId,
//           order_by: sortModel[0].sort?.toUpperCase()
//         }
//       )
//       );
//   };

//   const studentCount = studentsList.data ? studentsList.data.length : 0;
//   console.log(studentCount,'studentCount')

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const exportToExcel = () => {
//     // Extracting data from the studentsList array
//     const data = studentsList?.data?.map(row => [
//       row.name,
//       row.branch_name,
//       row.course_name,
//       row.department_name,
//       row.no_of_interviews,
//       row.avg_score,
//     ]);
  
//     // Adding headers to the data
//     const headers = ['Name', 'Branch', 'Course', 'Department', 'No of Interviews', 'Average Score'];
//     data.unshift(headers);
  
//     // Convert the data to Excel sheet
//     const worksheet = XLSX.utils.aoa_to_sheet(data);
  
//     // Create workbook and append the worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
//     // Save the workbook as an Excel file
//     XLSX.writeFile(workbook, 'students.xlsx');
//   };
  

//   // const [gridApi, setGridApi] = useState();
//   // const [gridColsApi, setGridColsApi] = useState();

//   return (
//     <>
//       <div className="flex justify-end" style={{ backgroundColor: "white", marginTop: "3px", padding: "16px" }}>
//         
//       </div>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <TableContainer>
//           <Table id="students-table">
//             <TableHead
//               style={{ backgroundColor: "#F8F8F8" }}>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth, fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === column.id}
//                       direction={orderBy === column.id ? order : 'asc'}
//                       onClick={() => handleSort(column.id)}
//                     >
//                       {column.label}
//                     </TableSortLabel>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {studentsList?.data && studentsList.data.length > 0 ? (
//                 studentsList.data
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => (
//                     <TableRow
//                       hover
//                       // role="checkbox"
//                       // tabIndex={-1}
//                       // key={row.code}
//                       style={{ borderBottom: '1px solid rgb(224 224 224)' }}
//                     >
//                       <TableCell>{row.name}</TableCell>
//                       <TableCell>{row.branch_name}</TableCell>
//                       <TableCell>{row.course_name}</TableCell>
//                       <TableCell>{row.department_name}</TableCell>
//                       <TableCell>{row.no_of_interviews}</TableCell>
//                       <TableCell>{row.avg_score}</TableCell>
//                       <TableCell padding="none">
//                         {/* <Tooltip title="Edit">
//                     <IconButton onClick={() => handleOpenEdit(row)}>
//                         <EditIcon sx={{ color: '#006db5' }} />
                        
//                     </IconButton>
//                 </Tooltip>
//                  */}
//                         <Stack direction="row" spacing={0}>
//                           <EditStudentsModal
//                             studentId={index}
//                             studentName={row.name} />

//                           <Tooltip title="Delete">
//                             <IconButton onClick={() => handleOpenDelete(index)}>
//                               <DeleteIcon sx={{ color: '#d11a2a' }} />
//                             </IconButton>
//                           </Tooltip>
//                         </Stack>

//                         <Modal
//                           open={openDeleteIndex === index}
//                           onClose={handleCloseDelete}
//                           aria-labelledby="modal-modal-title"
//                           aria-describedby="modal-modal-description"
//                         >
//                           <Box sx={style}>
//                             <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#d11a2a', fontWeight: 'bold' }}>
//                               Delete
//                             </Typography>
//                             <Typography id="modal-modal-description" sx={{ mt: 0 }}>
//                               Are you sure you want to delete <span style={{ fontWeight: 'bold' }}> {row.name}</span>?
//                             </Typography>
//                             <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{ justifyContent: 'end' }}>
//                               <Button onClick={handleCloseDelete} variant="outlined" style={{ color: '#6c757d', border: '1px solid #6c757d' }}>
//                                 CANCEL
//                               </Button>
//                               <Button variant="contained" color="error" endIcon={<DeleteIcon />}>
//                                 DELETE
//                               </Button>
//                             </Stack>
//                           </Box>
//                         </Modal>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     No data to show here yet.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>

//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={studentCount}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageC


import * as React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadBrachList, loadDepartmentList, loadStudentList, user_delete } from "../../../redux/action";
import { Autocomplete, Button, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EditIcon from '@mui/icons-material/Edit';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import FilterListIcon from '@mui/icons-material/FilterList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    align: 'left',
    numeric: false,
  },
  { 
    id: 'branch',
    label: 'Branch',
    align: 'left',
    numeric: false,
  },
  {
    id: 'course',
    label: 'Course',
    align: 'left',
    numeric: false,
  },
  {
    id: 'department',
    label: 'Department',
    align: 'left',
    numeric: false,
  },
  {
    id: 'interviews',
    label: 'No of Interviews',
    align: 'left',
    numeric: true,
  },
  {
    id: 'avgscore',
    label: 'Average Score',
    align: 'left',
    numeric: true,
  },
  {
    id: 'action',
    label: 'Actions',
    align: 'left',
    numeric: false,
  },
];

const Students = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [openDeleteIndex, setOpenDeleteIndex] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  let { studentsList, departmentList, branchList } = useSelector(state => state?.data);

  useEffect(() => {
    dispatch(loadDepartmentList());
    dispatch(loadBrachList());
    dispatch(loadStudentList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(studentsList?.data || []);
  }, [studentsList]);

  const handleSort = (property) => {
    console.log("Sorting by property:", property);
    console.log("Current order:", order);
    console.log("Current orderBy:", orderBy);

    const isAsc = orderBy === property && order === 'asc';
    console.log("Is ascending?", isAsc);

    const sortedData = [...studentsList.data].sort((a, b) => {
      if (isAsc) {
          return a[property] > b[property] ? 1 : -1;
      } else {
          return a[property] < b[property] ? -1 : 1;
      }
    });
    console.log("Sorted data:", sortedData);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setFilteredData(sortedData);
    
    
};


  const handleOpenDelete = (index) => {
    setOpenDeleteIndex(index);
  };

  const handleCloseDelete = () => {
    setOpenDeleteIndex(null);
  };

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    dispatch(user_delete({ user_id: id }, () => {
      dispatch(loadStudentList())
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const data = filteredData.map(row => [
      row.name,
      row.branch_name,
      row.course_name,
      row.department_name,
      row.no_of_interviews,
      row.avg_score,
    ]);
  
    // Adding headers to the data
    const headers = ['Name', 'Branch', 'Course', 'Department', 'No of Interviews', 'Average Score'];
    data.unshift(headers);
  
    // Convert the data to Excel sheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
  
    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'students.xlsx');
  };

  return (
    <>
      <div className="flex justify-end" style={{ backgroundColor: "white", marginTop: "3px", padding: "16px" }}>
      <Button
        onClick={exportToExcel}
        variant="contained"
        color="primary"
        startIcon={<DownloadForOfflineIcon />}
        sx={{
          bgcolor: '#10B981',
          '&:hover': {
            bgcolor: '#059669',
          },
        }}
      >
        Export as Excel
      </Button>
      </div>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table id="students-table">
            <TableHead style={{ backgroundColor: "#F8F8F8" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData && filteredData?.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      key={row.name}
                      style={{ borderBottom: '1px solid rgb(224 224 224)' }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.branch_name}</TableCell>
                      <TableCell>{row.course_name}</TableCell>
                      <TableCell>{row.department_name}</TableCell>
                      <TableCell>{row.no_of_interviews}</TableCell>
                      <TableCell>{row.avg_score}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0}>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon sx={{ color: '#006db5' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleOpenDelete(index)}>
                              <DeleteIcon sx={{ color: '#d11a2a' }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        <Modal
                          open={openDeleteIndex === index}
                          onClose={handleCloseDelete}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#d11a2a', fontWeight: 'bold' }}>
                              Delete
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                              Are you sure you want to delete <span style={{ fontWeight: 'bold' }}> {row.name}</span>?
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{ justifyContent: 'end' }}>
                              <Button onClick={handleCloseDelete} variant="outlined" style={{ color: '#6c757d', border: '1px solid #6c757d' }}>
                                CANCEL
                              </Button>
                              <Button variant="contained" color="error" onClick={() => deleteHandler({ data: row })}>
                                DELETE
                              </Button>
                            </Stack>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data to show here yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={studentsList?.data ? studentsList.data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

    </>
  );
};

export default Students;

