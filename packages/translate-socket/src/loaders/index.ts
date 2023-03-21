import { Application } from 'express';

import expressLoader from './express';
import socketLoader from './socket';
import Logger from '../libs/Logger';

export default async ({ app }: { app: Application }) => {
  const httpServer = await socketLoader({ app });
  Logger.info('༄ Socket.io Server Loaded');

  await expressLoader({ app });
  Logger.info('༄ Express Loaded');

  return httpServer;
};
