import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import RoomModal from '../../_components/modals/room/RoomCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Room() {
	const [rooms, setRooms] = useState([]); // State to store room value
	const [blocks, setBlocks] = useState([]); // State to store block value
	const [open, setOpen] = useState(false); // Boolean value to open/close the Modal
	const [editRoom, setEditRoom] = useState(null); // State to store editing room value

	const columns = [
		{ label: 'Rooms', field: 'name', align: 'left' }, // Define Datatable Rooms Column Label, field, & alignment
		{ label: 'Blocks', field: 'blockName', align: 'left' }, // Define Datatable Blocks Column Label, field, & alignment
	];

	useEffect(() => {
		const allRooms = JSON.parse(localStorage.getItem('rooms')) || []; // Fetch all rooms details from local storage, if not availabel return []
		const allBlocks = JSON.parse(localStorage.getItem('blocks')) || []; // Fetch all blocks details from local storage, if not availabel return []
		setRooms(allRooms); // Assign all fetched room data to room state
		setBlocks(allBlocks); // Assign all fetched block data to block state
	}, []);

	const handleCreateRoom = (data) => {
		//console.log(data);
		let updatedRooms; // Define updatedRooms variable
		if (editRoom) {
			// Performs if editRoom has value
			updatedRooms = rooms.map((val) => (val.id === editRoom.id ? data : val)); // Map through all Room, edit the Room and returns updated Room datas
		} else {
			// Performs if editRoom has no value
			updatedRooms = [...rooms, { id: Date.now(), ...data }]; // Adds new Room
		}
		setRooms(updatedRooms); // Assign updated rooms data to rooms state
		localStorage.setItem('rooms', JSON.stringify(updatedRooms)); // Updats rooms of local storage
		setEditRoom(null); // Assign the value of editroom as null
	}; // Function to create or edit room data

	const handleDeleteRoom = (id) => {
		const updatedRooms = rooms.filter((room) => room.id !== id); // Filters out the room to be deleted
		setRooms(updatedRooms); // Assign updated rooms data to rooms state
		localStorage.setItem('rooms', JSON.stringify(updatedRooms)); // Updats rooms of local storage
	}; // Function to delete room data

	return (
		<div>
			<Stack spacing={1} direction="row" justifyContent={'space-between'} alignItems={`center`}>
				<h1>Room</h1>
				<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
					Add Room
				</Button>
			</Stack>
			<DataTable columns={columns} data={rooms} onEdit={setEditRoom} onDelete={handleDeleteRoom} />
			<RoomModal
				open={open || editRoom}
				onClose={() => {
					setOpen(false);
					setEditRoom(null);
				}}
				onSubmit={handleCreateRoom}
				initialRoom={editRoom}
				blocks={blocks}
			/>
		</div>
	);
}

export default Room