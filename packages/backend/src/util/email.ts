const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const path = require('path');
const ejs = require('ejs');

export interface Data {
  [name: string]: any;
}

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.SMTP_CLIENT_ID,
    process.env.SMTP_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.SMTP_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SMTP_FROM_EMAIL,
      accessToken,
      clientId: process.env.SMTP_CLIENT_ID,
      clientSecret: process.env.SMTP_CLIENT_SECRET,
      refreshToken: process.env.SMTP_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export async function send_email(
  to: string,
  subject: string,
  template: string,
  template_data: Data = {}
) {
  const transporter = await createTransporter();
  ejs.renderFile(
    path.join(__dirname, '/../../email_templates/html/', template + '.html'),
    template_data,
    (err: Error, data: string) => {
      if (err) {
        console.log(err);
      } else {
        const mainOptions = {
          from: 'alin@charit.ee',
          to: to,
          subject: subject,
          html: data,
        };

        console.log('Sending email to ' + to);
        transporter.sendMail(mainOptions, (send_err: Error, info: any) => {
          if (send_err) {
            console.log(send_err);
          } else {
            console.log('Message sent: ' + info.response);
          }
        });
      }
    }
  );
}
