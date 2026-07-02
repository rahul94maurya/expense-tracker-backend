const mongoose = require("mongoose");

const expenseSchema=new mongoose.Schema({
    expenseDate: Date,
    amount:String,
    description:String,
})

module.exports=mongoose.model("Expense",expenseSchema);