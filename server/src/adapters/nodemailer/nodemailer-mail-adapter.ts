import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "44d2b197882c13",
    pass: "191ba2e8adb6ca"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail ({subject, body}: SendMailData){
      
    await transport.sendMail({
      from: 'teste <teste@teste.com>',
      to: 'DevBrunoRafael <devbrunorafaell@gmail.com>',
      subject, 
      html:body,
    })
  }
}