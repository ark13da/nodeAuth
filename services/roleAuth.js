import jwt from "jsonwebtoken";
import "../utils/esm.js";

const jwtSecret = process.env.JWT_SECRET;

const roleAuth = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err || decodedToken.role !== role) {
          return res
            .status(401)
            .json({ success: false, message: "Not authorized" });
        }
        next();
      });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  };
};

export default roleAuth;
