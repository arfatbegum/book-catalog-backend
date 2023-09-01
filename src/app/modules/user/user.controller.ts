import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

const deleteAUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteAUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteAUser
};
