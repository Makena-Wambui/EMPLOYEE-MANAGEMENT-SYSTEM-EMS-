import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
} from "../controllers/employeeController.js";

const router = express.Router(); // Create a new router

router.get("/", authMiddleware, getEmployees); // Define the route to get all employees
router.post("/add", authMiddleware, upload.single("image"), addEmployee); // Call the addEmployee function when a POST request is made to the /add endpoint
router.get("/:id", authMiddleware, getEmployee); // Define the route to get an employee by id
// router.put("/:id", authMiddleware, updateDepartment); // Define the route to edit a department
// router.delete("/:id", authMiddleware, deleteDepartment); // Define the route to edit a department

export default router; // Export the routers
