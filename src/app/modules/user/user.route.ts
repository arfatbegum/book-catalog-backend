import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';

const router = express.Router();

router.patch(
    "/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser
);
  
router.get('/', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), UserController.getMyProfile);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteAUser);


export const UserRoutes = router;
