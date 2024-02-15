import jwt from "jsonwebtoken";
import "../utils/esm.js";
import errorTypes from "../utils/errorTypes.js";
import errorHandler from "./errorHandler.js";

const jwtSecret = process.env.JWT_SECRET;

const roleAuth = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return errorHandler({ err, res });
        }
        if (decodedToken.role !== role) {
          return errorHandler({ type: errorTypes.UNAUTHORIZED_ERROR, res });
        }
        next();
      });
    } else {
      return errorHandler({ type: errorTypes.TOKEN_NOT_AVAILABLE, res });
    }
  };
};

export default roleAuth;
