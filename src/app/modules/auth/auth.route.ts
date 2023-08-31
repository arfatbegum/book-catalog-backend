import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validations';
const router = express.Router();

router.post(
    "/signup",
    validateRequest(AuthValidation.createUserZodSchema),
    AuthController.createUser
);
  

export const AuthRoutes = router;