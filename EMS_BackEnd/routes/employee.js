import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";

const router = express.Router(); // Create a new router

router.get("/", authMiddleware, getEmployees); // Define the route to get all employees
router.post("/add", authMiddleware, upload.single("image"), addEmployee); // Call the addEmployee function when a POST request is made to the /add endpoint
router.get("/:id", authMiddleware, getEmployee); // Define the route to get an employee by id
router.put("/:id", authMiddleware, updateEmployee); // Define the route to edit an employee
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId); // Define the route to get all employees by department id

export default router; // Export the routers
