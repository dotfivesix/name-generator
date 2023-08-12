import { Injectable } from '@nestjs/common';
import { sample } from "lodash";

@Injectable()
export class NameService {
    
    constructor() {}

    public generateNameElement(): string {

        const letters = ["ka","tu","me","ie","ku", "ru", "ji","re", "ki","zu", "me", "ta", "rin", "to", "mo", "no","no","ke", "shi", "su", "chi", "do", "ru","mei", "na", "fu", "ze"];
        return sample(letters);
        
    }

    public generateName(mustInclude?:string) {

        let positions = ['0','1','2'];
        const position:string = sample(positions);

        for (let i = 0; i < positions.length; i++) {
            if (position === positions[i]) positions[i] = mustInclude;
            else positions[i] = this.generateNameElement();
        }

        return positions.join('');
    }
}
