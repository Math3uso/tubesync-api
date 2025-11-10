import { app } from "@/app";
import { createAndAuthenticateTest } from "@/utils/create-and-authenticate";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create MediaFile E2E", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a MediaFile", async () => {

        const { token } = await createAndAuthenticateTest(app);

        const res = await request(app.server).post('/mediafile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "teste",
                mediaId: "123"
            });
        expect(res.status).toEqual(201);
        expect(res.body.mediaFile).toEqual(expect.objectContaining({
            name: "teste",
            mediaId: "123",
            id: expect.any(String)
        }));
    });
});
