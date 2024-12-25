import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import logger from "../loggers/winston.js";
const protectRoute = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized'
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({
                message: false,
                message: "user not found"
            })
        }
        req.user = user;

        next();
    } catch (error) {
        logger.error("token verification failed", error)
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
        });
    }
}

export default protectRoute