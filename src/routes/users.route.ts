import * as UserControllers from "../controllers/users.controller";
import {
    FastifyInstance,
    FastifyServerOptions,
} from "fastify";

import {authGuard} from "../guards/auth.guard";

export async function userRoutes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.post('/', UserControllers.create)
    fastify.register(async route => {
        route.addHook('preHandler', async (req, res) => {
            const result = await authGuard(req, res)
            if(!result) {
                return res.status(401).send({
                    error: '401 Unauthorized (Invalid Token)'
                })
            }
        })

        route.get('/', UserControllers.findAll)
    })
    fastify.get('/:userId', UserControllers.findOne)
    fastify.delete("/:userId", UserControllers.deleteOne)
    fastify.put("/:userId", UserControllers.updateOne)
    //there can be more routes
}
