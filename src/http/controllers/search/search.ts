import { YTMedia } from "@/utils/get-playlist";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchama = z.object({
        name: z.string().nonempty()
    });

    const { name } = paramsSchama.parse(request.params);

    const playlist = await YTMedia.getPlaylists({ name, maxResult: 2 });

    return reply.status(200).send({ playlist });
}