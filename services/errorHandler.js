import errorTypes from "../utils/errorTypes.js";

const errorHandler = ({ err = null, type = null, req, res, next }) => {
  if (err) {
    console.error("Error:", err.stack);
    return res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }

  const typeName = type || errorTypes.UNKNOWN_ERROR;

  switch (typeName) {
    case errorTypes.UNAUTHORIZED_ERROR:
      return res.status(401).json({ success: false, message: "Unauthorized" });
    case errorTypes.USER_PASS_ERROR:
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    case errorTypes.TOKEN_NOT_AVAILABLE:
      return res
        .status(401)
        .json({ success: false, message: "Token not available" });
    case errorTypes.UNKNOWN_ERROR:
      return res.status(400).json({ success: false, message: "Unknown error" });
    default:
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
  }
};

export default errorHandler;
