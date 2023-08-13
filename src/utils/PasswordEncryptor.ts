import { Injectable } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { config } from 'dotenv';

config();

@Injectable()
export class PasswordEncryptor {

    private readonly algorithm = 'aes-256-ctr';
    private readonly secretKey = Buffer.from(process.env.PASSWORD_KEY, 'hex');
    private readonly iv = randomBytes(16);

    public encryptPassword(password: string): string {
        const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
        return encrypted.toString('hex');
    }

    public decryptPassword(encryptedPassword: string): string {
        const decipher = createDecipheriv(this.algorithm, this.secretKey, this.iv);
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedPassword, 'hex')), decipher.final()]);
        return decrypted.toString();
    }

}