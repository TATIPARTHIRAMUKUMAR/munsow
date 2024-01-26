import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <Checkbox ref={resolvedRef} {...rest} />
    );
});

const AssignUsers = ({ selectedRows, setSelectedRows, courseData, setCourseData }) => {
    const { studentsList } = useSelector(state => state?.data);
    const [data, setData] = useState(studentsList?.data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = useMemo(
        () => [
            {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => (
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                ),
            },
            { Header: 'ID', accessor: 'id' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Phone Number', accessor: 'phone_number' },
            { Header: 'Department', accessor: 'department_name' },
            { Header: 'Course', accessor: 'course_name' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page: tablePage,
        prepareRow,
        state: { selectedRowIds },
        setPageSize,
        gotoPage,
    } = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        usePagination,
        useRowSelect
    );

    useEffect(() => {
        // Map the indices from selectedRowIds to actual row data
        const selectedDataRows = Object?.keys(selectedRowIds)
            .filter(key => selectedRowIds[key])
            .map(key => data[parseInt(key, 10)]);

        // Extract IDs from these rows
        const selectedIds = selectedDataRows?.map(row => row.id);
        setSelectedRows(selectedIds);
        console.log("Selected Rows IDs:", selectedIds, courseData);
    }, [selectedRowIds, data, setSelectedRows]);

    const AssignUsers = () => {

        const selectedDataRows = Object.keys(selectedRowIds)
            .filter(key => selectedRowIds[key])
            .map(key => data[parseInt(key, 10)]);

        const selectedIds = selectedDataRows.map(row => row.id);
        setSelectedRows(selectedIds);
        
        console.log("Selected Rows IDs:", selectedIds, courseData);

    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPageSize(newRowsPerPage);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup?.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {tablePage.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AssignUsers;
