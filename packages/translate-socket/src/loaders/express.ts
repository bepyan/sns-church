import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import api from '../api';
import config from '../config';

export default ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(config.api.prefix, api());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err: Error, req: Request, res: Response) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
