import {Test} from "../controllers/test.controller";

export async function routes (fastify, options) {
    fastify.get('/test', async (req: any, res: any) => {
        await Test(req, res)
    })

    //there can be more routes
}

