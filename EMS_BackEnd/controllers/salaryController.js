import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body; // Get the salary details from the request body

    // Total Salary Calculation
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      // Create a new salary object
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save(); // Save the salary

    res.status(200).json({ success: true }); // Send the response
  } catch (err) {
    res.status(500).json({ success: false, error: "Error when adding salary" }); // Send the error
  }
};

export { addSalary };
