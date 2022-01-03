import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {Users} from "../entity/users";
import {getRepository} from "typeorm";



export function Test(req: FastifyRequest, res: FastifyReply) {
    const random = Math.floor(Math.random() * 1000000000) //this is for test
    return getRepository(Users).save({
        name: String(random)
    });
}
