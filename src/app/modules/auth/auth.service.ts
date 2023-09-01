import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const createUser = async (data: User): Promise<User> => {
  const { name, email, password, role, contactNo, address, profileImg } = data;

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error('BCRYPT_SALT_ROUNDS is not properly configured.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create the user with the hashed password
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      contactNo,
      address,
      profileImg,
    },
  });

  return user;
};


const loginUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;

  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Compare the user's input password with the stored hashed password
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create access token & refresh token
  const { id: userId, role } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // Check if the user exists using Prisma
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Generate a new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
