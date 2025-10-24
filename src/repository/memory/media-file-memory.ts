import { Prisma, MediaFile } from "@prisma/client";
import { IMediaFileRepository } from "../media-file/i-media-file-repository";
import { randomUUID } from "node:crypto";

export class MediaFileRepositoryInMemory implements IMediaFileRepository {

    public mediaFiles: MediaFile[] = [];

    async create(data: Prisma.MediaFileUncheckedCreateInput): Promise<MediaFile> {
        const newMediaFile: MediaFile = {
            id: randomUUID(),
            mediaId: data.mediaId,
            name: data.name,
            userId: data.userId as string,
            playlistId: null
        }

        this.mediaFiles.push(newMediaFile);
        return newMediaFile;
    }
    async findById(id: string): Promise<MediaFile | null> {
        const mediaFile = this.mediaFiles.find(el => el.id == id);
        if (!mediaFile) return null;
        return mediaFile;
    }
    async findByIdAndUserId(id: string, userId: string): Promise<MediaFile | null> {
        const mediaFile = this.mediaFiles.find(el => el.id == id && el.userId == userId);
        if (!mediaFile) return null;
        return mediaFile;
    }

}