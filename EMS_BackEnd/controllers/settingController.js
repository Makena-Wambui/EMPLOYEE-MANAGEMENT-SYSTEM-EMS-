import bcrypt from "bcrypt"; // Import the bcrypt library
import User from "../models/user.js"; // Import the User model

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body; // Destructure the userId, oldPassword, and newPassword fields from the request body
    const user = await User.findById({ _id: userId }); // Find the user by userId

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found when changing settings" }); // If the user is not found, return an error response
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password); // Check if the old password matches the user's password

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" }); // If the old password does not match, return an error response
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12); // Hash the new password

    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    ); // Update the user's password with the new hashed password

    return res.status(200).json({ message: "Password changed successfully" }); // Return a success response
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when trying to change settings" });
  }
};

export { changePassword };
