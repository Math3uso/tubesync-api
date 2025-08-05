import { FastifyInstance } from "fastify";
import { searchController } from "@/http/controllers/search/search"
import { playController } from "../controllers/play/play";
import { YTMedia } from "@/repository/yt-repository";
import { channeIdlController } from "../controllers/channel/channel-id";
import { GetListByKeyword } from 'youtube-search-api';
import { ChannelInfo, PlaylistInfo, VideoInfo } from "@/@types/medias";
import { searchControllerV2 } from "../controllers/search/search_v2";
import { verifyJwt } from "../middlewares/verify-jwt";


export async function appRoutes(app: FastifyInstance) {
    app.get("/teste", async (req, reply) => {
        return reply.status(200).send({ message: "foi" });
    });

    app.get("/search/:name", { onRequest: [verifyJwt] }, searchController);
    app.get("/search/v2/:name", { onRequest: [verifyJwt] }, searchControllerV2);
    app.get("/play", { onRequest: [verifyJwt] }, playController);
    app.get("/chennel/:id", { onRequest: [verifyJwt] }, channeIdlController);

    // app.get("/teste2/:name", async (req, reply) => {

    //     const { name } = req.params as { name: string };

    //     const { videoInfo } = await YTMedia.getListVideos({ name });

    //     const playList = await YTMedia.getPlaylists({ name, maxResult: 5 });

    //     return reply.status(200).send({
    //         videoInfo,
    //         playList
    //     });
    // });
}