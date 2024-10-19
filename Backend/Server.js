// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const pool = require('./db'); // MySQL connection pool

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity; update in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads folder

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Socket.io functionality
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('createRoom', () => {
    socket.join(socket.id);
    console.log(`Room created with ID: ${socket.id}`);
  });

  socket.on('joinRoom', ({ meetingID }) => {
    socket.join(meetingID);
    console.log(`Student joined room with ID: ${meetingID}`);
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('declineCall', ({ to }) => {
    io.to(to).emit('callDeclined');
  });
});














// Authentication Routes
app.use('/api/auth', require('./routes/auth')); // Auth routes

// Create a quiz
app.post('/create-quiz', async (req, res) => {
  const { title, questions, created_by } = req.body;

  if (!title || !questions || questions.length === 0 || !created_by) {
    return res.status(400).json({ message: 'Title, questions (non-empty), and created_by are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO quizzes (title, questions, created_by, created_at) VALUES (?, ?, ?, NOW())',
      [title, JSON.stringify(questions), created_by]
    );
    res.status(201).json({ message: 'Quiz created successfully!', result });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// Fetch quizzes
app.get('/quizzes', async (req, res) => {
  try {
    const [quizzes] = await pool.query('SELECT * FROM quizzes');
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Delete a quiz
app.delete('/delete-quiz/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM quizzes WHERE title = ?', [title]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

// Submit a quiz
app.post('/submit-quiz', async (req, res) => {
  const { quiz_title, quiz_created_by, answers } = req.body;
  const user_id = 1; // Example user ID, should come from authentication

  if (!quiz_title || !answers || answers.length === 0 || !quiz_created_by) {
    return res.status(400).json({ message: 'Quiz title, answers, and created_by are required' });
  }

  try {
    const [existingSubmission] = await pool.query(
      'SELECT * FROM submissions WHERE quiz_title = ? AND user_id = ?',
      [quiz_title, user_id]
    );

    if (existingSubmission.length > 0) {
      return res.status(400).json({ message: 'You have already submitted this quiz.' });
    }

    const [result] = await pool.query(
      'INSERT INTO submissions (user_id, quiz_title, quiz_created_by, answers, submitted_at) VALUES (?, ?, ?, ?, NOW())',
      [user_id, quiz_title, quiz_created_by, JSON.stringify(answers)]
    );
    res.status(201).json({ message: 'Quiz submitted successfully!', result });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Error submitting quiz' });
  }
});

// Fetch submitted quizzes for a user
app.get('/submitted-quizzes/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [submittedQuizzes] = await pool.query('SELECT quiz_title FROM submissions WHERE user_id = ?', [userId]);
    const titles = submittedQuizzes.map((submission) => submission.quiz_title);
    res.status(200).json({ submittedQuizzes: titles });
  } catch (error) {
    console.error('Error fetching submitted quizzes:', error);
    res.status(500).json({ message: 'Error fetching submitted quizzes' });
  }
});








// Upload Resource Route
app.post('/upload-resource', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  try {
    await pool.query('INSERT INTO resources (title, description, filePath) VALUES (?, ?, ?)', [title, description, req.file.path]);
    res.json({ message: 'Resource uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resource', error });
  }
});

// Fetch Resources without userId requirement
app.get('/resources', async (req, res) => {
  try {
    const [resources] = await pool.query('SELECT * FROM resources');
    res.json({ resources });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
