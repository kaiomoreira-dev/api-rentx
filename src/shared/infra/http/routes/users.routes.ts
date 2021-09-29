import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../src/config/upload";
import { CreateUserController } from "../../../../src/modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "../../../../src/modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const updateUserUseController = new UpdateUserController();

const createUserController = new CreateUserController();

const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.hundle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticate,
    uploadAvatar.single("avatar"),
    updateUserUseController.hundle
);

usersRoutes.get("/", ensureAuthenticate, profileUserController.handle);

export { usersRoutes };
