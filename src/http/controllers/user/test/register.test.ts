import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Register (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shold be able to register', async () => {

        const res = await request(app.server).post('/user/register')
            .send({
                name: "teste",
                email: "teste@teste.com",
                password: "112233"
            });


        expect(res.statusCode).toEqual(201);

    });
});
