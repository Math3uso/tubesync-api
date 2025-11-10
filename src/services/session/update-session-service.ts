import { NotFoundExeption } from "@/@exceptions/default/not-found.exeption";
import { ISessionRepository } from "@/repository/session/i-session.repository";
import { SessionRepository } from "@/repository/session/session-repository";

interface UpdateSessionServiceRequest {
    token: string;
    //newToken: string;
    generateToken: (payload: object) => Promise<string>;
}

export class UpdateSessionService {
    constructor(private readonly sessionRepository: ISessionRepository) { }

    async execute({ token, generateToken }: UpdateSessionServiceRequest) {
        const session = await this.sessionRepository.findByToken(token);

        if (!session) throw new NotFoundExeption('Session not found');

        const newToken = await generateToken({ sub: session.userId });

        session.refrashToken = newToken;

        await this.sessionRepository.update(session);

        return {
            session,
            newToken
        }
    }

    static create() {
        const sessionRepository: ISessionRepository = new SessionRepository();
        return new UpdateSessionService(sessionRepository);
    }
}