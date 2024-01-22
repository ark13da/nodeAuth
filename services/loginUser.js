import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../utils/esm.js";

const jwtSecret = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "email or password missing" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(401).json({
        message: `No account with email ${email}`,
        error: "Operation failed",
      });
      return;
    }

    const comparedPass = await bcrypt.compare(password, existingUser.password);

    if (!comparedPass) {
      res
        .status(401)
        .json({ message: `Incorrect password`, error: "Operation failed" });
      return;
    } else {
      const expiry = 3 * 60 * 60;
      const token = jwt.sign(
        { id: existingUser._id, email, role: existingUser.role },
        jwtSecret,
        {
          expiresIn: expiry,
        }
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: expiry * 1000 });
      res.status(200).json({
        message: "Login successful",
        user: existingUser._id,
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "An error occurred",
      error: e.message,
    });
  }
};

export default loginUser;
