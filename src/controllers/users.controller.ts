import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {Users} from "../entity/users";
import {getRepository, Repository} from "typeorm";
import crypto from 'crypto'

import { userValidator, getOneUserRequestValidator } from "../validators/user";
import { validate } from "class-validator";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const requestBody = req.body as userValidator

    const salt: string = crypto.randomBytes(16).toString('hex')

    let user = new userValidator()
    user.name = requestBody.name
    user.lastname = requestBody.lastname
    user.gender = requestBody.gender
    user.birthday = requestBody.birthday
    user.email = requestBody.email
    user.password = requestBody.password
    user.salt = salt
    user.ip = requestBody.ip

    const validation = await validate(user)
    if(validation.length > 0) {
        res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    const passwordHash = crypto.pbkdf2Sync(user.password, salt, 1000, 60, 'sha512').toString('hex')

    const request = await getRepository(Users).save({
        name: user.name,
        lastname: user.lastname,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
        password: passwordHash,
        salt: salt,
        ip: user.ip,
    });

    return {
        name: request.name,
        lastname: request.lastname,
        gender: request.gender,
        birthday: request.birthday,
        email: request.email,
    }
}

export async function getUsers(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    return data.find()
}

export async function getUser(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    const RequestId: number = Number((req.params as getOneUserRequestValidator).userId)

    let request = new getOneUserRequestValidator()
    request.userId = RequestId

    const validation = await validate(request)
    if(validation.length > 0) {
        res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    let user = await data.findOne({
        where: {
            id: request.userId
        }
    })

    if(!user) {
        res.status(404).send({
            ok: 'false',
            errors: validation
        })
    }
    return user;
}

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    const RequestId: number = Number((req.params as getOneUserRequestValidator).userId)

    let request = new getOneUserRequestValidator()
    request.userId = RequestId

    const validation = await validate(request)
    if(validation.length > 0) {
        res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    let user = await data.delete({
        id: request.userId
    })

    if(!user) {
        res.status(404).send({
            ok: 'false',
            errors: validation
        })
    }

    return res.status(200).send({"ok": true});
}

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
    const RequestBody = req.body as userValidator

    const RequestId: number = Number((req.params as getOneUserRequestValidator).userId)

    const salt: string = crypto.randomBytes(16).toString('hex')

    let user = new userValidator()
    user.name = RequestBody.name
    user.lastname = RequestBody.lastname
    user.gender = RequestBody.gender
    user.birthday = RequestBody.birthday
    user.email = RequestBody.email
    user.password = RequestBody.password
    user.salt = salt
    user.ip = RequestBody.ip

    const validation = await validate(user)
    if(validation.length > 0) {
        res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    const passwordHash = crypto.pbkdf2Sync(user.password, salt, 1000, 60, 'sha512').toString('hex')

    const request = getRepository(Users).update(
        RequestId ,
        {
            name: user.name,
            lastname: user.lastname,
            gender: user.gender,
            birthday: user.birthday,
            email: user.email,
            password: passwordHash,
            salt: salt,
            ip: user.ip,
        }
    );

    return {
        name: user.name,
        lastname: user.lastname,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
    }

}
