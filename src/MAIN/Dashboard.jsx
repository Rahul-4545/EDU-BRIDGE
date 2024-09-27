import React from 'react';
import { PiStudentBold } from "react-icons/pi"; // Student icon
import { GiTeacher } from "react-icons/gi"; // Teacher icon
import { BiSolidInstitution } from "react-icons/bi"; // Administrator icon
import NavTeacher from './NavMain'; // Assuming Dashboard.jsx is in the same TEACHER folder
import './Dashboard.css'; 
import img1 from '../IMAGES/dashmain.jpg';
import DashFooter from './DashFooter'; // Ensure the correct path and extension

const Dashboard = () => {
  return (
    <>
      <NavTeacher /> {/* Navbar component */}
      <div className="dashboard-container">
        <h1>Welcome To EDUBRIDGE</h1>
        <h2>Fostering growth and collaboration between students, teachers, and institutions</h2>
        <button className="get-started-button">Get Started</button>
      </div>
      
      <div className="dashboard-explain">
        <div>
          <h2>Transforming Education in Rural Areas</h2>
          <p>
            Our application bridges the gap between students and quality education by providing access to virtual classrooms and learning resources. 
            With tools for effective resource management and improved connectivity, we empower educators and learners alike. 
            Experience seamless learning, anytime, anywhere!
          </p>
        </div>
        <img src={img1} alt="Educational Transformation" className="dashboard-image" />
      </div>

      {/* Explore Now Button */}
      <div className="explore-now-container">
        <button className="explore-now-button">Explore Now</button>
      </div>

      {/* New Section for Fields with Icons */}
      <div className="dashboard-fields">
        {/* Student Section */}
        <div className="field student-field">
          <PiStudentBold size={50} className="dashboard-icon" /> {/* Student Icon */}
          <h3>For Students</h3>
          <p>Join classes, complete assignments, and access quizzes and games.</p>
          <button className="field-button">Go to Student Dashboard</button>
        </div>

        {/* Teacher Section */}
        <div className="field teacher-field">
          <GiTeacher size={50} className="dashboard-icon" /> {/* Teacher Icon */}
          <h3>For Teachers</h3>
          <p>Host virtual classrooms, manage resources, and create interactive content.</p>
          <button className="field-button">Go to Teacher Dashboard</button>
        </div>

        {/* Administrator Section */}
        <div className="field admin-field">
          <BiSolidInstitution size={50} className="dashboard-icon" /> {/* Administrator Icon */}
          <h3>For Administrators</h3>
          <p>Monitor student performance and manage resource requests.</p>
          <button className="field-button">Go to Admin Dashboard</button>
        </div>
        
      </div>
      <DashFooter/>

    </>
  );
}

export default Dashboard;
