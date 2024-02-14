import errorTypes from "../utils/errorTypes.js";

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);

  switch (err.name) {
    case errorTypes.UNAUTHORIZED_ERROR:
      return res.status(401).json({ success: false, message: "Unauthorized" });
    case errorTypes.USER_PASS_ERROR:
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    case errorTypes.BAD_REQUEST:
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    case errorTypes.VALIDATION_ERROR:
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    default:
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
  }
};

export default handleErrors;
