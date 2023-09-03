"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validations_1 = require("./category.validations");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validations_1.CategoryValidation.createCategoryZodSchema), category_controller_1.CategoryController.createCategory);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validations_1.CategoryValidation.updateCategoryZodSchema), category_controller_1.CategoryController.updateCategory);
router.get('/', category_controller_1.CategoryController.getAllCategory);
router.get('/:id', category_controller_1.CategoryController.getSingleCategory);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteACategory);
exports.CategoryRoutes = router;
