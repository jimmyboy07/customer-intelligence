const nodemailer = require('nodemailer');

async function sendCustomerEmail({ to, name, summary }) {
  const host = process.env.SMTP_HOST;
  if (!host) return;

  const transporter = nodemailer.createTransport({
    host: host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    to,
    subject: `Welcome, ${name}!`,
    text: `Hi ${name},\n\nThanks for signing up. Here's a short summary:\n\n${summary}\n\n— The Team`
  });

  return info;
}

module.exports = { sendCustomerEmail };
