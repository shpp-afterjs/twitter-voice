import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config();

import Fastify from "fastify"
const server = Fastify({logger: true})
import {userRoutes} from "./routes/users.route";
import {authRoutes} from "./routes/auth.route";
import {db} from "./config/db.connection";

server.register(userRoutes, { prefix: '/users' })
server.register(authRoutes, { prefix: '/auth' })

db().then(() => {
    server.listen(3000);
})
