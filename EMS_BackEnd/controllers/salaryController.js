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

const getSalary = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee id from the request params
    const salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    ); // Find the salary history of the employee with the given id
    res.status(200).json({ success: true, salary }); // Send the response
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error when getting salary" }); // Send the error
  }
};

export { addSalary, getSalary };
