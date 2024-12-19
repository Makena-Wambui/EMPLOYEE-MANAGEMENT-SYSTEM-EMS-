import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
} from "../controllers/departmentController.js";

const router = express.Router(); // Create a new router

router.post("/add", authMiddleware, addDepartment); // Define the route to add a new department
router.get("/", authMiddleware, getDepartments); // Define the route to add a new department

export default router; // Export the routers
