const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//Import Ports
const postRoute = require("./routes/posts");
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
//Middlewares
app.use(express.json());
//Route Middleware
app.use("/", postRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Connected at ${port}`);
});
