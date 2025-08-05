import { UserIsNoteFoundError } from "@/services/errors/user-is-not-found-error";
import { MakeProfileService } from "@/services/factory/make-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const profileService = MakeProfileService();

    const userId = request.user.sub;

    try {

        const { user } = await profileService.execute({ userId })

        return reply.status(200).send({ user });

    } catch (error) {
        if (error instanceof UserIsNoteFoundError) {
            return reply.status(404).send({ message: error.message });
        }
    }
}