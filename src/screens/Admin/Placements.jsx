// import React, { useEffect, useState } from 'react';
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, TablePagination,
//     TextField, IconButton
// } from '@mui/material';
// import { CloudUpload as CloudUploadIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadPlacementTracker, uploadConfigurations } from '../../redux/action';
// import GLOBAL_CONSTANTS from '../../../GlobalConstants';
// import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

// // Styled components using MUI and Tailwind
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     padding: theme.spacing(1),
// }));

// const CustomSelect = styled(Select)(({ theme }) => ({
//     '& .MuiSelect-select': {
//         padding: '8px 24px 8px 12px',
//         fontSize: '0.875rem',
//     },
//     '& .MuiSvgIcon-root': {
//         fontSize: '1.25rem',
//     }
// }));

// const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
//     fontSize: '0.875rem',
// }));

// const CustomButton = styled(Button)(({ theme }) => ({
//     fontSize: '0.875rem',
// }));

// const EnhancedTable = ({ data }) => {

//     const dispatch = useDispatch();

//     const { placementTracker, placementTrackermeta } = useSelector(state => state.data)

//     useEffect(() => {
//         dispatch(loadPlacementTracker());
//     }, [])
//     const studentCount = placementTracker ? placementTracker?.length : 0;

//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [filters, setFilters] = useState({
//         department: '',
//         placementStatus: '',
//         companyType: '',
//         offer: ''
//     });

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//     };

//     const handleFilterChange = (name) => (event) => {
//         setFilters({
//             ...filters,
//             [name]: event.target.value,
//         });
//     };

//     const filteredData = data && Array.isArray(data) ? data.filter(row =>
//         (!filters.department || row.department === filters.department) &&
//         (!filters.placementStatus || row.placementStatus === filters.placementStatus) &&
//         (!filters.companyType || row.companyType === filters.companyType) &&
//         (!filters.offer || row.offer === filters.offer)
//     ) : [];

//     const generateDownloadUrl = (mode) => {
//         // Add your logic to generate the download URL with the access token
//         const downloadUrl = `${GLOBAL_CONSTANTS.backend_url}institution/download_configurations?mode=placement_tracker&access_token=${GLOBAL_CONSTANTS?.token}`;
//         return downloadUrl;
//     };

//     const handleSelectFiles = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const base64Data = event.target.result.split(",")[1];
//             const payload = {
//                 mode: "placement_tracker",
//                 base64: base64Data
//             }
//             dispatch(uploadConfigurations(payload));
//         };
//         reader.readAsDataURL(file);
//     };

//     return (
//         <div className="p-4  rounded-lg">

//             <div className="flex justify-end space-x-7 my-4">
//                 <input type="file" style={{ display: 'none' }} id="upload-file" onChange={handleSelectFiles} />
//                 <Button ariant="outlined"
//                     size="small" style={{ background: '#2BE2D0', color: "#252525",paddingLeft:"15px" ,paddingRight:"15px",border:"1px solid gray" }} endIcon={<CloudUploadIcon />}
//                     onClick={() => document.getElementById('upload-file').click()}>
//                     Upload Template
//                 </Button>

//                 <a href={generateDownloadUrl()}>
//                     <Button
//                         style={{ background: '#2BE2D0', color: "#252525" }}
//                         endIcon={<CloudDownloadOutlinedIcon />}
//                         variant="outlined"
//                         size="small"
//                     >
//                         Download Template
//                     </Button>
//                 </a>
//             </div>

//             <TableContainer component={Paper}>
//                 <Table className="min-w-full divide-y divide-gray-200">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Student ID</StyledTableCell>
//                             <StyledTableCell>Name</StyledTableCell>
//                             <StyledTableCell>
//                                 <CustomSelect value={filters.department} onChange={handleFilterChange('department')} displayEmpty className="text-sm">
//                                     <CustomMenuItem value="">All Departments</CustomMenuItem>
//                                     <CustomMenuItem value="Computer Science">Computer Science</CustomMenuItem>
//                                     <CustomMenuItem value="Mechanical">Mechanical</CustomMenuItem>
//                                     <CustomMenuItem value="Civil Engineering">Civil Engineering</CustomMenuItem>
//                                 </CustomSelect>
//                             </StyledTableCell>
//                             <StyledTableCell>
//                                 <CustomSelect value={filters.placementStatus} onChange={handleFilterChange('placementStatus')} displayEmpty className="text-sm">
//                                     <CustomMenuItem value="">All Statuses</CustomMenuItem>
//                                     <CustomMenuItem value="Placed">Placed</CustomMenuItem>
//                                     <CustomMenuItem value="Not Placed">Not Placed</CustomMenuItem>
//                                 </CustomSelect>
//                             </StyledTableCell>
//                             <StyledTableCell>Company</StyledTableCell>
//                             <StyledTableCell>
//                                 <CustomSelect value={filters.companyType} onChange={handleFilterChange('companyType')} displayEmpty className="text-sm">
//                                     <CustomMenuItem value="">All Types</CustomMenuItem>
//                                     <CustomMenuItem value="Product">Product</CustomMenuItem>
//                                     <CustomMenuItem value="Service">Service</CustomMenuItem>
//                                     <CustomMenuItem value="MNC">MNC</CustomMenuItem>
//                                     <CustomMenuItem value="Startup">Startup</CustomMenuItem>
//                                 </CustomSelect>
//                             </StyledTableCell>
//                             <StyledTableCell>
//                                 <CustomSelect value={filters.offer} onChange={handleFilterChange('offer')} displayEmpty className="text-sm">
//                                     <CustomMenuItem value="">All Offers</CustomMenuItem>
//                                     <CustomMenuItem value="High to Low">High to Low</CustomMenuItem>
//                                     <CustomMenuItem value="Low to High">Low to High</CustomMenuItem>
//                                 </CustomSelect>
//                             </StyledTableCell>
//                             <StyledTableCell>Offer Type</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {placementTracker.map((row, index) => (
//                             <TableRow key={index}>
//                                 <StyledTableCell>{row.id}</StyledTableCell>
//                                 <StyledTableCell>{row.name}</StyledTableCell>
//                                 <StyledTableCell>{row.department_name}</StyledTableCell>
//                                 <StyledTableCell>{row.status}</StyledTableCell>
//                                 <StyledTableCell>{row.company_name}</StyledTableCell>
//                                 <StyledTableCell>{row.company_type}</StyledTableCell>
//                                 <StyledTableCell>{row.offer}</StyledTableCell>
//                                 <StyledTableCell>{row.offer_type}</StyledTableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={studentCount}
//                     page={page}
//                     onPageChange={handlePageChange}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                 />
//             </TableContainer>


//         </div>
//     );
// };

// export default EnhancedTable;




import XLSX from 'xlsx/dist/xlsx.full.min.js';
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useCallback, useEffect, useState } from "react";
// import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
// import { loadBrachList, loadDepartmentList, loadStudentList, user_delete } from "../../../redux/action";
// import Pagination from "../../../Components/Pagination";
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
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { CloudUpload as CloudUploadIcon, CloudDownload as CloudDownloadIcon } from '@mui/icons-material';

// import EditStudentsModal from "./EditStudentsModal";
import { loadPlacementTracker, uploadConfigurations } from '../../redux/action';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';

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
        id: 'department_name',
        label: 'Department Name',
        align: 'start',
        // minWidth: 100 
        numeric: false,
    },
    {
        id: 'status',
        label: 'Status',
        // minWidth: 170,
        align: 'start',
        numeric: false,
    },
    {
        id: 'company_name',
        label: 'Company Name',
        // minWidth: 170,
        align: 'start',
        numeric: false,
    },
    {
        id: 'company_type',
        label: 'Company Type',
        // minWidth: 170,
        align: 'start',
        numeric: true,
    },
    {
        id: 'offer',
        label: 'Offer',
        // minWidth: 170,
        align: 'start',
        numeric: true,
    },
    {
        id: 'offer_type',
        label: 'Offer Type',
        // minWidth: 170,
        align: 'start',
        numeric: false,
    },

];

const Placements = () => {

    //table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //delete modal
    const [openDeleteIndex, setOpenDeleteIndex] = React.useState(null);
    const handleOpenDelete = (index) => {
        setOpenDeleteIndex(index);
    };

    const handleCloseDelete = () => {
        setOpenDeleteIndex(null);
    };


    const dispatch = useDispatch();
    const { placementTracker } = useSelector(state => state?.data);
    const [params, setParams] = useState({
        //   order_by:"",
        //   ASC:"",
        //   page_number:"",
        //   created_date:"",
        limit: 10,
        mode: "Student"
    })
    console.log(placementTracker, 'placementTracker')

    useEffect(() => {
        dispatch(loadPlacementTracker(params))
    }, [dispatch, params])

    const studentCount = placementTracker.data ? placementTracker.data.length : 0;
    console.log(studentCount, 'studentCount')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const exportToExcel = () => {
        // Extracting data from the placementTracker array
        const data = placementTracker?.data?.map(row => [
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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Placements');

        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, 'students.xlsx');
    };


    // const [gridApi, setGridApi] = useState();
    // const [gridColsApi, setGridColsApi] = useState();


    const generateDownloadUrl = (mode) => {
        // Add your logic to generate the download URL with the access token
        const downloadUrl = `${GLOBAL_CONSTANTS.backend_url}institution/download_configurations?mode=placement_tracker&access_token=${GLOBAL_CONSTANTS?.token}`;
        return downloadUrl;
    };

    const handleSelectFiles = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target.result.split(",")[1];
            const payload = {
                mode: "placement_tracker",
                base64: base64Data
            }
            dispatch(uploadConfigurations(payload));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='p-5'>
            <div class="flex justify-end space-x-5" style={{ backgroundColor: "white", marginTop: "3px", padding: "16px" }}>

                <input type="file" style={{ display: 'none' }} id="upload-file" onChange={handleSelectFiles} />
                <Button ariant="outlined" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    size="small" endIcon={<CloudUploadIcon />}
                    onClick={() => document.getElementById('upload-file').click()}>
                    Upload Template
                </Button>

                <a href={generateDownloadUrl()}>
                    <Button
                        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        endIcon={<CloudDownloadOutlinedIcon />}
                        variant="outlined"
                        size="small"
                    >
                        Download Template
                    </Button>
                </a>
            </div>



            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table id="students-table">
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
                            {placementTracker?.data && placementTracker.data.length > 0 ? (
                                placementTracker.data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow
                                            hover
                                            style={{ borderBottom: '1px solid rgb(224 224 224)' }}
                                        >
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.department_name}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>{row.company_name}</TableCell>
                                            <TableCell>{row.company_type}</TableCell>
                                            <TableCell>{row.offer}</TableCell>
                                            <TableCell>{row.offer_type}</TableCell>

                                            <TableCell padding="none">




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
                    count={studentCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
        </div>
    );
};

export default Placements;