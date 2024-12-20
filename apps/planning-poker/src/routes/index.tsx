import { FormEventHandler, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCreateRoom } from '../api/room';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const theme = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();

  const {
    data: createRoomResponse,
    isSuccess: isCreateRoomSuccess,
    isError: isCreateRoomError,
    error: createRoomError,
    mutate: createRoom,
  } = useCreateRoom();

  useEffect(() => {
    if (isCreateRoomSuccess) {
      navigate({ to: `/rooms/${createRoomResponse.id}` });
    }
  }, [isCreateRoomSuccess]);

  useEffect(() => {
    if (isCreateRoomError) {
      alert(`An error occured ${createRoomError.message}`);
    }
  }, [isCreateRoomError]);

  const handleCreateRoom: FormEventHandler = (event) => {
    event.preventDefault();
    createRoom({ admin: name });
  };

  const handleJoinRoom: FormEventHandler = (event) => {
    event.preventDefault();
    navigate({ to: `/rooms/${roomId}` });
  };

  return (
    <Box className="flex w-100 flex-col items-center gap-4">
      <Typography className="pt-4 text-center" sx={styles.title} variant="h1">
        Planning Poker
      </Typography>
      <Typography className="text-center" sx={styles.subtitle} variant="h2">
        Welcome to Planning Poker!
      </Typography>
      <Box sx={styles.forms} className="flex pt-12 gap-4">
        <Box
          component="form"
          className="flex flex-col gap-2"
          onSubmit={handleCreateRoom}
        >
          <TextField
            label="Enter your name"
            required
            name="name"
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit" variant="contained">
            Create room
          </Button>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          component="form"
          className="flex flex-col gap-2"
          onSubmit={handleJoinRoom}
        >
          <TextField
            label="Enter room ID"
            required
            name="roomId"
            onChange={(event) => setRoomId(event.target.value)}
          />
          <Button type="submit" variant="contained">
            Join room
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function useStyles(theme: Theme): Record<string, SxProps<Theme>> {
  return {
    subtitle: {
      fontSize: '1.5rem',
    },
    title: {
      fontSize: '3rem',
    },
    forms: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  };
}
