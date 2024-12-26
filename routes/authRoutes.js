import express from "express";
import { getUser, login, logout, signup, updateProfile } from "../controllers/authControllers.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();
router.get("/signup", (req, res) => {
    res.render("signup")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/dashboard", protectRoute, (req, res) => {
    res.render("dashboard", { user: req.user })
})
router.get("/profile", protectRoute, (req, res) => {
    res.render("profile", { user: req.user })
})

router.post("/signup", signup)
router.post("/login", login)

router.get("/logout", logout)

//protected routes
router.post("/update-profile", protectRoute, updateProfile)
router.get("/get-user", protectRoute, getUser)

export default router