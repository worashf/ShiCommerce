const nodemailer = require("nodemailer")

const sendEmail = async options => {
    const  transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: this.process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
    });
    const message = {
        from: `${process.env.SMTP_FROM_NAME} < ${process.env.SMTP_FROM_EMAIL}`,
        to: options.email,
        subject: options.subject,
        text:options.message
    }
    await transport.sendMail(message)
}

module.exports = sendEmail
 
