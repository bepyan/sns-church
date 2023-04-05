import { ClientToServerEvents, ServerToClientEvents } from '@sns/shared';
import { io, Socket } from 'socket.io-client';

import { addMassage, setCurrentMessage, setIsSocketConnected } from './states';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  // 'http://localhost:8000',
  'https://sns-church.onrender.com',
);

socket.on('connect', () => {
  console.log('SOCKET CONNECTED!', socket.id);
  setIsSocketConnected(true);
});

socket.on('updateMessages', (message) => {
  addMassage(message.trim());
});

socket.on('updateCurrentMessage', (message) => {
  setCurrentMessage(message.trim());
});

socket.on('connect_error', () => {
  console.log('SOCKET CONNECT ERROR!', socket.id);
  setTimeout(() => {
    socket.connect();
  }, 1000);
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
  setIsSocketConnected(false);
});

export default socket;
