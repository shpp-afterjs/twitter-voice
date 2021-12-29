import {Test} from "../controllers/test.controller";

export async function routes (fastify: any, options: any) {
    fastify.get('/test', Test)

    //there can be more routes
}


