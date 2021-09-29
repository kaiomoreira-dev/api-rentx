import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealEmailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const diskMail = {
  ethereal: container.resolve(EtherealEmailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  diskMail[process.env.mailProvider]
);
