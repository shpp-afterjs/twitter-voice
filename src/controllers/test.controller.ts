import { FastifyRequest, FastifyReply } from 'fastify';
import { getRepository } from 'typeorm';
import { Users } from '../entity/users';

export function Test(req: FastifyRequest, res: FastifyReply) {
  const random = Math.floor(Math.random() * 1000000000); // this is for test
  return getRepository(Users).save({
    name: String(random),
  });
}
