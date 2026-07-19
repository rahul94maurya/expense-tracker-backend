const express = require("express");
const { body } = require("express-validator");
const expenseController = require("../controller/expenses");
const ExpenseMode = require("../modal/expenseMode");
const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");
const { expenseValidator } = require("../validators/expense.validator");
const { validate } = require("../validators/validate");

const router = express.Router();

router.get("/", expenseController.getExpense);
router.post(
  "/add-expense",
  expenseValidator,
  validate,
  expenseController.addExpense,
);
router.delete("/delete-expense/:id", expenseController.deleteExpense);
router.put(
  "/update-expense/:id",
  expenseValidator,
  validate,
  expenseController.updateExpense,
);

router.get("/categories", expenseController.getCategories);
router.get("/subcategories/:categoryId", expenseController.getSubcategories);
router.get("/expense-modes", expenseController.getExpenseModes);

module.exports = router;
