import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IAdmin | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

AdminSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
