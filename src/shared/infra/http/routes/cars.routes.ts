import { Router } from "express";
import multer from "multer";

import { tmpDirectoriesUploadConfig } from "@config/upload";
import { CreateCarImagesController } from "@modules/cars/useCases/createCarImages/CreateCarImagesController";
import { CreateCarsController } from "@modules/cars/useCases/createCars/CreateCarsController";
import { CreateCarSpecificationControlle } from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationControlle";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();

const { car } = tmpDirectoriesUploadConfig;

const uploadCars = multer(car);

const createCarsController = new CreateCarsController();

const listAvailableCarsController = new ListAvailableCarsController();

const createCarSpecificationController = new CreateCarSpecificationControlle();

const createCarImagesController = new CreateCarImagesController();

carsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCarsController.hundle
);

carsRoutes.get("/available", listAvailableCarsController.hundle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticate,
    ensureAdmin,
    createCarSpecificationController.hundle
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticate,
    ensureAdmin,
    uploadCars.array("photos"),
    createCarImagesController.hundle
);

export { carsRoutes };
