import Department from "../models/department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
  // Implement the logic to get the summary data
  try {
    // Get the total number of employees from the database
    const totalEmployees = await Employee.countDocuments();

    // Get the total number of departments from the database
    const totalDepartments = await Department.countDocuments();

    // Get the total monthly salary from the database for all employees
    // Get the total monthly salary from the database for all employees
    const totalSalaries = await Employee.aggregate([
      {
        $project: {
          salary: { $ifNull: ["$salary", 0] }, // Replace null or missing salaries with 0
        },
      },
      {
        $group: {
          _id: null, // Group all the documents
          totalSalary: { $sum: "$salary" }, // Calculate the total salary
        },
      },
    ]);
    console.log(totalSalaries);

    // Get the total number of leave requests from the database
    const totalLeaveRequests = await Leave.distinct("employeeId");

    // Get the total number of leave requests from the database depending on the status
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status", // Group the leave requests by status value
          count: { $sum: 1 }, // Count the number of leave requests with the same status value
        },
      },
    ]);

    // Create an object to store the leave summary data
    const leaveSummary = {
      appliedFor: totalLeaveRequests.length, // Total number of leave requests
      approved: leaveStatus.find((l) => l._id === "Approved")?.count || 0, // Total number of approved leave requests
      rejected: leaveStatus.find((l) => l._id === "Rejected")?.count || 0, // Total number of rejected leave requests
      pending: leaveStatus.find((l) => l._id === "Pending")?.count || 0, // Total number of pending leave requests
    };

    return res.status(200).json({
      totalEmployees,
      totalDepartments,
      totalSalaries: totalSalaries[0]?.totalSalary || 0, // Return the total salary value or 0 if it does not exist
      leaveSummary,
    }); // Return the summary data as a json response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in the dashboard summary" });
  }
};

export { getSummary };
