import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarsUseCase } from "./CreateCarsUseCase";

let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let createCarsUseCase: CreateCarsUseCase;

describe("Create a new Car", () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarsUseCase(createCarsRepositoryInMemory);
  });

  it("should be able to create a new Car", async () => {
    const createdCar = await createCarsUseCase.execute({
      name: "Nome de carro",
      brand: "MARCA",
      category_id: "CATEGORIA",
      daily_rate: 10,
      description: "Descricao do carro",
      fine_amount: 200,
      license_plate: " ASD-3244",
    });

    expect(createdCar).toHaveProperty("id");
  });

  it("should be able not create a new car with license_plate exists", async () => {
    await createCarsUseCase.execute({
      name: "Car 2",
      brand: "MARCA",
      category_id: "CATEGORIA",
      daily_rate: 10,
      description: "Descricao do carro",
      fine_amount: 200,
      license_plate: "ASD-3244_test",
    });
    await expect(
      createCarsUseCase.execute({
        name: "Car 1",
        brand: "MARCA",
        category_id: "CATEGORIA",
        daily_rate: 10,
        description: "Descricao do carro",
        fine_amount: 200,
        license_plate: "ASD-3244_test",
      })
    ).rejects.toEqual(new AppError("Cars already exists"));
  });

  it("should be able to create a new car with value default true", async () => {
    const createdCar = await createCarsUseCase.execute({
      name: "Nome de carro1",
      brand: "MARCA1",
      category_id: "CATEGORIA1",
      daily_rate: 10,
      description: "Descricao do carro2",
      fine_amount: 200,
      license_plate: " TEST-7373",
    });

    expect(createdCar.available).toBe(true);
  });
});
