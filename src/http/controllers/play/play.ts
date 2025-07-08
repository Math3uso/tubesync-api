import ytdl from "@distube/ytdl-core";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function playController(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        id: z.string().nonempty()
    });

    const { id } = querySchema.parse(request.query);

    const mediaInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);

    const format = mediaInfo.formats.find(format => format.audioCodec);

    return reply.status(200).send(format?.url);
}