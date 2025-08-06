import { YTMedia } from "@/repository/yt-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function channeIdlController(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        id: z.string().nonempty()
    });

    const { id } = querySchema.parse(request.query);

    // const playlist = await YTMedia.getPlaylists({ name, maxResult: 2 });

    const data = await YTMedia.getChannelData(id);

    return reply.status(200).send({ data });
}