import { Prisma, Session } from "@prisma/client";

export interface ISessionRepository {
    create(data: Prisma.SessionUncheckedCreateInput): Promise<Session>;
    findByToken(token: string): Promise<Session | null>;
    deleteByToken(token: string): Promise<Session | null>;
    update(session: Session): Promise<Session | null>;
}