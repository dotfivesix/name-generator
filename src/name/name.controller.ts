import { Controller, Get, Query } from '@nestjs/common';
import { NameService } from './name.service';

@Controller('name')
export class NameController {
    
    constructor(
        private nameService: NameService
    ) {};

    @Get()
    getName(
        @Query('count') count? :number,
        @Query('must') must? : string,
    ) {
        if (count) {
            const names = [];
            for (let i = 0; i < count; i++) names.push(this.nameService.generateName(must));
            return names;
        }
        else return this.nameService.generateName(must);
    }
}
