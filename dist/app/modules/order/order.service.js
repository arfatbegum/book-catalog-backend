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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data, userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
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
});
const getAllOrders = (userRole) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user has the necessary role to retrieve all orders
    if (userRole !== 'admin') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied');
    }
    const result = yield prisma_1.default.order.findMany();
    return result;
});
const getCustomerOrders = (userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user has the necessary role to retrieve customer orders
    if (userRole !== 'customer') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied');
    }
    // Retrieve orders for the specific customer (userId)
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId: userId,
        },
    });
    return result;
});
const getCustomerOrderById = (orderId, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve the order by orderId
    const order = yield prisma_1.default.order.findUnique({
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
    }
    else if (userRole === 'customer' || order.userId === userId) {
        return order;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied');
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    getCustomerOrderById,
};
