import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

class CreateRentalsController {
    async hundle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;

        const createRentalsUseCase = container.resolve(CreateRentalsUseCase);

        const rentals = await createRentalsUseCase.execute({
            car_id,
            user_id: id,
            expected_return_date,
        });

        return response.status(201).json(rentals);
    }
}

export { CreateRentalsController };
