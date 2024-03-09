import nodemailer from 'nodemailer';
import { KafkaMessage } from 'kafkajs'

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  type SendMailMessageType = {
    value: KafkaMessage
  }

  async function main({ value }: SendMailMessageType) {
    // send mail with defined transport object
    const data = value?.value?.toString() || '{}';
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "something@something.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hi, ${JSON.parse(data).name} your Order with  Order Id ${JSON.parse(data).orderId} is Confirmed.`, // plain text body
      html: `<b>Hi, ${JSON.parse(data).name} your Order with  Order Id ${JSON.parse(data).orderId} is Confirmed.</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  export default main;
  