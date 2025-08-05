import { env } from "@/env";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { UserIsNoteFoundError } from "@/services/errors/user-is-not-found-error";
import { MakeAuthenticateService } from "@/services/factory/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    });

    const { email, password } = bodySchema.parse(request.body);

    const authService = MakeAuthenticateService();

    try {

        const { user, refreshToken } = await authService.execute({
            email,
            password,
            generateToken: (payload) => reply.jwtSign(payload, { sign: { expiresIn: '10d' } })
        });

        const token = await reply.jwtSign({ sub: user.id }, {
            sign: {
                expiresIn: '10m'
            }
        });

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: env.NODE_ENV == 'prod' ? true : false,
                httpOnly: true,
                sameSite: true
            })
            .status(200).send({ token });

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        } else if (error instanceof UserIsNoteFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }

}