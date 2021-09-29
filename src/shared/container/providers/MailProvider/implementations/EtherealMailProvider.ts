import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealEmailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  async sendEmail(
    to: string,
    subject: string,
    path: string,
    variables: any
  ): Promise<void> {
    const templateFileContentEmail = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContentEmail);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "<noreply@rentx.com>",
      subject,
      html: templateHtml,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealEmailProvider };
