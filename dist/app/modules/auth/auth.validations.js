"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const auth_constants_1 = require("./auth.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Phone Number is required ",
        }),
        email: zod_1.z.string({
            required_error: "Phone Number is required ",
        }),
        password: zod_1.z.string({
            required_error: "Password is required ",
        }),
        role: zod_1.z.enum([...auth_constants_1.role]),
        contactNo: zod_1.z.string({
            required_error: "Password is required ",
        }),
        address: zod_1.z.string({
            required_error: "Address is required ",
        }),
        profileImg: zod_1.z.string({
            required_error: "Password is required ",
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema
};
