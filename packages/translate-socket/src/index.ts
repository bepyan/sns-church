import express from 'express';

import config from './config';
import Logger from './libs/Logger';

const app = express();
const PORT = config.port;

(async () => {
  app.listen(PORT, () => {
    Logger.info(
      `
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃   Server listening on port: ${PORT}    ┃
    ┃     http://localhost:${PORT}/api       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `,
    ).on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
  });
})();
