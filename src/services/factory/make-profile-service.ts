import { UserRepository } from "@/repository/user/user-repository"
import { ProfileService } from "../profile";

export const MakeProfileService = () => {
    const userRepository = new UserRepository();
    const prifoleService = new ProfileService(userRepository);

    return prifoleService;
}