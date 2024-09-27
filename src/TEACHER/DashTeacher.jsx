import React from 'react';
import { GiTeacher } from "react-icons/gi"; // Teacher icon
import { SiGoogleclassroom } from "react-icons/si"; // Virtual Classroom icon
import { FaBookOpenReader } from "react-icons/fa6"; // E-learning icon
import { IoShareSocial } from "react-icons/io5"; // Resource Sharing icon
import { AiFillCheckCircle } from "react-icons/ai"; // Quizzes icon
import { PiGitPullRequestThin } from "react-icons/pi"; // Resource Request icon
import NavTeacher from './NavTeacher'; // Assuming Dashboard.jsx is in the same TEACHER folder
import './DashTeacher.css'; 
import img2 from '../IMAGES/dashteachers.jpg';
import img3 from '../IMAGES/virtualclass.jpg';
import img4 from '../IMAGES/e-learning.jpg';  
import img5 from '../IMAGES/resourcesharing.jpg';
import img6 from '../IMAGES/quizzes.jpg';
import img7 from '../IMAGES/resourcerequest.jpg';

import FooterTeacher from './FooterTeacher'; 
// Ensure the correct path and extension

const Dashboard = () => {
  return (
    <>
      <NavTeacher /> {/* Navbar component */}
      <div className="dashboard-containerteacher">
        <h1>Welcome, Educators</h1>
        <h2>Your Digital Classroom Awaits</h2>
        <h2>
          At EDUBRIDGE, we equip you with the tools to teach, inspire, and connect with students, no matter where they are. 
          Create engaging lessons, manage resources efficiently, and foster collaboration in a seamless virtual environment.
        </h2>
        <button className="get-started-buttonteacher">Start Teaching Now</button>
      </div>

      <div className="dashboard-explainteacher">
        <div>
          <h2>Empowering Teachers in Rural Areas</h2>
          <p>
            Our application is designed specifically for educators, enabling them to reach students in remote locations with quality resources and support. 
            By providing tools for efficient lesson planning, interactive virtual classrooms, and access to a wealth of teaching materials, we empower teachers to make a meaningful impact. 
            Join us in fostering a collaborative learning environment that enhances teaching effectiveness and nurtures student success, no matter where they are!
          </p>
        </div>
        <img src={img2} alt="Educational Transformation" className="dashboard-imageteacher" />
      </div>

      {/* Explore Now Button */}
      <div className="explore-now-containerteacher">
        <button className="explore-now-buttonteacher">Explore Now</button>
      </div>

      {/* New Section for Fields with Icons */}
      <div className="dashboard-fieldsteacher">
      <div className="field-image-pair">
    <div className="field virtual-classroom-field">
      <SiGoogleclassroom size={50} className="dashboard-icon" />
      <h3>Virtual Classroom</h3>
      <p>Conduct live classes and engage students in an interactive online environment.</p>
      <button className="field-button">Explore More</button>
    </div>
    <img src={img3} alt="Virtual Classroom" className="dashboard-imageteacher" />
  </div>

  {/* Pair 2: E-learning and Image */}
  <div className="field-image-pair">
    <div className="field e-learning-field">
      <FaBookOpenReader size={50} className="dashboard-icon" />
      <h3>E-learning</h3>
      <p>Access a wide range of online courses and learning resources at your convenience.</p>
      <button className="field-button">Explore More</button>
    </div>
    <img src={img4} alt="E-learning" className="dashboard-imageteacher" />
  </div>

  {/* Pair 3: Resource Sharing and Image */}
  <div className="field-image-pair">
    <div className="field resource-sharing-field">
      <IoShareSocial size={50} className="dashboard-icon" />
      <h3>Resource Sharing</h3>
      <p>Share and collaborate on teaching materials with fellow educators.</p>
      <button className="field-button">Explore More</button>
    </div>
    <img src={img5} alt="Resource Sharing" className="dashboard-imageteacher" />
  </div>

  {/* Pair 4: Quizzes and Image */}
  <div className="field-image-pair">
    <div className="field quizzes-field">
      <AiFillCheckCircle size={50} className="dashboard-icon" />
      <h3>Quizzes</h3>
      <p>Create and manage quizzes to assess student understanding and progress.</p>
      <button className="field-button">Explore More</button>
    </div>
    <img src={img6} alt="Quizzes" className="dashboard-imageteacher" />
  </div>

  {/* Pair 5: Resource Request and Image */}
  <div className="field-image-pair">
    <div className="field resource-request-field">
      <PiGitPullRequestThin size={50} className="dashboard-icon" />
      <h3>Resource Request</h3>
      <p>Request specific teaching materials and resources to enhance your lessons.</p>
      <button className="field-button">Explore More</button>
    </div>
    <img src={img7} alt="Resource Request" className="dashboard-imageteacher" />
  </div>
      </div>

      <FooterTeacher />
    </>
  );
}

export default Dashboard;
