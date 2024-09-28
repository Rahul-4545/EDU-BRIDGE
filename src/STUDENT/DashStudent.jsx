import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher icon for learning from educators
import { SiGoogleclassroom } from "react-icons/si"; // Virtual Classroom icon
import { FaBookReader } from "react-icons/fa"; // Study Materials icon
import { IoMdSchool } from "react-icons/io"; // E-learning icon (changed from collaboration)
import { AiFillCheckCircle } from "react-icons/ai"; // Quizzes icon
import { MdRequestPage } from "react-icons/md"; // Resource Request icon (changed from ask a doubt)
import NavStudent from './NavStudent'; // Assuming NavStudent component for students
import './DashStudent.css'; // Update the CSS file for students
import img8 from '../IMAGES/dashstudents.jpg';
import img9 from '../IMAGES/virtualclassstudents.jpg';
import img10 from '../IMAGES/e-learningstudent.jpg';  
import img11 from '../IMAGES/resources.jpg';
import img12 from '../IMAGES/quizzesstudents.jpg';
import img7 from '../IMAGES/resourcerequest.jpg';

import FooterStudent from './FooterStudent'; // Student Footer component

const Dashboard = () => {
  return (
    <>
      <NavStudent /> {/* Navbar component for students */}
      <div className="dashboard-container-student">
        <h1>Welcome, Students</h1>
        <h2>Your Learning Journey Begins Here</h2>
        <h2>
          At EDUBRIDGE, we provide you with the tools to learn, explore, and grow. 
          Attend virtual classes, access learning materials, collaborate with peers, and track your progress with interactive quizzes.
        </h2>
        <button className="get-started-button-student">Start Learning Now</button>
      </div>

      <div className="dashboard-explain-student">
        <div>
          <h2>Empowering Students to Learn Anywhere</h2>
          <p>
            Our application is designed to provide students with access to quality education, no matter their location. 
            From virtual classrooms to comprehensive learning materials and collaborative tools, we aim to create an engaging and supportive environment. 
            Join us and take charge of your learning journey today!
          </p>
        </div>
        <img src={img8} alt="Student Learning Transformation" className="dashboard-image-student" />
      </div>

      {/* Explore Now Button */}
      <div className="explore-now-container-student">
        <button className="explore-now-button-student">Explore Now</button>
      </div>

      {/* New Section for Fields with Icons */}
      <div className="dashboard-fields-student">
        {/* Pair 1: Virtual Classroom and Image */}
        <div className="field-image-pair">
          <div className="field virtual-classroom-field">
            <SiGoogleclassroom size={50} className="dashboard-icon" />
            <h3>Virtual Classroom</h3>
            <p>Join live classes and interact with your teachers and classmates in real-time.</p>
            <button className="field-button">Explore More</button>
          </div>
          <img src={img9} alt="Virtual Classroom" className="dashboard-image-student" />
        </div>

        {/* Pair 2: Study Materials and Image */}
        <div className="field-image-pair">
          <div className="field study-materials-field">
            <FaBookReader size={50} className="dashboard-icon" />
            <h3>Study Materials</h3>
            <p>Access a wealth of educational content and resources for your studies.</p>
            <button className="field-button">Explore More</button>
          </div>
          <img src={img10} alt="Study Materials" className="dashboard-image-student" />
        </div>

        {/* Pair 3: E-learning and Image */}
        <div className="field-image-pair">
          <div className="field elearning-field">
            <IoMdSchool size={50} className="dashboard-icon" />
            <h3>E-learning</h3>
            <p>Access online courses and learning materials anytime, anywhere</p>
            <button className="field-button">Explore More</button>
          </div>
          <img src={img11} alt="E-learning" className="dashboard-image-student" />
        </div>

        {/* Pair 4: Quizzes and Image */}
        <div className="field-image-pair">
          <div className="field quizzes-field">
            <AiFillCheckCircle size={50} className="dashboard-icon" />
            <h3>Quizzes</h3>
            <p>Test your knowledge and track your progress with interactive quizzes.</p>
            <button className="field-button">Explore More</button>
          </div>
          <img src={img12} alt="Quizzes" className="dashboard-image-student" />
        </div>

        {/* Pair 5: Resource Request and Image */}
        <div className="field-image-pair">
          <div className="field resource-request-field">
            <MdRequestPage size={50} className="dashboard-icon" />
            <h3>Resource Requests</h3>
            <p>Request help or additional resources for your assignments and projects.</p>
            <button className="field-button">Explore More</button>
          </div>
          <img src={img7} alt="Resource Request" className="dashboard-image-student" />
        </div>
      </div>

      <FooterStudent />
    </>
  );
}

export default Dashboard;
