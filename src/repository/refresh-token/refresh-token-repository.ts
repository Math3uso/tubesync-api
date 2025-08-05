import { Prisma, RefreshToken } from "@prisma/client";
import { iRefreshTokenRepository } from "./i-refresh-token-repository";
import { prisma } from "@/lib/prisma";

export class RefrashTokenRepository implements iRefreshTokenRepository {
    async findById(id: string): Promise<RefreshToken | null> {
        const token = await prisma.refreshToken.findUnique({
            where: { id }
        });
        return token;
    }
    async delete(id: string): Promise<RefreshToken> {
        const token = await prisma.refreshToken.delete({
            where: { id }
        });
        return token;
    }
    async create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken> {
        const newRefrashToken = await prisma.refreshToken.create({
            data
        });
        return newRefrashToken;
    }

}