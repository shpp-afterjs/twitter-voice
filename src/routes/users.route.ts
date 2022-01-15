import {createUser, getUsers, getUser, deleteUser} from "../controllers/users.controller";
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.post('/create', createUser)
    fastify.get('/', getUsers)
    fastify.get('/:userId', getUser)
    fastify.delete("/:userId", deleteUser)
    //there can be more routes
}
