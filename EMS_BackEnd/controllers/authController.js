import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // desctruct the email and password from the request body

    // check if the email is not empty
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check if the password is not empty
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // check if the email is not valid
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // check if the password is not valid
    /*
    if (password.length < 6) {
      return res.status(400).json({ message: "Password is too short" });
    }
    */

    // use the email to find a user in the database
    const user = await User.findOne({ email });

    // check if the user with the email does not exist
    /*
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    */

    // check if the password is not correct
    const isMatch = await bcrypt.compare(password, user.password); // compare the password with the hashed password in the database

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    // create a new token with the user id and role that expires in 10 days
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    // send the token and user data in the response
    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    //console.log(error);
    // send a response with status 500 for any server error
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  // send a response with status 200 if the token is valid
  return res.status(200).json({ success: true, user: req.user }); // return the user in the response
};

export { login, verify };
