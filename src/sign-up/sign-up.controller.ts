import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpService } from './sign-up.service';

@Controller('sign-up')
export class SignUpController {

    constructor(
        private readonly signUpService: SignUpService
    ) {}

    @Post()
    signUp(@Body() signUpDto: SignUpDto) {
        return this.signUpService.createUser(signUpDto);
    }

    @Get()
    signUpPage() {
        return 'Sign up';
    }

    @Get(":key")
    confirmKey(@Param('key') key: string) {
        return this.signUpService.confirmKey(key);
    }
}
