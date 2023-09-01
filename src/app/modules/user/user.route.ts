import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();


router.get("/", auth(ENUM_USER_ROLE.ADMIN),  UserController.getAllUsers);

export const UserRoutes = router;
