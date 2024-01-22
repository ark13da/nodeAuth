import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  adminAuth,
} from "../services/index.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete").delete(adminAuth, deleteUser);
router.route("/update").put(adminAuth, updateUser);

export default router;
