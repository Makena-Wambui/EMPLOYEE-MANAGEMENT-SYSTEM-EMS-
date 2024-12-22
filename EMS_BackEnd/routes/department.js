import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";

const router = express.Router(); // Create a new router

router.get("/", authMiddleware, getDepartments); // Define the route to get all departments
router.post("/add", authMiddleware, addDepartment); // Define the route to add a new department
router.get("/:id", authMiddleware, getDepartment); // Define the route to get a department by id
router.put("/:id", authMiddleware, updateDepartment); // Define the route to edit a department

export default router; // Export the routers
