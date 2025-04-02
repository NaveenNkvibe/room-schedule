import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './_layouts/Sidebar';
import Dashboard from './app/dashboard/dashboard';
import Block from './app/block/Block';
import Room from './app/room/Room';
import RoomSchedule from './app/room-schedule/RoomSchedule';
import Shift from './app/shift/Shift';

function App() {

  return (
		<Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/block" element={<Block />}></Route>
            <Route path="/room" element={<Room />}></Route>
            <Route path="/room-schedule" element={<RoomSchedule />}></Route>
            <Route path="/shift" element={<Shift />}></Route>
          </Routes>
        </Box>
      </Box>
		</Router>
  );
}

export default App
