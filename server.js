const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const usermodel = require("./models/users.js");

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.mongo_url);

app.get("/", (req, res) => {
  usermodel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  usermodel
    .findById(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/changes/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;
  usermodel
    .findByIdAndUpdate(id, { name, email, age }, { new: true })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/createuser", (req, res) => {
  usermodel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  usermodel
    .findByIdAndDelete(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

const port = process.env.port;

app.listen(port, () => {
  console.log("server is running");
});
