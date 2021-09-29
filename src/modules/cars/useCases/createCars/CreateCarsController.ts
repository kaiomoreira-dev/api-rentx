import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarsUseCase } from "./CreateCarsUseCase";

class CreateCarsController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    } = request.body;

    const createCarsUseCase = container.resolve(CreateCarsUseCase);

    const car = await createCarsUseCase.execute({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };
