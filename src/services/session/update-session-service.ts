import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { ISessionRepository } from "@/repository/session/i-session.repository";

interface UpdateSessionServiceRequest {
    token: string;
    newToken: string;
}

export class UpdateSessionService {
    constructor(private readonly sessionRepository: ISessionRepository) { }

    async execute({ token, newToken }: UpdateSessionServiceRequest) {
        const session = await this.sessionRepository.findByToken(token);

        if (!session) throw new NotFoundExeption('Session not found');

        session.refrashToken = newToken;

        await this.sessionRepository.update(session);

        return {
            session
        }
    }
}