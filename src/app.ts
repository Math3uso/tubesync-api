import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { appRoutes } from "./http/routes/route";
import { ZodError } from "zod";
import { env } from "./env";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "./http/controllers/user/routes";
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { HttpExeption } from "./@exceptions/exeption";

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

app.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'YouTube Audio API',
            description: 'Documentação automática via Fastify',
            version: '1.0.0'
        },
        host: 'localhost:3001',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'refreshToken',
            },
        },
    }
});

app.register(fastifySwaggerUI, {
    routePrefix: '/docs'
})


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

    if (error instanceof HttpExeption) {
        return reply.status(error.statusCode).send({ message: error.message });
    }

    if (env.NODE_ENV == "dev") {
        console.log(error);
    }

    return reply.status(500).send({ message: "Internal server error" });
});