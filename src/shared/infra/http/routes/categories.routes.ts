import { Router } from "express";
import multer from "multer";

import { CreateCategoriesController } from "../../../../src/modules/cars/useCases/createCategories/CreateCategoriesController";
import { ImportCategoriesController } from "../../../../src/modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../../../../src/modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});
const createCategoriesController = new CreateCategoriesController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCategoriesController.hundle
);

categoriesRoutes.get("/", listCategoriesController.hundle);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthenticate,
    ensureAdmin,
    importCategoriesController.hundle
);

export { categoriesRoutes };
