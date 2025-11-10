import { FastifyInstance } from "fastify";
import { CreatePlaylistController } from "./create-playlist-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { CreateMediaFileInPlaylistController } from "./create-media-file-controller";

export async function playlistRoutes(app: FastifyInstance) {
    app.post("/playlist", { preHandler: verifyJwt }, async (request, reply) => {
        return new CreatePlaylistController(request, reply).execute();
    });

    app.post("/playlist/media", { preHandler: verifyJwt }, async (request, reply) => {
        return new CreateMediaFileInPlaylistController(request, reply).execute()
    });
}