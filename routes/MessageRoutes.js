import express from "express"
import { getMessage, getUsersForSidebar, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();




router.get("/get-users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage)
export default router