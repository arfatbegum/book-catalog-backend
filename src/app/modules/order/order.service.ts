import { Order, OrderedBook } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (
  data: Order,
  userId: string,
  orderedBooks: OrderedBook[]
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: {
        createMany: {
          data: orderedBooks,
        },
      },
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getAllOrders = async (userRole: string): Promise<Order[]> => {
  // Check if the user has the necessary role to retrieve all orders
  if (userRole !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }
  const result = await prisma.order.findMany();
  return result;
};

const getCustomerOrders = async (
  userId: string,
  userRole: string
): Promise<Order[]> => {
  // Check if the user has the necessary role to retrieve customer orders
  if (userRole !== 'customer') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }

  // Retrieve orders for the specific customer (userId)
  const result = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const getCustomerOrderById = async (
  orderId: string,
  userId: string,
  userRole: string
): Promise<Order | null> => {
  // Retrieve the order by orderId
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderedBooks: true,
    },
  });

  if (!order) {
    return null;
  }
  // Check access based on user role
  if (userRole === 'admin') {
    return order;
  } else if (userRole === 'customer' || order.userId === userId) {
    return order;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied');
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getCustomerOrderById,
};
