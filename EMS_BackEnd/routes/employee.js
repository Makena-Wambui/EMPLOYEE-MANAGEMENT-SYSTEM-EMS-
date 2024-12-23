import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload } from "../controllers/employeeController.js";

const router = express.Router(); // Create a new router

// router.get("/", authMiddleware, getDepartments); // Define the route to get all departments
router.post("/add", authMiddleware, upload.single("image"), addEmployee); // Call the addEmployee function when a POST request is made to the /add endpoint
// router.get("/:id", authMiddleware, getDepartment); // Define the route to get a department by id
// router.put("/:id", authMiddleware, updateDepartment); // Define the route to edit a department
// router.delete("/:id", authMiddleware, deleteDepartment); // Define the route to edit a department

export default router; // Export the routers
