import {CreateUser} from "../controllers/users.controller";
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {

    fastify.post('/create', CreateUser)

    //there can be more routes
}
