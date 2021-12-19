import {Test} from "../controllers/test.controller";

export async function routes (fastify, options) {
    fastify.get('/test', Test)

    //there can be more routes
}


