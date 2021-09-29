import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../../shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send email for reset password for user", async () => {
    const sendMail = spyOn(mailProviderInMemory, "sendEmail");

    await usersRepositoryInMemory.create({
      email: "tuokeam@roezkub.uy",
      driver_license: "966791557",
      name: "Micheal Berry",
      password: "pass_teste",
    });

    await sendForgotPasswordMailUseCase.execute("tuokeam@roezkub.uy");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send email for reset password for user not valid", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("werhi@comwi.fr")
    ).rejects.toEqual(new AppError("E-mail not found"));
  });

  it("should be able to create usersTokens when send forgot password mail is called for user", async () => {
    const usersTokens = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      email: "re@fejim.fj",
      driver_license: "1214207051",
      name: "Helena Bell",
      password: "pass_teste",
    });

    await sendForgotPasswordMailUseCase.execute("re@fejim.fj");

    expect(usersTokens).toHaveBeenCalled();
  });
});
