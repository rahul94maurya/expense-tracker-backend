const express = require("express");
const { body } = require("express-validator");
const expenseController = require("../controller/expenses");
const ExpenseMode = require("../modal/expenseMode");
const router = express.Router();

router.get("/", expenseController.getExpense);
router.post(
  "/add-expense",
  [
    body("expenseDate", "Invalid date").isISO8601().toDate(),
    body("expenseMode").custom((value) => {
      return ExpenseMode.findById(value).then((expenseMode) => {
        if (!expenseMode) {
          return Promise.reject("Invalid expense mode");
        }
        return true;
      });
    }),
    body("amount")
      .isFloat({ min: 100 })
      .withMessage("Amount must be greater than 100"),
  ],
  expenseController.addExpense,
);
router.delete("/delete-expense/:id", expenseController.deleteExpense);
router.put("/update-expense/:id", expenseController.updateExpense);

router.get("/categories", expenseController.getCategories);
router.get("/subcategories/:categoryId", expenseController.getSubcategories);
router.get("/expense-modes", expenseController.getExpenseModes);

module.exports = router;
