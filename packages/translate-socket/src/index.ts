import express from 'express';

import config from './config';
import Logger from './libs/Logger';
import loaders from './loaders';

const app = express();

(async () => {
  const server = await loaders({ app });

  server.listen(config.port, () => {
    Logger.info(
      `
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃   Server listening on port: ${config.port}    ┃
    ┃     http://localhost:${config.port}/api       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `,
    ).on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
  });
})();
