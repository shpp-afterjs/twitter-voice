import "reflect-metadata";
import dotenv from 'dotenv'
dotenv.config();

import Fastify from "fastify"
const server = Fastify({logger: true})
<<<<<<< HEAD
import {routes} from "./routes/users.route";
import {db} from "./config/db.connection";

server.register(routes, { prefix: '/users' })
=======
import {routes} from "./routes/test.route";
import {db} from "./config/db.connection";

server.register(routes)
>>>>>>> a32ad2cfd331f0692cdd83e9344d79eba4dd4369
db().then(() => {
    server.listen(3000);
})
