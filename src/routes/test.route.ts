import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { Test } from '../controllers/test.controller';

export async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.get('/test', Test);

  fastify.post('/test', Test);

  // there can be more routes
}
