import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, useTheme } from '@mui/material/styles';

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '100%',
        maxWidth: '560px',
        height: 'auto',
        maxHeight: '85vh',
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        position: 'relative',
        overflowY: 'auto',
    },
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
}));

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    '&:first-child': {
        paddingTop: theme.spacing(3),
    },
}));

const CustomDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'flex-end',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
}));

const Modal = ({ subtopic, onClose, onNext, showNextButton }) => {
    const theme = useTheme();

    return (
        <CustomDialog
            open={Boolean(subtopic)}
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            TransitionProps={{ timeout: 500 }}
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }, 
            }}
        >
            <CustomDialogTitle id="customized-dialog-title">
                <Typography variant="h6">{subtopic?.name}</Typography>
                <CloseButton aria-label="close" onClick={onClose}>
                    <CloseIcon style={{ color: 'black' }} />
                </CloseButton>

            </CustomDialogTitle>
            <CustomDialogContent dividers>
                <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: subtopic?.content }} />
            </CustomDialogContent>
            <CustomDialogActions>
                {showNextButton && (
                    <Button variant="outlined" color="primary" onClick={onNext}>
                        Next
                    </Button>
                )}
                <Button variant="contained" color="primary" onClick={onClose}>
                    Close
                </Button>
            </CustomDialogActions>
        </CustomDialog>
    );
};

export default Modal;
