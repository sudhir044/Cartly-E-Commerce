import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `Cartly <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            text: message
        });
        console.log('Email sent successfully');
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.export = sendEmail;