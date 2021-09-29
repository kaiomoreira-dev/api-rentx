import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION_SES,
      }),
    });
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

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@ksmdesenvolvimentos.com.br>",
      subject,
      html: templateHtml,
    });
  }
}

export { SESMailProvider };
