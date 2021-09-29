import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { IDateProvider } from "../../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../../shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePathEmail = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("E-mail not found");
    }

    const token = uuidv4();

    const expire_date = this.dayjsDateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expire_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.NODE_URL_FORGOT}${token}`,
    };

    await this.mailProvider.sendEmail(
      email,
      "Reperação de senha",
      templatePathEmail,
      variables
    );
  }
}

export { SendForgotPasswordMailUseCase };
