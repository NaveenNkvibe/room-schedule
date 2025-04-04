import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../modals/delete-modal/DeleteModal';

function DataTable ({columns, data, onEdit, onDelete}) {

    const [deleteModalData, setDeleteModalData] = useState(null); // State to store delete

    function handleDelete () {
		onDelete(deleteModalData); // Call ondelete with data
		setDeleteModalData(null); // Assign the value of deleteModalData as null
	}

    return (
		<>
			<TableContainer component={Paper} sx={{ marginTop: 2, maxWidth: '100%', borderRadius: '8px' }}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((col, index) => (
								<TableCell key={index} sx={{ width: col.width || 'auto' }} align={col.align || 'left'}>
									<strong>{col.label}</strong>
								</TableCell>
							))}
							{onDelete && (
								<TableCell sx={{ width: '100px' }}>
									<strong>Action</strong>
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={columns.length + (onDelete ? 1 : 0)} align="center">
									No Data Available
								</TableCell>
							</TableRow>
						) : (
							data.map((row) => (
								<TableRow key={row.id}>
									{columns.map((col, index) => (
										<TableCell key={index} align={col.align || 'left'}>
											{row[col.field]}
										</TableCell>
									))}
									{onDelete && (
										<TableCell>
											<Stack direction="row" spacing={1}>
												<IconButton onClick={() => onEdit(row)}>
													<EditIcon />
												</IconButton>
												<IconButton onClick={() => setDeleteModalData(row.id)}>
													<DeleteIcon />
												</IconButton>
											</Stack>
										</TableCell>
									)}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<DeleteModal open={deleteModalData !== null} onClose={() => setDeleteModalData(null)} onSubmit={handleDelete}/>
		</>
	);
}

export default DataTable;