import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchAbleFields } from './books.constant';
import { IBooksFilterRequest } from './books.interface';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBook = async (
  filters: IBooksFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, minPrice, maxPrice, category, ...otherFilters } = filters;

  const andConditions = [];

  if (search) {
    // Create an array of search conditions for specific fields
    const searchConditions = BookSearchAbleFields.map(field => ({
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
    const priceCondition: { [key: string]: number } = {};
  
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
    const otherFilterConditions = Object.entries(otherFilters).map(
      ([field, value]) => ({
        [field]: value,
      })
    );

    andConditions.push(...otherFilterConditions);
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { price: 'desc' },
  });

  const total = await prisma.book.count();
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
};

const getBooksByCategoryId = async (categoryId: string): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    where: {
      categoryId: categoryId,
    },
  });
  return books;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteABook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBook,
  getBooksByCategoryId,
  getSingleBook,
  updateBook,
  deleteABook,
};
