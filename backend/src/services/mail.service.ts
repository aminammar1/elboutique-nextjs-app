import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '8b4b3b3aa815fa',
        pass: '71d9ed5b070ba1',
      },
    });

    /*this.transporter.verify((error) => {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP connected.');
      }
    });
  }:  
  */
  }

  async sendOTPEmail(to: string, otp: string) {
    const mailOptions = {
      from: 'Auth Service',
      to,
      subject: 'Your Password Reset OTP',
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This code is valid for 10 minutes.</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully.');
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }
}
