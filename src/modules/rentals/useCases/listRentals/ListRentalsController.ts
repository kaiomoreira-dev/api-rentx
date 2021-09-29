import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUseCase } from "./ListRentalsUseCase";

class ListRentalsController {
    async hundle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const listRentalsUseCase = container.resolve(ListRentalsUseCase);

        const rentals = await listRentalsUseCase.execute({ user_id });

        return response.status(200).json(rentals);
    }
}

export { ListRentalsController };
