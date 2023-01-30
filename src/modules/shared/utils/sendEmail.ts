import * as nodemailer from "nodemailer";
import { emailService } from "../../../config/conf";

export default async function sendEmail(to: string, subject: string, text: string) {
    const hostname: string = emailService.hostname
    const username: string = emailService.username
    const password: string = emailService.password
    console.log(password);
    
    const transporter = nodemailer.createTransport({
        host: hostname,
        port: 465,
        logger: true,
        secure: true,
        auth: {
            user: username,
            pass: password,
        },
    });

    const info = await transporter.sendMail({
        from: username,
        to,
        subject,
        text,
    });

    return info
}