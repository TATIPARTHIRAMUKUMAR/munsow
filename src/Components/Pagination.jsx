import { TablePagination } from "@mui/material";
import { useState } from "react";

function Pagination(props) { 
  const { setParams,  meta_data } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setParams((prev) => ({
      ...prev,
      page_number: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    setParams((prev) => ({
      ...prev,
      page_number: 1,
      limit: parseInt(event.target.value, 10),
    }));
  };
  return (
    <div className="flex w-full justify-center items-center mt-2 rounded-lg ">
      <TablePagination
        rowsPerPageOptions={[1,5, 10, 25, 100]}
        component="div"
        className="flex justify-center items-center rounded-lg w-fit shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white "
        size="small"
        labelRowsPerPage={"Rows Per Page:"}
        count={meta_data?.total_records ?? 0}
        page={meta_data?.current_page - 1 ?? page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Pagination;
