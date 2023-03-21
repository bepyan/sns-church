import { createServer } from 'http';

import { Application } from 'express';
import { Server } from 'socket.io';

export default ({ app }: { app: Application }) => {
  const httpServer = createServer(app);
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    httpServer,
    {
      cors: {
        origin: '*',
      },
    },
  );

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('sendMessage', (message) => {
      console.log('sendMessage:', message);
      socket.emit('updateMessages', message);
      socket.broadcast.emit('updateMessages', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });

  return httpServer;
};
