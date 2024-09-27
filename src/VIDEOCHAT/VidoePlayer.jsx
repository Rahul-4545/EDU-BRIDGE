
import React, { useContext } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from './SocketContext';
import './VideoPlayer.css';

const Video = styled('video')(({ theme }) => ({
  width: '100%', // Use 100% to fill the container
  height: 'auto', // Maintain aspect ratio
  borderRadius: '10px', // Add some rounding
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center items inside the Paper
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid container justifyContent="center" spacing={2}>
      {stream && (
        <Grid item xs={12} md={6}>
          <PaperContainer>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <Video playsInline muted ref={myVideo} autoPlay />
          </PaperContainer>
        </Grid>
      )}
      {callAccepted && !callEnded && (
        <Grid item xs={12} md={6}>
          <PaperContainer>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <Video playsInline ref={userVideo} autoPlay />
          </PaperContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
