import { Repository } from "typeorm";

import { ICreateRentalsDTO } from "@modules/rentals/dto/ICreateRentalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import dataSource from "@shared/infra/typeorm";

import { Rentals } from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rentals>;

    constructor() {
        this.repository = dataSource.getRepository(Rentals);
    }

    async findByUser(user_id: string): Promise<Rentals[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car", "user"],
        });

        return rentals;
    }

    async findById(id: string): Promise<Rentals> {
        const rental = this.repository.findOneBy({ id });

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        return this.repository.findOne({
            where: { car_id, end_date: null },
        });
    }
    async findOpenRentalByUser(user_id: string): Promise<Rentals> {
        return this.repository.findOne({
            where: { user_id, end_date: null },
        });
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalsDTO): Promise<Rentals> {
        const rentals = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repository.save(rentals);

        return rentals;
    }
}

export { RentalsRepository };
