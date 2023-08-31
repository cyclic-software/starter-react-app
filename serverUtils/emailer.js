require('dotenv').config()
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: process.env.MAIL_TRAP_API_TOKEN
    }
});

const sendEmail = async (email, mobile, name) => {
    // 2.2 User doesn't exists
    // 1. Send OTP to end user
    const dataToEncrypt = { email: email, mobile: mobile, name:  name}
    // const basePath = "https://long-jade-sheep.cyclic.cloud/verify/user/verify"
    // const basePath = "http://localhost:3000/user/verify"
    const basePath = "https://www.haloeffect.in/registration-successful"
    const token = jwt.sign(dataToEncrypt, "secretKey", { algorithm: 'HS256' });
    const mailSendingStartTime = new Date()
    const info = await transporter.sendMail({
        from: '"Welcome from Halo 👻" no-reply@haloeffect.in', // sender address
        to: email, // list of receivers
        subject: "Verfication Link ✔", // Subject line
        text: "Test mailer. Yo Bro!", // plain text body
        html: `<a href="${basePath}?token=${token}">Verify</a>`,
    })
    .then((r)=>{})
    .catch(e=>console.error("ERR",e));
    console.log(new Date() - mailSendingStartTime)
    return;
    //
}
module.exports = { sendEmail }