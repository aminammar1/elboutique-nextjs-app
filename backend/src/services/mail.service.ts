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

  async sendNewsletterEmail(to: string) {
    const mailOptions = {
      from: 'newsletter@boutique.store',
      to,
      subject: 'Welcome to EL Boutique Newsletter!',
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #d4af37; margin: 0;">EL Boutique</h1>
        <p style="font-size: 16px; color: #777;">Exclusive Fashion & Style</p>
        </div>
        <div style="background-color: #f8f8f8; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">Thanks for subscribing!</h2>
        <p style="font-size: 16px; line-height: 1.5;">You're now part of our exclusive community. We'll keep you updated with:</p>
        <ul style="font-size: 16px; line-height: 1.5;">
          <li>Latest fashion trends</li>
          <li>New collection releases</li>
          <li>Special promotions and discounts</li>
          <li>Styling tips and inspiration</li>
        </ul>
        </div>
        <div style="text-align: center; margin-top: 30px;">
        <a href="https://elboutique.com" style="display: inline-block; background-color: #d4af37; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">Visit Our Store</a>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #999;">
        <p>© ${new Date().getFullYear()} EL Boutique. All rights reserved.</p>
        <p>If you no longer wish to receive our newsletters, <a href="#" style="color: #999; text-decoration: underline;">unsubscribe here</a>.</p>
        </div>
      </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Newsletter email sent successfully.');
    } catch (error) {
      console.error('Error sending newsletter email:', error);
    }
  }
}
