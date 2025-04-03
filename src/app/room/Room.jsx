import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import RoomModal from '../../_components/modals/room/RoomCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Room() {

    const [rooms, setRooms] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [open, setOpen] = useState(false);
    const [editRoom, setEditRoom] = useState(null);

    const columns = [
        { label: 'Rooms', field: 'name', align: 'left' },
        { label: 'Blocks', field: 'blockName', align: 'left' }
    ];

    useEffect(() => {
        const allRooms = JSON.parse(localStorage.getItem('rooms')) || [];
        const allBlocks = JSON.parse(localStorage.getItem('blocks')) || [];
        setRooms(allRooms);
        setBlocks(allBlocks);
    }, []);

    const handleCreateRoom = (data) => {
        console.log(data)
        let updatedRooms;
        if(editRoom) {
            updatedRooms = rooms.map(val => val.id === editRoom.id ? data : val)
        } else {
            updatedRooms = [...rooms, { id: Date.now(), ...data }];
        }
        setRooms(updatedRooms);
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
        setEditRoom(null);
    };

    const handleDeleteRoom = (id) => {
        const updatedRooms = rooms.filter((room) => room.id !== id);
        setRooms(updatedRooms);
        localStorage.setItem('rooms', JSON.stringify(updatedRooms));
    };

    return (
        <div>
            <Stack spacing={1} direction="row" justifyContent={'space-between'} alignItems={`center`}>
                <h1>Room</h1>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Room</Button>
            </Stack>
            <DataTable columns={columns} data={rooms} onEdit={setEditRoom} onDelete={handleDeleteRoom} />
            <RoomModal open={open || editRoom} onClose={() => {setOpen(false); setEditRoom(null);}} onSubmit={handleCreateRoom} initialRoom={editRoom} blocks={blocks}/>
        </div>
    );
}

export default Room