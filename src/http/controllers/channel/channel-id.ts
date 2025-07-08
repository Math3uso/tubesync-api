import { YTMedia } from "@/utils/get-playlist";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function channeIdlController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchama = z.object({
        id: z.string().nonempty()
    });

    const { id } = paramsSchama.parse(request.params);

    // const playlist = await YTMedia.getPlaylists({ name, maxResult: 2 });

    const data = await YTMedia.getChannelData(id);

    return reply.status(200).send({ data });
}