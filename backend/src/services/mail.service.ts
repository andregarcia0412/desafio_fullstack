import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name)

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host:"smtp-mail.outlook.com",
      port:587,
      secure: false,
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS'),
      },
      tls: {
        ciphers:"SSLv3",
        rejectUnauthorized: false
      },
      family: 4,
      logger: true,
      debug: true,
    } as any);
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error('ERRO CRÍTICO NA CONEXÃO SMTP:', error);
      } else {
        this.logger.log('SMTP CONECTADO COM SUCESSO! Pronto para enviar.');
      }
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `https://lookup-finance.vercel.app/reset-password?token=${token}`;
    const mailOptions = {
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: to,
      subject: 'Password Reset Request',
      html: `<p> You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password </a></p>`,
    };

    try {
      this.logger.log(`Tentando enviar email para: ${to}`);
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email enviado! ID: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error(`FALHA AO ENVIAR EMAIL PARA ${to}:`, error);
      throw error;
    }
  }
}
