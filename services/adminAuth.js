import jwt from "jsonwebtoken";
import "../utils/esm.js";

const jwtSecret = process.env.JWT_SECRET;

const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized", error: err });
      } else if (decodedToken.role !== "Admin") {
        return res.status(401).json({ message: "Not Admin", error: err });
      }
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default adminAuth;
