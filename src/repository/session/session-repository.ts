import { prisma } from "@/lib/prisma";
import { ISessionRepository } from "./i-session.repository";
import { Prisma, Session } from "@prisma/client";

export class SessionRepository implements ISessionRepository {
    async create(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
        return await prisma.session.create({ data });
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
    async update(session: Session): Promise<Session | null> {
        return await prisma.session.update({
            where: { id: session.id },
            data: session
        });
    }
}