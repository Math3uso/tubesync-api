import { YTMedia } from "@/repository/yt-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchama = z.object({
        name: z.string().nonempty()
    });

    const { name } = paramsSchama.parse(request.params);

    const { videoInfo } = await YTMedia.getListVideos({ name });

    const playList = await YTMedia.getPlaylists({ name, maxResult: 3 });

    return reply.status(200).send({
        videoInfo,
        playList
    });

    // const playlist = await YTMedia.getPlaylists({ name, maxResult: 2 });

    // return reply.status(200).send({ playlist });
}