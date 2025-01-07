import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining
    console.log("Extracted token:", token);
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token Not Provided" }); // If the token is not present, return an error response
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token using the JWT_SECRET

    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Invalid" });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password"); // Find the user by the decoded id and exclude the password field

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    } // If the user is not found, return an error response

    req.user = user; // Set the user in the request object

    next(); // Call the next middleware
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default verifyUser;
