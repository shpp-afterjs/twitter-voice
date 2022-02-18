import * as AuthControllers from "../controllers/auth.controller";
import {
    FastifyInstance,
    FastifyServerOptions,
} from "fastify";

import {authGuard} from "../guards/auth.guard";
import * as UserControllers from "../controllers/users.controller";

export async function authRoutes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.register(require('fastify-express'))
    fastify.post('/signup' ,AuthControllers.signUp)
    fastify.post('/signin', AuthControllers.signIn)
    fastify.register(async route => {
        route.addHook('preHandler', async (req, res) => {
            const result = await authGuard(req, res)
            if(!result) {
                return res.status(401).send({
                    error: 'Unauthorized (Invalid Token)'
                })
            }
        })

        route.get('/me', AuthControllers.authMe)
    })
    //there can be more routes
}
