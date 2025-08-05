import { UserRepositoryInMemory } from "../../repository/memory/user-repository-memory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthenticateService } from "../authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { UserIsNoteFoundError } from "../errors/user-is-not-found-error";
import { RefreshTokenRepositoryInMemory } from "../../repository/memory/refresh-token-memory";

let userRepository: UserRepositoryInMemory;
let refrashTokenRepository: RefreshTokenRepositoryInMemory;
let sut: AuthenticateService;


describe('Register Service', async () => {

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        refrashTokenRepository = new RefreshTokenRepositoryInMemory();
        sut = new AuthenticateService(userRepository, refrashTokenRepository);
    });

    it('should be able to authenticate', async () => {

        const { email } = await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        const fakeGenerateToken = vi.fn().mockResolvedValue('fake-refresh-token');

        const { user } = await sut.execute({
            email,
            password: "123123123",
            generateToken: fakeGenerateToken
        });

        expect(user.id).toEqual(expect.any(String));

    });

    it('it should not be possible to authenticate with the wrong password', async () => {

        const fakeGenerateToken = vi.fn().mockResolvedValue('fake-refresh-token');

        const { email } = await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        await expect(async () => {
            await sut.execute({
                email,
                password: "invalid password",
                generateToken: fakeGenerateToken
            });
        }).rejects.toThrowError(InvalidCredentialsError);

    });

    it('should not be possible to authenticate with an invalid email', async () => {

        const fakeGenerateToken = vi.fn().mockResolvedValue('fake-refresh-token');

        await userRepository.create({
            name: "teste",
            email: "teste@teste.com",
            password_hash: await hash("123123123", 6)
        });

        await expect(async () => {
            await sut.execute({
                email: "invalidEmail@email.com",
                password: "123123123",
                generateToken: fakeGenerateToken
            });
        }).rejects.toThrowError(UserIsNoteFoundError);
    });

});