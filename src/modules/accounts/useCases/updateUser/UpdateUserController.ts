import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_fileName = request.file.filename;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({ user_id: id, avatar_fileName });

    return response.status(200).send();
  }
}

export { UpdateUserController };
