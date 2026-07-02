const mongoose = require("mongoose");
require("dotenv").config();
const categoriesSeed = require("./categories.seed");
const expenseModeSeed = require("./expenseMode.seed");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    await categoriesSeed();
    await expenseModeSeed();
    console.log("✅ Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};
seed();
