const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (can be restricted to your frontend origin)
    methods: ["GET", "POST"] // Allowed HTTP methods
  }
});

app.use(cors());

io.on('connection', (socket) => {
  // Emit the socket ID (this acts as the meeting ID)
  socket.emit('me', socket.id);

  // Handle disconnection (call ended)
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  // Teacher creates a room (the room name is the teacher's socket ID)
  socket.on('createRoom', () => {
    socket.join(socket.id);
    console.log(`Room created with ID: ${socket.id}`);
  });

  // Student joins the room using the teacher's meeting ID (socket ID)
  socket.on('joinRoom', ({ meetingID }) => {
    socket.join(meetingID);
    console.log(`Student joined room with ID: ${meetingID}`);
  });

  // Handle the teacher calling a student
  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  // Handle the student answering the call
  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  // Handle call decline
  socket.on('declineCall', ({ to }) => {
    io.to(to).emit('callDeclined');
  });
});

// Server listening on port 3001
server.listen(3001, () => console.log('Server is running on port 3001'));
