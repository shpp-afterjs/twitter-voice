import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {Users} from "../entity/users";
import {getRepository} from "typeorm";
import crypto from 'crypto'

import { userValidator } from "../validators/user";
import { validate } from "class-validator";

export async function CreateUser(req: FastifyRequest, res: FastifyReply) {
    const random = Math.floor(Math.random() * 1000000000) //this is for test
    const RequestBody = req.body as userValidator

    const salt = crypto.randomBytes(16).toString('hex')

    let request = new userValidator()
    request.name = RequestBody.name
    request.lastname = RequestBody.lastname
    request.gender = RequestBody.gender
    request.birthday = RequestBody.birthday
    request.email = RequestBody.email
    request.password = RequestBody.password
    request.salt = salt
    request.ip = RequestBody.ip

    const validation = await validate(request)
    if(validation.length > 0) {
        res.status(400)
        return {
            ok: 'false',
            errors: validation
        }
    }

    const passwordHash = crypto.pbkdf2Sync(request.password, salt, 1000, 60, 'sha512').toString('hex')

    const user = await getRepository(Users).save({
        name: request.name,
        lastname: request.lastname,
        gender: request.gender,
        birthday: request.birthday,
        email: request.email,
        password: passwordHash,
        salt: salt,
        ip: request.ip,
    });

    return {
        name: user.name,
        lastname: user.lastname,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
    }
}
