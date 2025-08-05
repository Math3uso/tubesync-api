import { RefreshToken, Prisma } from "@prisma/client";
import { RefrashTokenRepository } from "../refresh-token/refresh-token-repository";
import { randomUUID } from "crypto";

export class RefreshTokenRepositoryInMemory implements RefrashTokenRepository {

    public tokens: RefreshToken[] = [];

    async findById(id: string): Promise<RefreshToken | null> {
        const token = this.tokens.find(el => el.id == id);

        if (!token) return null;

        return token;
    }
    async delete(id: string): Promise<RefreshToken> {

        const index = this.tokens.findIndex(el => el.id == id) as number;

        const [deleted] = this.tokens.splice(index, 1);
        return deleted;
    }
    async create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken> {

        const now = new Date();

        const token: RefreshToken = {
            id: randomUUID(),
            createdAt: new Date(),
            expiresAt: new Date((now.getDate() + 10)),
            token: "token",
            userId: data.userId,
        }

        this.tokens.push(token);
        return token;
    }

}