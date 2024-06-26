const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || token === undefined) {
      return res.status(401).send({
        success: false,
        message: "Unauthorize access",
      });
    }
    let newToken = token.split(" ")[1];
    jwt.verify(newToken, "abcd", (err, user) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Token is not valid",
        });
      }
      req.user = user;
      return next();
    });
  } catch (err) {
    return res.status(501).send({
      success: false,
      messege: err,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    res.send(req.user.payload);
    return next();
  } catch (err) {
    return res.status(501).send({
      success: false,
      messege: "isAdmin check Error" + err,
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
