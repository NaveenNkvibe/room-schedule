import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import BlockModal from '../../_components/modals/block/BlockCreateModal';
import DataTable from '../../_components/datatable/DataTable';

function Block() {
	const [blocks, setBlocks] = useState([]); // State to store block value
	const [open, setOpen] = useState(false); // Boolean value to open/close the Modal
	const [editBlock, setEditBlock] = useState(null); // State to store editing block value

	const columns = [{ label: 'Block', field: 'name', align: 'left' }]; // Define Datatable Column Label, field, & alignment

	useEffect(() => {
		const allBlocks = JSON.parse(localStorage.getItem('blocks')) || []; // Fetch all block details from local storage, if not availabel return []
		setBlocks(allBlocks); // Assign all fetched block data to block state
	}, []);

	const handleCreateBlock = (data) => {
		let updatedBlocks; // Define updatedBlocks variable
		if (editBlock) {
			// Performs if editBlock has value
			updatedBlocks = blocks.map((val) => (val.id === editBlock.id ? { ...val, name: data } : val)); // Map through all Block, edit the Block and returns updated Block datas
		} else {
			// Performs if editBlock has no value
			updatedBlocks = [...blocks, { id: Date.now(), name: data }]; // Adds new Block
		}
		setBlocks(updatedBlocks); // Assign updated Blocks data to Blocks state
		localStorage.setItem('blocks', JSON.stringify(updatedBlocks)); // Updats Blocks of local storage
		setEditBlock(null); // Assign the value of editBlock as null
	}; // Function to create or edit Block data

	const handleDeleteBlock = (id) => {
		const updatedBlocks = blocks.filter((block) => block.id !== id); // Filters out the Block to be deleted
		setBlocks(updatedBlocks); // Assign updated Blocks data to Blocks state
		localStorage.setItem('blocks', JSON.stringify(updatedBlocks)); // Updats Blocks of local storage
	}; // Function to delete Block data

	return (
		<div>
			<Stack spacing={1} direction="row" justifyContent={'space-between'} alignItems={`center`}>
				<h1>Block</h1>
				<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
					Add Block
				</Button>
			</Stack>
			<DataTable columns={columns} data={blocks} onEdit={setEditBlock} onDelete={handleDeleteBlock} />
			<BlockModal
				open={open || editBlock}
				onClose={() => {
					setOpen(false);
					setEditBlock(null);
				}}
				onSubmit={handleCreateBlock}
				initialBlock={editBlock}
			/>
		</div>
	);
}

export default Block