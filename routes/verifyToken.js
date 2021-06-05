const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.params.token;
  if (!token) return res.status(400).json(token);
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    res.post = verified;
    next();
  } catch (err) {
    res.json(token);
  }
};
