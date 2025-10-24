import { HttpExeption } from "../exeption";

export class UnauthorizedExeption extends HttpExeption {
    constructor(
        public message: string = "Unauthorized"
    ) {
        super(401, message);
    }
}