import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const licensePlateExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (licensePlateExists) {
      throw new AppError("Cars already exists");
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export { CreateCarsUseCase };
