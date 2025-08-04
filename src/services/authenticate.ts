import { UserRepository } from "@/repository/user/user-repository";
import { UserIsNoteFoundError } from "./errors/user-is-not-found-error";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
    refrash_token: string;
}

export class AuthenticateService {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, refrash_token, password }: AuthenticateServiceRequest) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new UserIsNoteFoundError();

        const verifiPassword = await compare(password, user.password_hash)

        if (!verifiPassword) throw new InvalidCredentialsError();

        await this.userRepository.setRefrashToken(user.id, refrash_token);

        return {
            user,
        }

    }
}