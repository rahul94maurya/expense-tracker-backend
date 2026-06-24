require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const mongoURI =
//   "mongodb+srv://rahul_maurya:rahul123@cluster0.yc4zzqt.mongodb.net/expense_tracker?appName=Cluster0";

const app = express();

app.use(cors());

app.use("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
