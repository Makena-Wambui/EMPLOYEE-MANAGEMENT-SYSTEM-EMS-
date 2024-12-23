import path from "path";
import Employee from "../models/Employee.js"; // Import Employee model
import User from "../models/user.js"; // Import User model
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import multer from "multer"; // Import multer for file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
  },
}); // Create a new storage object

const upload = multer({ storage: storage }); // Create a new upload object

const addEmployee = async (req, res) => {
  // Get the employee details from the request body
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email }); // Find the user by email

    // Check if the user already exists
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    // Save the user
    const savedUser = await newUser.save();

    // Create a new employee
    const newEmployee = new Employee({
      userId: savedUser._id, // Set the user id
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    // Save the employee
    await newEmployee.save();

    return res
      .status(200)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error when creating New Employee",
    });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department"); // Find all employees and populate the user and department fields

    return res.status(200).json({
      success: true,
      employees,
    }); // Return a success response with status code 200
  } catch (error) {
    res.status(500).json({ error: "Server error in get employees" }); // Return an error response with status code 500
  }
};

export { addEmployee, upload, getEmployees };
