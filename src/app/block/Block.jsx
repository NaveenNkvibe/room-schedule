import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import BlockModal from '../../_components/modals/block/BlockCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Block() {

    const [blocks, setBlocks] = useState([]);
    const [open, setOpen] = useState(false);
    const [editBlock, setEditBlock] = useState(null);

    const columns = [{ label: 'Block', field: 'name', align: 'left' }];

    useEffect(() => {
        const allBlocks = JSON.parse(localStorage.getItem('blocks')) || [];
        setBlocks(allBlocks);
    }, []);

    const handleCreateBlock = (data) => {
        let updatedBlocks;
        if(editBlock) {
            updatedBlocks = blocks.map(val => val.id === editBlock.id ? { ...val, name: data } : val)
        } else {
            updatedBlocks = [...blocks, { id: Date.now(), name: data }];
        }
        setBlocks(updatedBlocks);
        localStorage.setItem('blocks', JSON.stringify(updatedBlocks));
        setEditBlock(null);
    };

    const handleDeleteBlock = (id) => {
        const updatedBlocks = blocks.filter((block) => block.id !== id);
        setBlocks(updatedBlocks);
        localStorage.setItem('blocks', JSON.stringify(updatedBlocks));
    };

    return (
        <div>
            <Stack spacing={1} direction="row" justifyContent={'space-between'} alignItems={`center`}>
                <h1>Block</h1>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Block</Button>
            </Stack>
            <DataTable columns={columns} data={blocks} onEdit={setEditBlock} onDelete={handleDeleteBlock} />
            <BlockModal open={open || editBlock} onClose={() => {setOpen(false); setEditBlock(null);}} onSubmit={handleCreateBlock} initialBlock={editBlock} />
        </div>
    );
}

export default Block