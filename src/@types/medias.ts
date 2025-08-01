export type Thumbnail = {
    url: string;
    width?: number;
    height?: number;
};

export type ChannelInfo = {
    id: string;
    name: string;
    image: string;
};

export type VideoInfo = {
    id: string;
    title: string;
    description?: string;
    thumbnail: string;
    publishedAt: string;
    duration: string;
    channel: string;
    channelImage: string;
    thumbDefault: string;
    chennelId: string;
};

export type PlaylistInfo = {
    id: string;
    title: string;
    thumbnail: string;
    videos: VideoInfo[];
};
