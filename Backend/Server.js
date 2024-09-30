// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const pool = require('./db'); // Updated import for MySQL pool

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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

// Import and use routes
app.use('/api/auth', require('./routes/auth')); // Add your auth routes

// Quiz routes
app.post('/create-quiz', async (req, res) => {
  const quiz = req.body;
  quiz.id = quizzes.length + 1;
  quizzes.push(quiz);
  res.json({ message: 'Quiz created successfully!', quiz });
});

// Updated quizzes endpoint to return quizzes based on userId
app.get('/quizzes', async (req, res) => {
  const { userId } = req.query;  // Assume userId is passed in the query
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const [attendedQuizzes] = await pool.query('SELECT quizId FROM submissions WHERE userId = ?', [userId]);
  const attendedQuizIds = attendedQuizzes.map(submission => submission.quizId);

  const [availableQuizzes] = await pool.query('SELECT * FROM quizzes WHERE id NOT IN (?)', [attendedQuizIds]);

  // Always return an array, even if no quizzes are available
  res.json({ quizzes: availableQuizzes.length > 0 ? availableQuizzes : [] });
});

// Handle quiz submission
app.post('/submit-quiz', async (req, res) => {
  const { userId, quizId, answers } = req.body;
  if (!userId || !quizId || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'User ID, Quiz ID, and answers are required' });
  }

  // Store the submission in the MySQL database
  await pool.query('INSERT INTO submissions (userId, quizId, answers) VALUES (?, ?, ?)', [userId, quizId, JSON.stringify(answers)]);
  res.json({ message: 'Quiz submitted successfully!' });
});

// Route to upload resources
app.post('/upload-resource', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;

  // Validate title and description
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  // Check if the file was uploaded successfully
  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  // Store resource data in MySQL database
  const resource = {
    id: Date.now(),
    title,
    description,
    filePath: req.file.path,
  };

  await pool.query('INSERT INTO resources (title, description, filePath) VALUES (?, ?, ?)', [title, description, resource.filePath]);
  
  res.json({ message: 'Resource uploaded successfully!', resource });
});

// Route to get all available resources for a student
app.get('/resources', async (req, res) => {
  const { userId } = req.query; // Assuming userId is passed in the query

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Get all resources from the database
  const [resources] = await pool.query('SELECT * FROM resources');
  
  res.json({ resources });
});

// Start the server on port 3001
server.listen(3001, () => console.log('Server is running on port 3001'));
