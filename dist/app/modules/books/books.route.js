"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const books_controller_1 = require("./books.controller");
const books_validations_1 = require("./books.validations");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(books_validations_1.BookValidation.updateBookZodSchema), books_controller_1.BookController.updateBook);
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(books_validations_1.BookValidation.createBookZodSchema), books_controller_1.BookController.createBook);
router.get('/', books_controller_1.BookController.getAllBooks);
router.get('/:categoryId/category', books_controller_1.BookController.getBooksByCategoryId);
router.get('/:id', books_controller_1.BookController.getSingleBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.deleteABook);
exports.BookRoutes = router;
