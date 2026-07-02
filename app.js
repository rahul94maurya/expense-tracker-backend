require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expensesRoutes = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expensesRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
