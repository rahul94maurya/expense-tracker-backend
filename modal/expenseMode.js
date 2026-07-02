const mongoose = require("mongoose");

const expenseModeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("ExpenseMode", expenseModeSchema);
