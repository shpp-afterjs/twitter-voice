import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config();

import Fastify from "fastify"
const server = Fastify({logger: true})
import {routes} from "./routes/users.route";
import {db} from "./config/db.connection";

server.register(routes, { prefix: '/users' })
db().then(() => {
    server.listen(3000);
})
