import { FastifyInstance } from "fastify";
import request from "supertest";


export async function createAndAuthenticateTest(app: FastifyInstance) {

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


    return {
        token: res.body.token
    }

}