const Expense = require("../modal/expense");
const Category = require("../modal/category");
const Subcategory = require("../modal/subcategory");
const ExpenseMode = require("../modal/expenseMode");
const ApiError = require("../utils/ApiError");

exports.getExpense = (req, res, next) => {
  const { category } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  //above is the way to add query params and get the data from the database
  Expense.find(filter)
    // .select("-_id") //this is the way to select the fields to be returned
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("expenseMode", "name")
    .then((expenses) => {
      const formattedExpense = expenses.map((expense) => ({
        id: expense._id,
        expenseDate: expense.expenseDate,
        amount: expense.amount,
        description: expense.description,
        category: { id: expense.category._id, name: expense.category.name },
        subcategory: {
          id: expense.subcategory._id,
          name: expense.subcategory.name,
        },
        expenseMode: {
          id: expense.expenseMode._id,
          name: expense.expenseMode.name,
        },
      }));
      res.status(200).json(formattedExpense);
    })
    .catch((err) => {
      const error = new ApiError("Failed to get expenses", 500, err.message);
      next(error);
    });
};

exports.addExpense = (req, res, next) => {
  const {
    amount,
    description,
    category,
    subCategory,
    expenseMode,
    expenseDate,
  } = req.body;

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
      const error = new ApiError("Failed to add expense", 500, err.message);
      next(error);
    });
};
exports.updateExpense = (req, res, next) => {
  const { id } = req.params;
  const {
    amount,
    description,
    category,
    subCategory,
    expenseMode,
    expenseDate,
  } = req.body;
  Expense.findByIdAndUpdate(id, {
    amount,
    description,
    category,
    subCategory,
    expenseMode,
    expenseDate,
  })
    .then((updatedExpense) => {
      res.status(200).json({
        message: "Expense updated successfully",
        expense: updatedExpense,
      });
    })
    .catch((err) => {
      const error = new ApiError("Failed to update expense", 500, err.message);
      next(error);
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
      const error = new ApiError("Failed to get categories", 500, err.message);
      next(error);
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
      const error = new ApiError(
        "Failed to get subcategories",
        500,
        err.message,
      );
      next(error);
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
      const error = new ApiError(
        "Failed to get expense modes",
        500,
        err.message,
      );
      next(error);
    });
};

exports.deleteExpense = (req, res, next) => {
  const { id } = req.params;
  Expense.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense deleted successfully" });
    })
    .catch((err) => {
      const error = new ApiError("Failed to delete expense", 500, err.message);
      next(error);
    });
};
