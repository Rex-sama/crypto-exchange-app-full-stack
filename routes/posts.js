const express = require("express");
const router = express.Router();
const Post = require("../model/Users");
const { registerValidation, loginValidation } = require("../routes/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verified = require("./verifyToken");
const mongodb = require("mongodb");

//Get all post
router.get("/allpost", verified, async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Sign up User
router.post("/signup", async (req, res) => {
  //Lets validate the user info before adding
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //if Email already exist
  const emailexist = await Post.findOne({ email: req.body.email });
  if (emailexist) return res.status(400).json("Email already exist");

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  const post = await Post.create({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
    wallet: req.body.wallet,
    coins: req.body.coins,
  });
  try {
    const savedPost = await post.save();
    const token = jwt.sign(
      { id: post._id, username: post.username },
      process.env.TOKEN_KEY
    );
    res.header("token", token);
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
// Login user
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const post = await Post.findOne({ username: req.body.username });
    const validPassword = await bcrypt.compare(
      req.body.password,
      post.password
    );
    if (!validPassword) {
      return res.status(400).json("Invalid Username or password");
    }
    const token = jwt.sign(
      { id: post._id, username: post.username },
      process.env.TOKEN_KEY
    );
    res.header("token", token);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json("Server Error");
  }
});

//Specific post
router.get("/user/:token", verified, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: res.post.id });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Updating Post
router.patch("/update/:id", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { "coins._id": req.params.id },
      {
        // $set: { wallet: req.body.wallet },
        $set: {
          "coins.$.usd": req.body.usd,
          "coins.$.coin": req.body.coin,
          wallet: req.body.wallet,
        },
      }
    );
    post.save();
    // }
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Pushing  array of objects
router.put("/push/:token", verified, async (req, res) => {
  try {
    const post = await Post.updateMany(
      { _id: res.post.id },
      {
        $set: { wallet: req.body.wallet },
        $addToSet: { coins: { $each: req.body.coins } },
      }
    );
    post.save();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/addnwithdraw/:token", verified, async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: res.post.id },
      { $set: { wallet: req.body.wallet } }
    );
    post.save();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/userreview/:token", verified, async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: res.post.id },
      { $set: { rating: req.body.rating, comment: req.body.comment } }
    );
    post.save();
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
