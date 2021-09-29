import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCases } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCases = container.resolve(
      AuthenticateUserUseCases
    );

    const token = await authenticateUserUseCases.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
