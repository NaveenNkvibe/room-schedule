import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import ShiftModal from '../../_components/modals/shift/ShiftCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Shift() {

    const [shifts, setShifts] = useState([]); // State to store shift value
	const [open, setOpen] = useState(false); // Boolean value to open/close the Modal
    const [editShift, setEditShift] = useState(null); // State to store editing shift value

    const columns = [{ label: 'Shift', field: 'name', align: 'left' }]; // Define Datatable Column Label, field, & alignment

    useEffect(() => {
		const allShifts = JSON.parse(localStorage.getItem('shifts')) || []; // Fetch all shift details from local storage, if not availabel return []
		setShifts(allShifts); // Assign all fetched shift data to shift state
	}, []);

    const handleCreateShift = (data) => {
		let updatedShifts; // Define updatedShifts variable
		if (editShift) {
			// Performs if editShift has value
			updatedShifts = shifts.map((val) => (val.id === editShift.id ? { ...val, name: data } : val)); // Map through all shift, edit the shift and returns updated shift datas
		} else {
			// Performs if editShift has no value
			updatedShifts = [...shifts, { id: Date.now(), name: data }]; // Adds new shift
		}
		setShifts(updatedShifts); // Assign updated shifts data to shifts state
		localStorage.setItem('shifts', JSON.stringify(updatedShifts)); // Updats shifts of local storage
		setEditShift(null); // Assign the value of editShift as null
	}; // Function to create or edit shift data

    const handleDeleteShift = (id) => {
		const updatedShifts = shifts.filter((shift) => shift.id !== id); // Filters out the shift to be deleted
		setShifts(updatedShifts); // Assign updated shifts data to shifts state
		localStorage.setItem('shifts', JSON.stringify(updatedShifts)); // Updats shifts of local storage
	}; // Function to delete shift data

	return (
		<div>
            <Stack spacing={1} direction="row" justifyContent={'space-between'} alignItems={`center`}>
			    <h1>Shift</h1>
			    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Shift</Button>
            </Stack>
            <DataTable columns={columns} data={shifts} onEdit={setEditShift} onDelete={handleDeleteShift} />
            <ShiftModal open={open || editShift} onClose={() => {setOpen(false); setEditShift(null);}} onSubmit={handleCreateShift} initialShift={editShift} />
		</div>
	);
}

export default Shift;
