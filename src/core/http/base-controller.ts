import { FastifyReply, FastifyRequest } from "fastify";

export class BaseController {
    constructor(
        protected request: FastifyRequest,
        protected reply: FastifyReply
    ) { }
}