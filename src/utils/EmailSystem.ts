import { Injectable } from "@nestjs/common";
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { config } from "dotenv";

config();

@Injectable()
export class EmailSystem {
    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });
    }

    public async sendEmail(email: string, key: string): Promise<void> {
        const mailOptions: SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Confirm Signup',
            text: `Click on the link to complete account creation (only valid for 24 hours): ${process.env.HOST}/sign-up/${key}`
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            console.error(`Error sending email to ${email}:`, error);
        }
    }
}
