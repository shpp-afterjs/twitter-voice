import {Test} from "../controllers/test.controller";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.get('/test', Test)

    //there can be more routes
}


