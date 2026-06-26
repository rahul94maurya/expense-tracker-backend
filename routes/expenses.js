const express = require("express");
const expenseController = require("../controller/expenses");

const router = express.Router();

router.get("/", expenseController.getExpense);
router.post("/add-expense", expenseController.addExpense);

module.exports = router;
