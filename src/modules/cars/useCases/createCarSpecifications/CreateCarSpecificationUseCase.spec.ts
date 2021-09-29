import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

import { AppError } from "../../../../../shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let createSpecificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create specification a Car", () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    createSpecificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      createCarsRepositoryInMemory,
      createSpecificationsRepositoryInMemory
    );
  });

  it("should not be able to create specification a car not exists", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "123",
        specification_id: ["789"],
      })
    ).rejects.toEqual(new AppError("Car not exist!"));
  });

  it("should be able to create specification a car", async () => {
    const car = await createCarsRepositoryInMemory.create({
      name: "Nome de carro",
      brand: "MARCA",
      category_id: "CATEGORIA",
      daily_rate: 10,
      description: "Descricao do carro",
      fine_amount: 200,
      license_plate: " ASD-3244",
    });

    const specification = await createSpecificationsRepositoryInMemory.create({
      name: "name_teste",
      description: "description_teste",
    });
    const specification_id = [specification.id];

    const createdCarSPecification = await createCarSpecificationUseCase.execute(
      {
        car_id: car.id,
        specification_id,
      }
    );
    console.log(createdCarSPecification);

    expect(createdCarSPecification).toHaveProperty("specifications");
    expect(createdCarSPecification.specifications.length).toBe(1);
  });
});
