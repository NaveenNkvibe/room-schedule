import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

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

function BlockModal({ open, onClose, onSubmit, initialBlock }) {

    const [blockName, setBlockName] = useState('');

    useEffect(() => {
        if (initialBlock) setBlockName(initialBlock.name);
        else setBlockName('');
    }, [initialBlock]);

    const handleSubmit = () => {
        if (blockName.trim()) {
            onSubmit(blockName);
            setBlockName('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6">
                    {initialBlock ? "Edit Block" : "Add New Block"}
                </Typography>
                <TextField fullWidth label="Enter Block" variant="outlined" value={blockName} onChange={(e) => setBlockName(e.target.value)} sx={{ marginBottom: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>{initialBlock ? "Update Block" : "Save Block"}</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default BlockModal;