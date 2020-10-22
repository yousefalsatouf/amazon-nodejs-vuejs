const express = require("express");
const morgan = require("morgan"); // to show request in the terminal
const parser = require("body-parser"); // ex take data from the front side to the back side
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const productRouter = require("./routes/products");

dotenv.config();

const app = express();

mongoose.connect(
  process.env.ACCESSDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log("Error connection to the db");
    else console.log("Connection successed to the db");
  }
);

app.use(morgan("dev")); // as we said just to see it in the terminal..
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use("/api", productRouter);

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("it worked !");
});
