import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import ShiftModal from '../../_components/modals/shift/ShiftCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Shift() {

    const [shifts, setShifts] = useState([]);
	const [open, setOpen] = useState(false);
    const [editShift, setEditShift] = useState(null);

    const columns = [{ label: 'Shift', field: 'name', align: 'left' }];

    useEffect(() => {
		const allShifts = JSON.parse(localStorage.getItem('shifts')) || [];
		setShifts(allShifts);
	}, []);

    const handleCreateShift = (data) => {
        let updatedShifts;
        if(editShift) {
            updatedShifts = shifts.map(val => val.id === editShift.id ? { ...val, name: data } : val)
        } else {
            updatedShifts = [...shifts, { id: Date.now(), name: data }];
        }
		setShifts(updatedShifts);
		localStorage.setItem('shifts', JSON.stringify(updatedShifts));
        setEditShift(null);
	};

    const handleDeleteShift = (id) => {
		const updatedShifts = shifts.filter((shift) => shift.id !== id);
		setShifts(updatedShifts);
		localStorage.setItem('shifts', JSON.stringify(updatedShifts));
	};

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
