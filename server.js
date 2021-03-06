const express = require("express");
const cors = require('cors'); 
const mongoose = require("mongoose");

require("dotenv/config");

const app = express();

app.use(express.json());

//Import Routes
const scoresRoute = require("./routes/scores");

app.use("/scores", cors(), scoresRoute);

// DB Connection
const dbAddress =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URI
    : process.env.DB_URI;

mongoose
  .connect(dbAddress, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
    console.log("connected to db")
  )
  .catch((error) => console.log(error));

// Port assignment
const port = process.env.PORT || 5000;

// Server listen
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
