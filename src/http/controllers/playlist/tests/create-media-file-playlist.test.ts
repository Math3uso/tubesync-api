import { app } from "@/app";
import { createAndAuthenticateTest } from "@/utils/create-and-authenticate";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { IMediaFileRepository } from "@/repository/media-file/i-media-file-repository";
import { IPlaylist } from "@/repository/playlist/i-playlist";
import { MediaFileRepository } from "@/repository/media-file/media-file.repository";
import { PlayListRepository } from "@/repository/playlist/playlist.respository";

let mediaFileRepo: IMediaFileRepository;
let playlistRepo: IPlaylist;

describe("Add MediaFile in playlist E2E", () => {

    beforeAll(async () => {
        await app.ready();
        mediaFileRepo = new MediaFileRepository();
        playlistRepo = new PlayListRepository();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to add a new MediaFile in playlist", async () => {

        const { token, user, userId } = await createAndAuthenticateTest(app);

        const mediaFile = await mediaFileRepo.create({
            name: "teste",
            mediaId: "123",
            userId: userId
        });

        const playlist = await playlistRepo.create({
            title: "teste",
            description: "teste",
            imageUrl: "url...",
            userId
        });

        const res = await request(app.server).post('/playlist/media')
            .set('Authorization', `Bearer ${token}`)
            .send({
                playlistId: playlist.id,
                mediaFileId: mediaFile.id
            });

        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining({
            message: "nova faixa adicionda na playlist"
        }));
    });
});
