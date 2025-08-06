import { FastifyInstance } from "fastify";
import { searchController } from "@/http/controllers/search/search"
import { playController } from "../controllers/play/play";
import { channeIdlController } from "../controllers/chennel/channel-id";
import { verifyJwt } from "../middlewares/verify-jwt";


export async function appRoutes(app: FastifyInstance) {

    app.get('/search', {
        onRequest: [verifyJwt],
        schema: {
            tags: ["search"],
            querystring: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "nome da música/video",
                    },
                },
                required: ["name"],
            },
            description: "Retorna lista de videos e 3 playlist (aproximadamente 15-20 videos em cada playlist)"
        }
    }, searchController,);

    //app.get("/search/v2/:name", { onRequest: [verifyJwt] }, searchControllerV2);

    app.get(
        "/play",
        {
            onRequest: [verifyJwt],
            schema: {
                description: "Retorna a URL de áudio de um vídeo do YouTube.",
                tags: ["player"],
                querystring: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID do vídeo do YouTube",
                        },
                    },
                    required: ["id"],
                },
                response: {
                    200: {
                        description: "URL do áudio extraído com sucesso",
                        type: "object",
                        properties: {
                            mediaUrl: { type: "string", description: "URL para streaming do áudio" },
                        },
                    },
                    401: {
                        description: "URL inválida",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    500: {
                        description: "Erro ao obter formato de mídia",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        playController
    );

    app.get("/chennel", {
        onRequest: [verifyJwt],
        schema: {
            tags: ["channels"],
            querystring: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "id do canal",
                    },
                },
                required: ["id"],
            },
            description: "Busca dados de um canal do YouTube pelo id"
        }
    }, channeIdlController,);
}