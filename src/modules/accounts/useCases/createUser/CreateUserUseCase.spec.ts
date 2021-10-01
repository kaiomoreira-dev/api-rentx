import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create a user case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a user", async () => {
    const userCreated = await createUserUseCase.execute({
      email: "kuhbap@zi.ne",
      driver_license: "2356696358",
      name: "Jimmy Malone",
      password: "password",
    });

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a user with email exists", async () => {
    await usersRepositoryInMemory.create({
      email: "avi@duraniugo.pf",
      driver_license: "235669635822",
      name: "Rosa Erickson",
      password: "password",
    });
    await expect(
      createUserUseCase.execute({
        email: "avi@duraniugo.pf",
        driver_license: "235669635822",
        name: "Rosa Erickson",
        password: "password",
      })
    ).rejects.toEqual(new AppError("Email already exists!"));
  });
});
