import { IMailProvider } from "../mail.interface";
import nodemailer, { Transporter } from "nodemailer";

interface NodeMailerConfig{
   service : string;
   auth:{user:string,pass:string};
    host:string;
    port:number;
}


export class NodeMailerProvider implements IMailProvider {

private transporter:Transporter;

    constructor(config:NodeMailerConfig){
    this.transporter = nodemailer.createTransport({
     service:config.service,
     auth:{
        user:config.auth.user,
        pass:config.auth.pass
     },
     host:config.host,
     port:config.port,
   })   
}


    async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Mailtrap" <[EMAIL_ADDRESS]>',
      to,
      subject,
      html,
    });  
}

}
    