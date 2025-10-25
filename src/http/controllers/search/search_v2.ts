import { PlaylistInfo, VideoInfo } from "@/@types/medias";
import { YTMedia } from "@/repository/yt-repository";
import { formatPlaylist, makeVideoInfov2 } from "@/utils/make-videoInfo-v2";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetListByKeyword } from "youtube-search-api";
import z from "zod";

export async function searchControllerV2(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchama = z.object({
        name: z.string().nonempty()
    });

    try {

        const { name } = paramsSchama.parse(request.query);

        console.log(name);

        const results = await GetListByKeyword(name, false, 10);

        const videos: VideoInfo[] = [];
        const playlists: PlaylistInfo[] = [];

        if (results.items) {
            results.items.forEach((item: any) => {
                switch (item.type) {
                    case 'video':
                        videos.push(makeVideoInfov2(item));
                        break;
                    case 'playlist':
                        playlists.push(formatPlaylist(item));
                        break;
                }
            });
        }

        return reply.status(200).send({
            // videos,
            // playlists
            results
        });

    } catch (error) {
        console.error('Erro na busca:', error);
        return reply.status(500).send({
            message: 'An error occurred while processing your request.'
        });
    }

}