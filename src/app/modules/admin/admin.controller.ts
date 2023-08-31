import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import { IAdmin, ILoginUserResponse, IRefreshTokenResponse } from "./admin.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);

  sendResponse<IAdmin>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin created successfully",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);
  
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin logged in successfully !',
    data: others,
  });
});




export const AdminController = {
  createAdmin,
  loginAdmin,
};
