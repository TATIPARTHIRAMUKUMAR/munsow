import { useMemo, useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { loadBrachList, loadDepartmentList, loadTeachersList } from "../../../redux/action";
import Pagination from "../../../Components/Pagination";
import { Autocomplete, TextField } from "@mui/material";

const Teachers = () => {



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

  const containerStyle = useMemo(() => ({ width: "100%", height: "90%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    console.log("id :", id);
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
  return (
    <div className="flex-grow-1 p-5 h-[100vh] " >
      <div className="ag-theme-alpine grid gap-4">
        <div className="flex gap-4 py-3">
          <Autocomplete
            size="small"
            sx={{ width: "300px" }}
            disablePortal
            id="combo-box-demo"
            options={departmentList?.map(o => ({ label: o?.name ?? "", value: o?.id })) ?? []}
            renderInput={(params) => <TextField {...params} label="Filter by Department" />}
            onChange={(e, value) => { setParams((prev) => ({ ...prev, department_id: value?.value })) }}
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
        </div>
        <AgGridReact
          rowData={teachersList?.data?.map(o => ({ ...o }))}
          columnDefs={headCells}
          domLayout='autoHeight'
          pagination={false}
          getRowHeight={getRowHeight}
          onSortChanged={onSortChanged}

        />
        <Pagination setParams={setParams} meta_data={teachersList?.metadata} />

      </div>
    </div>
  );
};

export default Teachers;
