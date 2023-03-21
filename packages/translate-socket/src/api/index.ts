import { Router } from 'express';

export default () => {
  const app = Router();

  app.get('/', (req, res) => {
    res.json({ message: 'server is running...' }).status(200).end();
  });

  return app;
};
