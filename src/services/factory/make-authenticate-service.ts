import { UserRepository } from "@/repository/user/user-repository"
import { AuthenticateService } from "../user/authenticate";
import { RefrashTokenRepository } from "@/repository/refresh-token/refresh-token-repository";
import { SessionRepository } from "@/repository/session/session-repository";

export const MakeAuthenticateService = () => {
    const userRepository = new UserRepository();
    // const tokenRepository = new RefrashTokenRepository();
    const sessionRepository = new SessionRepository();
    const userService = new AuthenticateService(userRepository, sessionRepository);

    return userService;
}