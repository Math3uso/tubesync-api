import { prisma } from "@/lib/prisma";
import { ISessionRepository } from "./i-session.repository";
import { Session } from "@prisma/client";

export class SessionRepository implements ISessionRepository {
    async create(data: { token: string; userId: string; expiresAt: Date; }): Promise<Session> {
        return await prisma.session.create({
            data: {
                refrashToken: data.token,
                userId: data.userId,
                expiresAt: data.expiresAt
            }
        });
    }
    async findByToken(token: string): Promise<Session | null> {
        return await prisma.session.findUnique({
            where: { refrashToken: token }
        });
    }
    async deleteByToken(token: string): Promise<Session> {
        return await prisma.session.delete({
            where: { refrashToken: token }
        });
    }
}