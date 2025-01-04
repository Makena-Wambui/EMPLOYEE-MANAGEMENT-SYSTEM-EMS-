import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addLeave } from "../controllers/leaveController.js";
import { getLeave } from "../controllers/leaveController.js";
import { getLeaves } from "../controllers/leaveController.js";
import { getLeaveDetail } from "../controllers/leaveController.js";
import { updateLeave } from "../controllers/leaveController.js";

const router = express.Router(); // Create a new router

router.post("/add", authMiddleware, addLeave); // Define the route to add a new leave
router.get("/:id", authMiddleware, getLeave); // Define the route to get the leave
router.put("/:id", authMiddleware, updateLeave); // Define the route to update the leave status
router.get("/", authMiddleware, getLeaves); // Define the route to get the leaves
router.get("/detail/:id", authMiddleware, getLeaveDetail); // Define the route to get the leave details

export default router; // Export the routers
