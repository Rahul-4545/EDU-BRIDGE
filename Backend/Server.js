const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// In-memory quizzes and submissions
let quizzes = [];
let submissions = []; // Each submission should store: { userId, quizId, answers }

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

// Quiz routes
app.post('/create-quiz', (req, res) => {
  const quiz = req.body;
  quiz.id = quizzes.length + 1;
  quizzes.push(quiz);
  res.json({ message: 'Quiz created successfully!', quiz });
});

// Updated quizzes endpoint to return quizzes based on userId
app.get('/quizzes', (req, res) => {
  const { userId } = req.query;  // Assume userId is passed in the query
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const attendedQuizIds = submissions
    .filter(submission => submission.userId === userId)
    .map(submission => submission.quizId);

  const availableQuizzes = quizzes.filter(quiz => !attendedQuizIds.includes(quiz.id));

  // Always return an array, even if no quizzes are available
  res.json({ quizzes: availableQuizzes.length > 0 ? availableQuizzes : [] });
});

// Handle quiz submission
app.post('/submit-quiz', (req, res) => {
  const { userId, quizId, answers } = req.body;
  if (!userId || !quizId || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'User ID, Quiz ID, and answers are required' });
  }

  // Store the submission
  submissions.push({ userId, quizId, answers });
  res.json({ message: 'Quiz submitted successfully!' });
});

// Start the server on port 3001
server.listen(3001, () => console.log('Server is running on port 3001'));
