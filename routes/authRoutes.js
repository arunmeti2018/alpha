import express from "express";
import { signup } from "../controllers/authControllers.js";

const routes = express.Router();

routes.post("/signup", signup)
routes.post("/login",)
routes.get("/logout", (req, res) => {
    res.send("logout")
})

export default routes