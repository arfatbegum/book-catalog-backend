import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;
  const result = await CategoryService.createCategory(categoryData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category created successfully!",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category retrieved successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await CategoryService.updateCategory(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully !",
    data: result,
  });
});

const deleteACategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteACategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category deleted successfully",
    data: result,
  });
});

export const CategoryController = {
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteACategory,
  createCategory
};
