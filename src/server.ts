import { app } from "./app";
import { env } from "./env";
import { prisma } from "./lib/prisma";

async function bootstrap() {
    try {
        await prisma.$connect();

        await app.listen({
            host: '0.0.0.0',
            port: env.PORT
        });

        console.log(`[INFO] server is run http://localhost:${env.PORT}`);
    } catch (error) {
        console.error("[ERROR] failed to start server due to database connection error.", error);
        process.exit(1);
    }
}

bootstrap();
