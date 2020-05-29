const express = require("express");
const mongoose = require("mongoose");

require("dotenv/config");

const app = express();

app.use(express.json());

//Import Routes
const scoresRoute = require("./routes/scores");

app.use("/scores", scoresRoute);

// DB Connection

if (process.env.NODE_ENV === "test") {
  mongoose
    .connect(
      process.env.DB_TEST_URI,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("connected to db")
    )
    .catch((error) => console.log(error));
} else {
  mongoose
    .connect(
      process.env.DB_URI,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("connected to db")
    )
    .catch((error) => console.log(error));
}

// Port assignment
const port = process.env.PORT || 5000;

// Server listen
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.send("You posted");
});

// Server listen
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
