const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");

// Connect to Mongo DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB");
  }
);
//Import Ports
const postRoute = require("./routes/posts");
//Middlewares
app.use(express.json());

app.use("/", postRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Connected at ${port}`);
});
