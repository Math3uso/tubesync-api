import { Prisma, Session } from "@prisma/client";
import { ISessionRepository } from "../session/i-session.repository";
import { randomUUID } from "node:crypto";

export class SessionRepositoryInMemory implements ISessionRepository {
    private sessions: Session[] = [];

    async create(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
        const now = new Date();

        const session: Session = {
            id: randomUUID(),
            createdAt: new Date(),
            expiresAt: new Date((now.getDate() + 10)),
            refrashToken: "token",
            userId: data.userId,
            ip: "",
            userAgent: ""
        }
        this.sessions.push(session);
        return session;
    }

    async findByToken(token: string): Promise<Session | null> {
        const session = this.sessions.find(session => session.refrashToken === token);
        return session || null;
    }

    async deleteByToken(token: string): Promise<Session | null> {
        const index = this.sessions.find(session => session.refrashToken === token);
        if (!index) return null;
        this.sessions = this.sessions.filter(session => session.refrashToken !== token);
        return index;
    }

    async update(session: Session): Promise<Session | null> {
        const index = this.sessions.findIndex(s => s.id === session.id);
        if (index === -1) return null;
        this.sessions[index] = session;
        return session;
    }
}