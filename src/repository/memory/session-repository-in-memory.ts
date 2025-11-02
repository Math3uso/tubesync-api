export class SessionRepositoryInMemory {
    private sessions: { token: string; userId: string; expiresAt: Date }[] = [];

    async create(data: { token: string; userId: string; expiresAt: Date }): Promise<void> {
        this.sessions.push(data);
    }

    async findByToken(token: string): Promise<{ token: string; userId: string; expiresAt: Date } | null> {
        const session = this.sessions.find(session => session.token === token);
        return session || null;
    }

    async deleteByToken(token: string): Promise<void> {
        this.sessions = this.sessions.filter(session => session.token !== token);
    }
}