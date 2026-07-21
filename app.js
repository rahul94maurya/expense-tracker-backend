require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");

const expensesRoutes = require("./routes/expenses");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expensesRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);
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
