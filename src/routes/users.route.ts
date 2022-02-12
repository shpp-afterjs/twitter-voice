import * as UserControllers from "../controllers/users.controller";
import {
    FastifyInstance,
    FastifyServerOptions,
} from "fastify";

import {authGuard} from "../guards/auth.guard";

const fastify = require('fastify')()
const router = require('express').Router()

// export async function userRoutes (fastify: any, options: FastifyServerOptions) {
//     router.get('/', authGuard ,UserControllers.findAll)
//     router.get('/:userId', UserControllers.findOne)
//     router.delete("/:userId", UserControllers.deleteOne)
//     router.put("/:userId", UserControllers.updateOne)
//     await fastify.register(require('fastify-express'))
//         .after(() => {fastify.use(router)})
//     //there can be more routes
// }

export function routes() {
    router.get('/', authGuard ,UserControllers.findAll)
    router.get('/:userId', UserControllers.findOne)
    router.delete("/:userId", UserControllers.deleteOne)
    router.put("/:userId", UserControllers.updateOne)
    fastify.register(require('fastify-express'))
        .after(() => {fastify.use(router)})
}