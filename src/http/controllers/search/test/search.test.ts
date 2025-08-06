import { app } from "@/app";
import { createAndAuthenticateTest } from "@/utils/create-and-authenticate";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Search E2E", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to search videos", async () => {

        const { token } = await createAndAuthenticateTest(app);

        const res = await request(app.server).get('/search')
            .query({ name: "YouTube" })
            .set('Authorization', `Bearer ${token}`).send();

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeDefined();

        expect(Array.isArray(res.body.videoInfo)).toBe(true);
        expect(Array.isArray(res.body.playList)).toBe(true);

    });
});