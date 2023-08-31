import httpStatus from "http-status";
import { IAdmin, ILoginUserResponse } from "./admin.interface";
import { Admin } from "./admin.model";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(payload);
  const createdAdmin = await Admin.findById(result._id).select("-password");
  return createdAdmin;
};

const loginAdmin = async (payload: IAdmin): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create access token & refresh token
  const { _id, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
