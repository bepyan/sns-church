import cors from 'cors';
import express from 'express';

import api from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(config.api.prefix, api());
};
