import * as UserControllers from "../controllers/users.controller";
import {FastifyInstance, FastifyServerOptions} from "fastify";

export async function routes (fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.post('/', UserControllers.create)
    fastify.get('/', UserControllers.findAll)
    fastify.get('/:userId', UserControllers.findOne)
    fastify.delete("/:userId", UserControllers.deleteOne)
    fastify.put("/:userId", UserControllers.updateOne)
    //there can be more routes
}
