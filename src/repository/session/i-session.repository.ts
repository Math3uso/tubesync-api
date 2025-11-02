import { Session } from "@prisma/client";

export interface ISessionRepository {
    create(data: { token: string; userId: string; expiresAt: Date }): Promise<Session>;
    findByToken(token: string): Promise<Session | null>;
    deleteByToken(token: string): Promise<Session>;
}