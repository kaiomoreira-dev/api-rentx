import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  refresh_token: string;
  token: string;
}

@injectable()
class AuthenticateUserUseCases {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    const {
      secret_refresh_token,
      expire_in_refresh_token,
      expire_days_refresh_token,
    } = auth;

    if (!user) {
      throw new AppError("Invalid email or password", 400);
    }

    const checkPasswordUserIsValid = await compare(password, user.password);

    if (!checkPasswordUserIsValid) {
      throw new AppError("Invalid email or password", 400);
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expire_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expire_in_refresh_token,
    });

    const expire_date_refresh_token = this.dateProvider.addDays(
      expire_days_refresh_token
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expire_date: expire_date_refresh_token,
    });

    const userInfo: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
      token,
    };

    return userInfo;
  }
}

export { AuthenticateUserUseCases };
