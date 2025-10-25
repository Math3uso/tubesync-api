import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { MediaFile } from "@prisma/client";

interface CreateMediaFileRequest {
    playlistId: string;
    mediaFileId: string;
}

export class CreateMediaFilePlaylistService {
    constructor(
        private readonly playlistRepository: IPlaylist,
        private readonly mediaFile: IMediaFileRepository
    ) { }

    async execute({ playlistId, mediaFileId }: CreateMediaFileRequest) {
        const isValidPlaylist = await this.playlistRepository.findById(playlistId);
        const isValidMediaFile = await this.mediaFile.findById(mediaFileId);

        if (!isValidPlaylist) throw new NotFoundExeption("playlist is not found");
        if (!isValidMediaFile) throw new NotFoundExeption("media file is note found");

        const newMediaFile = await this.mediaFile.addToPlaylist({ id: mediaFileId, playlistId }) as MediaFile;

        return {
            newMediaFile
        }
    }
}