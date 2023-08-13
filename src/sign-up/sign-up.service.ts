import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordEncryptor } from 'src/utils/PasswordEncryptor';
import { IdGenerator } from 'src/utils/IdGenerator';
import { Validator } from 'src/utils/Validator';
import { User } from 'src/user/entities/user.entity';
import { EmailSystem } from 'src/utils/EmailSystem';

@Injectable()
export class SignUpService {

    constructor(
        private readonly passwordEncryptor: PasswordEncryptor,
        private readonly idGenerator: IdGenerator,
        private readonly validator: Validator,
        private readonly emailSystem: EmailSystem
    ) {}

    public async createUser(signUpDto: SignUpDto) {

        const { username, email, password } = signUpDto;

        const encryptedPassword = this.passwordEncryptor.encryptPassword(password);
        const id = this.idGenerator.generateNumericalId();
        const activationKey = this.idGenerator.generateHexId();
        const isEmailValid = this.validator.isValidEmail(email);
        const isUsernameValid = this.validator.isValidUsername(username);

        if (!isEmailValid || !isUsernameValid) {
            throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
        }

        const newUser = new User({
            id,
            activated: false,
            activationKey,
            email,
            password: encryptedPassword,
            username,
            favorites: []
        });

        const usernameAlreadyExists = await User.findOne({ username, activated: true });
        if (usernameAlreadyExists) throw new HttpException('username already exists', HttpStatus.CONFLICT);

        const emailAlreadyExists = await User.findOne({ email, activated: true });
        if (emailAlreadyExists) throw new HttpException('a user with email already exists', HttpStatus.CONFLICT);

        try {
            const nonActivatedUser = await User.findOneAndUpdate({ username, activated: false }, { email, password: encryptedPassword, activationKey });
            if (!nonActivatedUser) await newUser.save();
            await this.emailSystem.sendEmail(email, activationKey);
        } catch (err) {
            console.error(err);
            throw new HttpException("can't create", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    public async confirmKey(key:string) {
        const keyExists = await User.findOneAndUpdate({ activationKey: key, activated: false }, { activated: true });
        if (!keyExists) throw new HttpException('Either Link Has Expired Or Account Has Been Activated Already', HttpStatus.NOT_FOUND)
    }

}
