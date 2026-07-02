const Expense = require("../modal/expense");
const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");
const ExpenseMode = require("../modal/expenseMode");

exports.getExpense = (req, res, next) => {
  Expense.find()
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("expenseMode", "name")
    .then((expenses) => {
      const formattedExpense = expenses.map((expense) => ({
        id: expense._id,
        expenseDate: expense.expenseDate,
        amount: expense.amount,
        description: expense.description,
        category: expense.category,
        subcategory: expense.subcategory,
        expenseMode: expense.expenseMode,
      }));
      res.status(200).json(formattedExpense);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get expenses", error: err });
    });
};

exports.addExpense = (req, res, next) => {
  const { amount, description, category, subCategory, expenseMode, expenseDate } =
    req.body;

  const expense = new Expense({
    amount,
    description,
    category,
    subcategory: subCategory,
    expenseMode,
    expenseDate,
  });

  expense
    .save()
    .then((savedExpense) => {
      res.status(201).json({
        message: "Expense added successfully",
        expense: savedExpense,
      });
    })
    .catch((err) => {
      console.error("Failed to add expense:", err);
      res.status(500).json({ message: "Failed to add expense", error: err.message });
    });
};

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      const formattedCategories = categories.map((category) => {
        return { id: category._id, name: category.name };
      });
      res.status(200).json(formattedCategories);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get categories", error: err });
    });
};

exports.getSubcategories = (req, res, next) => {
  Subcategory.find({ categoryId: req.params.categoryId })
    .then((subcategories) => {
      const formattedSubcategories = subcategories.map((subcategory) => {
        return { id: subcategory._id, name: subcategory.name };
      });
      res.status(200).json(formattedSubcategories);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to get subcategories", error: err });
    });
};

exports.getExpenseModes = (req, res, next) => {
  ExpenseMode.find()
    .then((expenseModes) => {
      const formattedExpenseModes = expenseModes.map((expenseMode) => {
        return { id: expenseMode._id, name: expenseMode.name };
      });
      res.status(200).json(formattedExpenseModes);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to get expense modes", error: err });
    });
};
