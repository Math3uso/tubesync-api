import { UserRepository } from "@/repository/user/user-repository";
import { UserIsNoteFoundError } from "./errors/user-is-not-found-error";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { RefrashTokenRepository } from "@/repository/refresh-token/refresh-token-repository";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
    generateToken: (payload: object) => Promise<string>;
}

export class AuthenticateService {
    constructor(
        private userRepository: UserRepository,
        private refrashTokenRepository: RefrashTokenRepository
    ) { }

    async execute({ email, password, generateToken }: AuthenticateServiceRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UserIsNoteFoundError();

        const verifiPassword = await compare(password, user.password_hash)

        if (!verifiPassword) throw new InvalidCredentialsError();

        const now = new Date();

        const refreshToken = await generateToken({ sub: user.id });

        await this.refrashTokenRepository.create({
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date((now.getDate() + 10))
        });
        return {
            user,
            refreshToken
        }

    }
}