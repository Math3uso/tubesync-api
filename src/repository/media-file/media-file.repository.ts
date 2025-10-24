import { Prisma, MediaFile } from "@prisma/client";
import { IMediaFileRepository } from "./i-media-file-repository";
import { prisma } from "@/lib/prisma";

export class MediaFileRepository implements IMediaFileRepository {
    async create(data: Prisma.MediaFileUncheckedCreateInput): Promise<MediaFile> {
        return await prisma.mediaFile.create({ data });
    }
    async findById(id: string): Promise<MediaFile | null> {
        return await prisma.mediaFile.findUnique({
            where: { id }
        });
    }
    async findByIdAndUserId(id: string, userId: string): Promise<MediaFile | null> {
        throw new Error();
    }

    async addToPlaylist(id: string, playlistId: string): Promise<MediaFile | null> {
        return await prisma.mediaFile.update({
            where: { id },
            data: { playlistId }
        })
    }

}