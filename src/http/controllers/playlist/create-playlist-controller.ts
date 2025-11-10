import { BaseController } from "@/core/http/base-controller";
import { CreatePlayListService } from "@/services/playlist/create-playlist.service";
import z from "zod";

const createPlaylistSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional()
});

export class CreatePlaylistController extends BaseController {
    async execute() {
        const createPlaylistService = CreatePlayListService.create();
        try {

            const { title, description, imageUrl } = createPlaylistSchema.parse(this.request.body);
            const { sub: userId } = this.request.user;

            const { playlist } = await createPlaylistService.execute({
                title,
                description,
                userId,
                imageUrl
            });

            return this.reply.status(201).send({ message: "playlist criada", playlist });

        } catch (error) {
            throw error;
        }
    }
}