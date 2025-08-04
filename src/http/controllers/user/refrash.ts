import { env } from "@/env";
import { MakeAuthenticateService } from "@/services/factory/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refrash(request: FastifyRequest, reply: FastifyReply) {

    const authService = MakeAuthenticateService();

    await request.jwtVerify({ onlyCookie: true });

    const { sub } = request.user;

    const token = await reply.jwtSign({}, {
        sign: {
            sub
        }
    });

    const refrashToken = await reply.jwtSign({}, {
        sign: {
            sub,
            expiresIn: '10d'
        }
    });

    return reply
        .setCookie('refreshToken', refrashToken, {
            path: '/',
            secure: env.NODE_ENV == 'prod' ? true : false,
            httpOnly: true,
            sameSite: true
        })
        .status(200).send({ token });

}