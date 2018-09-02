import { StaticInjector } from "@angular/core/src/di/injector";

export class Message {
    message: string;
    type: string;

    constructor(
        message: string,
        type: string
    ){
        this.message = message;
        this.type= type;
    }
}