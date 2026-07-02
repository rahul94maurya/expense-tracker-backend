const Expense = require("../modal/expense");

exports.getExpense = (req, res, next) => {
  Expense.find().then((expense)=>{
    const formattedExpense=expense.map(expense=> {
      return {id:expense._id,expenseData:expense.expenseData,amount:expense.amount,description:expense.description,modeOfPayment:expense.modeOfPayment,date:expense.date};
    });
    res.status(200).json(formattedExpense);
  }).catch((err) => {
    res.status(500).json({ message: "Failed to get expenses", error: err });
  });
};

exports.addExpense = (req, res, next) => {
  const data = req.body;
  const expense = new Expense(data);
  expense.save().then(() => {
    res.status(201).json({ message: "Expense added successfully" });
  }).catch((err) => {
    res.status(500).json({ message: "Failed to add expense" });
  });
};
