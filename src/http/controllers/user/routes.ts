import { FastifyInstance } from "fastify";
import { register } from "./register";
import { auth } from "./auth";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { refrash } from "./refrash";


export async function userRoutes(app: FastifyInstance) {
    app.post('/user/register', register);
    app.post('/user/auth', auth);
    app.get('/user/profile', { onRequest: verifyJwt }, profile);
    app.get('/user/refrash', refrash);

}