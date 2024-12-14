import User from "./models/user.js"; // import the User model
import bcrypt from "bcrypt"; // import bcrypt for password hashing
import connectToDatabase from "./database/database.js";

// create a function to seed the user
const userRegister = async () => {
  // connect to the database
  connectToDatabase();
  try {
    // create a new user object, Admin
    const hashPassword = await bcrypt.hash("admin", 10); // hash the password
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    // save the user to the database
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

// call the function to seed the user
userRegister();
