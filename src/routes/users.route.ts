import {CreateUser, getUsers, getUser} from "../controllers/users.controller";
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {

    fastify.post('/create', CreateUser)
    fastify.get('/', getUsers)
    fastify.get('/:userId', getUser)

    //there can be more routes
}
