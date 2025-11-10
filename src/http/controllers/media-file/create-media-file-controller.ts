import { BaseController } from "@/core/http/base-controller";
import { CreateMediaFileService } from "@/services/media-file/create-media-file-service";
import z from "zod";

const createMediaFileSchema = z.object({
    name: z.string(),
    mediaId: z.string(),
});

export class CreateMediaFileController extends BaseController {
    async execute() {
        try {

            const { name, mediaId } = createMediaFileSchema.parse(this.request.body);

            const createMediaFileService = CreateMediaFileService.create();
            const { sub: userId } = this.request.user;

            const { mediaFile } = await createMediaFileService.execute({ name, mediaId, userId });

            return this.reply.status(201).send({ mediaFile });

        } catch (error) {
            throw error;
        }
    }
}