const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost/register-login")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/register", usersRouter);

app.get("/register", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const file = fs.createReadStream(
    path.resolve(__dirname, "./static/index.html")
  );
  file.pipe(res);
  return;
});

app.get("/stylesheet", (req, res) => {
  res.setHeader("Content-Type", "text/css");
  const file = fs.createReadStream(
    path.resolve(__dirname, "./static/style.css")
  );
  file.pipe(res);
  return;
});

const PORT = 3000;
app.listen(PORT);
