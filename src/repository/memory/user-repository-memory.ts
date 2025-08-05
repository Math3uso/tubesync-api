import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { IUserRepository } from "../user/i-user-repository";

export class UserRepositoryInMemory implements IUserRepository {

    public users: User[] = [];

    async create(data: Prisma.UserCreateInput): Promise<User> {

        const newUser: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            created_at: new Date(),
            password_hash: data.password_hash,
        }

        this.users.push(newUser);

        return newUser;
    }

    async findById(id: string): Promise<User | null> {

        const user = this.users.find(el => el.id == id);

        if (!user) return null;

        return user;

    }
    async findByEmail(email: string): Promise<User | null> {

        const user = this.users.find(el => el.email == email);

        if (!user) return null;

        return user;

    }
}