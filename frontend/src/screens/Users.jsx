import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, Button, InputAdornment, Modal, Switch, TextField } from '@mui/material';
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { activateUser, deactivateUser, loadUserList, user_signup } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PasswordIcon from "@mui/icons-material/Password";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

export default function Users() {
  const dispatch = useDispatch();
  const {usersList} = useSelector((state)=>state?.data)
  const [open,setOpen] = useState(false);
  const [loginData, setLoginData] = useState({});

  const onLogingChange = (key, value) => {
    console.log(key, value);
    let temp = { ...loginData };
    temp[key] = value;
    setLoginData(() => ({ ...temp }));
  };

  const onSignUp = () => {
    const payload = {
      username: loginData?.user_name,
      password: loginData?.password,
      email:loginData?.email,
      institution:loginData?.institution,
      role:loginData?.role?.label
    };
    dispatch(user_signup(payload, () => { dispatch(loadUserList());setOpen(false)}));
  };

  useEffect(()=>{
    dispatch(loadUserList())
  },[])

  const handleChange = (id,value) => {
    if(value)
    dispatch(activateUser(id,()=>{dispatch(loadUserList())}));
    else
    dispatch(deactivateUser(id,()=>{dispatch(loadUserList())}));

  };

  return (
    <div className='grid gap-4 p-4'>
<div className='' >
<Button variant='contained' color='secondary' onClick={()=>{setOpen(true)}} > Create User </Button>
</div>
<div className='' >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{background:"linear-gradient(1deg,#1c85ce40 30%, #5271ff50)"}} >
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="">Email</TableCell>
            <TableCell align="">Institution</TableCell>
            <TableCell align="">Role</TableCell>
            <TableCell align="">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.username}
              </TableCell>
              <TableCell align="">{row?.email}</TableCell>
              <TableCell align="">{row?.institution}</TableCell>
              <TableCell align="">{row?.role_id === 1 ? "Admin" : row?.role_id === 2 ? "Teacher" : "Student"}</TableCell>
              <TableCell align="">
                <Switch
                  color='secondary'
                  checked={row?.is_active}
                  onChange={(e)=>handleChange(row?.id,e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    {open && (
          <Modal
            open={open}
            onClose={()=>{setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setOpen(false)
              }}
            >
              <Box
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "20px 30px",
                  width:"calc(min(400px,100%))"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >

                <Box style={{display:"flex",justifyContent:"end"}} >
              <ClearSharpIcon color='secondary' style={{cursor:"pointer"}} onClick={()=>{setOpen(false)}}  />
                </Box>

              <div className="grid gap-4 ">
              <TextField
                value={loginData?.user_name}
                id="standard-basic"
                label="User Name"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) =>
                  onLogingChange("user_name", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                value={loginData?.email}
                id="standard-basic"
                label="Email"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) =>
                  onLogingChange("email", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlinedIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                value={loginData?.password}
                id="standard-basic"
                label="Password"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) =>
                  onLogingChange("password", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
                type="password"
              />

              <TextField
                value={loginData?.institution}
                id="standard-basic"
                label="Institution"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) =>
                  onLogingChange("institution", event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessOutlinedIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />

              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                variant="standard"
                style={{ width: "100%" }}
                options={[
                  { label: "Student", value: 1 },
                  { label: "Teacher", value: 2 },
                  { label: "Admin",   value: 3 },
                ]}
                sx={{ width: 300 }}
                onChange={(_, value) => onLogingChange("role", value)}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    {...params}
                    label="Select Role"
                  />
                )}
              />
              <div className='flex justify-end gap-x-4' >
                <Button size="small" variant='outlined' color='secondary' onClick={()=>{setOpen(false)}}  > Cancel </Button>
                <Button size="small" variant='contained' color='secondary' onClick={()=>onSignUp()}> Create </Button>
              </div>
            </div>

              </Box>
            </Box>
          </Modal>
        )}

</div>

  );
}