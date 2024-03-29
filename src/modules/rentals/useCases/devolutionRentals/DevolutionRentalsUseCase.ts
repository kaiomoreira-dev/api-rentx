import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}
@injectable()
class DevolutionRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({ id, user_id }: IRequest): Promise<Rentals> {
        const rental = await this.rentalsRepository.findById(id);

        const car = await this.carsRepository.findById(rental.car_id);

        if (!rental) {
            throw new AppError("Rental is not found");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

        const minimumDaily = 1;

        if (daily <= 0) {
            daily = minimumDaily;
        }

        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        let total = 0;

        if (delay > 0) {
            const amount_calucled = delay * car.fine_amount;
            total = amount_calucled;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        // alterar status da rentals para true

        await this.rentalsRepository.updateStatusTrue(rental.id, true);

        await this.rentalsRepository.create(rental);

        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalsUseCase };
