import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticate,

    createSpecificationsController.hundle
);

export { specificationsRoutes };
