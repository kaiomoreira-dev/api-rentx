import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async hundle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUser = container.resolve(ResetPasswordUserUseCase);

    await resetPasswordUser.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };
