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
  
router.post(
  '/signin',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;