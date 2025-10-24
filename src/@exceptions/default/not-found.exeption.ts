import { HttpExeption } from "../exeption";

export class NotFoundExeption extends HttpExeption {
    constructor(
        public message: string = "resource not found"
    ) {
        super(404, message);
    }
}