import { IUserRepository } from "@/repository/user/i-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterService {
    constructor(private userRepository: IUserRepository) { }

    async execute({ name, email, password }: RegisterServiceRequest) {

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) throw new UserAlreadyExistsError();

        const passwordHash = await hash(password, 6);

        const newUser = await this.userRepository.create({ name, email, password_hash: passwordHash });

        return {
            newUser
        }

    }
}