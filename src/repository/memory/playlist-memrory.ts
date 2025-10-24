import { Prisma, Playlist, MediaFile } from "@prisma/client";
import { IPlaylist } from "../playlist/i-playlist";
import { randomUUID } from "crypto";

export class PlayListInMemory implements IPlaylist {
    public playlist: Playlist[] = [];

    async create(data: Prisma.PlaylistUncheckedCreateInput): Promise<Playlist> {

        const { title, description, userId } = data;

        const newPlaylist = {
            id: randomUUID(),
            userId: userId as string,
            title,
            description: description as string,
            imageUrl: null
        }

        this.playlist.push(newPlaylist);

        return newPlaylist;
    }
    async findById(id: string): Promise<Playlist | null> {
        const playlist = this.playlist.find(current => current.id == id);
        if (!playlist) return null;

        return playlist;
    }

    async getAllByUserId(userId: string): Promise<Playlist[]> {
        const playlists = this.playlist.filter(el => el.userId == userId);
        return playlists;
    }

    async findMediaFilesById(id: string): Promise<MediaFile[]> {
        throw new Error("Method not implemented.");
    }

}