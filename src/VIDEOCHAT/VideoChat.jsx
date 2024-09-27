import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import VideoPlayer from './VidoePlayer'; 
import Notifications from './Notifications';
import Options from './Options';
import './VideoChat.css';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',
  padding: '10px',
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column', // Change to column for better stacking
  alignItems: 'center',
  height: '100vh',
});

const VideoChat = () => (
  <Wrapper>
    <AppBarStyled position="static" color="inherit">
      <Typography variant="h2" align="center">Video Chat</Typography>
    </AppBarStyled>
    <VideoPlayer />
    <Options>
      <Notifications />
    </Options>
  </Wrapper>
);

export default VideoChat;