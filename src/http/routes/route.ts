import { FastifyInstance } from "fastify";
import { searchController } from "@/http/controllers/search/search"
import { playController } from "../controllers/play/play";
import { YTMedia } from "@/repository/yt-repository";
import { channeIdlController } from "../controllers/channel/channel-id";
import { GetListByKeyword } from 'youtube-search-api';
import { ChannelInfo, PlaylistInfo, VideoInfo } from "@/@types/medias";

function formatVideo(item: any): VideoInfo {
    return {
        id: item.id || '',
        title: item.title || '',
        description: item.description?.simpleText || item.snippet?.text || '',
        thumbnail: item.thumbnail?.thumbnails?.[0]?.url || '',
        publishedAt: item.publishedTimeText?.simpleText || '',
        duration: item.lengthText?.simpleText || item.duration?.simpleText || '',
        channel: item.channelTitle?.simpleText || item.ownerText?.runs?.[0]?.text || '',
        channelImage: item.channelThumbnail?.thumbnails?.[0]?.url || '',
        thumbDefault: item.thumbnail?.thumbnails?.[item.thumbnail.thumbnails.length - 1]?.url || '',
        chennelId: item.channelId || item.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || ''
    };
}

// Função para formatar playlists
function formatPlaylist(item: any): PlaylistInfo {
    return {
        id: item.id || '',
        title: item.title || '',
        thumbnail: item.thumbnail?.thumbnails?.[0]?.url || '',
        videos: [] // Playlists da busca não vêm com vídeos, apenas metadados
    };
}


export async function appRoutes(app: FastifyInstance) {
    app.get("/teste", async (req, reply) => {
        return reply.status(200).send({ message: "foi" });
    });

    app.get("/search/:name", searchController);
    app.get("/play", playController);
    app.get("/chennel/:id", channeIdlController);

    app.get("/teste2/:name", async (req, reply) => {

        // try {
        //     const { name } = req.params as { name: string };
        //     const results = await GetListByKeyword(name, false, 10);

        //     // Filtra e formata os resultados
        //     const videos: VideoInfo[] = [];
        //     const playlists: PlaylistInfo[] = [];
        //     const channels: ChannelInfo[] = [];

        //     if (results.items) {
        //         results.items.forEach((item: any) => {
        //             switch (item.type) {
        //                 case 'video':
        //                     videos.push(formatVideo(item));
        //                     break;
        //                 case 'playlist':
        //                     playlists.push(formatPlaylist(item));
        //                     break;
        //                 case 'channel':
        //                     channels.push({
        //                         id: item.id || '',
        //                         name: item.title || '',
        //                         image: item.thumbnail?.thumbnails?.[0]?.url || ''
        //                     });
        //                     break;
        //             }
        //         });
        //     }

        //     // Retorna no formato estruturado
        //     return reply.status(200).send({
        //         videoInfo: videos,
        //         playList: playlists,
        //         channels
        //     });

        // } catch (error) {
        //     console.error('Erro na busca:', error);
        //     return reply.status(500).send({
        //         error: 'Falha na busca',
        //         videos: [],
        //         playlists: [],
        //         channels: []
        //     });
        // }

        const { name } = req.params as { name: string };

        // const results = await GetListByKeyword(name, false, 10);

        // return reply.status(200).send(results);

        const { videoInfo } = await YTMedia.getListVideos({ name });

        const playList = await YTMedia.getPlaylists({ name, maxResult: 5 });

        return reply.status(200).send({
            videoInfo,
            playList
        });
    });
}