const ExpenseMode = require("../modal/expenseMode");

const expenseModes = require("./data/expenseMode");
const expenseModeSeed = async () => {
  await ExpenseMode.insertMany(expenseModes);
};

module.exports = expenseModeSeed;
