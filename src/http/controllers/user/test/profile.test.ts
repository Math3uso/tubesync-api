import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Profile (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('shold be able to register', async () => {

        await request(app.server).post('/user/register')
            .send({
                name: "teste",
                email: "teste@teste.com",
                password: "112233"
            });

        const auth = await request(app.server).post('/user/auth')
            .send({
                email: "teste@teste.com",
                password: "112233"
            });


        const { token } = auth.body;

        const res = await request(app.server).get('/user/profile')
            .set('Authorization', `Bearer ${token}`).send();

        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toEqual(expect.objectContaining({
            email: 'teste@teste.com'
        }))
    });
});
