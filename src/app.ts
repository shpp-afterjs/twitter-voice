import 'reflect-metadata';
import dotenv from 'dotenv';

import Fastify from 'fastify';
import { routes } from './routes/test.route';
import { db } from './config/db.connection';

dotenv.config();
const server = Fastify({ logger: true });

server.register(routes);
db().then(() => {
  server.listen(3000);
});
