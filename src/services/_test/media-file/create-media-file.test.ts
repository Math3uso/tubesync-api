import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { MediaFileRepositoryInMemory } from "@/repository/memory/media-file-memory";
import { UserRepositoryInMemory } from "@/repository/memory/user-repository-memory";
import { IUserRepository } from "@/repository/user/i-user-repository";
import { CreateMediaFileService } from "@/services/media-file/create-media-file-service"; import { hash } from "bcryptjs";
;
import { beforeEach, describe, expect, it } from "vitest";

let mediaRepo: IMediaFileRepository;
let userRepo: IUserRepository;
let sut: CreateMediaFileService;


describe('Create Media File Service', async () => {
    beforeEach(() => {
        mediaRepo = new MediaFileRepositoryInMemory();
        userRepo = new UserRepositoryInMemory();
        sut = new CreateMediaFileService(mediaRepo);
    });

    it("should be able to create a media file", async () => {
        const user = await userRepo.create({
            name: "user",
            email: "user@user.com",
            password_hash: await hash("123456", 6)
        });

        const { mediaFile } = await sut.execute({ name: "teste", mediaId: "123", userId: user.id });

        expect(mediaFile.id).toEqual(expect.any(String));
        expect(mediaFile.userId).toEqual(user.id);
        expect(mediaFile.name).toEqual("teste");
    });
});