import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {Users} from "../entity/users";
import {getRepository} from "typeorm";
import crypto from 'crypto'

import { requestValidator } from "../validators/request";
import { validate } from "class-validator";

export async function Test(req: FastifyRequest, res: FastifyReply) {
    const random = Math.floor(Math.random() * 1000000000) //this is for test

    const salt = crypto.randomBytes(16).toString('hex')
    let request = new requestValidator()
    request.text = (req.body as requestValidator).text
    const validation = await validate(request)
    if(validation.length > 0) {
        return {
            ok: 'false',
            errors: validation
        }
    }

    const passwordHash = crypto.pbkdf2Sync((req.body as requestValidator).text, salt, 1000, 60, 'sha512').toString('hex')

    const user = await getRepository(Users).save({
        name: String(random),
        lastname: String(random),
        gender: "male",
        birthday: "2022-01-04",
        email: String(random),
        password: passwordHash,
        ip: String(random),
        dateLastAdd: "2022-01-04",
        dateLastUpdate: "2022-01-04",
        dateCreateAccount: "2022-01-04"
    });

    return {
        name: user.name,
        lastname: user.lastname,
        // тут можно вернуть ещё больше параметров
    }
}
