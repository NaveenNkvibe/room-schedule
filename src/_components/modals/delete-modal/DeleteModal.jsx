import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
};

function DeleteModal({ open, onClose, onSubmit }) {

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6">
                    Delete Data
                </Typography>
                <Typography variant="caption">
                    Are you sure?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Delete</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteModal;