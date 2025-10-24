import { HttpExeption } from "../exeption";

export class ForbiddenExeption extends HttpExeption {
    constructor(
        public message: string = "You do not have permission to access this resource"
    ) {
        super(404, message);
    }
}