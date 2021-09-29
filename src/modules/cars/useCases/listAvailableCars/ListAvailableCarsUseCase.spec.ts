import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List all cars", () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      createCarsRepositoryInMemory
    );
  });

  it("should be able to create list all cars available", async () => {
    const car = await createCarsRepositoryInMemory.create({
      name: "car1",
      brand: "car_brand",
      category_id: "category_id",
      daily_rate: 11,
      description: "car_description",
      fine_amount: 22,
      license_plate: "car_license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to create list all for name", async () => {
    const car = await createCarsRepositoryInMemory.create({
      name: "car2",
      brand: "car_brand",
      category_id: "category_id",
      daily_rate: 11,
      description: "car_description",
      fine_amount: 22,
      license_plate: "car_license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to create list all for brand", async () => {
    const car = await createCarsRepositoryInMemory.create({
      name: "car3",
      brand: "car_brand",
      category_id: "category_id",
      daily_rate: 11,
      description: "car_description",
      fine_amount: 22,
      license_plate: "car_license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to create list all for category_id", async () => {
    const car = await createCarsRepositoryInMemory.create({
      name: "car4",
      brand: "car_brand",
      category_id: "222",
      daily_rate: 11,
      description: "car_description",
      fine_amount: 22,
      license_plate: "car_license_plate",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "222",
    });

    expect(cars).toEqual([car]);
  });
});
