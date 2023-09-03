## Live Link: https://book-catalog-backend-bice.vercel.app/

## Application Routes:

### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/266e3cff-f277-4d61-ad1b-f9d84526ec7d (Single GET)
- api/v1/users/266e3cff-f277-4d61-ad1b-f9d84526ec7d (PATCH)
- api/v1/users/266e3cff-f277-4d61-ad1b-f9d84526ec7d (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/e906e636-c9ae-404a-8ce1-1a8dab89d537 (Single GET)
- api/v1/categories/e906e636-c9ae-404a-8ce1-1a8dab89d537 (PATCH)
- api/v1/categories/e906e636-c9ae-404a-8ce1-1a8dab89d537 (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
