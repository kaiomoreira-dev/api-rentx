interface IMailProvider {
  sendEmail(
    to: string,
    subject: string,
    path: string,
    variables: any
  ): Promise<void>;
}

export { IMailProvider };
