require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Books");
const EmployeeModel = require("./models/Employee");
const bcryptjs = require("bcryptjs");

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

// app.post("/register", (req, res) => {
//   EmployeeModel.create(req.body)
//     .then((employees) => res.json(employees))
//     .catch((err) => res.json(err));
// });

app.post("/register", async (req, res) => {
  console.log("req = ", req.body);
  const { name, email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ name: name });
    if (user) {
      res.json("User already exists!");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await EmployeeModel({
      name,
      email,
      password: hashedPassword,
    });
    const response = await newUser.save();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("the user does not exist");
    }
  });
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

// app.put("/api/books", async (req, res) => {
//   try {
//     const bookId = req.body.bookId;

//     const updatedBook = {
//       title: req.body.title,
//       slug: req.body.slug,
//       description: req.body.description,
//       stars: req.body.stars,
//       category: req.body.category,
//     };

//     if (req.file) {
//       updatedBook.thumbnail = req.file.filename;
//     }

//     await Book.findByIdAndUpdate(bookId, updatedBook);
//     res.json("Data Submitted!");
//   } catch (error) {
//     res.status(500).json({
//       error: "An error occured while fetching the books.",
//     });
//   }
// });

app.put("/api/books", async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({ _id: bookId });
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on Port : ${PORT}`);
});
