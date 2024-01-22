import User from "../model/userSchema.js";

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    return res.status(201).json({ message: "User successfully deleted", user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Operation failed", error: error.message });
  }
};

export default deleteUser;
