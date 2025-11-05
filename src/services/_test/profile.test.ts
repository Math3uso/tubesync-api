import { UserRepositoryInMemory } from "../../repository/memory/user-repository-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "../register";
import { ProfileService } from "../profile";
import { hash } from "bcryptjs";

let userRepository: UserRepositoryInMemory;
let sut: ProfileService;


describe('Profile Service', async () => {

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        sut = new ProfileService(userRepository);
    });

    it('should be able to search profile', async () => {

        const createdUser = await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        const { user } = await sut.execute({ userId: createdUser.id });

        expect(user.id).toEqual(expect.any(String));

        expect(user.email).toEqual("teste@teste.com");

    });

});