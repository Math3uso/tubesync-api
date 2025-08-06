import { app } from "@/app";
import { createAndAuthenticateTest } from "@/utils/create-and-authenticate";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Channel Search E2E", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to search channels", async () => {

        const { token } = await createAndAuthenticateTest(app);

        const res = await request(app.server).get('/chennel')
            .query({ id: "UCBR8-60-B28hp2BmDPdntcQ" })
            .set('Authorization', `Bearer ${token}`).send();

        expect(res.statusCode).toEqual(200);

        expect(res.body).toBeDefined();

        expect(Array.isArray(res.body.data.videoInfo)).toBe(true);

    });
});