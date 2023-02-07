import { Router } from "express";
import multer from "multer";

import { tmpDirectoriesUploadConfig } from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const { avatar } = tmpDirectoriesUploadConfig;

const uploadAvatars = multer(avatar);

const updateUserUseController = new UpdateUserController();

const createUserController = new CreateUserController();

const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.hundle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticate,
    uploadAvatars.single("photo"),
    updateUserUseController.hundle
);

usersRoutes.get("/", ensureAuthenticate, profileUserController.handle);

export { usersRoutes };
