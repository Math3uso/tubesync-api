import ytdl from "@distube/ytdl-core";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function playController(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        id: z.string().nonempty()
    });

    const { id } = querySchema.parse(request.query);

    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    if (!ytdl.validateURL(videoUrl)) {
        return reply.status(401).send({ message: "error url invalid" });
    }

    const mediaInfo = await ytdl.getInfo(videoUrl);

    const format = mediaInfo.formats.find(format => format.audioCodec);
    //const videos = await ytsr(`${mediaInfo.videoDetails.title} ${mediaInfo.videoDetails.author.name}`, { limit: 10 });

    if (!format) {
        return reply.status(500).send({ message: "formato n suportado" });
    }

    return reply.status(200).send({
        mediaUrl: format?.url,
    });
}