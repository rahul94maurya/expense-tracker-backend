const express = require("express");
const expenseController = require("../controller/expenses");

const router = express.Router();

router.get("/", expenseController.getExpense);
router.post("/add-expense", expenseController.addExpense);

router.get("/categories", expenseController.getCategories);
router.get("/subcategories/:categoryId", expenseController.getSubcategories);
router.get("/expense-modes", expenseController.getExpenseModes);

module.exports = router;
