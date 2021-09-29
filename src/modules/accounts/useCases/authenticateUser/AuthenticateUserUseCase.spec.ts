import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCases } from "./AuthenticateUserUseCase";

let createUsersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let autenticateUserUseCase: AuthenticateUserUseCases;

describe(" should be able authenticate user", () => {
  beforeEach(() => {
    createUsersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(createUsersRepositoryInMemory);
    autenticateUserUseCase = new AuthenticateUserUseCases(
      createUsersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be ale authenticate user", async () => {
    const user: ICreateUserDTO = {
      name: "Name for test user",
      email: "fake@fake.com",
      password: "123456",
      driver_license: "9758641",
    };

    await createUserUseCase.execute(user);

    const createdUser = await autenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    console.log(createdUser);

    expect(createdUser).toHaveProperty("refresh_token");
  });

  it("should be able authenticate user not valid", async () => {
    await expect(
      autenticateUserUseCase.execute({
        email: "fake@fake.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Invalid email or password"));
  });

  it("should be able authenticate user with invalid password", async () => {
    const user: ICreateUserDTO = {
      name: "Name for test user",
      email: "fake@fake.com",
      password: "123456",
      driver_license: "9758641",
    };
    await createUserUseCase.execute(user);

    await expect(
      autenticateUserUseCase.execute({
        email: user.email,
        password: "654321",
      })
    ).rejects.toEqual(new AppError("Invalid email or password"));
  });
});
