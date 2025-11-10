import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { MediaFileRepository } from "@/repository/media-file/media-file.repository";

interface CreateMefiaFileRequest {
    name: string;
    mediaId: string;
    userId: string;
}

export class CreateMediaFileService {
    constructor(private readonly mediaFileRepository: IMediaFileRepository) { }

    async execute({ name, mediaId, userId }: CreateMefiaFileRequest) {
        const mediaFile = await this.mediaFileRepository.create({ name, mediaId, userId });
        return {
            mediaFile
        }
    }

    static create() {
        return new CreateMediaFileService(new MediaFileRepository());
    }
}