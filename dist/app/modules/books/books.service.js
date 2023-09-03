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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const books_constant_1 = require("./books.constant");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBook = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice, category } = filters, otherFilters = __rest(filters, ["search", "minPrice", "maxPrice", "category"]);
    const andConditions = [];
    if (search) {
        // Create an array of search conditions for specific fields
        const searchConditions = books_constant_1.BookSearchAbleFields.map(field => ({
            [field]: {
                contains: search,
                mode: 'insensitive',
            },
        }));
        andConditions.push({
            OR: searchConditions,
        });
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceCondition = {};
        if (minPrice !== undefined) {
            priceCondition['gte'] = parseFloat(minPrice.toString());
        }
        if (maxPrice !== undefined) {
            priceCondition['lte'] = parseFloat(maxPrice.toString());
        }
        andConditions.push({
            price: priceCondition,
        });
    }
    if (category) {
        andConditions.push({
            category: {
                id: category,
            },
        });
    }
    if (Object.keys(otherFilters).length) {
        const otherFilterConditions = Object.entries(otherFilters).map(([field, value]) => ({
            [field]: value,
        }));
        andConditions.push(...otherFilterConditions);
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { price: 'desc' },
    });
    const total = yield prisma_1.default.book.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            size,
            page,
            totalPage,
        },
        data: result,
    };
});
const getBooksByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
        where: {
            categoryId: categoryId,
        },
    });
    return books;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteABook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBook,
    getBooksByCategoryId,
    getSingleBook,
    updateBook,
    deleteABook,
};
