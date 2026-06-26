exports.getExpense = (req, res, next) => {
  const expenses = [
    {
      id: 1,
      category: "Food",
      subCategory: "Breakfast",
      description: "Breakfast at the hotel",
      modeOfPayment: "Cash",
      amount: 100,
      date: new Date(),
    },
    {
      id: 2,
      category: "Food",
      subCategory: "Lunch",
      description: "Lunch at the hotel",
      modeOfPayment: "Cash",
      amount: 200,
      date: new Date(),
    },
  ];
  res.status(200).json({ expenses });
};

exports.addExpense = (req, res, next) => {
  const data = req.body;
  console.log("data", data);
  res.status(201).json({ message: "Expense added successfully" });
};
