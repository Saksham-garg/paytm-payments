import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    }
})
enum EmailType {
    OTP = 'OTP',
    VERIFIED = 'VERIFY'
}

export const sendEmail = async({email,emailType}:{email:string,emailType:EmailType}) => {
    try {
        const mailOptions = {
            from: `"PayZee Payments" <${process.env.SMTP_MAIL}>`, // sender address
            to: email, // list of receivers
            subject: EmailType.OTP == emailType ? 'Verify you account - PayZee Payments':'Account Verified - PayZee Payments', // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        const info = await transporter.sendMail(mailOptions);

        return info
    } catch (error:any) {
        throw new Error(error)
    }
}