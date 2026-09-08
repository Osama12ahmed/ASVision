const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // إنشاء الناقل (Transporter)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // خيارات الرسالة
  const mailOptions = {
    from: `"AS Vision Admin Portal" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // إرسال الإيميل
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
