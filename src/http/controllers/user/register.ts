import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { MakeRegisterService } from "@/services/factory/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        password: z.string()
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const registerService = MakeRegisterService();

    try {

        await registerService.execute({ name, email, password });

        return reply.status(201).send();

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error;
    }

}