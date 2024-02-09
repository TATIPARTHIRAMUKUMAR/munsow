
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

import { loadCourseList, loadInstitutionList, uploadUser, user_create } from "../../../redux/action";
// import { useDispatch, useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GLOBAL_CONSTANTS from "../../../../GlobalConstants";
import { toast } from "react-toastify";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
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

  //update form
  const { institutionList, courseList } = useSelector(state => state.data)
  const [fileData, setFileData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  //Delete Modal
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //Delete Modal
  const [openEdit, setOpenEdit] = React.useState(false);
  // const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTeacher(null);

  };
  const handleOpenEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenEdit(true);
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

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  //form************
  const formData = new FormData();
  formData.append("mode", "Teacher")
  // ref
  const input = useRef(null);

  // utils
  // const handleSelectFiles = (e) => {
  //   formData.append('file', e.currentTarget.files[0]);
  //   dispatch(uploadUser(formData))
  // };


  const [mainData, setMainData] = useState({});
  const userFeilds =
    [
      {
        label: "First Name",
        key: "first_name",
        value: mainData?.first_name ?? "",
        type: "text",
        required:true
      },
      {
        label: "Last Name",
        key: "last_name",
        value: mainData?.last_name ?? "",
        type: "text",
        required:true
      },
      {
        label: "Email",
        key: "email",
        value: mainData?.email ?? "",
        type: "text",
        required:true
      },
      {
        key: "phone_number",
        label: "Mobile Number",
        value: mainData?.mobile_number ?? "",
        type: "text",
        required:true
      },
      {
        label: "Address",
        key: "address",
        value: mainData?.address ?? "",
        type: "text",
        required:true
      },
      {
        label: "Password",
        key: "password",
        value: mainData?.password ?? "",
        type: "text",
        required:true
      },
      {
        label: "Branch",
        key: "branch",
        value: mainData?.branch ?? null,
        options: branchList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ?? [],
        type: "select",
        required:true
      },
      {
        label: "Course",
        key: "course",
        value: mainData?.course ?? null,
        type: "select",
        options: courseList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ?? [],
        required:true
      },
      {
        label: "Department",
        key: "department",
        value: mainData?.department ?? null,
        options: departmentList?.map((o) => ({ label: o?.name ?? "-", value: o?.id })) ?? [],
        type: "select",
        required:true
      },
    ]


  const handleInputChange = (key, value) => {
    let temp = { ...mainData }
    temp[key] = value;
    if (key == "branch") {
      dispatch(loadCourseList(`branch_id=${value?.value}`));
    } else if (key == "course") {
      dispatch(loadDepartmentList(`course_id=${value?.value}`));
    }
    setMainData(() => ({ ...temp }))
  }

  const handleSelectionError = (key, value) => {
    if (key == "course" && !mainData.branch) {
      toast.error(
        "Branch not selected",
        {
          autoClose: 2000,
        }
      );
    } else if (key == "department" && !mainData.course) {
      toast.error(
        "Course not selected",
        {
          autoClose: 2000,
        }
      );
    }
  }

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") && requiredFields.every((field) => mainData[field.key]!==undefined) 
    setIsFormValid(isValid);
  }, [mainData]);

  useEffect(() => {
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
    // dispatch(loadBrachList());
    // dispatch(loadInstitutionList());
    // dispatch(loadDepartmentList())

  }, [dispatch])


  useEffect(() => {
    console?.info(mainData, "--mainData")
  }, [mainData])

  const onHandleCreate = () => {
    const payload = {
      "first_name": mainData?.first_name,
      "last_name": mainData?.last_name,
      "email": mainData?.email,
      "phone_number": mainData?.mobile_number,
      "branch_id": mainData?.branch?.value,
      "department_id": mainData?.department?.value,
      "address": mainData?.address,
      "course_id": mainData?.course?.value,
      // "institution_id": mainData?.institution?.value,
      "password": mainData?.password
    }
    dispatch(user_create(payload, { mode: "teacher" }, () => { setMainData({}) }))
  }

  
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead
          style={{backgroundColor:"#F8F8F8"}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:"bold",backgroundColor:'#F0F0F0',color:'black' }}
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
                role="checkbox"
                tabIndex={-1}
                key={row.code}
                style={{ borderBottom: '1px solid rgb(224 224 224)' }}
            >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.branch_name}</TableCell>
                <TableCell>{row.course_name}</TableCell>
                <TableCell>{row.department_name}</TableCell>
                <TableCell padding="none">
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEdit(row)}>
                        <EditIcon sx={{ color: '#006db5' }} />
                    </IconButton>
                </Tooltip>
                <Modal
  open={openEdit}
  onClose={handleCloseEdit}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'#006db5',fontWeight:'bold'}}>
      Edit 
    </Typography>
    <hr></hr>
    <div className="grid grid-cols-2 gap-4 bg-white p-4" >
      {
        userFeilds?.map((o) => (
          <>
            {
              o?.type === "select" ?
                <>
                  <Autocomplete
                    size="small"
                    fullWidth
                    disablePortal
                    value={o?.value}
                    defaultValue={selectedTeacher ? selectedTeacher[o.key] : null} // Populate with selected teacher's data
                    id="combo-box-demo"
                    options={o?.options ?? []}
                    renderInput={(params) => <TextField {...params} label={(
                      <div>
                        {o?.label}
                        {o?.required && (
                          <span style={{ color: 'red' }}>*</span>
                        )}
                      </div>
                    )} />}
                    onChange={(e, value) => { handleInputChange(o?.key, value) }}
                    onClickCapture={(e, value) => {
                      handleSelectionError(o?.key, value);
                    }}
                  />
                </>
                :
                <TextField
                  key={o?.key}
                  type={o?.type}
                  label={(
                    <div>
                      {o?.label}
                      {o?.required && (
                        <span style={{ color: 'red' }}>*</span>
                      )}
                    </div>
                  )}
                  value={selectedTeacher ? selectedTeacher[o.key] : o.value} // Populate with selected teacher's data
                  size="small"
                  onChange={(e) => { handleInputChange(o?.key, e.target.value) }}
                />
            }
          </>
        )
        )
      }
    </div>
    <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{justifyContent:'end'}}>
      <Button onClick={handleCloseEdit} variant="outlined" style={{color:'#6c757d', border:'1px solid #6c757d'}}>
        CANCEL
      </Button>
      <Button  variant="contained" color="primary" endIcon={<EditIcon />}>
        UPDATE
      </Button>
    </Stack>
  </Box>
</Modal>

                <Tooltip title="Delete">
                    <IconButton onClick={handleOpenDelete}>
                        <DeleteIcon sx={{ color: '#d11a2a' }} />
                    </IconButton>
                </Tooltip>
                <Modal
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'#d11a2a',fontWeight:'bold'}}>
                    Delete
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    Are you sure you want to delete <span style={{fontWeight:'bold'}}>{row.name}</span>?
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{justifyContent:'end'}}>
                    <Button onClick={handleCloseDelete} variant="outlined" style={{color:'#6c757d', border:'1px solid #6c757d'}}>
                      CANCEL
                    </Button>
                    <Button  variant="contained" color="error" endIcon={<DeleteIcon />}>
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
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Teachers;
