import { z } from "zod";
import { role } from "../auth/auth.constants";

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required ",
    }).optional(),
    email: z.string({
      required_error: "Email is required ",
    }).optional(),
    password: z.string({
      required_error: "Password is required ",
    }).optional(),
      role: z.enum([...role] as [string, ...string[]]),
    contactNo: z.string({
      required_error: "Contact No is required ",
    }).optional(),
    address: z.string({
      required_error: "Address is required ",
    }).optional(),
    profileImg: z.string({
      required_error: "Profile img is required ",
    }).optional(),
   }),
});


export const UserValidation = {
    updateUserZodSchema,
};
