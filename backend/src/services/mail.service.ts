import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:8080/reset-password?token=${token}`;
    const mailOptions = {
      from: 'LookUp',
      to: to,
      subject: 'Password Reset Request',
      html: `<p> You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password </a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
