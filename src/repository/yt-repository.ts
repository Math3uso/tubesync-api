import { ChannelInfo, PlaylistInfo, VideoInfo } from '@/@types/medias';
import { env } from '@/env';
import axios from 'axios';
import { MakeVideoInfo } from '../utils/make-videoInfo';

export type GetPlayListRequest = {
    name: string;
    maxResult?: number;
};

export type SearchConfig = {
    key: string;
    part: string;
    [key: string]: any;
};

export class YTMedia {
    private static baseUrl = 'https://www.googleapis.com/youtube/v3';

    static async getPlaylists({ name, maxResult = 5 }: GetPlayListRequest): Promise<PlaylistInfo[]> {
        const params: SearchConfig = {
            part: 'snippet',
            q: name,
            type: 'playlist',
            maxResults: maxResult,
            key: env.YOUTUBE_API_KEY,
        };

        const searchData = await this.search(params);

        const playlists = await Promise.all(
            searchData.items.map(async (item: any): Promise<PlaylistInfo> => {
                const playlistId = item.id.playlistId;

                const playlistItems = await this.getPlaylistItems(playlistId);

                return {
                    id: playlistId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails?.high?.url || '',
                    videos: playlistItems,
                };
            })
        );

        return playlists;
    }


    private static async getPlaylistItems(playlistId: string): Promise<VideoInfo[]> {
        const playlistItemResponse = await axios.get(`${this.baseUrl}/playlistItems`, {
            params: {
                part: 'snippet',
                maxResults: 20,
                playlistId,
                key: env.YOUTUBE_API_KEY,
            },
        });

        const videoIds = playlistItemResponse.data.items.map(
            (item: any) => item.snippet.resourceId.videoId
        );

        const videosData = await this.getVideosDetails(videoIds);

        return videosData.map((video: any): VideoInfo => {
            const channelId = video.snippet.channelId;
            return {
                id: video.id,
                title: video.snippet.title,
                //description: video.snippet.description,
                thumbnail: video.snippet.thumbnails?.high?.url || '',
                thumbDefault: video.snippet.thumbnails.default.url,
                publishedAt: video.snippet.publishedAt,
                duration: video.contentDetails.duration,
                channel: video.snippet.channelTitle,
                channelImage: "",
                chennelId: video.snippet.channelId,
                // channel: channelMap[channelId]?.name || '',
                // channelImage: channelMap[channelId]?.image || '',
            };
        });
    }

    static async getListVideos({ name, maxResult = 20 }: GetPlayListRequest) {
        const { data } = await axios.get(`${this.baseUrl}/search`, {
            params: {
                part: 'snippet',
                q: name,
                type: 'video',
                maxResults: maxResult,
                key: env.YOUTUBE_API_KEY,
            }
        });

        const { videoInfo } = MakeVideoInfo(data);

        console.log(data.items[0]);

        return {
            videoInfo
        };
    }

    static async getChannelData(channelId: string) {

        const channelDetails = await this.getChannelsDetails([channelId]);

        const { data } = await axios.get(`${this.baseUrl}/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                order: 'date', // ou relevance
                maxResults: 10,
                type: 'video',
                key: env.YOUTUBE_API_KEY,
            }
        });

        const { videoInfo } = MakeVideoInfo(data);

        return {
            thumbnail: channelDetails[0].snippet.thumbnails?.high?.url || '',
            thumbDefault: channelDetails[0].snippet.thumbnails.default.url,
            videoInfo
        }
    }

    private static async search(searchData: SearchConfig) {
        const { data } = await axios.get(`${this.baseUrl}/search`, { params: searchData });
        return data;
    }

    private static async getVideosDetails(videoIds: string[]) {
        const { data } = await axios.get(`${this.baseUrl}/videos`, {
            params: {
                part: 'snippet,contentDetails',
                id: videoIds.join(','),
                key: env.YOUTUBE_API_KEY,
            },
        });
        return data.items;
    }

    private static async getChannelsDetails(channelIds: string[]) {
        const { data } = await axios.get(`${this.baseUrl}/channels`, {
            params: {
                part: 'snippet',
                id: channelIds.join(','),
                key: env.YOUTUBE_API_KEY,
            },
        });
        return data.items;
    }

}
