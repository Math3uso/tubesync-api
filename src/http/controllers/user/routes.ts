import { FastifyInstance } from "fastify";
import { register } from "./register";
import { auth } from "./auth";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { refrash } from "./refresh";


export async function userRoutes(app: FastifyInstance) {
    // app.post('/user/register', register);

    app.post('/user/register', {
        schema: {
            tags: ['Users'],
            summary: 'Registrar novo usuário',
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
            },
            response: {
                201: {
                    description: 'Usuário criado com sucesso',
                    type: 'null'
                },
                400: {
                    description: 'Erro de validação ou usuário já existe',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        handler: register,
    });

    app.post('/user/auth', {
        schema: {
            tags: ['Users'],
            summary: "Realiza autenticação de um usuário e retorna o token JWT de acesso junto com um cookie de refresh token.",
            body: {
                type: "object",
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Usuário autenticado com sucesso',
                    type: 'object',
                    properties: {
                        token: { type: 'string', description: 'JWT de acesso com validade curta (ex: 10 minutos)' },
                        refreshToken: { type: 'string', description: 'Refresh token com validade longa (ex: 20 dias)' },
                    },
                },
                400: {
                    description: 'Credenciais inválidas',
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Invalid credentials.' }
                    },
                },
                404: {
                    description: 'Usuário não encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'User not found.' }
                    },
                }
            }
        },
        handler: auth,
    });

    app.post('/user/refrash', {
        schema: {
            tags: ['Users'],
            summary: 'Renovar token de acesso via refresh token (cookie)',
            description: 'Essa rota valida o refresh token enviado via cookie e retorna um novo token de acesso, atualizando também o cookie refreshToken.',
            security: [
                {
                    cookieAuth: []
                }
            ],
            response: {
                200: {
                    description: 'Token renovado com sucesso',
                    type: 'object',
                    properties: {
                        token: { type: 'string', description: 'Novo token JWT de acesso' },
                        refreshToken: { type: 'string', description: 'Novo token JWT de refresh' }
                    },
                },
                401: {
                    description: 'Refresh token inválido ou ausente',
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Unauthorized' },
                    },
                },
            },
        },
        handler: refrash,
    });

    app.get('/user/profile', {
        preHandler: verifyJwt,
        schema: {
            summary: 'Busca os dados do usuário autenticado',
            description: 'Retorna os dados do usuário autenticado',
            tags: ['Users'],
            security: [{ cookieAuth: [] }],
            response: {
                200: {
                    description: 'Usuário encontrado',
                    type: 'object',
                    properties: {
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                email: { type: 'string' },
                                created_at: { type: 'string', format: 'date-time' }
                            }
                        }
                    }
                },
                404: {
                    description: 'Usuário não encontrado',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, profile);

}