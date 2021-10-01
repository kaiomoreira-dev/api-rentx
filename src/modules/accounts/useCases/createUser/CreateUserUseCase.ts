import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 8);

    const checkEmailUserExist = await this.userRepository.findByEmail(email);

    if (checkEmailUserExist) {
      throw new AppError("Email already exists!");
    }

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
