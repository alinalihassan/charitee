"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var path = require('path');
var ejs = require('ejs');
class EmailService {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    send_email(to, subject, template, template_data = {}) {
        let transporter = this._transporter;
        ejs.renderFile(path.join(__dirname, "/../../email_templates/html/", template + ".html"), template_data, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var mainOptions = {
                    from: 'alin@charit.ee',
                    to: to,
                    subject: subject,
                    html: data
                };
                console.log("Sending email to " + to);
                transporter.sendMail(mainOptions, function (send_err, info) {
                    if (send_err) {
                        console.log(send_err);
                    }
                    else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=email.js.map