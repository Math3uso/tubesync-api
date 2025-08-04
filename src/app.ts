import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { appRoutes } from "./http/routes/route";
import { ZodError } from "zod";
import { env } from "./env";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "./http/controllers/user/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: "10m"
    }
});

app.register(fastifyCookie)

app.register(appRoutes);
app.register(userRoutes);

app.register(cors, {
    origin: env.NODE_ENV === "dev" ? "*" : "definir url",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error.", issues: error.format() })
    }

    if (env.NODE_ENV == "dev") {
        console.log(error);
    }

    return reply.status(500).send({ message: "Internal server error" });
});