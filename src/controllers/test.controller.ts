import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export function Test(req: FastifyRequest, res: FastifyReply) {
    res.send('Hello World!')
}
