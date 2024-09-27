


import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import './SocketContext.css';

const SocketContext = createContext();

const socket = io('http://localhost:3001');  // Ensure your backend is running on this port

const SocketProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [screenSharingStream, setScreenSharingStream] = useState(null);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.error('Error accessing media devices.', err));

    socket.on('me', (id) => setMe(id));
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => socket.emit('answerCall', { signal: data, to: call.from }));
    peer.on('stream', (currentStream) => userVideo.current.srcObject = currentStream);
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => socket.emit('callUser', { userToCall: id, signalData: data, from: me, name }));
    peer.on('stream', (currentStream) => userVideo.current.srcObject = currentStream);
    
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const declineCall = () => {
    setCall({});
    socket.emit('declineCall', { to: call.from });
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
      const videoTrack = screenStream.getVideoTracks()[0];
      
      connectionRef.current.replaceTrack(stream.getVideoTracks()[0], videoTrack, stream);
      
      screenStream.getVideoTracks()[0].onended = () => {
        connectionRef.current.replaceTrack(videoTrack, stream.getVideoTracks()[0], stream);
        setScreenSharingStream(null);
      };
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      declineCall,
      shareScreen,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
