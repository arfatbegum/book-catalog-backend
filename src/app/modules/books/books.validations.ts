import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required ',
    }),
    author: z.string({
      required_error: 'author is required ',
    }),
    genre: z.string({
      required_error: 'genre is required ',
    }),
    price: z.number({
      required_error: 'price is required ',
    }),
    publicationDate: z.string({
      required_error: 'publicationDate is required ',
    }),
    categoryId: z.string({
      required_error: 'categoryId is required ',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required ',
      })
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
