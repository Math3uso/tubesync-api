import { UserRepositoryInMemory } from "../../repository/memory/user-repository-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "../register";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { compare } from "bcryptjs";

let userRepository: UserRepositoryInMemory;
let sut: RegisterService;


describe('Register Service', async () => {

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        sut = new RegisterService(userRepository);
    });

    it('should be able to register', async () => {

        const { newUser } = await sut.execute({
            name: "teste",
            email: "teste@teste.com",
            password: "123123123"
        });

        expect(newUser.id).toEqual(expect.any(String));

    });

    it('should not allow registering with an existing emai', async () => {

        await sut.execute({
            name: "teste",
            email: "teste@teste.com",
            password: "123123123"
        });

        await expect(async () => {
            await sut.execute({
                name: "teste",
                email: "teste@teste.com",
                password: "123123123"
            });
        }).rejects.toThrowError(UserAlreadyExistsError);

    });

    it('it should be possible to hash the password in the registry', async () => {
        const { newUser } = await sut.execute({
            name: "teste",
            email: "teste@teste.com",
            password: "123123123"
        });

        const comparePassword = await compare('123123123', newUser.password_hash);

        expect(comparePassword).toEqual(true);

    });

});