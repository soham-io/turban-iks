import type { IncomingMessage, ServerResponse } from 'node:http';
import { createMuseumApp } from '../server/app.js';

const app = createMuseumApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  app(req, res);
}
