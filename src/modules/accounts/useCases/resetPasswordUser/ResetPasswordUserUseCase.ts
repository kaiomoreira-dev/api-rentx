import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findUserByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expire_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Expired token");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteRefreshToken(token);
  }
}

export { ResetPasswordUserUseCase };
