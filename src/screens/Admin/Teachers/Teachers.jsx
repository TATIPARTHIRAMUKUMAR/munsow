
import XLSX from 'xlsx/dist/xlsx.full.min.js';

import { useMemo, useCallback, useEffect, useState, useRef } from "react";
import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { loadBrachList, loadDepartmentList, loadTeachersList } from "../../../redux/action";
import Pagination from "../../../Components/Pagination";
import { Autocomplete, TextField } from "@mui/material";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import EditTeachersModal from "./EditTeachersModal";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '70%',
  borderRadius: 4,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    align: 'start',
    // minWidth: 170 
    numeric: false,
  },
  { 
    id: 'branch',
    label: 'Branch',
    align: 'start',
    // minWidth: 100 
    numeric: false,
  },
  {
    id: 'course',
    label: 'Course',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
  {
    id: 'department',
    label: 'Department',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
  {
    label: "Status",
    id: "status",
    cellRenderer: ActionButtonCellRenderer,
    flex: 1,
  },
  {
    id: 'action',
    label: 'Actions',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
];

const Teachers = () => {
  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Delete Modal
  // const [openDelete, setOpenDelete] = React.useState(false);
  // const handleOpenDelete = () => setOpenDelete(true);
  // const handleCloseDelete = () => setOpenDelete(false);

  const [openDeleteIndex, setOpenDeleteIndex] = React.useState(null);
  const handleOpenDelete = (index) => {
    setOpenDeleteIndex(index);
  };
  
  const handleCloseDelete = () => {
    setOpenDeleteIndex(null);
  };
  


  const dispatch = useDispatch();
  const { teachersList, departmentList, branchList } = useSelector(state => state?.data)
  const [params, setParams] = useState({
    //   order_by:"",
    //   ASC:"",
    //   page_number:"",
    //   created_date:"",
    // limit:10,
    mode: "Teacher"
  })
  console.log(teachersList,'teacherList')

  // const containerStyle = useMemo(() => ({ width: "100%", height: "90%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    console.log("id :", id);
    // NEED TO DO API CALL BASED ON ID AND UPDATE ROWDATA
  };



  // const getRowHeight = useCallback(() => {
  //   return 45;
  // }, []);


  const onSortChanged = ({ api: { sortController } }) => {
    const sortModel = sortController.getSortModel()
    console.log(sortModel);
    if (sortModel?.length)
      setParams(prev => (
        {
          ...prev,
          column_name: sortModel[0]?.colId === "name" ? "first_name" : sortModel[0].colId,
          order_by: sortModel[0].sort?.toUpperCase()
        }
      )
      );
  };

  useEffect(() => {
    dispatch(loadDepartmentList())
    dispatch(loadBrachList())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadTeachersList(params));
  }, [dispatch, params])

  console.log(branchList,'branchList')
  console.log(departmentList,'departementList')
  //count for number of data to count total rows
  const teacherCount = teachersList.data ? teachersList.data.length : 0;
  console.log(teacherCount,'teacherCount')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    // Extracting data from the teachersList array
    const data = teachersList?.data?.map(row => [
      row.name,
      row.branch_name,
      row.course_name,
      row.department_name,
    ]);
  
    // Adding headers to the data
    const headers = ['Name', 'Branch', 'Course', 'Department'];
    data.unshift(headers);
  
    // Convert the data to Excel sheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
  
    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Teachers');
  
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'teachers.xlsx');
  };
  

  return (
    <>
    <div class="flex justify-end" style={{backgroundColor: "white", marginTop: "3px", padding:"16px"}}>
      <button onClick={exportToExcel} class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded flex items-center">
        Export as Excel<DownloadForOfflineIcon fontSize='medium' style={{marginLeft:"4px"}}/>
    </button>
    </div>
      <Paper sx={{ width: '100%', mb: 2,}}>
        <TableContainer>
          <Table id="teachers-table">
            <TableHead
              style={{ backgroundColor: "#F8F8F8" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold", backgroundColor: '#F0F0F0', color: 'black' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teachersList?.data && teachersList.data.length > 0 ? (
                teachersList.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      // role="checkbox"
                      // tabIndex={-1}
                      // key={row.code}
                      style={{ borderBottom: '1px solid rgb(224 224 224)' }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.branch_name}</TableCell>
                      <TableCell>{row.course_name}</TableCell>
                      <TableCell>{row.department_name}</TableCell>
                      <TableCell>
                        <ActionButtonCellRenderer deleteHandler={deleteHandler} node={{ data: row }} />
                      </TableCell>
                      <TableCell padding="none">
                        <Stack direction="row" spacing={0}>
                          <EditTeachersModal
                            teacherId={index}
                            teacherName={row.name} />

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
                              <Button variant="contained" color="error" endIcon={<DeleteIcon />}>
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
                  <TableCell colSpan={5} align="center">
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
          count={teacherCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </>
  );
};

export default Teachers;