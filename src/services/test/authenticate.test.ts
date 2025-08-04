import { UserRepositoryInMemory } from "../../repository/memory/user-repository-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "../authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { UserIsNoteFoundError } from "../errors/user-is-not-found-error";

let userRepository: UserRepositoryInMemory;
let sut: AuthenticateService;


describe('Register Service', async () => {

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        sut = new AuthenticateService(userRepository);
    });

    it('should be able to authenticate', async () => {

        const { email } = await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        const { user } = await sut.execute({
            email,
            password: "123123123",
            refrash_token: "token...."
        });

        expect(user.id).toEqual(expect.any(String));

    });

    it('it should not be possible to authenticate with the wrong password', async () => {
        const { email } = await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        await expect(async () => {
            await sut.execute({
                email,
                password: "invalid password",
                refrash_token: "token...."
            });
        }).rejects.toThrowError(InvalidCredentialsError);

    });

    it('should not be possible to authenticate with an invalid email', async () => {
        await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        await expect(async () => {
            await sut.execute({
                email: "invalidEmail@email.com",
                password: "123123123",
                refrash_token: "token...."
            });
        }).rejects.toThrowError(UserIsNoteFoundError);
    });

});