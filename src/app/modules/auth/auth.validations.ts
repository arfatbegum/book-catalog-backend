import { z } from "zod";
import { role } from "./auth.constants";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Phone Number is required ",
    }),
    email: z.string({
      required_error: "Phone Number is required ",
    }),
    password: z.string({
      required_error: "Password is required ",
    }),
      role: z.enum([...role] as [string, ...string[]]),
    contactNo: z.string({
      required_error: "Password is required ",
    }),
    address: z.string({
      required_error: "Address is required ",
    }),
    profileImg: z.string({
      required_error: "Password is required ",
    }),
   }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Phone Number is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema
};
