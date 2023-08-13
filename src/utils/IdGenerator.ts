import { Injectable } from "@nestjs/common";

@Injectable()
export class IdGenerator {

    public generateNumericalId(): string {
        const idLength = 8;
        const characters = "0123456789";
        let id = "";

        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
    }

    public generateHexId(): string {
        const idLength = 50;
        const characters = "0123456789abcdef";
        let id = "";

        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
    }

}