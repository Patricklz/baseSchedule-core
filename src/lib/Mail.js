import nodemailer from 'nodemailer';
import MailConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth } = MailConfig;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...MailConfig.default,
            ...message,
        });
    }
}
export default new Mail();
