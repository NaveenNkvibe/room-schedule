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

function ShiftModal({ open, onClose, onSubmit, initialShift }) {

    const [shiftName, setShiftName] = useState('');

    useEffect(() => {
		if (initialShift) setShiftName(initialShift.name);
		else setShiftName('');
	}, [initialShift]);

	const handleSubmit = () => {
		if (shiftName.trim()) {
			onSubmit(shiftName);
			setShiftName('');
			onClose();
		}
	};

    return (
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyle}>
				<Typography variant="h6">
					{initialShift ? "Edit Shift" : "Add New Shift"}
				</Typography>
				<TextField fullWidth label="Enter Shift" variant="outlined" value={shiftName} onChange={(e) => setShiftName(e.target.value)} sx={{ marginBottom: 2 }} />
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button variant="outlined" onClick={onClose}>Cancel</Button>
					<Button variant="contained" color="primary" onClick={handleSubmit}>{initialShift ? "Update Shift" : "Save Shift"}</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default ShiftModal;