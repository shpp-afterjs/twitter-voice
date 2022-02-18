import jwt from "jsonwebtoken"
import {FastifyReply, FastifyRequest} from "fastify";

const {
    JWT_SECRET
} = process.env;

export function authGuard(req: FastifyRequest, res: FastifyReply) {
        const token = req.headers.authorization?.split(" ")[1]
        console.log(token)
        if(!token) {
            return res.status(401).send({
                error: 'Unauthorized'
            })
        }
        try {
            jwt.verify(token, JWT_SECRET || '')
            return true
        } catch (e) {
            return false
        }
}
