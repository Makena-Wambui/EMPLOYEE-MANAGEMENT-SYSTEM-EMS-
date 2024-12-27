import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addSalary } from "../controllers/salaryController.js";

const router = express.Router(); // Create a new router

router.post("/add", authMiddleware, addSalary); // Define the route to add a new salary

export default router; // Export the routers
