import nodeMailer, { createTestAccount } from 'nodemailer';

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendNotification = async ({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) => {
  const mailOptions = {
    from: {
      name: 'Kuba Nowacki',
      address: process.env.USER,
    },
    to,
    subject,
    text: message,
  };

  try {
    // @ts-expect-error
    transporter.sendMail(mailOptions);
    console.log('Email has been sent');
  } catch (error) {
    console.error(error);
  }
};
