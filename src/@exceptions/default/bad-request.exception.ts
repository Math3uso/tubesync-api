import { HttpExeption } from "../exeption";

export class BadRequestException extends HttpExeption {
    constructor(
        public message: string = "invalid request"
    ) {
        super(404, message);
    }
}