import React, { useState, useEffect } from 'react';
import ScheduleDoctorModal from '../../_components/modals/room-schedule/ScheduleDoctorModal';

const RoomSchedule = () => {
	const [rooms, setRooms] = useState([]); // State to store room value
	const [blocks, setBlocks] = useState([]); // State to store block value
	const [shifts, setShifts] = useState([]); // State to store shift value
	const [schedule, setSchedule] = useState({ weekStart: '', weekEnd: '', data: [] }); // State to store schedule data
	const [modalOpen, setModalOpen] = useState(false); // Boolean value to open/close the Modal
	const [selectedCell, setSelectedCell] = useState(null); // State to selected cell details

	const days = ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Friday']; // Define all days in week to an array

	useEffect(() => {
		const allRooms = JSON.parse(localStorage.getItem('rooms')) || []; // Fetch all rooms details from local storage, if not availabel return []
		const allBlocks = JSON.parse(localStorage.getItem('blocks')) || []; // Fetch all blocks details from local storage, if not availabel return []
		const allShifts = JSON.parse(localStorage.getItem('shifts')) || []; // Fetch all shifts details from local storage, if not availabel return []

		const today = new Date(); // Get date of today
		const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Gets first day of this week
		const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6)); // Gets last day of this week

		const formatDate = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); // Make date to [4 Mar 2025] format

		const currentWeek = {
			weekStart: formatDate(firstDayOfWeek),
			weekEnd: formatDate(lastDayOfWeek),
			data: [],
		}; // Add to currentWeek object
		//console.log(currentWeek);

		const savedSchedule = JSON.parse(localStorage.getItem('RoomSchedule')) || currentWeek; // Fetch all RoomSchedule details from local storage, if not assign currentWeek

		const updatedBlocks = allBlocks.map((block) => ({
			...block,
			roomCount: allRooms.filter((room) => room.blockId === block.id).length,
		})); // Update Blocks data with rooms count

		setRooms(allRooms); // Assign all fetched room data to room state
		setBlocks(updatedBlocks); // Assign all fetched blocks data to blocks state
		setShifts(allShifts); // Assign all fetched shifts data to shifts state
		setSchedule(savedSchedule); // Assign all fetched schedule data to schedule state
	}, []);

	const handleCellClick = (day, shift, room) => {
		const dayData = schedule.data.find((d) => d.day === day); // Get schedule day data selected
		const shiftData = dayData?.roomData.find((r) => r.roomId === room.id && r.shiftId === shift.id); // Get room and shift data

		setSelectedCell({ day, shift, room, doctor: shiftData ? shiftData.doctor : '' }); // Update scheduled cell state details
		setModalOpen(true); // Open Doctor Update Modal
	};

	const handleSaveDoctor = (data) => {
		if (!data || !selectedCell) {
			return;
		} // Return if there is not no doctorName in data or selected cell

		const updatedSchedule = { ...schedule }; // Copy schedule data to updateSchedule variable

		let dayEntry = updatedSchedule.data.find((d) => d.day === selectedCell.day); // Get day from schedule data
		if (!dayEntry) { // Check if day exist in schedule data
			const today = new Date(); // Get date of today
			const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '-'); // Convert date to 'DD-MM-YYYY' format

			dayEntry = { day: selectedCell.day, date: formattedDate, roomData: [] }; // Create new dayEntry
			updatedSchedule.data.push(dayEntry); // Push it to updateSchedule
		}

		const shiftEntry = dayEntry.roomData.find((r) => r.roomId === selectedCell.room.id && r.shiftId === selectedCell.shift.id); // Get Shift

		if (shiftEntry) {
			// If has shiftEntry update doctor name
			shiftEntry.doctor = data;
		} else {
			// If not add new new data
			dayEntry.roomData.push({
				roomId: selectedCell.room.id,
				shiftId: selectedCell.shift.id,
				shiftName: selectedCell.shift.name,
				doctor: data,
			});
		}

		setSchedule(updatedSchedule); // Update schedule state
		localStorage.setItem('RoomSchedule', JSON.stringify(updatedSchedule)); // Update roomSchedule data in local storage

		setModalOpen(false); // Close Doctor Update Modal
	};

	const handleRemoveDoctor = () => {
		if (!selectedCell) return; // Return if selectedCell is empty

		const updatedSchedule = { ...schedule }; // Copy schedule data to updateSchedule variable
		const dayEntry = updatedSchedule.data.find((d) => d.day === selectedCell.day); // Get day from schedule data

		if (dayEntry) {
			const roomIndex = dayEntry.roomData.findIndex((r) => r.roomId === selectedCell.room.id && r.shiftId === selectedCell.shift.id); // Find index of shift data inside dayEntry.roomData

			if (roomIndex !== -1) {
				// If it do not get index
				dayEntry.roomData.splice(roomIndex, 1);
			}

			updatedSchedule.data = updatedSchedule.data.filter((d) => d.roomData.length > 0); // Remove data
		}

		setSchedule(updatedSchedule); // Update schedule state
		localStorage.setItem('RoomSchedule', JSON.stringify(updatedSchedule)); // Update roomSchedule data in local storage
		setModalOpen(false); // Close Doctor Update Modal
	};

	const handleModalClose = () => {
		setModalOpen(false); // Close Doctor Update Modal
		setSelectedCell(null); // clear selected cell data
	};

	return (
		<div className="schedule-table-container">
			<table className="schedule-table" border="1" cellSpacing="0" cellPadding="8">
				<thead>
					<tr>
						<th></th>
						{blocks.map(
							(block) =>
								block.roomCount > 0 && (
									<React.Fragment key={block.name}>
										<th colSpan={block.roomCount}>{block.name}</th>
									</React.Fragment>
								),
						)}
					</tr>
					<tr>
						<th></th>
						{rooms.map((room) => (
							<React.Fragment key={room.id}>
								<th style={{ background: '#373a3b42' }}>{room.name}</th>
							</React.Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{days.map((day) => (
						<React.Fragment key={day}>
							<tr className="day-row">
								<td colSpan="1" style={{ background: '#393a3ba1' }}>
									{day}
								</td>
								<td colSpan={rooms.length}></td>
							</tr>

							{shifts.map((shift) => (
								<tr key={`${shift.id}`}>
									<td>{shift.name}</td>
									{rooms.map((room) => (
										<td
											key={`${shift.id}-${room.id}`}
											className={`${room.id}`}
											onClick={() => handleCellClick(day, shift, room)}
											style={{
												backgroundColor: schedule.data.find((d) => d.day === day)?.roomData.find((r) => r.roomId === room.id && r.shiftId === shift.id)?.doctor ? 'green' : 'yellow',
												color: 'black',
											}}
										>
											{schedule.data.find((d) => d.day === day)?.roomData.find((r) => r.roomId === room.id && r.shiftId === shift.id)?.doctor || '+'}
										</td>
									))}
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
			<ScheduleDoctorModal open={modalOpen} onClose={handleModalClose} onSubmit={handleSaveDoctor} onRemove={handleRemoveDoctor} selectedDoctor={selectedCell?.doctor} />
		</div>
	);
};

export default RoomSchedule;
