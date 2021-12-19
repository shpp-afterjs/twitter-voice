import Fastify from "fastify"
const server = Fastify({logger: true})
import {routes} from "./src/routes/test.route";

server.register(routes)

server.listen(3000)