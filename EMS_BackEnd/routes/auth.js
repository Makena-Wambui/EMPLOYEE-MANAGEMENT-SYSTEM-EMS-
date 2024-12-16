import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import { verify } from "jsonwebtoken";

const router = express.Router(); // create a new express router

router.post("/login", login); // create a new route for POST requests to the /login endpoint
router.post("/verify", authMiddleware, verify); // create a new route for POST requests to the /verify endpoint

export default router;
