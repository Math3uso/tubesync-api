import { UserRepository } from "@/repository/user/user-repository"
import { AuthenticateService } from "../authenticate";

export const MakeAuthenticateService = () => {
    const userRepository = new UserRepository();
    const userService = new AuthenticateService(userRepository);

    return userService;
}