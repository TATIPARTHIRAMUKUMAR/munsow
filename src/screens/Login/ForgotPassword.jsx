import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { forgot_password } from '../../redux/action';
import GLOBAL_CONSTANTS from "../../../GlobalConstants";

const style = {
    position: 'absolute',
    width: 400,
    bgcolor: 'white',
    p: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 4,
    boxShadow: 24,
    textAlign: 'center',
};

const buttonStyle = {
    marginRight: '10px',
};

function ForgotPassword({ open, setOpen }) {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [confirmPassword1, setConfirmPassword1] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNextStep = () => {
        if (step === 1 && email) {
            setStep(2);
        } else if (step === 2 && password1 && confirmPassword1 && password1 === confirmPassword1) {
            // Send the email and password to your API here
            console.log('Email:', email);
            console.log('Password:', password1);

            const payload = {
                email: email,
                new_password: password1,
                // user_id:
            };

            dispatch(forgot_password(payload, () => {
                handleClose();
                // console.info(temp_data, "temp_data")
                // localStorage.setItem("user_data", JSON.stringify(temp_data));
                // window.location.reload()
            }));

        }
    };

    const isNextButtonDisabled = step === 1 ? !isEmailValid : !isPasswordsMatch;

    return (
        <div>
            <button onClick={handleClickOpen} className="custom-button">
                Open Forgot Password
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {step === 1 ? (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Enter Your Email
                            </Typography>
                            <TextField
                                autoFocus
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                value={email}
                                variant="standard"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailValid(!!e.target.value);
                                }}
                                style={{ marginBottom: '20px', paddingTop: '10px', borderRadius: '8px' }}
                            />
                        </>
                    ) : (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Enter New Password
                            </Typography>
                            <TextField
                                margin="dense"
                                id="password"
                                label="New Password"
                                type="password"
                                fullWidth
                                value={password1}
                                variant="standard"
                                onChange={(e) => {
                                    setPassword1(e.target.value);
                                    setIsPasswordsMatch(e.target.value === confirmPassword1);
                                }}
                                style={{ marginBottom: '20px' }}
                            />
                            <TextField
                                margin="dense"
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                value={confirmPassword1}
                                variant="standard"
                                onChange={(e) => {
                                    setConfirmPassword1(e.target.value);
                                    setIsPasswordsMatch(e.target.value === password1);
                                }}
                                style={{ marginBottom: '20px' }}
                            />
                        </>
                    )}
                    <div>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            style={buttonStyle}
                            className="custom-button"
                        >
                            Cancel
                        </Button>

                        {step === 1 ? (
                            // <Tooltip title="Please enter a valid email" open={!isEmailValid}>
                            //     <span>
                            <Button
                                variant="contained"
                                onClick={handleNextStep}
                                className="custom-button"
                                disabled={!isEmailValid}
                            >
                                Next
                            </Button>
                            //     </span>
                            // </Tooltip>
                        ) : (
                            // <Tooltip title="Passwords must match" open={!isPasswordsMatch}>
                            //     <span>
                            <Button
                                variant="contained"
                                onClick={handleNextStep}
                                className="custom-button"
                                disabled={!isPasswordsMatch}
                            >
                                Submit
                            </Button>
                            //     </span>
                            // </Tooltip>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ForgotPassword;
