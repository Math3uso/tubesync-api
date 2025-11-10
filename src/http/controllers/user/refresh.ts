import { UpdateSessionService } from "@/services/session/update-session-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const refrashTokenSchema = z.object({
    refrashToken: z.string()
});

export async function refrash(request: FastifyRequest, reply: FastifyReply) {

    try {
        const sessionUpdateService = UpdateSessionService.create();

        const { refrashToken } = refrashTokenSchema.parse(request.body);

        const { session, newToken } = await sessionUpdateService.execute({
            token: refrashToken,
            generateToken: (payload) => reply.jwtSign(payload, { sign: { expiresIn: '20d' } })
        });

        const token = await reply.jwtSign({ sub: session.userId }, {
            sign: {
                expiresIn: '10m'
            }
        });

        return reply.status(200).send({ token, refreshToken: newToken });

    } catch (error) {
        throw error;
    }
}