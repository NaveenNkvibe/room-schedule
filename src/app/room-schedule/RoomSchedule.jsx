import React, { useState, useEffect } from 'react';
import ScheduleDoctorModal from '../../_components/modals/room-schedule/ScheduleDoctorModal';

const RoomSchedule = () => {

    const [rooms, setRooms] = useState([]);
	const [blocks, setBlocks] = useState([]);
    const [shifts, setShifts] = useState([]);
	const [schedule, setSchedule] = useState({ weekStart: '9 Feb 2025', weekEnd: '15 Feb 2025', data: [] });
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCell, setSelectedCell] = useState(null);
	const [doctorName, setDoctorName] = useState('');

	const days = ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Friday'];

	useEffect(() => {
		const allRooms = JSON.parse(localStorage.getItem('rooms')) || [];
		const allBlocks = JSON.parse(localStorage.getItem('blocks')) || [];
        const allShifts = JSON.parse(localStorage.getItem('shifts')) || [];
		const savedSchedule = JSON.parse(localStorage.getItem('RoomSchedule')) || { weekStart: '9 Feb 2025', weekEnd: '15 Feb 2025', data: [] };

        const updatedBlocks = allBlocks.map((block) => ({
			...block,
			roomCount: allRooms.filter((room) => room.blockId === block.id).length,
		}));

		setRooms(allRooms);
		setBlocks(updatedBlocks);
        setShifts(allShifts);
		setSchedule(savedSchedule);
	}, []);

	const handleCellClick = (day, shift, room) => {
		const dayData = schedule.data.find((d) => d.day === day);
		const shiftData = dayData?.roomData.find((r) => r.roomId === room.id && r.shiftId === shift.id);

		setSelectedCell({ day, shift, room, doctor: shiftData ? shiftData.doctor : '' });
		setModalOpen(true);
	};

	const handleSaveDoctor = (data) => {
		if (!data || !selectedCell) {
			return;
		}

		const updatedSchedule = { ...schedule };

		let dayEntry = updatedSchedule.data.find((d) => d.day === selectedCell.day);
		if (!dayEntry) {
			dayEntry = { day: selectedCell.day, date: '9-03-25', roomData: [] };
			updatedSchedule.data.push(dayEntry);
		}

		const shiftEntry = dayEntry.roomData.find((r) => r.roomId === selectedCell.room.id && r.shiftId === selectedCell.shift.id);

		if (shiftEntry) {
			shiftEntry.doctor = data;
		} else {
			dayEntry.roomData.push({
				roomId: selectedCell.room.id,
				shiftId: selectedCell.shift.id,
				shiftName: selectedCell.shift.name,
				doctor: data,
			});
		}

		setSchedule(updatedSchedule);
		localStorage.setItem('RoomSchedule', JSON.stringify(updatedSchedule));

		setModalOpen(false);
	};

	const handleRemoveDoctor = () => {
		if (!selectedCell) return;

		const updatedSchedule = { ...schedule };
		const dayEntry = updatedSchedule.data.find((d) => d.day === selectedCell.day);

		if (dayEntry) {
			const roomIndex = dayEntry.roomData.findIndex((r) => r.roomId === selectedCell.room.id && r.shiftId === selectedCell.shift.id);

			if (roomIndex !== -1) {
				dayEntry.roomData.splice(roomIndex, 1);
			}

			updatedSchedule.data = updatedSchedule.data.filter((d) => d.roomData.length > 0);
		}

		setSchedule(updatedSchedule);
		localStorage.setItem('RoomSchedule', JSON.stringify(updatedSchedule));
		setModalOpen(false);
	};

	const getCellClass = (day, shift, room) => {
		const dayData = schedule.data.find((d) => d.day === day);
		if (!dayData) return 'available';

		const shiftData = dayData.roomData.find((r) => r.roomId === room.id && r.shiftId === shift.id);
		return shiftData && shiftData.doctor ? 'assigned' : 'available';
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setSelectedCell(null);
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
								<th style={{background: '#373a3b42'}}>{room.name}</th>
							</React.Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					{days.map((day) => (
						<React.Fragment key={day}>
							<tr className="day-row">
								<td colSpan="1" style={{background: '#393a3ba1'}}>{day}</td>
								<td colSpan={rooms.length}></td>
							</tr>

							{shifts.map((shift) => (
								<tr key={`${shift.id}`}>
									<td>{shift.name}</td>
									{rooms.map((room) => (
										<td
											key={`${day}-${shift.id}-${room.id}`}
											className={getCellClass(day, shift, room)}
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
