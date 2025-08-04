export class UserIsNoteFoundError extends Error {
    constructor() {
        super("user is not found");
    }
}