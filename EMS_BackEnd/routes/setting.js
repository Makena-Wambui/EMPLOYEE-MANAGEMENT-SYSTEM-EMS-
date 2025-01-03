import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/settingController.js";

const router = express.Router(); // Create a new router

router.put("/change-password", authMiddleware, changePassword); // Define the route to add a new salary

export default router; // Export the routers
