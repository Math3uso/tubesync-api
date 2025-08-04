import { UserRepository } from "@/repository/user/user-repository"
import { RegisterService } from "../register";

export const MakeRegisterService = () => {
    const userRepository = new UserRepository();
    const userService = new RegisterService(userRepository);

    return userService;
}