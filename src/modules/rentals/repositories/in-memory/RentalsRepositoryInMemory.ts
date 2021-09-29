import { ICreateRentalsDTO } from "@modules/rentals/dto/ICreateRentalsDTO";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rentals[] = [];

  async findById(id: string): Promise<Rentals> {
    return this.rentals.find((rentals) => rentals.id === id);
  }

  async findByUser(user_id: string): Promise<Rentals[]> {
    const rentals = this.rentals.filter(
      (rentals) => rentals.user_id === user_id
    );

    return rentals;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalsDTO): Promise<Rentals> {
    const rentals = new Rentals();

    Object.assign(rentals, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      id,
      end_date,
      total,
    });

    this.rentals.push(rentals);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
