import { PlayListInMemory } from "@/repository/memory/playlist-memrory";
import { UserRepositoryInMemory } from "@/repository/memory/user-repository-memory";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { IUserRepository } from "@/repository/user/i-user-repository";
import { CreatePlayListService } from "@/services/playlist/create-playlist.service";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let playlistRepository: IPlaylist;
let userRepitory: IUserRepository;
let sut: CreatePlayListService;


describe('Register Service', async () => {

    beforeEach(() => {
        playlistRepository = new PlayListInMemory();
        userRepitory = new UserRepositoryInMemory();
        sut = new CreatePlayListService(playlistRepository);
    });

    it("should be able to create a playlist", async () => {
        const user = await userRepitory.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const { playlist } = await sut.execute({
            title: "playlist",
            description: "description",
            userId: user.id,
            imageUrl: "url-to-image"
        });

        expect(playlist.id).toEqual(expect.any(String));
        expect(playlist.userId).toEqual(user.id);
        expect(playlist.title).toEqual(playlist.title);
    });

});