import { Prisma, Playlist, MediaFile } from "@prisma/client";
import { IPlaylist } from "./i-playlist";
import { prisma } from "@/lib/prisma";

export class PlayListRepository implements IPlaylist {
    async create(data: Prisma.PlaylistUncheckedCreateInput): Promise<Playlist> {
        return await prisma.playlist.create({ data });
    }
    async findById(id: string): Promise<Playlist | null> {
        return await prisma.playlist.findUnique({
            where: { id }
        });
    }
    async getAllByUserId(userId: string): Promise<Playlist[]> {
        return await prisma.playlist.findMany({
            where: { userId }
        });
    }
    async findMediaFilesById(id: string): Promise<MediaFile[]> {
        throw new Error("Method not implemented.");
    }
}