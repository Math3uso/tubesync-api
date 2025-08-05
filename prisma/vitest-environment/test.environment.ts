import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { Environment } from "vitest/environments";
import { prisma } from "../../src/lib/prisma"

function generateDataBaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Plese provide a DATABASE_URL env variable");
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {

        const schema = randomUUID();

        const dataBaseUrl = generateDataBaseUrl(schema);

        process.env.DATABASE_URL = dataBaseUrl;

        execSync('npx prisma db push');


        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            }
        }

    }
}