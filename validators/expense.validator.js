const { body } = require("express-validator");
const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");
const ExpenseMode = require("../modal/expenseMode");

exports.expenseValidator = [
  body("expenseDate", "Invalid date").isISO8601().toDate(),
  body("category").custom((value) => {
    return Category.findById(value).then((category) => {
      if (!category) {
        return Promise.reject("Invalid category");
      }
    });
  }),
  body("subCategory").custom((value) => {
    return Subcategory.findById(value).then((subCategory) => {
      if (!subCategory) {
        return Promise.reject("Invalid sub category");
      }
    });
  }),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim(),
  body("expenseMode").custom((value) => {
    return ExpenseMode.findById(value).then((expenseMode) => {
      if (!expenseMode) {
        return Promise.reject("Invalid expense mode");
      }
    });
  }),
  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than 0"),
];
