<<<<<<< HEAD:src/routes/users.route.ts
import {CreateUser} from "../controllers/users.controller";
=======
import {Test} from "../controllers/test.controller";
>>>>>>> a32ad2cfd331f0692cdd83e9344d79eba4dd4369:src/routes/test.route.ts
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {

<<<<<<< HEAD:src/routes/users.route.ts
    fastify.post('/create', CreateUser)
=======
    fastify.get('/test', Test)

    fastify.post('/test', Test)
>>>>>>> a32ad2cfd331f0692cdd83e9344d79eba4dd4369:src/routes/test.route.ts

    //there can be more routes
}
