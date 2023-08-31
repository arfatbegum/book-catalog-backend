import { z } from "zod";
import { role } from "../user/user.constants";

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


export const AuthValidation = {
  createUserZodSchema,
};
