import {FastifyReply, FastifyRequest} from "fastify";
import {Users} from "../entity/users";
import {getRepository, Repository} from "typeorm";
import crypto from 'crypto'

import {getOneUserRequestValidator, userValidator} from "../validators/user";

import {validate} from "class-validator";

function deletePasswords(obj: Users) {
    delete obj.password
    return true
}

export async function findAll(req: FastifyRequest, res: FastifyReply) {
    const data = await getRepository(Users).find()
    return data.filter(deletePasswords)
}

export async function findOne(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    const RequestId: number = Number((req.params as getOneUserRequestValidator).userId)

    let request = new getOneUserRequestValidator()
    request.userId = RequestId

    const validation = await validate(request)
    if(validation.length) {
        return res.status(400).send({
            ok: false,
            errors: validation
        });
    }

    let user = await data.findOne({
        where: {
            id: request.userId
        }
    })

    if(!user) {
        return res.status(404).send({
            ok: false,
            errors: validation
        })
    }
    delete user?.password
    return user;
}

export async function deleteOne(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    const RequestId: number = Number((req.params as getOneUserRequestValidator).userId)

    let request = new getOneUserRequestValidator()
    request.userId = RequestId

    const validation = await validate(request)
    if(validation.length) {
        return res.status(400).send({
            ok: false,
            errors: validation
        });
    }

    let user = await data.delete({
        id: request.userId
    })

    if(!user) {
        return res.status(404).send({
            ok: false,
            errors: validation
        })
    }

    return res.status(200).send({"ok": true});
}

export async function updateOne(req: FastifyRequest, res: FastifyReply) {
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
    if(validation.length) {
        return res.status(400).send({
            ok: false,
            errors: validation
        });
    }

    const passwordHash = crypto.pbkdf2Sync(user.password, salt, 1000, 60, 'sha512').toString('hex')

    await getRepository(Users).update(
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
