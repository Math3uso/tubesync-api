import { SessionRepositoryInMemory } from "@/repository/memory/session-repository-in-memory";
import { UserRepositoryInMemory } from "@/repository/memory/user-repository-memory";
import { ProfileService } from "@/services/profile";
import { UpdateSessionService } from "@/services/session/update-session-service";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let sessionRepository: SessionRepositoryInMemory;
let sut: UpdateSessionService;


describe('Update Session', async () => {

    beforeEach(() => {
        sessionRepository = new SessionRepositoryInMemory();
        sut = new UpdateSessionService(sessionRepository);
    });

    it('should be able to update a session', async () => {
        const session = await sessionRepository.create({
            refrashToken: 'old-token',
            userId: 'user-id',
            expiresAt: new Date(),
        });

        const { session: updatedSession } = await sut.execute({ token: 'old-token', newToken: 'new-token' });

        expect(updatedSession.refrashToken).toEqual('new-token');
    });

});