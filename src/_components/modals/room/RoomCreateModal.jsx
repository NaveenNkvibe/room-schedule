import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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

function RoomModal({ open, onClose, onSubmit, initialRoom, blocks }) {

    const [roomName, setRoomName] = useState('');
    const [selectedBlock, setSelectedBlock] = useState();

    useEffect(() => {
        if (initialRoom) {
            setRoomName(initialRoom.name);
            setSelectedBlock(initialRoom.block);
        } else {
            setRoomName('');
            setSelectedBlock('');
        }
    }, [initialRoom]);

    const handleSubmit = () => {
        if (roomName.trim() !== '' && selectedBlock !== '') {
            const selectedBlockData = blocks.find((blo) => blo.id === selectedBlock);
            const roomData = { name: roomName, blockId: selectedBlockData.id, blockName: selectedBlockData.name }
            onSubmit(initialRoom ? { ...initialRoom, ...roomData } : roomData);
            setRoomName('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6">
                    {initialRoom ? "Edit Room" : "Add New Room"}
                </Typography>
                <TextField fullWidth label="Enter Room" variant="outlined" value={roomName} onChange={(e) => setRoomName(e.target.value)} sx={{ marginBottom: 2 }} />
                <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                    <InputLabel>Select A Block</InputLabel>
                    <Select value={selectedBlock} onChange={(e) => setSelectedBlock(e.target.value)}>
                        {blocks.map((block) => (
                        <MenuItem key={block.id} value={block.id}>{block.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>{initialRoom ? "Update Room" : "Save Room"}</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default RoomModal;