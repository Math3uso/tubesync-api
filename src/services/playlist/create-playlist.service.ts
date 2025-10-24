import { IPlaylist } from "@/repository/playlist/i-playlist";

interface CreatePlayListRequest {
    title: string;
    description: string;
    userId: string;
    imageUrl?: string;
}

export class CreatePlayListService {
    constructor(
        private readonly playlistRepository: IPlaylist
    ) { }

    async execute({ title, description, userId, imageUrl }: CreatePlayListRequest) {
        const playlist = await this.playlistRepository.create({ title, description, userId, imageUrl });
        return {
            playlist
        }
    }
}