import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../utils/esm.js";

const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "email or password missing" });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 6);
    await User.create({
      email,
      password: hashedPass,
    }).then((user) => {
      const expiry = 3 * 60 * 60;
      const token = jwt.sign({ id: user._id, email }, jwtSecret, {
        expiresIn: expiry,
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: expiry * 1000 });
      res.status(200).json({ message: "user created", user: user._id });
    });
  } catch (e) {
    res
      .status(400)
      .json({ message: "failed to create user", error: e.message });
  }
};

export default registerUser;
