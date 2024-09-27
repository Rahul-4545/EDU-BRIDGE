
import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, ScreenShare } from '@mui/icons-material';
import { SocketContext } from './SocketContext';
import './Options.css';

const Root = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const GridContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('xs')]: {
    width: '80%',
  },
}));

const Padding = styled('div')({
  padding: 20,
});

const StyledPaper = styled(Paper)({
  padding: '10px 20px',
  border: '2px solid black',
});

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, shareScreen } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <Root noValidate autoComplete="off">
          <GridContainer container>
            <Grid item xs={12} md={6}>
              <Padding>
                <Typography gutterBottom variant="h6">Account Info</Typography>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                <CopyToClipboard text={me}>
                  <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Padding>
            </Grid>
            <Grid item xs={12} md={6}>
              <Padding>
                <Typography gutterBottom variant="h6">Make a Call</Typography>
                <TextField label="ID to Call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                {callAccepted && !callEnded ? (
                  <>
                    <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                      Hang Up
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<ScreenShare fontSize="large" />} fullWidth onClick={shareScreen}>
                      Share Screen
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                    Call
                  </Button>
                )}
              </Padding>
            </Grid>
          </GridContainer>
        </Root>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Options;
