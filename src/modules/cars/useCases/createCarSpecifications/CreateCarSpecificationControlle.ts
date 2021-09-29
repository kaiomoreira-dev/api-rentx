import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationControlle {
  async hundle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createdCarSPecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const createdCarSPecification = await createdCarSPecificationUseCase.execute(
      { car_id: id, specification_id }
    );

    return response.status(200).json(createdCarSPecification);
  }
}

export { CreateCarSpecificationControlle };
