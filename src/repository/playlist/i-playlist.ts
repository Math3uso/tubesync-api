import { MediaFile, Playlist, Prisma } from "@prisma/client";


export interface IPlaylist {
    create(data: Prisma.PlaylistUncheckedCreateInput): Promise<Playlist>;
    findById(id: string): Promise<Playlist | null>;
    getAllByUserId(userId: string): Promise<Playlist[]>;
}