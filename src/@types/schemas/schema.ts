import { z } from 'zod';

export const VideoInfoSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    thumbnail: z.string(),
    publishedAt: z.string(),
    duration: z.string(),
    channel: z.string(),
    channelImage: z.string(),
    thumbDefault: z.string(),
    chennelId: z.string(),
});

export const PlaylistInfoSchema = z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    videos: z.array(VideoInfoSchema),
});

export const SearchResponseSchema = z.object({
    videoInfo: z.array(VideoInfoSchema),
    playList: z.array(PlaylistInfoSchema),
});