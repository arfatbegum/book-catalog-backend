import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './books.controller';
import { BookValidation } from './books.validations';

const router = express.Router();

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);

router.get('/:categoryId/category', BookController.getBooksByCategoryId);

router.get('/:id', BookController.getSingleBook);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteABook);

export const BookRoutes = router;
