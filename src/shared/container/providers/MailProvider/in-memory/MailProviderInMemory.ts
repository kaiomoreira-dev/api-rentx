import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  async sendEmail(
    to: string,
    subject: string,
    path: string,
    variables: any
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      path,
      variables,
    });
  }
}

export { MailProviderInMemory };
