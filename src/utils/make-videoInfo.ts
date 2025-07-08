import { VideoInfo } from "@/@types/medias";

export function MakeVideoInfo(videos: any) {
    const videoInfo: VideoInfo[] = videos.items.map((video: any) => ({
        videoId: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails?.high?.url || '',
        thumbDefault: video.snippet.thumbnails.default.url,
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
    }));
    return {
        videoInfo
    }
}