import express from "express";
import { getUser, login, logout, signup, updateProfile } from "../controllers/authControllers.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)

//protected routes
router.post("/update-profile", protectRoute, updateProfile)
router.get("/get-user", protectRoute, getUser)
export default router