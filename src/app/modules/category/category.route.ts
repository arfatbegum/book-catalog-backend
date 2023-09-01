import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validations';

const router = express.Router();

router.post(
    '/create-category',
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.createCategoryZodSchema),
    CategoryController.createCategory
);
  
router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.updateCategory
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllCategory);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteACategory
);

export const CategoryRoutes = router;
