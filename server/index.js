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
app.use("/uploads", express.static("uploads"));

//test fetch data

app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    //const stars = req.query.stars;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "An error occured while fetching the data.",
    });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;

    const data = await Book.findOne({ slug: slugParam });

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.json("hello server!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      stars: req.body.stars,
      category: req.body.category,
    });

    await Book.create(newBook);

    res.json("Data submitted successfully!");
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/books", async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updatedBook = {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      stars: req.body.stars,
      category: req.body.category,
    };

    if (req.file) {
      updatedBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updatedBook);
    res.json("Data Submitted!");
  } catch (error) {
    res.status(500).json({
      error: "An error occured while fetching the books.",
    });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on Port : ${PORT}`);
});
