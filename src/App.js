import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoChat from './VIDEOCHAT/VideoChat';
import VideoPlayer from './VIDEOCHAT/VidoePlayer';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
            
                
                <Route path="1" element={<VideoChat />} />
                <Route path="vidoe" element={<VideoPlayer />} />

            </Routes>
        </Router>
    </div>
  );
}

export default App;
