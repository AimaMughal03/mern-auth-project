const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({
      isSuccess: false,
      message: "No token, access denied"
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({
      isSuccess: false,
      message: "Invalid token"
    });
  }
};
