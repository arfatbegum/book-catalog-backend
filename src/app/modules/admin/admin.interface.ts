import { Model, ObjectId } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  _id: ObjectId;
  phoneNumber: string;
  password: string;
  role: "admin";
  name: UserName;
  address: string;
};

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, "_id" | "phoneNumber" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

