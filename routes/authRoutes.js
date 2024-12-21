import express from "express";
import { login, logout, signup } from "../controllers/authControllers.js";

const routes = express.Router();

routes.post("/signup", signup)
routes.post("/login", login)
routes.get("/logout", logout)

export default routes