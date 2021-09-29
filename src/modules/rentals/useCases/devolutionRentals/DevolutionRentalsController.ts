import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalsUseCase } from "./DevolutionRentalsUseCase";

class DevolutionRentalsController {
    async hundle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const devolutionRentalsUseCase = container.resolve(
            DevolutionRentalsUseCase
        );

        const devolutionRental = await devolutionRentalsUseCase.execute({
            user_id,
            id,
        });

        return response.status(201).json(devolutionRental);
    }
}

export { DevolutionRentalsController };
