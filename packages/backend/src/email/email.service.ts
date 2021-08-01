import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class EmailService {
  constructor(
    @InjectSendGrid() private readonly emailClient: SendGridService,
  ) {}

  async sendEmail(
    template_name: string,
    to_email: string,
    subject: string,
    context: any,
  ): Promise<void> {
    const templateStr = readFileSync(
      resolve('email_templates/html/', template_name + '.html'),
    ).toString('utf8');
    const template = compile(templateStr);
    console.log(template(context));

    const msg = {
      to: to_email,
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      subject: subject,
      html: template(context),
    };
    this.emailClient.send(msg);
  }
}
