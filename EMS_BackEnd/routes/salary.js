import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addSalary, getSalary } from "../controllers/salaryController.js";

const router = express.Router(); // Create a new router

router.post("/add", authMiddleware, addSalary); // Define the route to add a new salary
router.get("/:id", authMiddleware, getSalary); // Define the route to get the salary history of an employee

export default router; // Export the routers
