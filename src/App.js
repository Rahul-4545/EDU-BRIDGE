import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoChat from './VIDEOCHAT/VideoChat';
import VideoPlayer from './VIDEOCHAT/VidoePlayer';
import  Dashboard from'./MAIN/Dashboard';
import DashFooter from './MAIN/DashFooter'
import NavTeacher from './TEACHER/NavTeacher'
import DashTeacher from './TEACHER/DashTeacher'
import DashStudent from './STUDENT/DashStudent'
import QuizzTeacher from './TEACHER/QuizzTeacher';
import QuizzStudent from './STUDENT/QuizzStudent';




function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route path="1" element={<VideoChat />} />
                <Route path="vidoe" element={<VideoPlayer />} />
                <Route path="/" element={< Dashboard/>} />
                <Route path="footer" element={<DashFooter/>} />
                <Route path="navbarteach" element={<NavTeacher/>} />
                <Route path="dashteacher" element={<DashTeacher/>} />
                <Route path="dashstudent" element={<DashStudent/>} />
             
                <Route path="quizz1" element={<QuizzTeacher />} /> {/* New route for Quiz Creation */}
               <Route path="quizz2" element={<QuizzStudent />} /> {/* New route for Quiz Attendance */}
               
                

                
            </Routes>
        </Router>
    </div>
  );
}

export default App;
