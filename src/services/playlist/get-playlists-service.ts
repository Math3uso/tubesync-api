import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { MediaFileRepository } from "@/repository/media-file/media-file.repository";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { PlayListRepository } from "@/repository/playlist/playlist.respository";

export class GetPlaylistsService {
    constructor(
        private readonly playlistRepository: IPlaylist,
        private readonly mediaFileRepisitory: IMediaFileRepository
    ) { }

    async getAllByUserId(userId: string) {
        const playlist = await this.playlistRepository.getAllByUserId(userId);
        return {
            playlist
        }
    }

    async getAllMediaFileByPlaylistId(playlistId: string) {
        const mediaFiles = await this.mediaFileRepisitory.findAllByPlaylistId(playlistId);
        return {
            mediaFiles
        }
    }

    async getPlaylistByPlaylistId(playlistId: string) {
        const playlist = await this.playlistRepository.findById(playlistId);
        if (!playlist) throw new NotFoundExeption("Playlist is not found");
        return {
            playlist
        }
    }

    static create() {
        return new GetPlaylistsService(new PlayListRepository(), new MediaFileRepository());
    }
}