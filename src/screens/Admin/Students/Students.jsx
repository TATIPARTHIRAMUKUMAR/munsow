import { useMemo, useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { loadBrachList, loadDepartmentList, loadStudentList, user_delete } from "../../../redux/action";
import Pagination from "../../../Components/Pagination";
import { Autocomplete, TextField } from "@mui/material";

const Students = () => {

  const dispatch = useDispatch();
  const { studentsList, departmentList, branchList } = useSelector(state => state?.data);
  const [params, setParams] = useState({
    //   order_by:"",
    //   ASC:"",
    //   page_number:"",
    //   created_date:"",
    limit:10,
    mode: "Student"
  })

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    console.log("id :", id, act);
    dispatch(user_delete({ user_id: id }, () => {
      dispatch(loadStudentList(params))
    }))
    // NEED TO DO API CALL BASED ON ID AND UPDATE ROWDATA
  };

  const headCells = [
    {
      "field": "name",
      "headerName": "Name",
      "resizable": true,
      "sortable": true,
      "flex": 1
    },
    {
      "field": "department_name",
      "headerName": "Department",
      "resizable": true,
      // "sortable": true,
      "flex": 1
    },
    {
      "field": "branch_name",
      "headerName": "Branch",
      "resizable": true,
      // "sortable": true,
      "flex": 1
    },
    {
      "field": "no_of_interviews",
      "headerName": "# of Interviews",
      "resizable": true,
      "sortable": true,
      "flex": 1
    },
    {
      "field": "avg_score",
      "headerName": "Avg Score",
      "resizable": true,
      // "sortable": true,
      "flex": 1
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionButtonCellRenderer,
      cellRendererParams: { deleteHandler },
      flex: 1,
    },
  ]

  const getRowHeight = useCallback(() => {
    return 45;
  }, []);

  useEffect(() => {
    dispatch(loadDepartmentList())
    dispatch(loadBrachList())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadStudentList(params))
  }, [dispatch, params])


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

  const [gridApi, setGridApi] = useState();
  const [gridColsApi, setGridColsApi] = useState();
  return (
    <div className="flex-grow-1 p-5 h-[100vh] " >
      <div className="ag-theme-alpine grid gap-4">
        {/* <div className="flex gap-4 py-3">
          <Autocomplete
            size="small"
            sx={{ width: "300px" }}
            disablePortal
            id="combo-box-demo"
            options={departmentList?.map(o => ({ label: o?.name ?? "", value: o?.id })) ?? []}
            renderInput={(params) => <TextField {...params} label="Filter by Department" />}
            onChange={(e, value) => { setParams((prev) => ({ ...prev, department_name: value?.label })) }}
          />
          <Autocomplete
            size="small"
            sx={{ width: "300px" }}
            disablePortal
            id="combo-box-demo"
            options={branchList?.map(o => ({ label: o?.name ?? "", value: o?.id })) ?? []}
            renderInput={(params) => <TextField {...params} label="Filter by Branch" />}
            onChange={(e, value) => { setParams((prev) => ({ ...prev, branch_name: value?.label })) }}
          />
        </div> */}
        <AgGridReact // resizable, sortable
          rowData={studentsList?.data?.map(o => ({ 
            ...o, 
            // name: `${o?.first_name} ${o?.last_name}`,
           }))}
          columnDefs={headCells}
          domLayout='autoHeight'
          pagination={false}
          getRowHeight={getRowHeight}
          onGridReady={params => {
            setGridApi(params.api);
            setGridColsApi(params.columnApi);
          }}
          onSortChanged={onSortChanged}
        />
        <Pagination setParams={setParams} meta_data={studentsList?.metadata} />

      </div>
    </div>
  );
};

export default Students;
