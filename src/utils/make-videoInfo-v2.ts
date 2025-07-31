import { PlaylistInfo, VideoInfo } from "@/@types/medias";

export function makeVideoInfov2(item: any): VideoInfo {
    return {
        id: item.id || '',
        title: item.title || '',
        description: item.description?.simpleText || item.snippet?.text || '',
        thumbnail: item.thumbnail?.thumbnails?.[0]?.url || '',
        publishedAt: item.publishedTimeText?.simpleText || '',
        duration: item.lengthText?.simpleText || item.duration?.simpleText || item.length.simpleText || '',
        channel: item.channelTitle?.simpleText || item.ownerText?.runs?.[0]?.text || item.channelTitle || '',
        channelImage: item.channelThumbnail?.thumbnails?.[0]?.url || '',
        thumbDefault: item.thumbnail?.thumbnails?.[item.thumbnail.thumbnails.length - 1]?.url || '',
        chennelId: item.channelId || item.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || ''
    };
}

// Função para formatar playlists
export function formatPlaylist(item: any): PlaylistInfo {
    return {
        id: item.id || '',
        title: item.title || '',
        thumbnail: item.thumbnail?.thumbnails?.[0]?.url || '',
        videos: [] // Playlists da busca não vêm com vídeos, apenas metadados
    };
}
