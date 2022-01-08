import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {Users} from "../entity/users";
import {getRepository} from "typeorm";



export function Test(req: FastifyRequest, res: FastifyReply) {
    const random = Math.floor(Math.random() * 1000000000) //this is for test
    return getRepository(Users).save({
        name: String(random),
        lastname: String(random),
        gender: "male",
        birthday: "2022-01-04",
        email: String(random),
        password: String(random),
        ip: String(random),
        dateLastAdd: "2022-01-04",
        dateLastUpdate: "2022-01-04",
        dateCreateAcount: "2022-01-04"
    });
}
