import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoChat from './VIDEOCHAT/VideoChat';
import VideoPlayer from './VIDEOCHAT/VidoePlayer';
import  Dashboard from'./MAIN/Dashboard';
import NavTeacher from './MAIN/NavMain'
import DashFooter from './MAIN/DashFooter'

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
            
                
                <Route path="1" element={<VideoChat />} />
                <Route path="vidoe" element={<VideoPlayer />} />
                <Route path="/" element={< Dashboard/>} />
                <Route path="navteach" element={<NavTeacher/>} />
                <Route path="footer" element={<DashFooter/>} />


            </Routes>
        </Router>
    </div>
  );
}

export default App;
