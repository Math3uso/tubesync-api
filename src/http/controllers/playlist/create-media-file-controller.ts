import { BaseController } from "@/core/http/base-controller";
import { CreateMediaFilePlaylistService } from "@/services/playlist/create-media-file-playlists.service";
import z from "zod";

const createMediaFileInPlaylistSchema = z.object({
    playlistId: z.string(),
    mediaFileId: z.string(),

});

export class CreateMediaFileInPlaylistController extends BaseController {
    async execute() {

        const createMediaFilePlaylist = CreateMediaFilePlaylistService.create();

        try {

            const { playlistId, mediaFileId } = createMediaFileInPlaylistSchema.parse(this.request.body);

            const { newMediaFile } = await createMediaFilePlaylist.execute({ playlistId, mediaFileId });

            return this.reply.status(201).send({ message: "nova faixa adicionda na playlist", newMediaFile });

        } catch (error) {
            throw error;
        }
    }
}