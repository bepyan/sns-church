import { createServer } from 'http';

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@sns/shared';
import { format } from 'date-fns';
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
      const props = {
        message: message.trim(),
        time: format(new Date(), 'HH:mm:ss'),
      };

      socket.emit('updateMessages', props);
      socket.broadcast.emit('updateMessages', props);
    });

    socket.on('sendCurrentMessage', (message) => {
      socket.emit('updateCurrentMessage', message);
      socket.broadcast.emit('updateCurrentMessage', message);
    });

    socket.on('sendCurrentTranslatedMessage', (message) => {
      socket.emit('updateCurrentTranslatedMessage', message);
      socket.broadcast.emit('updateCurrentTranslatedMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });

  return httpServer;
};
