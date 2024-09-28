import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, MenuItem, Select } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone } from '@mui/icons-material';
import { SocketContext } from './SocketContext';

const Options = ({ children }) => {
  const { me, name, setName, callAccepted, callEnded, leaveCall, callUser, createMeeting, role, setRole, meetingID } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState(''); // ID to call

  return (
    <Container>
      <Paper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              
              {/* Role selection */}
              <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>

              {role === 'teacher' && (
                <>
                  <Button variant="contained" color="primary" fullWidth onClick={createMeeting}>
                    Create Meeting
                  </Button>
                  {meetingID && (
                    <CopyToClipboard text={meetingID}>
                      <Button variant="contained" color="primary" fullWidth startIcon={<Assignment />}>
                        Copy Meeting ID
                      </Button>
                    </CopyToClipboard>
                  )}
                </>
              )}
            </Grid>

            {/* Student joins the meeting by ID */}
            {role === 'student' && (
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">Join Meeting</Typography>
                <TextField label="Meeting ID" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                <Button variant="contained" color="primary" fullWidth startIcon={<Phone />} onClick={() => callUser(idToCall)}>
                  Join Meeting
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
