const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/newUser", async (req, res) => {

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     type: 'OAuth2',
     user: 'gayle@syncronize.com.au',  // Your email address
     clientId: process.env.CLIENT_ID,
     clientSecret: process.env.CLIENT_SECRET,
     refreshToken: process.env.REFRESH_TOKEN,
    }
 })
try {
    await transporter.verify();

  let mailOptions = {
    from: process.env.SMTP_MAIL,
    to: emailId,
    subject: emailSub,
    text: emailText,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`message sent: ${info}`)

} catch (error) {
    console.error(error)
}

})


module.exports = router;
