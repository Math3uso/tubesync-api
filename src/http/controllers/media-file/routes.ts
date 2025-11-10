import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreateMediaFileController } from "./create-media-file-controller";

export async function mediaFileRoutes(app: FastifyInstance) {

    app.post("/mediafile", { preHandler: verifyJwt }, (request, reply) => {
        return new CreateMediaFileController(request, reply).execute();
    });
}