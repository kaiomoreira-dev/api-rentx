import { ICreateRentalsDTO } from "../dto/ICreateRentalsDTO";
import { Rentals } from "../infra/typeorm/entities/Rentals";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
  create(data: ICreateRentalsDTO): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
  findByUser(user_id: string): Promise<Rentals[]>;

  updateStatusTrue(id: string, status: boolean): Promise<void>;
}

export { IRentalsRepository };
