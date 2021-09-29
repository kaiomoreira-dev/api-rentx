import { inject, injectable } from "tsyringe";

import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
}
@injectable()
class ListRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute({ user_id }: IRequest): Promise<Rentals[]> {
        const rentals = await this.rentalsRepository.findByUser(user_id);

        return rentals;
    }
}

export { ListRentalsUseCase };
