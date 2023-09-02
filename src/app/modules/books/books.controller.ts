import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFileds } from './books.constant';
import { BookService } from './books.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;
  const result = await BookService.createBook(categoryData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBook(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await BookService.getBooksByCategoryId(categoryId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully !',
    data: result,
  });
});

const deleteABook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteABook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  getAllBooks,
  getBooksByCategoryId,
  getSingleBook,
  updateBook,
  deleteABook,
  createBook,
};
