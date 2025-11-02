import { UserRepository } from "@/repository/user/user-repository";
import { UserIsNoteFoundError } from "../errors/user-is-not-found-error";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { RefrashTokenRepository } from "@/repository/refresh-token/refresh-token-repository";
import { ISessionRepository } from "@/repository/session/i-session.repository";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
    generateToken: (payload: object) => Promise<string>;
}

export class AuthenticateService {
    constructor(
        private userRepository: UserRepository,
        private sessionRepository: ISessionRepository,
    ) { }

    async execute({ email, password, generateToken }: AuthenticateServiceRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UserIsNoteFoundError();

        const verifiPassword = await compare(password, user.password_hash)

        if (!verifiPassword) throw new InvalidCredentialsError();

        const now = new Date();

        const refreshToken = await generateToken({ sub: user.id });

        await this.sessionRepository.create({
            refrashToken: refreshToken,
            userId: user.id,
            expiresAt: new Date((now.getDate() + 20))
        });

        return {
            user,
            refreshToken
        }

    }
}