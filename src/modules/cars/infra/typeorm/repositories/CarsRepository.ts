import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import dataSource from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = dataSource.getRepository(Car);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOneBy({ id });

        return car;
    }
    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        const car = await carsQuery.getMany();

        return car;
    }

    async create({
        name,
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOneBy({ license_plate });

        return car;
    }
}

export { CarsRepository };
