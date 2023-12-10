require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello server!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on Port : ${PORT}`);
});
