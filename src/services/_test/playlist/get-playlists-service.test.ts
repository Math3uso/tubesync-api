import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { MediaFileRepositoryInMemory } from "@/repository/memory/media-file-memory";
import { PlayListInMemory } from "@/repository/memory/playlist-memrory";
import { UserRepositoryInMemory } from "@/repository/memory/user-repository-memory";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { IUserRepository } from "@/repository/user/i-user-repository";
import { CreateMediaFilePlaylistService } from "@/services/playlist/create-media-file-playlists.service";
import { CreatePlayListService } from "@/services/playlist/create-playlist.service";
import { GetPlaylistsService } from "@/services/playlist/get-playlists-service";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let playlistRepository: IPlaylist;
let userRepitory: IUserRepository;
let playlistCreateService: CreatePlayListService;
let createMediaFileService: CreateMediaFilePlaylistService;
let mediaFileRepository: IMediaFileRepository;
let sut: GetPlaylistsService;


describe('Get Playlists Service', async () => {

    beforeEach(() => {
        playlistRepository = new PlayListInMemory();
        userRepitory = new UserRepositoryInMemory();
        playlistCreateService = new CreatePlayListService(playlistRepository);
        mediaFileRepository = new MediaFileRepositoryInMemory();
        createMediaFileService = new CreateMediaFilePlaylistService(playlistRepository, mediaFileRepository);
        sut = new GetPlaylistsService(playlistRepository, mediaFileRepository);
    });

    it("should be able to find all playlists by userId", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        await playlistCreateService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });
        await playlistCreateService.execute({
            title: "playlist2",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const { playlist } = await sut.getAllByUserId(user.id);

        console.log(playlist);

        expect(playlist.length).toEqual(2);
        expect(playlist[0].userId).toEqual(user.id);
    });

    it("should be able to find a playlist by playlist id", async () => {

        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const playlist1 = await playlistCreateService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });
        const playlist2 = await playlistCreateService.execute({
            title: "playlist2",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const { playlist } = await sut.getPlaylistByPlaylistId(playlist2.playlist.id);

        expect(playlist.id).toEqual(playlist2.playlist.id);
        expect(playlist.title).toEqual(playlist2.playlist.title);
        expect(playlist.userId).toEqual(playlist2.playlist.userId);
    });

    it("should be not able to find a playlist  with an invalid id", async () => {
        await expect(
            sut.getPlaylistByPlaylistId("error id")
        ).rejects.toThrowError(NotFoundExeption);
    });

    it("should be able to find all mediaFile by playlist id", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const playlist1 = await playlistCreateService.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });
        const playlist2 = await playlistCreateService.execute({
            title: "playlist2",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        const newMediaFile = await mediaFileRepository.create({
            name: "teste",
            mediaId: "123",
            userId: user.id
        });

        const newMediaFile2 = await mediaFileRepository.create({
            name: "teste",
            mediaId: "123",
            userId: user.id
        });

        await createMediaFileService.execute({ mediaFileId: newMediaFile.id, playlistId: playlist1.playlist.id });
        await createMediaFileService.execute({ mediaFileId: newMediaFile2.id, playlistId: playlist1.playlist.id });

        const { mediaFiles } = await sut.getAllMediaFileByPlaylistId(playlist1.playlist.id);

        expect(mediaFiles.length).toEqual(2);
        expect(mediaFiles[0].mediaId).toEqual(newMediaFile.mediaId);
        expect(mediaFiles[1].mediaId).toEqual(newMediaFile2.mediaId);
    });

});