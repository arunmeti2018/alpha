import express from "express"
import { getMessage, getUserdForSidebar, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.use(protectRoute)


router.get("/get-Users", getUserdForSidebar)
router.get(":/id", getMessage)
router.post("send:/id", sendMessage)
export default router