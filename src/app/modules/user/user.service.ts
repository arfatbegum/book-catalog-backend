import prisma from "../../../shared/prisma";


const getAllUsers = async () => {
  return await prisma.user.findMany();
};


export const UserService = {
  getAllUsers,

};
