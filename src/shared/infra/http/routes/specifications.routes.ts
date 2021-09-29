import { Router } from "express";

import { CreateSpecificationController } from "../../../../src/modules/cars/useCases/createSpecifications/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post(
    "/",
    ensureAuthenticate,

    createSpecificationsController.hundle
);

export { specificationsRoutes };
