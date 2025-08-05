import { IUserRepository } from "@/repository/user/i-user-repository";
import { UserIsNoteFoundError } from "./errors/user-is-not-found-error";

interface ProfileServiceRequest {
    userId: string;
}

export class ProfileService {
    constructor(private userRepository: IUserRepository) { }

    async execute({ userId }: ProfileServiceRequest) {

        const user = await this.userRepository.findById(userId);

        if (!user) throw new UserIsNoteFoundError();

        return {
            user,
        }

    }
}