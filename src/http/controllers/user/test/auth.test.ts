import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { refrash } from "../refrash";

describe("Auth (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shold be able to authenticate', async () => {

        await request(app.server).post('/user/register')
            .send({
                name: "teste",
                email: "teste@teste.com",
                password: "112233"
            });

        const res = await request(app.server).post('/user/auth')
            .send({
                email: "teste@teste.com",
                password: "112233"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            token: expect.any(String),
            refreshToken: expect.any(String)
        });
    });
});
