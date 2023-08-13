import { Injectable } from "@nestjs/common";

@Injectable()
export class Validator {

    public isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public isValidUsername(username: string): boolean {
        const usernameRegex = /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}(?<![0-9])$/;
        return usernameRegex.test(username);
    }

}
