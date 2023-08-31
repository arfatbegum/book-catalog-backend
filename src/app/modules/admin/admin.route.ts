import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidaion } from "./admin.validations";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidaion.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidaion.loginAdminZodSchema),
  AdminController.loginAdmin
);


export const AdminRoutes = router;
