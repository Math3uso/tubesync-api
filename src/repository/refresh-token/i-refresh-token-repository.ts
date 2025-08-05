import { Prisma, RefreshToken } from "@prisma/client";

export interface iRefreshTokenRepository {
    create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>
    findById(id: string): Promise<RefreshToken | null>;
    delete(id: string): Promise<RefreshToken>;
}