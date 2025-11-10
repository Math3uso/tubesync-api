import { app } from "@/app";
import { createAndAuthenticateTest } from "@/utils/create-and-authenticate";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create playlist E2E", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a new playlist", async () => {

        const { token } = await createAndAuthenticateTest(app);

        const res = await request(app.server).post('/playlist')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "playlist",
                description: "teste",
                imageUrl: "url-to-image",
            });

        expect(res.status).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining({
            message: "playlist criada"
        }));
    });
});
