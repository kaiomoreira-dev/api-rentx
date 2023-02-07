import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalsDTO } from "@modules/rentals/dto/ICreateRentalsDTO";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalsDTO): Promise<Rentals> {
        const minimunHour = 24;

        const findRentalByCar =
            await this.rentalsRepository.findOpenRentalByCar(car_id);

        // verifica se existe um aluguel criado com o id desse carro recebido
        if (findRentalByCar && !findRentalByCar.status) {
            throw new AppError("Car already exists for a rentals");
        }

        // *verificar se um cliente tem mais de um aluguel

        // um aluguel deve ter no minimo 24horas
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimunHour) {
            throw new AppError("Invalid return time");
        }

        const rentals = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rentals;
    }
}

export { CreateRentalsUseCase };
