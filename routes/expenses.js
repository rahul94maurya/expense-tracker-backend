const express = require("express");
const { body } = require("express-validator");
const expenseController = require("../controller/expenses");
const ExpenseMode = require("../modal/expenseMode");
const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");
const { expenseValidator } = require("../validators/expense.validator");
const { validate } = require("../validators/validate");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, expenseController.getExpense);
router.post(
  "/add-expense",
  authenticate,
  expenseValidator,
  validate,
  expenseController.addExpense,
);
router.delete(
  "/delete-expense/:id",
  authenticate,
  expenseController.deleteExpense,
);
router.put(
  "/update-expense/:id",
  authenticate,
  expenseValidator,
  validate,
  expenseController.updateExpense,
);

router.get("/categories", expenseController.getCategories);
router.get("/subcategories/:categoryId", expenseController.getSubcategories);
router.get("/expense-modes", expenseController.getExpenseModes);

module.exports = router;
