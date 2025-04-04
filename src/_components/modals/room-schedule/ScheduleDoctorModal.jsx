import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

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
}; // Define styling for Modal

function ScheduleDoctorModal({ open, onClose, onSubmit, onRemove, selectedDoctor }) {

    const [scheduleDoctorName, setScheduleDoctorName] = useState(''); // State to store doctor name

    useEffect(() => {
		setScheduleDoctorName(selectedDoctor || ''); // If selectedDoctor has data, Assign to scheduleDoctorName, or set ''
	}, [selectedDoctor]);

    const handleSubmit = () => {
        if (scheduleDoctorName.trim()) {
			onSubmit(scheduleDoctorName); // Pass doctor Name through onSubmit
			setScheduleDoctorName(''); // Assign doctor Name as empty
			onClose(); // Call onClose
		}
    }; // Submit the schedule doctor Data

    return (
		<Modal open={open} onClose={onClose}>
			<Box sx={modalStyle}>
                <Typography variant="h6" gutterBottom>
                    {selectedDoctor ? 'Doctor Assigned' : 'Assign Doctor'}
                </Typography>
				{selectedDoctor ? (
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {selectedDoctor}
                    </Typography>
                ) : (
                    <TextField fullWidth label="Enter Doctor Name" variant="outlined" value={scheduleDoctorName} onChange={(e) => setScheduleDoctorName(e.target.value)} sx={{ marginBottom: 2 }} />
                )}
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button variant="outlined" onClick={onClose}>Cancel</Button>
					{selectedDoctor ? (
                        <Button variant="contained" color="error" onClick={onRemove}>Remove</Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Enter</Button>
                    )}
				</Box>
			</Box>
		</Modal>
	);
}

export default ScheduleDoctorModal;