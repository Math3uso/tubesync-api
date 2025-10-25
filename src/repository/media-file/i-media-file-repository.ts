import { MediaFile, Prisma } from "@prisma/client";

export interface IMediaFileRepository {
    create(data: Prisma.MediaFileUncheckedCreateInput): Promise<MediaFile>;
    findById(id: string): Promise<MediaFile | null>;
    findByIdAndUserId(id: string, userId: string): Promise<MediaFile | null>;
    addToPlaylist({ id, playlistId }: { id: string, playlistId: string }): Promise<MediaFile | null>;
}