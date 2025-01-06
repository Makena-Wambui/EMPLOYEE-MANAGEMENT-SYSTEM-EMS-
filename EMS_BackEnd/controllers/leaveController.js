import Leave from "../models/Leave.js"; // Import the leave model
import Employee from "../models/Employee.js"; // Import the employee model

// Define the function to add a new leave
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body; // Get the user ID, leave type, start date, end date, and reason from the request body

    //console.log("Request body:", req.body);

    const employee = await Employee.findOne({ userId }); //Find the employee by the user ID
    //console.log("Employee found:", employee);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      // Create a new leave object
      employeeId: employee._id, // Set the employee ID
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save(); // Save the new leave

    res.status(200).json({ success: true }); // Send the response
  } catch (err) {
    //console.error("Error in addLeave:", err.mesage); // Log the error
    res.status(500).json({ success: false, error: "Error when adding leave" }); // Send the error
  }
};

// Define the function to get the leave by the employee ID
const getLeave = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from the request parameters

    let leave = await Leave.find({ employeeId: id }); // Find the leave by the employee ID

    if (!leave) {
      const employee = await Employee.findOne({ userId: id }); // Find the employee by the user ID
      leave = await Leave.find({ employeeId: employee._id }); // Find the leave by the employee ID
    }

    return res.status(200).json({ success: true, data: leave }); // Send the response
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error when getting leaves" }); // Send the error
  }
};

// Define the function to get all the leaves
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },

        {
          path: "userId",
          select: "name",
        },
      ],
    }); // Find all the leave records and populate the employee ID field

    return res.status(200).json({ success: true, data: leaves }); // Send the response
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error when getting leaves" }); // Send the error
  }
};

// Define the function to get the leave details by the leave ID
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params; // Get the leave ID from the request parameters
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },

        {
          path: "userId",
          select: "name, profileImage",
        },
      ],
    }); // Find the leave by the ID and populate the employee ID field

    return res.status(200).json({ success: true, data: leave }); // Send the response
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error when getting leaves" }); // Send the error
  }
};

// Define the function to update the leave status
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params; // Get the leave ID from the request parameters
    const { status } = req.body; // Get the status from the request body

    await Leave.findByIdAndUpdate({ _id: id }, { status }); // Update the leave status

    return res.status(200).json({ success: true }); // Send the response
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error when updating leave status" }); // Send the error
  }
};
export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
