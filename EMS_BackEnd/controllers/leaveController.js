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

export { addLeave };
