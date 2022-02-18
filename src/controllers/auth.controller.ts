import {FastifyReply, FastifyRequest} from "fastify";
import {getRepository, Repository} from "typeorm";
import {Users} from "../entity/users";
import {authRequestValidator, signupRequestValidator} from "../validators/user";
import {validate} from "class-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {jwt_payload} from "../interfaces/jwt.interface"

const {
    JWT_SECRET,
    JWT_EXPIN,
    JWT_ISS,
    JWT_SUB,
    JWT_AUD,
    JWT_NOTBEFORE
} = process.env;

export async function signIn(req: FastifyRequest, res: FastifyReply) {
    const dataDB: Repository<Users> = await getRepository(Users)

    const { email, password } = (req.body as authRequestValidator)
    const data = new authRequestValidator()
    data.email = email
    data.password = password

    const validation = await validate(data)
    if(validation.length) {
        return res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    let user = await dataDB.findOne({
        where: {
            email: email
        }
    })

    if(!user) {
        return res.status(404).send({
            error: '404 Not Found'
        })
    }
    const passwordHash = crypto.pbkdf2Sync(password, user.salt, 1000, 60, 'sha512').toString('hex')
    if(user.password === passwordHash) {
        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET || '', {
            expiresIn: JWT_EXPIN,
            issuer: JWT_ISS,
            subject: JWT_SUB,
            audience: JWT_AUD,
            notBefore: JWT_NOTBEFORE
        })

        return res.send({
            token: token
        })
    }
    return res.status(400).send({
        error: '400 Bad Request'
    })
}

export async function authMe(req: FastifyRequest, res: FastifyReply) {
    const data: Repository<Users> = await getRepository(Users)
    const token = jwt.verify((req.headers.authorization?.split(" ")[1] as string),JWT_SECRET || '')
    let user = await data.findOne({
        where: {
            id: (token as jwt_payload).id
        }
    })
    delete user?.password
    res.send(user)
}

export async function signUp(req: FastifyRequest, res: FastifyReply) {
    const dataDB: Repository<Users> = await getRepository(Users)

    const { email, password, gender, name, lastname, birthday } = (req.body as signupRequestValidator)
    const data = new signupRequestValidator()
    data.email = email
    data.password = password
    data.gender = gender
    data.name = name
    data.lastname = lastname
    data.birthday = birthday

    const validation = await validate(data)
    if(validation.length) {
        return res.status(400).send({
            ok: 'false',
            errors: validation
        });
    }

    let user = await dataDB.findOne({
        where: {
            email: email
        }
    })
    if(user) {
        return res.status(409).send({
            error: '409 Conflict'
        })
    }
    const salt: string = crypto.randomBytes(16).toString('hex')
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 60, 'sha512').toString('hex')

    await dataDB.save({
        name: name,
        lastname: lastname,
        gender: gender,
        birthday: birthday,
        email: email,
        password: passwordHash,
        salt: salt,
        ip: req.ip,
    })

    return res.send({
        name: name,
        lastname: lastname,
        gender: gender,
        birthday: birthday,
        email: email,
    })
}
