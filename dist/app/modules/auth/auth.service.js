"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, contactNo, address, profileImg } = data;
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    if (isNaN(saltRounds) || saltRounds <= 0) {
        throw new Error('BCRYPT_SALT_ROUNDS is not properly configured.');
    }
    // Hash the password
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    // Create the user with the hashed password
    const user = yield prisma_1.default.user.create({
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
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    if (!email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email is required');
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Compare the user's input password with the stored hashed password
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // Create access token & refresh token
    const { id: userId, role } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // Check if the user exists using Prisma
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Generate a new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: user.id,
        role: user.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    createUser,
    loginUser,
    refreshToken,
};
