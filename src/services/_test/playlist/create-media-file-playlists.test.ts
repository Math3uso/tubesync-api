import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { MediaFileRepositoryInMemory } from "@/repository/memory/media-file-memory";
import { PlayListInMemory } from "@/repository/memory/playlist-memrory";
import { UserRepositoryInMemory } from "@/repository/memory/user-repository-memory";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { IUserRepository } from "@/repository/user/i-user-repository";
import { CreateMediaFilePlaylistService } from "@/services/playlist/create-media-file-playlists.service";
import { CreatePlayListService } from "@/services/playlist/create-playlist.service";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";


let playlistRepository: IPlaylist;
let mediaFileRepository: IMediaFileRepository;
let createPlaylistService: CreatePlayListService;
let userRepitory: IUserRepository;
userRepitory = new UserRepositoryInMemory();
let sut: CreateMediaFilePlaylistService;



describe('createMediaFile Service', async () => {

    beforeEach(() => {
        playlistRepository = new PlayListInMemory();
        mediaFileRepository = new MediaFileRepositoryInMemory();

        createPlaylistService = new CreatePlayListService(playlistRepository);
        sut = new CreateMediaFilePlaylistService(playlistRepository, mediaFileRepository);
    });

    it("should be able to create a MediaItem in playlist", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const { playlist } = await createPlaylistService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const newMediaFile = await mediaFileRepository.create({
            name: "teste",
            mediaId: "123",
            userId: user.id
        });

        const result = await sut.execute({
            playlistId: playlist.id,
            mediaFileId: newMediaFile.id
        }) as { newMediaFile: typeof newMediaFile };;

        expect(result.newMediaFile).toEqual(expect.objectContaining({
            id: newMediaFile.id,
            mediaId: newMediaFile.mediaId,
            name: newMediaFile.name,
            userId: newMediaFile.userId,
            playlistId: newMediaFile.playlistId
        }));
    });

    it("should not be able to create MediaItem with invalid playlist", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const { playlist } = await createPlaylistService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const newMediaFile = await mediaFileRepository.create({
            name: "teste",
            mediaId: "123",
            userId: user.id
        });

        await expect(
            sut.execute({
                playlistId: "error",
                mediaFileId: newMediaFile.id
            })
        ).rejects.toThrowError(NotFoundExeption);

    });

    it("should not be able to create MediaItem with invalid MefiaFile", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const { playlist } = await createPlaylistService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const newMediaFile = await mediaFileRepository.create({
            name: "teste",
            mediaId: "123",
            userId: user.id
        });

        await expect(
            sut.execute({
                playlistId: playlist.id,
                mediaFileId: "error"
            })
        ).rejects.toThrowError(NotFoundExeption);

    });

});