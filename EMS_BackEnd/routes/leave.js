import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addLeave } from "../controllers/leaveController.js";

const router = express.Router(); // Create a new router

router.post("/add", authMiddleware, addLeave); // Define the route to add a new leave

export default router; // Export the routers
