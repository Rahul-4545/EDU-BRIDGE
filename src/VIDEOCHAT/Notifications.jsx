
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { SocketContext } from './SocketContext';
import './Notifications.css'; 

const Notifications = () => {
  const { answerCall, call, callAccepted, declineCall } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
          <Button variant="contained" color="secondary" onClick={declineCall}>
            Decline
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
