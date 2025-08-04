import "dotenv/config"
import z from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "prod"]).default("prod"),
    PORT: z.coerce.number().default(3001),
    YOUTUBE_API_KEY: z.string(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
    console.error("Erro nas variaveis de embiente");
    throw new Error("Invalid environment variable");
}

export const env = _env.data;