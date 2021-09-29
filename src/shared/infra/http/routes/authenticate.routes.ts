import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { AuthenticateUserController } from "../../../../src/modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.hundle);

authenticateRoutes.post("/refresh-token", refreshTokenController.hundle);

export { authenticateRoutes };
