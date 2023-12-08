const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(res.status(401).json({ message: "Unauthorized" }));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(res.status(401).json({ message: "Unauthorized" }));
    }
    req.user = user;
    next();
  } catch {
    next(res.status(401).json({ message: "Unauthorized" }));
  }
};
module.exports = authenticate;
