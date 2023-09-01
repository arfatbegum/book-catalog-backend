import { Request, Response } from "express";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
