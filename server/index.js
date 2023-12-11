require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

//mongoose connection function

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//test fetch data

app.get("/api/books", async (req, res) => {
  try {
    const data = await Book.find({}).limit(2);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "An error occured while fetching the data.",
    });
  }
});

app.get("/", (req, res) => {
  res.json("hello server!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on Port : ${PORT}`);
});
