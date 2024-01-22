import User from "../model/userSchema.js";

const updateUser = async (req, res) => {
  const { role, id } = req.body;

  if (role === "Admin") {
    try {
      // Finds the user with the id
      const user = await User.findById(id);

      // Verifies the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verifies the user is not already an admin
      if (user.role !== "Admin") {
        user.role = role;
        await user.save();

        return res.status(201).json({ message: "Update successful", user });
      } else {
        return res.status(400).json({ message: "User is already an Admin" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Role or Id not present" });
  }
};

export default updateUser;
