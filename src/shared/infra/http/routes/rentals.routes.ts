import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalsController } from "@modules/rentals/useCases/devolutionRentals/DevolutionRentalsController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentals/ListRentalsController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();

const devolutionRentalsController = new DevolutionRentalsController();

const listRentalsController = new ListRentalsController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalsController.hundle);

rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticate,
    devolutionRentalsController.hundle
);

rentalsRoutes.get("/user", ensureAuthenticate, listRentalsController.hundle);

export { rentalsRoutes };
