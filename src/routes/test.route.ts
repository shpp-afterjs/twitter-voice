import {Test} from "../controllers/test.controller";
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.post('/test', Test)

    //there can be more routes
}
