/* eslint-disable import/no-anonymous-default-export */
// @ts-nocheck
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.fullName}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

  const data = {
    to: 'aidensmith20@gmail.com',
    from: 'aidensmith20@gmail.com',
    subject: `New message from ${body.fullName}`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  await mail.send(data)
  .then(() => {
    res.status(200).json({
      status: 'success',
    })
  });
};