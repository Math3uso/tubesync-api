import { UserRepository } from "@/repository/user/user-repository"
import { AuthenticateService } from "../user/authenticate";
import { RefrashTokenRepository } from "@/repository/refresh-token/refresh-token-repository";

export const MakeAuthenticateService = () => {
    const userRepository = new UserRepository();
    const tokenRepository = new RefrashTokenRepository();
    const userService = new AuthenticateService(userRepository, tokenRepository);

    return userService;
}