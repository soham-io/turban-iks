import express from 'express';
import { museumRouter } from './routes/museumRoutes.js';

export function createMuseumApp() {
  const app = express();

  app.use(express.json());
  app.use('/api', museumRouter);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', museum: 'PAGDI — The Turban Museum of India' });
  });

  return app;
}
